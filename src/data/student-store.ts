import {
  DEFAULT_DIAGNOSIS,
  OBSERVER_DOMAIN_KEYS,
  type ObserverMap,
  type ParentSurvey,
} from './diagnosis-template'

/* ─── Keys ─── */

const INDEX_KEY = '169av-students-index'
const CASE_KEY = (id: string) => `169av-case-${id}`
/** Legacy single-slot key (pre-workspace). */
const LEGACY_SLOT_KEY = '169av-diagnosis'
/** Legacy per-student key (pre-case refactor, flat DiagnosisData). */
const LEGACY_STUDENT_KEY = (id: string) => `169av-student-${id}`

/* ─── Types ─── */

export interface StudentMeta {
  id: string
  name: string
  grade: string
  school: string
  /** Free-text program/track label; set manually or derived from recommendation. */
  program: string
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
  /** Set when the PDF has been generated. */
  generatedAt?: string
  version: number
}

export interface StudentCase {
  student: StudentMeta
  survey: ParentSurvey
  observations: Observation[]
  reports: Report[]
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
  localStorage.setItem(INDEX_KEY, JSON.stringify(idx))
}

function readCase(id: string): StudentCase | null {
  try {
    const raw = localStorage.getItem(CASE_KEY(id))
    if (!raw) return null
    return normalizeCase(JSON.parse(raw), id)
  } catch {
    return null
  }
}
function writeCase(c: StudentCase): void {
  localStorage.setItem(CASE_KEY(c.student.id), JSON.stringify(c))
}
function removeCase(id: string): void {
  localStorage.removeItem(CASE_KEY(id))
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
    createdAt: c.student?.createdAt || nowDate(),
    updatedAt: c.student?.updatedAt || nowIso(),
  }
  const survey: ParentSurvey = { ...DEFAULT_DIAGNOSIS.parent, ...(c.survey || {}) }
  const observations: Observation[] = (c.observations || []).map((o) => normalizeObservation(o))
  const reports: Report[] = (c.reports || []).map((r) => ({
    id: r.id || newId('r'),
    observationIds: r.observationIds || [],
    recommendation: r.recommendation,
    nextProgram: r.nextProgram,
    nextSteps: r.nextSteps,
    generatedAt: r.generatedAt,
    version: typeof r.version === 'number' ? r.version : 1,
  }))
  return { student, survey, observations, reports }
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

/* ─── Public API ─── */

export function listStudents(): StudentIndexEntry[] {
  return [...readIndex()].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
}

export function getCase(id: string): StudentCase | null {
  return readCase(id)
}

export function createStudent(input: { name: string; grade?: string }): StudentCase {
  const id = newId('s')
  const now = nowIso()
  const c: StudentCase = {
    student: {
      id,
      name: input.name,
      grade: input.grade || '',
      school: '',
      program: '',
      createdAt: nowDate(),
      updatedAt: now,
    },
    survey: { ...DEFAULT_DIAGNOSIS.parent, studentName: input.name, grade: input.grade || '' },
    observations: [],
    reports: [],
  }
  writeCase(c)
  const idx = readIndex()
  idx.push(indexEntry(c))
  writeIndex(idx)
  return c
}

export function saveCase(c: StudentCase): StudentCase {
  const next: StudentCase = { ...c, student: { ...c.student, updatedAt: nowIso() } }
  writeCase(next)
  const idx = readIndex()
  const i = idx.findIndex((e) => e.id === c.student.id)
  const entry = indexEntry(next)
  if (i >= 0) idx[i] = entry
  else idx.push(entry)
  writeIndex(idx)
  return next
}

export function deleteStudent(id: string): void {
  removeCase(id)
  const idx = readIndex().filter((e) => e.id !== id)
  writeIndex(idx)
}

/* ─── Survey helpers ─── */

export function updateSurvey(c: StudentCase, patch: Partial<ParentSurvey>): StudentCase {
  return saveCase({ ...c, survey: { ...c.survey, ...patch } })
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

/* ─── Migrations ─── */

/**
 * One-time migration from legacy formats:
 *  - single slot (169av-diagnosis)
 *  - per-student flat DiagnosisData (169av-student-{id})
 * Pulls into the new case-based storage. Idempotent.
 */
export function runMigrations(): { migrated: number } {
  let migrated = 0
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
        writeCase(c)
        localStorage.removeItem(LEGACY_STUDENT_KEY(id))
        migrated += 1
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
        const c = createStudent({ name: legacy.parent?.studentName || 'Migrated', grade: legacy.parent?.grade || '' })
        const next: StudentCase = {
          ...c,
          survey: { ...c.survey, ...(legacy.parent || {}) },
          observations: legacy.observer
            ? [{
                id: newId('o'), sessionDate: legacy.createdAt || nowDate(), sessionLabel: 'Session 1',
                observer: legacy.observer, overallNote: legacy.summary?.overallNote, createdAt: nowIso(),
              }]
            : [],
        }
        saveCase(next)
        localStorage.removeItem(LEGACY_SLOT_KEY)
        migrated += 1
      } catch { /* skip */ }
    }

    // Refresh index entries for any cases whose status needs re-derivation
    const freshIdx: StudentIndexEntry[] = []
    const allIds = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i))
      .filter((k): k is string => !!k && k.startsWith('169av-case-'))
      .map((k) => k.replace('169av-case-', ''))
    for (const id of allIds) {
      const c = readCase(id)
      if (c) freshIdx.push(indexEntry(c))
    }
    if (freshIdx.length > 0) writeIndex(freshIdx)
  } catch { /* ignore */ }
  return { migrated }
}
