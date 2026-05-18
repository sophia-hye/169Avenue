import {
  DEFAULT_DIAGNOSIS,
  OBSERVER_DOMAIN_KEYS,
  type ObserverMap,
  type ParentSurvey,
} from './diagnosis-template'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

/* ─── Keys (legacy localStorage) ─── */

const INDEX_KEY = '169av-students-index'
const CASE_KEY = (id: string) => `169av-case-${id}`
/** Legacy single-slot key (pre-workspace). */
const LEGACY_SLOT_KEY = '169av-diagnosis'
/** Legacy per-student key (pre-case refactor, flat DiagnosisData). */
const LEGACY_STUDENT_KEY = (id: string) => `169av-student-${id}`
/** Once we've pushed local cases to Supabase we set this so we don't keep doing it. */
const SUPABASE_MIGRATION_FLAG = '169av-migrated-to-supabase'

/* ─── Types ─── */

export type StudyAbroadPurpose = 'language_study' | 'university_admission' | 'summer_winter_camp' | 'immigration' | 'own_program'

/* ─── Purpose-specific survey types ─── */

export interface LanguageStudySurvey {
  targetCountry: string
  targetRegion: string
  institutions: string
  studyGoal: 'conversation' | 'certificate' | 'admission_prep' | 'daily_life' | ''
  duration: 'under_1m' | '1_3m' | '3_6m' | 'over_6m' | ''
  budget: string
}

export interface UniversityAdmissionSurvey {
  targetCountry: string
  targetRegion: string
  universities: string
  budget: string
  currentDegree: 'bachelor' | 'master' | 'phd' | ''
  targetDegree: 'bachelor' | 'master' | 'phd' | 'integrated' | 'postdoc' | ''
}

export interface CampSurvey {
  targetCountry: string
  englishLevel: string
  englishTestScore: string
  duration: string
  budget: string
  parentAccompanying: 'yes' | 'no' | ''
}

export interface ImmigrationSurvey {
  applicantName: string
  age: string
  targetCountry: string
  immigrationType: 'skilled' | 'investment' | 'family' | 'post_study' | 'business' | ''
  currentVisaStatus: 'none' | 'student' | 'work' | 'other' | ''
  familyComposition: 'alone' | 'with_spouse' | 'with_children' | 'whole_family' | ''
  education: 'high_school' | 'bachelor' | 'master' | 'phd' | ''
  occupation: string
  targetTimeline: string
  budget: string
  notes: string
}

export interface OwnProgramSurvey {
  interestAreas: ('art' | 'sports' | 'music' | 'academics')[]
  budget: string
  interestedSchools: string
}

export type PurposeSurvey =
  | { type: 'language_study'; data: LanguageStudySurvey }
  | { type: 'university_admission'; data: UniversityAdmissionSurvey }
  | { type: 'summer_winter_camp'; data: CampSurvey }
  | { type: 'immigration'; data: ImmigrationSurvey }
  | { type: 'own_program'; data: OwnProgramSurvey }

export type GeneralStatus = 'not-started' | 'surveyed' | 'consulting' | 'proposed' | 'confirmed' | 'completed'

export interface StudentMeta {
  id: string
  name: string
  grade: string
  school: string
  /** Free-text program/track label; set manually or derived from recommendation. */
  program: string
  /** Reason for studying abroad. */
  studyAbroadPurpose?: StudyAbroadPurpose
  /** Own-program keys the student is enrolled in (discovery/decision/direction/academic/elite). */
  programs?: string[]
  /** For students not in own programs: regions of interest. */
  regionsOfInterest?: string
  /** For students not in own programs: schools of interest. */
  schoolsOfInterest?: string
  /** For students not in own programs: budget. */
  budget?: string
  /** General management notes. */
  generalNotes?: string
  /** Client date of birth (YYYY-MM-DD). */
  dateOfBirth?: string
  /** Parent / guardian name (for minors). */
  parentName?: string
  /** Parent / guardian phone (for minors). */
  parentPhone?: string
  createdAt: string
  updatedAt: string
}

export interface Observation {
  id: string
  sessionDate: string
  sessionLabel?: string
  observer: ObserverMap
  /** One-line mentor synthesis across the whole session. */
  overallNote?: string
  createdAt: string
}

export interface Report {
  id: string
  /** Which observations fed this report. */
  observationIds: string[]
  /** Consultant narrative recommendation. */
  recommendation?: string
  /** Track key chosen as next step (discovery/decision/direction/academic/elite). */
  nextProgram?: string
  /** Optional bulleted next-steps body. */
  nextSteps?: string
  /** Growth roadmap items (one per line, free text). */
  roadmapShort?: string  // 6 months
  roadmapMid?: string    // 1-2 years
  roadmapLong?: string   // High School / long-term
  /** Narrative closing reflection — appears at the very end of the PDF. */
  closingMessage?: string
  /** Set when the PDF has been generated. */
  generatedAt?: string
  version: number
}

export interface ConsultationLog {
  id: string
  date: string
  content: string
  specialNotes: string
  cautions: string
  createdAt: string
  updatedAt: string
}

export interface StudentCase {
  student: StudentMeta
  survey: ParentSurvey
  purposeSurvey?: PurposeSurvey
  generalStatus?: GeneralStatus
  observations: Observation[]
  reports: Report[]
  consultationLogs?: ConsultationLog[]
}

export type Status = 'not-started' | 'awaiting-observation' | 'ready-for-review' | 'ready-for-pdf' | 'completed'

export interface StudentIndexEntry {
  id: string
  name: string
  grade: string
  program: string
  updatedAt: string
  status: Status
}

/* ─── Helpers ─── */

function newId(prefix = 's'): string {
  const uuid = crypto.randomUUID?.()
  return uuid || `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function nowDate(): string {
  return new Date().toISOString().slice(0, 10)
}
function nowIso(): string {
  return new Date().toISOString()
}

function emptyObserver(): ObserverMap {
  return OBSERVER_DOMAIN_KEYS.reduce((acc, k) => {
    acc[k] = { mentorNote: '', items: DEFAULT_DIAGNOSIS.observer[k].items.map((it) => ({ ...it })) }
    return acc
  }, {} as ObserverMap)
}

/* ─── Module-level cache ─── */
/**
 * Single source of truth at runtime. Public functions stay synchronous and
 * read/write this Map. Persistence happens in the background:
 *  - When Supabase is configured: fire-and-forget upsert/delete on student_cases
 *  - Otherwise:                    legacy localStorage writes (offline fallback)
 */
const cache = new Map<string, StudentCase>()
let initialized = false
let initPromise: Promise<void> | null = null

/* ─── Local storage I/O (used as fallback + as legacy migration source) ─── */

function readIndex(): StudentIndexEntry[] {
  try {
    const raw = localStorage.getItem(INDEX_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}
function writeIndex(idx: StudentIndexEntry[]): void {
  try { localStorage.setItem(INDEX_KEY, JSON.stringify(idx)) } catch { /* ignore */ }
}

function readCaseLocal(id: string): StudentCase | null {
  try {
    const raw = localStorage.getItem(CASE_KEY(id))
    if (!raw) return null
    return normalizeCase(JSON.parse(raw), id)
  } catch {
    return null
  }
}
function writeCaseLocal(c: StudentCase): void {
  try { localStorage.setItem(CASE_KEY(c.student.id), JSON.stringify(c)) } catch { /* ignore */ }
}
function removeCaseLocal(id: string): void {
  try { localStorage.removeItem(CASE_KEY(id)) } catch { /* ignore */ }
}

/** Defensive: fill missing fields from a possibly-partial case JSON. */
function normalizeCase(raw: unknown, id: string): StudentCase {
  const c = (raw || {}) as Partial<StudentCase>
  const student: StudentMeta = {
    id,
    name: c.student?.name || '',
    grade: c.student?.grade || '',
    school: c.student?.school || '',
    program: c.student?.program || '',
    studyAbroadPurpose: c.student?.studyAbroadPurpose,
    programs: c.student?.programs || [],
    regionsOfInterest: c.student?.regionsOfInterest || '',
    schoolsOfInterest: c.student?.schoolsOfInterest || '',
    budget: c.student?.budget || '',
    generalNotes: c.student?.generalNotes || '',
    dateOfBirth: c.student?.dateOfBirth || '',
    parentName: c.student?.parentName || '',
    parentPhone: c.student?.parentPhone || '',
    createdAt: c.student?.createdAt || nowDate(),
    updatedAt: c.student?.updatedAt || nowIso(),
  }
  const survey: ParentSurvey = { ...DEFAULT_DIAGNOSIS.parent, ...(c.survey || {}) }
  const purposeSurvey: PurposeSurvey | undefined = (c as Partial<StudentCase>).purposeSurvey ?? undefined
  const generalStatus: GeneralStatus | undefined = (c as Partial<StudentCase>).generalStatus ?? undefined
  const observations: Observation[] = (c.observations || []).map((o) => normalizeObservation(o))
  const reports: Report[] = (c.reports || []).map((r) => ({
    id: r.id || newId('r'),
    observationIds: r.observationIds || [],
    recommendation: r.recommendation,
    nextProgram: r.nextProgram,
    nextSteps: r.nextSteps,
    roadmapShort: r.roadmapShort,
    roadmapMid: r.roadmapMid,
    roadmapLong: r.roadmapLong,
    closingMessage: r.closingMessage,
    generatedAt: r.generatedAt,
    version: typeof r.version === 'number' ? r.version : 1,
  }))
  const consultationLogs: ConsultationLog[] = (c.consultationLogs || []).map((l) => ({
    id: l.id || newId('cl'),
    date: l.date || nowDate(),
    content: l.content || '',
    specialNotes: l.specialNotes || '',
    cautions: l.cautions || '',
    createdAt: l.createdAt || nowIso(),
    updatedAt: l.updatedAt || nowIso(),
  }))
  return { student, survey, purposeSurvey, generalStatus, observations, reports, consultationLogs }
}

function normalizeObservation(o: Partial<Observation>): Observation {
  const safeObserver = OBSERVER_DOMAIN_KEYS.reduce((acc, k) => {
    const dom = o.observer?.[k]
    acc[k] = dom
      ? { mentorNote: dom.mentorNote || '', items: dom.items?.map((it) => ({ ...it })) || DEFAULT_DIAGNOSIS.observer[k].items.map((it) => ({ ...it })) }
      : { mentorNote: '', items: DEFAULT_DIAGNOSIS.observer[k].items.map((it) => ({ ...it })) }
    return acc
  }, {} as ObserverMap)
  return {
    id: o.id || newId('o'),
    sessionDate: o.sessionDate || nowDate(),
    sessionLabel: o.sessionLabel,
    observer: safeObserver,
    overallNote: o.overallNote,
    createdAt: o.createdAt || nowIso(),
  }
}

/* ─── Status ─── */

export function computeStatus(c: StudentCase): Status {
  const surveyOk = !!(c.survey.studentName && (c.survey.keyQuestion || c.survey.parentConcernType))
  const obsOk = c.observations.length > 0
  const lastReport = c.reports[c.reports.length - 1]
  const recOk = !!(lastReport && (lastReport.recommendation || lastReport.nextProgram))
  const exported = !!(lastReport && lastReport.generatedAt)
  if (!surveyOk) return 'not-started'
  if (!obsOk) return 'awaiting-observation'
  if (!recOk) return 'ready-for-review'
  if (!exported) return 'ready-for-pdf'
  return 'completed'
}

export function computeGeneralStatus(c: StudentCase): GeneralStatus {
  if (c.generalStatus) return c.generalStatus
  return c.purposeSurvey ? 'surveyed' : 'not-started'
}

export function canExportPdf(c: StudentCase): boolean {
  const s = computeStatus(c)
  return s === 'ready-for-pdf' || s === 'completed'
}

function indexEntry(c: StudentCase): StudentIndexEntry {
  return {
    id: c.student.id,
    name: c.student.name,
    grade: c.student.grade,
    program: c.student.program,
    updatedAt: c.student.updatedAt,
    status: computeStatus(c),
  }
}

/* ─── Supabase I/O ─── */

async function fetchAllFromSupabase(): Promise<StudentCase[]> {
  if (!isSupabaseConfigured || !supabase) return []
  const { data, error } = await supabase.from('student_cases').select('id, data')
  if (error) {
    console.error('[student-store] fetchAll failed:', error)
    return []
  }
  return (data || []).map((row: { id: string; data: unknown }) => normalizeCase(row.data, row.id))
}

async function uploadAllToSupabase(cases: StudentCase[]): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase || cases.length === 0) return false
  const payload = cases.map((c) => ({ id: c.student.id, data: c }))
  const { error } = await supabase.from('student_cases').upsert(payload, { onConflict: 'id' })
  if (error) {
    console.error('[student-store] upload failed:', error)
    return false
  }
  return true
}

function persistCase(c: StudentCase): void {
  if (isSupabaseConfigured && supabase) {
    void supabase
      .from('student_cases')
      .upsert({ id: c.student.id, data: c }, { onConflict: 'id' })
      .then(({ error }) => { if (error) console.error('[student-store] persist failed:', error) })
  } else {
    writeCaseLocal(c)
    const idx = readIndex()
    const i = idx.findIndex((e) => e.id === c.student.id)
    const entry = indexEntry(c)
    if (i >= 0) idx[i] = entry
    else idx.push(entry)
    writeIndex(idx)
  }
}

function persistDelete(id: string): void {
  if (isSupabaseConfigured && supabase) {
    void supabase
      .from('student_cases')
      .delete()
      .eq('id', id)
      .then(({ error }) => { if (error) console.error('[student-store] delete failed:', error) })
  } else {
    removeCaseLocal(id)
    const idx = readIndex().filter((e) => e.id !== id)
    writeIndex(idx)
  }
}

/* ─── Init ─── */

/**
 * Run once at app startup. Hydrates the in-memory cache from whichever source
 * is available (Supabase if configured, otherwise legacy localStorage).
 *
 * On first run with Supabase configured AND a non-empty localStorage, this
 * uploads the local cases to Supabase and marks the migration complete.
 *
 * Public sync functions (`listStudents`, `getCase`, `saveCase`, …) return
 * stale/empty results until this resolves. The single consumer
 * (`StudentWorkspacePage`) awaits this in its mount effect.
 */
export async function initStudentStore(): Promise<void> {
  if (initialized) return
  if (initPromise) return initPromise
  initPromise = (async () => {
    try {
      // 1. Run legacy localStorage migrations (older single-slot / per-student
      //    flat formats → 169av-case-{id}). Pure local, no network.
      runLegacyLocalStorageMigrations()

      if (isSupabaseConfigured) {
        // 2. Try to hydrate from Supabase first (source of truth when present).
        const remote = await fetchAllFromSupabase()
        if (remote.length > 0) {
          for (const c of remote) cache.set(c.student.id, c)
          return
        }

        // 3. Supabase is empty. If we have local cases AND haven't migrated
        //    yet, push them up so the user keeps their existing data.
        const alreadyMigrated = (() => {
          try { return localStorage.getItem(SUPABASE_MIGRATION_FLAG) === '1' } catch { return false }
        })()
        if (!alreadyMigrated) {
          const localCases = collectAllLocalCases()
          if (localCases.length > 0) {
            const ok = await uploadAllToSupabase(localCases)
            if (ok) {
              try { localStorage.setItem(SUPABASE_MIGRATION_FLAG, '1') } catch { /* ignore */ }
              for (const c of localCases) cache.set(c.student.id, c)
              console.info(`[student-store] Migrated ${localCases.length} cases from localStorage to Supabase.`)
              return
            }
          }
        }
        // Otherwise: empty cache — first-time-clean state.
        return
      }

      // Supabase not configured → legacy mode: cache from localStorage.
      for (const c of collectAllLocalCases()) cache.set(c.student.id, c)
    } finally {
      initialized = true
    }
  })()
  return initPromise
}

/** Back-compat alias. Prefer `initStudentStore()` in new code. */
export function runMigrations(): { migrated: number } {
  // Eagerly kick off async init in the background. Existing callers don't
  // await but they always also call `listStudents()` after; the async result
  // is delivered via the `initStudentStore` promise the caller separately
  // awaits in modern code.
  void initStudentStore()
  return { migrated: 0 }
}

function collectAllLocalCases(): StudentCase[] {
  const out: StudentCase[] = []
  // Prefer entries in the index for ordering, then sweep raw keys for orphans.
  const seen = new Set<string>()
  for (const entry of readIndex()) {
    const c = readCaseLocal(entry.id)
    if (c) { out.push(c); seen.add(entry.id) }
  }
  try {
    const total = localStorage.length
    for (let i = 0; i < total; i++) {
      const k = localStorage.key(i)
      if (!k || !k.startsWith('169av-case-')) continue
      const id = k.replace('169av-case-', '')
      if (seen.has(id)) continue
      const c = readCaseLocal(id)
      if (c) { out.push(c); seen.add(id) }
    }
  } catch { /* ignore */ }
  return out
}

function runLegacyLocalStorageMigrations(): void {
  try {
    // Migrate per-student legacy records listed in the old index
    const idx = readIndex()
    for (const entry of idx) {
      // If a case already exists under CASE_KEY, skip
      if (localStorage.getItem(CASE_KEY(entry.id))) continue
      const legacyRaw = localStorage.getItem(LEGACY_STUDENT_KEY(entry.id))
      if (!legacyRaw) continue
      try {
        const legacy = JSON.parse(legacyRaw) as {
          id?: string; createdAt?: string; parent?: ParentSurvey
          observer?: ObserverMap
          summary?: { overallNote?: string; recommendedDirection?: string; nextSteps?: string }
          exports?: number; lastExportedAt?: string
        }
        const id = entry.id
        const c: StudentCase = {
          student: {
            id,
            name: legacy.parent?.studentName || entry.name || '',
            grade: legacy.parent?.grade || entry.grade || '',
            school: legacy.parent?.school || '',
            program: entry.program || '',
            createdAt: legacy.createdAt || nowDate(),
            updatedAt: nowIso(),
          },
          survey: { ...DEFAULT_DIAGNOSIS.parent, ...(legacy.parent || {}) },
          observations: legacy.observer
            ? [{
                id: newId('o'),
                sessionDate: legacy.createdAt || nowDate(),
                sessionLabel: 'Session 1',
                observer: legacy.observer,
                overallNote: legacy.summary?.overallNote,
                createdAt: legacy.createdAt || nowIso(),
              }]
            : [],
          reports: (legacy.exports || 0) > 0
            ? [{
                id: newId('r'),
                observationIds: [],
                recommendation: legacy.summary?.recommendedDirection,
                nextSteps: legacy.summary?.nextSteps,
                generatedAt: legacy.lastExportedAt,
                version: 1,
              }]
            : [],
        }
        writeCaseLocal(c)
        try { localStorage.removeItem(LEGACY_STUDENT_KEY(id)) } catch { /* ignore */ }
      } catch { /* skip one record */ }
    }

    // Migrate single-slot if no students exist yet
    const legacySlot = localStorage.getItem(LEGACY_SLOT_KEY)
    if (legacySlot && readIndex().length === 0) {
      try {
        const legacy = JSON.parse(legacySlot) as {
          id?: string; createdAt?: string; parent?: ParentSurvey
          observer?: ObserverMap
          summary?: { overallNote?: string; recommendedDirection?: string; nextSteps?: string }
        }
        const id = newId('s')
        const c: StudentCase = {
          student: {
            id,
            name: legacy.parent?.studentName || 'Migrated',
            grade: legacy.parent?.grade || '',
            school: '',
            program: '',
            createdAt: legacy.createdAt || nowDate(),
            updatedAt: nowIso(),
          },
          survey: { ...DEFAULT_DIAGNOSIS.parent, ...(legacy.parent || {}) },
          observations: legacy.observer
            ? [{
                id: newId('o'),
                sessionDate: legacy.createdAt || nowDate(),
                sessionLabel: 'Session 1',
                observer: legacy.observer,
                overallNote: legacy.summary?.overallNote,
                createdAt: nowIso(),
              }]
            : [],
          reports: [],
        }
        writeCaseLocal(c)
        const idx2 = readIndex()
        idx2.push(indexEntry(c))
        writeIndex(idx2)
        try { localStorage.removeItem(LEGACY_SLOT_KEY) } catch { /* ignore */ }
      } catch { /* skip */ }
    }
  } catch { /* ignore */ }
}

/* ─── Public API (sync, cache-backed) ─── */

export function listStudents(): StudentIndexEntry[] {
  return Array.from(cache.values())
    .map((c) => indexEntry(c))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function getCase(id: string): StudentCase | null {
  return cache.get(id) ?? null
}

export function createStudent(input: {
  name: string
  grade?: string
  studyAbroadPurpose?: StudyAbroadPurpose
  programs?: string[]
  regionsOfInterest?: string
  schoolsOfInterest?: string
  budget?: string
}): StudentCase {
  const id = newId('s')
  const now = nowIso()
  const c: StudentCase = {
    student: {
      id,
      name: input.name,
      grade: input.grade || '',
      school: '',
      program: '',
      studyAbroadPurpose: input.studyAbroadPurpose,
      programs: input.programs || [],
      regionsOfInterest: input.regionsOfInterest || '',
      schoolsOfInterest: input.schoolsOfInterest || '',
      budget: input.budget || '',
      generalNotes: '',
      createdAt: nowDate(),
      updatedAt: now,
    },
    survey: { ...DEFAULT_DIAGNOSIS.parent, studentName: input.name, grade: input.grade || '' },
    observations: [],
    reports: [],
  }
  cache.set(id, c)
  persistCase(c)
  return c
}

/** Returns true when the student is in a 169Avenue own program/track. */
export function hasOwnPrograms(c: StudentCase): boolean {
  return c.student.studyAbroadPurpose === 'own_program' || (c.student.programs?.length ?? 0) > 0
}

export function saveCase(c: StudentCase): StudentCase {
  const next: StudentCase = { ...c, student: { ...c.student, updatedAt: nowIso() } }
  cache.set(next.student.id, next)
  persistCase(next)
  return next
}

export function deleteStudent(id: string): void {
  cache.delete(id)
  persistDelete(id)
}

/* ─── Survey helpers ─── */

export function updateSurvey(c: StudentCase, patch: Partial<ParentSurvey>): StudentCase {
  return saveCase({ ...c, survey: { ...c.survey, ...patch } })
}

export function updatePurposeSurvey(c: StudentCase, purposeSurvey: PurposeSurvey): StudentCase {
  return saveCase({ ...c, purposeSurvey })
}

export function updateGeneralStatus(c: StudentCase, generalStatus: GeneralStatus): StudentCase {
  return saveCase({ ...c, generalStatus })
}

/* ─── Observation helpers ─── */

export function addObservation(c: StudentCase, init?: Partial<Observation>): StudentCase {
  const nextIndex = c.observations.length + 1
  const obs: Observation = {
    id: newId('o'),
    sessionDate: init?.sessionDate || nowDate(),
    sessionLabel: init?.sessionLabel || `Session ${nextIndex}`,
    observer: init?.observer || emptyObserver(),
    overallNote: init?.overallNote,
    createdAt: nowIso(),
  }
  return saveCase({ ...c, observations: [...c.observations, obs] })
}

export function updateObservation(c: StudentCase, obsId: string, patch: Partial<Observation>): StudentCase {
  return saveCase({
    ...c,
    observations: c.observations.map((o) => (o.id === obsId ? { ...o, ...patch } : o)),
  })
}

export function deleteObservation(c: StudentCase, obsId: string): StudentCase {
  return saveCase({ ...c, observations: c.observations.filter((o) => o.id !== obsId) })
}

/* ─── Report helpers ─── */

/**
 * Create a new Report version OR update the latest draft report if one exists.
 * "Generate Recommendation" action calls this with a recommendation body.
 */
export function upsertDraftReport(c: StudentCase, patch: Partial<Report>): StudentCase {
  const last = c.reports[c.reports.length - 1]
  const allObsIds = c.observations.map((o) => o.id)
  if (last && !last.generatedAt) {
    const updated: Report = {
      ...last,
      observationIds: allObsIds,
      ...patch,
    }
    return saveCase({ ...c, reports: [...c.reports.slice(0, -1), updated] })
  }
  const version = last ? last.version + 1 : 1
  const rep: Report = {
    id: newId('r'),
    observationIds: allObsIds,
    recommendation: patch.recommendation,
    nextProgram: patch.nextProgram,
    nextSteps: patch.nextSteps,
    roadmapShort: patch.roadmapShort,
    roadmapMid: patch.roadmapMid,
    roadmapLong: patch.roadmapLong,
    closingMessage: patch.closingMessage,
    version,
  }
  return saveCase({ ...c, reports: [...c.reports, rep] })
}

/** Mark the latest report as exported (set generatedAt). */
export function markExported(c: StudentCase): StudentCase {
  const last = c.reports[c.reports.length - 1]
  if (!last) {
    // Create a minimal report first
    const newC = upsertDraftReport(c, {})
    return markExported(newC)
  }
  const stamped: Report = { ...last, generatedAt: nowIso() }
  return saveCase({ ...c, reports: [...c.reports.slice(0, -1), stamped] })
}

/* ─── Aggregate helpers (for Recommendation tab) ─── */

/* ─── Consultation log helpers ─── */

export function addConsultationLog(c: StudentCase, init?: Partial<ConsultationLog>): StudentCase {
  const log: ConsultationLog = {
    id: newId('cl'),
    date: init?.date || nowDate(),
    content: init?.content || '',
    specialNotes: init?.specialNotes || '',
    cautions: init?.cautions || '',
    createdAt: nowIso(),
    updatedAt: nowIso(),
  }
  return saveCase({ ...c, consultationLogs: [...(c.consultationLogs || []), log] })
}

export function updateConsultationLog(c: StudentCase, logId: string, patch: Partial<ConsultationLog>): StudentCase {
  return saveCase({
    ...c,
    consultationLogs: (c.consultationLogs || []).map((l) =>
      l.id === logId ? { ...l, ...patch, updatedAt: nowIso() } : l
    ),
  })
}

export function deleteConsultationLog(c: StudentCase, logId: string): StudentCase {
  return saveCase({ ...c, consultationLogs: (c.consultationLogs || []).filter((l) => l.id !== logId) })
}

/**
 * Aggregate observer map across all observations by averaging item scores per key.
 * Returns a synthesized ObserverMap suitable for feeding existing analytics.
 */
export function aggregateObservations(observations: Observation[]): ObserverMap {
  if (observations.length === 0) return emptyObserver()
  if (observations.length === 1) return observations[0].observer
  const agg = emptyObserver()
  for (const dk of OBSERVER_DOMAIN_KEYS) {
    const baseItems = agg[dk].items
    baseItems.forEach((it) => {
      const scores = observations
        .map((o) => o.observer[dk].items.find((x) => x.key === it.key)?.score)
        .filter((s): s is number => typeof s === 'number')
      it.score = scores.length ? scores.reduce((s, v) => s + v, 0) / scores.length : 3
      it.note = ''
    })
    // Concatenate all mentor notes from sessions
    const notes = observations.map((o) => o.observer[dk].mentorNote).filter(Boolean)
    agg[dk].mentorNote = notes.join('\n')
  }
  return agg
}
