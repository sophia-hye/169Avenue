-- 169Avenue · Supabase schema
-- Run this once in Supabase SQL Editor (project dashboard → SQL Editor → New query)
-- Safe to re-run: uses IF NOT EXISTS / ON CONFLICT.
--
-- One-table denormalized model: each row is one StudentCase (student meta +
-- parent survey + observations + reports) stored as JSONB. Matches the legacy
-- localStorage shape so the existing helpers in src/data/student-store.ts can
-- keep their sync function signatures.

-- ============================================================
-- 1. student_cases  (one row per student, full case as JSONB)
-- ============================================================
CREATE TABLE IF NOT EXISTS student_cases (
  id          TEXT PRIMARY KEY,                 -- 's_xxx_xxx' or UUID, generated client-side
  data        JSONB NOT NULL,                   -- full StudentCase blob
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS student_cases_updated_idx ON student_cases(updated_at DESC);

-- ============================================================
-- 2. Row-Level Security
-- ============================================================
-- Single-user phase: permissive policy so the anon key shipped in the browser
-- bundle can read and write. Tighten when authentication is added.
--
-- ⚠ Anyone who finds your Supabase URL + anon key can read/modify your data
--   while these policies remain. Tighten the policies (or attach them to
--   `auth.uid()`) before exposing the deployed site publicly.

ALTER TABLE student_cases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "allow_all" ON student_cases;
CREATE POLICY "allow_all" ON student_cases FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- 3. truncate-all helper (for "Reset all data" or admin testing)
-- ============================================================
CREATE OR REPLACE FUNCTION truncate_all_user_data() RETURNS void AS $$
BEGIN
  TRUNCATE student_cases RESTART IDENTITY CASCADE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION truncate_all_user_data() TO anon, authenticated;

-- ============================================================
-- 4. updated_at auto-touch trigger
-- ============================================================
CREATE OR REPLACE FUNCTION touch_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS student_cases_touch ON student_cases;
CREATE TRIGGER student_cases_touch BEFORE UPDATE ON student_cases
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
