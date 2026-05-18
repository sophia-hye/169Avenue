import { useEffect, useMemo, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Navbar } from '../../Navbar'
import { MobileTopBar } from '../../MobileTopBar'
import { MobileBottomNav } from '../../MobileBottomNav'
import { useLanguage } from '../../../context/LanguageContext'
import {
  addConsultationLog,
  addObservation,
  canExportPdf,
  computeGeneralStatus,
  computeStatus,
  createStudent,
  deleteConsultationLog,
  deleteObservation,
  deleteStudent,
  getCase,
  hasOwnPrograms,
  initStudentStore,
  listStudents,
  markExported,
  saveCase,
  updateConsultationLog,
  updateGeneralStatus,
  updateObservation,
  updateSurvey,
  upsertDraftReport,
  aggregateObservations,
  type ConsultationLog,
  type GeneralStatus,
  type Observation,
  type StudentCase,
  type StudentIndexEntry,
  type Status,
  type StudyAbroadPurpose,
} from '../../../data/student-store'
import { isSupabaseConfigured, SUPABASE_SETUP_MESSAGE } from '../../../lib/supabase'
import { DEFAULT_DIAGNOSIS, OBSERVER_DOMAIN_KEYS, type DiagnosisData, type ObserverMap } from '../../../data/diagnosis-template'
import {
  computeDomainAverages,
  computeTrackFits,
  pickRecommendedTrack,
  scoreLevel,
  type TrackKey,
} from '../../../data/observer-interpretation'
import { ParentStepForm } from '../diagnosis/ParentStepForm'
import { ObserverChecklist } from '../diagnosis/ObserverChecklist'
import { PresentationMode } from '../diagnosis/PresentationMode'
import { PurposeSurveyForm } from './PurposeSurveyForm'

type TabId = 'overview' | 'survey' | 'assessment' | 'observations' | 'consultation' | 'recommendation' | 'preview' | 'export' | 'profile'

interface CreateStudentOpts {
  studyAbroadPurpose?: StudyAbroadPurpose
  programs?: string[]
  regionsOfInterest?: string
  schoolsOfInterest?: string
  budget?: string
}

export function StudentWorkspacePage() {
  const { studentId } = useParams<{ studentId: string }>()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [list, setList] = useState<StudentIndexEntry[]>([])
  const [current, setCurrent] = useState<StudentCase | null>(null)
  const [tab, setTab] = useState<TabId>('overview')
  const [presenting, setPresenting] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [storeReady, setStoreReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      await initStudentStore()
      if (cancelled) return
      setList(listStudents())
      setStoreReady(true)
    })()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!storeReady) return
    if (!studentId) { setCurrent(null); return }
    const c = getCase(studentId)
    setCurrent(c)
  }, [studentId, storeReady])

  const refreshList = () => setList(listStudents())

  const save = useCallback((next: StudentCase) => {
    const saved = saveCase(next)
    setCurrent(saved)
    refreshList()
  }, [])

  const flashToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  const handleCreate = (name: string, opts: CreateStudentOpts) => {
    if (!name.trim()) return
    const c = createStudent({ name: name.trim(), ...opts })
    refreshList()
    navigate(`/admin/students/${c.student.id}`)
  }

  const handleDelete = (id: string) => {
    if (!confirm(t.students_delete_confirm as string)) return
    deleteStudent(id)
    refreshList()
    if (studentId === id) navigate('/admin/students', { replace: true })
  }

  const handleSelect = (id: string) => {
    navigate(`/admin/students/${id}`)
  }

  /* ── Top action handlers ── */
  const handleSaveDraft = () => flashToast(t.ws_action_saved as string)

  const handleGenerateRec = () => {
    if (!current) return
    const avgs = computeDomainAverages(aggregateObservations(current.observations))
    const fits = computeTrackFits(avgs)
    const overall = OBSERVER_DOMAIN_KEYS.reduce((s, k) => s + avgs[k], 0) / OBSERVER_DOMAIN_KEYS.length
    const { track } = pickRecommendedTrack(fits, overall)
    const lastReport = current.reports[current.reports.length - 1]
    const next = upsertDraftReport(current, {
      recommendation: lastReport?.recommendation || '',
      nextProgram: track.key,
      nextSteps: lastReport?.nextSteps || '',
    })
    setCurrent(next)
    refreshList()
    flashToast(t.ws_action_generated as string)
  }

  const handleExport = () => {
    if (!current || !canExportPdf(current)) return
    setPresenting(true)
    const next = markExported(current)
    setCurrent(next)
    refreshList()
  }

  const status = current ? computeStatus(current) : null
  const exportable = current ? canExportPdf(current) : false

  return (
    <>
      <Navbar />
      <MobileTopBar />
      {!isSupabaseConfigured && (
        <div
          className="fixed top-3 left-1/2 -translate-x-1/2 z-50 max-w-[720px] w-[calc(100vw-24px)] px-3 py-2 rounded-lg border bg-amber-50 border-amber-300 text-amber-900 text-xs shadow"
          role="status"
        >
          ⚠️ {SUPABASE_SETUP_MESSAGE}
        </div>
      )}
      {!storeReady && (
        <div className="fixed top-20 right-4 z-40 px-3 py-1.5 rounded-md bg-black/70 text-white text-xs shadow">
          데이터 불러오는 중…
        </div>
      )}
      <main className="pt-20 md:pt-24 pb-24 md:pb-16" style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div className="flex flex-col md:flex-row md:gap-6 px-4 md:px-6">
          {/* Sidebar */}
          <Sidebar
            list={list}
            selectedId={studentId}
            onSelect={handleSelect}
            onCreate={handleCreate}
            onDelete={handleDelete}
            hideOnMobile={!!studentId}
          />

          {/* Workspace */}
          <section className={`flex-1 min-w-0 ${!studentId ? 'hidden md:block' : ''}`}>
            {!current ? (
              <EmptyWorkspace />
            ) : (
              <>
                {/* Header */}
                <div className="mb-6 pb-6 border-b border-outline-variant/15 flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="min-w-0">
                      <h1 className="font-headline text-2xl md:text-3xl text-primary tracking-tight truncate">
                        {current.student.name || '—'}
                      </h1>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-body text-xs text-on-surface-variant/50">
                          {current.student.grade || '—'}
                          {current.student.school ? ` | ${current.student.school}` : ''}
                        </span>
                        {status && <StatusChip status={status} />}
                      </div>
                    </div>
                  </div>

                  {hasOwnPrograms(current) && (
                    <ActionBar
                      exportable={exportable}
                      onSaveDraft={handleSaveDraft}
                      onGenerateRec={handleGenerateRec}
                      onExport={handleExport}
                    />
                  )}
                </div>

                {/* Tabs */}
                {(() => {
                  const inProgram = hasOwnPrograms(current)
                  const tt = t as unknown as Record<string, string>
                  const tabs: [TabId, string, string][] = inProgram
                    ? [
                        ['overview',       tt.detail_tab_overview,       'dashboard'],
                        ['survey',         tt.detail_tab_survey,         'edit_note'],
                        ['assessment',     tt.detail_tab_assessment,     'fact_check'],
                        ['observations',   tt.detail_tab_observation,    'checklist'],
                        ['consultation',   tt.detail_tab_consultation,   'notes'],
                        ['recommendation', tt.detail_tab_recommendation, 'auto_awesome'],
                        ['preview',        tt.detail_tab_preview,        'visibility'],
                        ['export',         tt.detail_tab_export,         'picture_as_pdf'],
                      ]
                    : [
                        ['overview',      tt.detail_tab_overview,      'dashboard'],
                        ['survey',        tt.detail_tab_survey,        'edit_note'],
                        ['consultation',  tt.detail_tab_consultation,  'notes'],
                        ['profile',       tt.detail_tab_profile,       'person'],
                      ]
                  return (
                    <>
                      <div className="flex border-b border-outline-variant/15 mb-8 overflow-x-auto">
                        {tabs.map(([id, label, icon]) => (
                          <button key={id} onClick={() => setTab(id)}
                            className={`flex items-center gap-2 px-5 py-3 font-body text-sm transition-colors border-b-2 -mb-px whitespace-nowrap ${
                              tab === id ? 'border-secondary text-secondary' : 'border-transparent text-on-surface-variant/50 hover:text-primary'
                            }`}>
                            <span className="material-symbols-outlined text-base">{icon}</span>
                            {label}
                          </button>
                        ))}
                      </div>

                      <div>
                        {tab === 'overview' && <OverviewTab c={current} onNav={setTab} inProgram={inProgram} save={save} />}
                        {inProgram && tab === 'survey' && <PurposeSurveyForm key={current.student.id} c={current} save={save} />}
                        {inProgram && tab === 'assessment' && <SurveyTab key={current.student.id} c={current} save={save} />}
                        {inProgram && tab === 'observations' && <ObservationsTab key={current.student.id} c={current} save={save} />}
                        {tab === 'consultation' && <ConsultationLogTab key={current.student.id} c={current} save={save} />}
                        {inProgram && tab === 'recommendation' && <RecommendationTab key={current.student.id} c={current} save={save} />}
                        {inProgram && tab === 'preview' && <PreviewTab c={current} onOpen={() => setPresenting(true)} />}
                        {inProgram && tab === 'export' && <ExportTab c={current} exportable={exportable} onExport={handleExport} />}
                        {!inProgram && tab === 'survey' && <PurposeSurveyForm key={current.student.id} c={current} save={save} />}
                        {!inProgram && tab === 'profile' && <ProfileTab key={current.student.id} c={current} save={save} />}
                      </div>
                    </>
                  )
                })()}
              </>
            )}
          </section>
        </div>
      </main>

      {presenting && current && (
        <PresentationMode
          data={caseToDiagnosisData(current)}
          onClose={() => {
            setPresenting(false)
            const refreshed = getCase(current.student.id)
            if (refreshed) setCurrent(refreshed)
          }}
        />
      )}

      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-[150] bg-primary text-on-primary px-4 py-2.5 font-body text-xs shadow-lg">
          <span className="material-symbols-outlined text-sm align-middle mr-1.5">check_circle</span>
          {toast}
        </div>
      )}

      <MobileBottomNav activeTab="diagnosis" />
    </>
  )
}

/* ─────────────────────── Sidebar ─────────────────────── */


const PRODUCT_OPTIONS = [
  { key: 'language_study',       i18nKey: 'students_modal_purpose_language' },
  { key: 'university_admission', i18nKey: 'students_modal_purpose_university' },
  { key: 'summer_winter_camp',   i18nKey: 'students_modal_purpose_camp' },
  { key: 'own_program',          i18nKey: 'students_modal_purpose_own_program' },
] as const

function Sidebar({ list, selectedId, onSelect, onCreate, onDelete, hideOnMobile }: {
  list: StudentIndexEntry[]
  selectedId: string | undefined
  onSelect: (id: string) => void
  onCreate: (name: string, opts: CreateStudentOpts) => void
  onDelete: (id: string) => void
  hideOnMobile: boolean
}) {
  const { t } = useLanguage()
  const [search, setSearch] = useState('')
  const [adding, setAdding] = useState(false)
  const [newName, setNewName] = useState('')
  const [newProduct, setNewProduct] = useState<StudyAbroadPurpose | ''>('')

  const handleClose = () => {
    setAdding(false)
    setNewName('')
    setNewProduct('')
  }

  const handleSubmit = () => {
    if (!newName.trim() || !newProduct) return
    onCreate(newName, { studyAbroadPurpose: newProduct })
    handleClose()
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return list
    return list.filter((s) =>
      s.name.toLowerCase().includes(q) || s.grade.toLowerCase().includes(q))
  }, [list, search])

  return (
    <aside className={`w-full md:w-[320px] md:shrink-0 md:border-r md:border-outline-variant/10 md:pr-6 mb-6 md:mb-0 ${hideOnMobile ? 'hidden md:block' : ''}`}>
      <div className="mb-4">
        <h2 className="font-headline text-lg text-primary tracking-tight mb-1">{t.students_page_title as string}</h2>
        <p className="font-body text-xs text-on-surface-variant/50">{t.students_page_sub as string}</p>
      </div>

      <div className="mb-3 flex gap-2">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-base">search</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder={t.students_search_ph as string}
            className="w-full pl-9 pr-3 py-2 font-body text-sm border border-outline-variant/25 bg-surface-container-low outline-none focus:border-secondary transition-colors" />
        </div>
        <button onClick={() => setAdding(true)} title={t.students_add as string}
          className="px-3 py-2 bg-primary text-on-primary hover:bg-secondary transition-colors">
          <span className="material-symbols-outlined text-base">add</span>
        </button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-outline-variant/20">
          <p className="font-body text-xs text-on-surface-variant/40">
            {list.length === 0 ? (t.students_empty_body as string) : '—'}
          </p>
        </div>
      ) : (
        <div className="border border-outline-variant/10 max-h-[calc(100vh-280px)] overflow-y-auto">
          {filtered.map((s) => {
            const active = s.id === selectedId
            return (
              <button key={s.id} onClick={() => onSelect(s.id)}
                className={`w-full text-left px-4 py-3 border-b border-outline-variant/10 last:border-b-0 transition-colors group ${
                  active ? 'bg-secondary/10' : 'hover:bg-surface-container-lowest'
                }`}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className={`font-body text-sm font-medium truncate ${active ? 'text-secondary' : 'text-primary'}`}>
                    {s.name || '—'}
                  </span>
                  <span className="font-body text-[10px] text-on-surface-variant/40 shrink-0">
                    {s.grade || '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <StatusChip status={s.status} small />
                  <button type="button" onClick={(e) => { e.stopPropagation(); onDelete(s.id) }}
                    className="text-on-surface-variant/20 hover:text-rose-700 transition-colors opacity-0 group-hover:opacity-100">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Add modal */}
      {adding && (
        <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4" onClick={handleClose}>
          <div className="bg-surface w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <h3 className="font-headline text-xl text-primary tracking-tight mb-6">{t.students_modal_title as string}</h3>

              {/* Name */}
              <label className="block mb-6">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-1 block">{t.students_modal_name as string}</span>
                <input autoFocus value={newName} onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && newProduct && handleSubmit()}
                  className="w-full border border-outline-variant/30 px-3 py-2 font-body text-sm outline-none focus:border-secondary" />
              </label>

              {/* Study abroad product */}
              <div className="mb-6">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-3 block">{t.students_modal_product as string}</span>
                <div className="flex flex-col gap-2">
                  {PRODUCT_OPTIONS.map(({ key, i18nKey }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setNewProduct(key as StudyAbroadPurpose)}
                      className={`flex items-center gap-3 w-full px-4 py-3 border text-left transition-colors ${
                        newProduct === key
                          ? 'border-secondary bg-secondary/8 text-secondary'
                          : 'border-outline-variant/25 text-primary hover:border-secondary/50'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                        newProduct === key ? 'border-secondary bg-secondary' : 'border-outline-variant/40'
                      }`}>
                        {newProduct === key && <div className="w-1.5 h-1.5 rounded-full bg-on-primary" />}
                      </div>
                      <span className="font-body text-sm">{(t as unknown as Record<string, string>)[i18nKey]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button onClick={handleClose} className="px-5 py-2 font-body text-sm text-on-surface-variant/70 hover:text-primary transition-colors">
                  {t.students_modal_cancel as string}
                </button>
                <button onClick={handleSubmit}
                  disabled={!newName.trim() || !newProduct}
                  className="px-6 py-2 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors disabled:opacity-40">
                  {t.students_modal_create as string}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

/* ─────────────────────── Empty state ─────────────────────── */

function EmptyWorkspace() {
  const { t } = useLanguage()
  return (
    <div className="hidden md:flex flex-col items-center justify-center py-32 text-center">
      <span className="material-symbols-outlined text-on-surface-variant/30 text-5xl mb-4">folder_open</span>
      <h2 className="font-headline text-xl text-primary mb-2">{t.ws_empty_title as string}</h2>
      <p className="font-body text-sm text-on-surface-variant/50">{t.ws_empty_body as string}</p>
    </div>
  )
}

/* ─────────────────────── Action Bar ─────────────────────── */

function ActionBar({ exportable, onSaveDraft, onGenerateRec, onExport }: {
  exportable: boolean
  onSaveDraft: () => void
  onGenerateRec: () => void
  onExport: () => void
}) {
  const { t } = useLanguage()
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <button onClick={onSaveDraft}
        className="px-4 py-2 font-body text-xs border border-outline-variant/25 text-on-surface-variant/70 hover:border-secondary hover:text-secondary transition-colors flex items-center gap-1.5">
        <span className="material-symbols-outlined text-sm">save</span>
        {t.ws_action_save as string}
      </button>
      <button onClick={onGenerateRec}
        className="px-4 py-2 font-body text-xs border border-outline-variant/25 text-on-surface-variant/70 hover:border-secondary hover:text-secondary transition-colors flex items-center gap-1.5">
        <span className="material-symbols-outlined text-sm">auto_awesome</span>
        {t.ws_action_generate_rec as string}
      </button>
      <button onClick={onExport} disabled={!exportable}
        title={!exportable ? (t.ws_pdf_disabled_tip as string) : undefined}
        className="px-5 py-2 font-body text-xs bg-primary text-on-primary hover:bg-secondary transition-colors flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed">
        <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
        {t.ws_action_export as string}
      </button>
    </div>
  )
}

/* ─────────────────────── Status Chip ─────────────────────── */

function StatusChip({ status, small }: { status: Status; small?: boolean }) {
  const { t } = useLanguage()
  const map: Record<Status, { label: string; color: string; bg: string }> = {
    'not-started':          { label: t.status_not_started as string,          color: '#9B958D', bg: '#F5F1EB' },
    'awaiting-observation': { label: t.status_awaiting_observation as string, color: '#7A5A20', bg: '#F5EBD7' },
    'ready-for-review':     { label: t.status_ready_for_review as string,     color: '#6B4F4F', bg: '#F5EBE5' },
    'ready-for-pdf':        { label: t.status_ready_for_pdf as string,        color: '#2D6A4F', bg: '#E8F1EC' },
    'completed':            { label: t.status_completed as string,            color: '#2C2C2C', bg: '#E5E0D8' },
  }
  const m = map[status]
  return (
    <span className={`inline-block px-2 py-0.5 font-body font-medium ${small ? 'text-[10px]' : 'text-[11px]'}`}
      style={{ color: m.color, background: m.bg }}>
      {m.label}
    </span>
  )
}

/* ─────────────────────── General Status Chip ─────────────────────── */

function GeneralStatusChip({ status }: { status: GeneralStatus }) {
  const { t } = useLanguage()
  const map: Record<GeneralStatus, { label: string; color: string; bg: string }> = {
    'not-started': { label: t.general_status_not_started as string, color: '#9B958D', bg: '#F5F1EB' },
    'surveyed':    { label: t.general_status_surveyed as string,    color: '#3B6EA5', bg: '#E8EFF7' },
    'consulting':  { label: t.general_status_consulting as string,  color: '#7A5A20', bg: '#F5EBD7' },
    'proposed':    { label: t.general_status_proposed as string,    color: '#5A4A9B', bg: '#EEE8F7' },
    'confirmed':   { label: t.general_status_confirmed as string,   color: '#2D6A4F', bg: '#E8F1EC' },
    'completed':   { label: t.general_status_completed as string,   color: '#2C2C2C', bg: '#E5E0D8' },
  }
  const m = map[status]
  return (
    <span className="inline-block px-2 py-0.5 font-body font-medium text-[11px]"
      style={{ color: m.color, background: m.bg }}>
      {m.label}
    </span>
  )
}

/* ─────────────────────── Shim helpers ─────────────────────── */

/**
 * Construct a DiagnosisData shim from a case for components that still expect the old shape
 * (ParentStepForm / ObserverChecklist / PresentationMode).
 */
function caseToDiagnosisData(c: StudentCase, observer?: ObserverMap): DiagnosisData {
  const obs = observer || aggregateObservations(c.observations)
  const lastReport = c.reports[c.reports.length - 1]
  return {
    id: c.student.id,
    createdAt: c.student.createdAt,
    parent: c.survey,
    student: DEFAULT_DIAGNOSIS.student,
    observer: obs,
    summary: {
      type: [],
      overallNote: c.observations.map((o) => o.overallNote).filter(Boolean).join('\n'),
      recommendedDirection: lastReport?.recommendation || '',
      nextSteps: lastReport?.nextSteps || '',
      roadmapShort: lastReport?.roadmapShort,
      roadmapMid: lastReport?.roadmapMid,
      roadmapLong: lastReport?.roadmapLong,
      closingMessage: lastReport?.closingMessage,
    },
  }
}

/* ─────────────────────── Tabs ─────────────────────── */

const STUDY_PURPOSE_LABELS: Record<string, string> = {
  language_study:       'students_modal_purpose_language',
  university_admission: 'students_modal_purpose_university',
  summer_winter_camp:   'students_modal_purpose_camp',
  immigration:          'students_modal_purpose_immigration',
  own_program:          'students_modal_purpose_own_program',
}

const PROGRAM_KEY_LABELS: Record<string, string> = {
  discovery: 'students_modal_program_discovery',
  decision:  'students_modal_program_decision',
  direction: 'students_modal_program_direction',
  academic:  'students_modal_program_academic',
  elite:     'students_modal_program_elite',
}

function OverviewTab({ c, onNav, inProgram, save }: { c: StudentCase; onNav: (t: TabId) => void; inProgram: boolean; save?: (c: StudentCase) => void }) {
  const { t } = useLanguage()
  const status = computeStatus(c)
  const generalStatus = computeGeneralStatus(c)
  const [showStatusPicker, setShowStatusPicker] = useState(false)
  const agg = aggregateObservations(c.observations)
  const avgs = computeDomainAverages(agg)
  const overall = OBSERVER_DOMAIN_KEYS.reduce((s, k) => s + avgs[k], 0) / OBSERVER_DOMAIN_KEYS.length
  const hasObs = c.observations.length > 0
  const fits = hasObs ? computeTrackFits(avgs) : []
  const rec = hasObs ? pickRecommendedTrack(fits, overall).track : null
  const trackNames = t.diag_obs_track_names as Record<string, string>

  return (
    <div>
      {inProgram ? (
        <>
          {/* Status */}
          <div className="mb-8 bg-surface-container-low p-5 border-l-2 border-secondary">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50">
                {t.overview_status as string}
              </span>
              <StatusChip status={status} />
            </div>
            <p className="font-body text-sm text-on-surface-variant/70">
              {statusCopy(status, t)}
            </p>
          </div>

          {/* Recommended track */}
          <div className="mb-8 bg-primary text-on-primary p-5 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="font-label text-[10px] uppercase tracking-[0.22em] text-secondary/80 mb-1">
                {t.overview_recommended_track as string}
              </div>
              {rec ? (
                <div className="font-headline text-xl tracking-tight">{trackNames[rec.key as TrackKey]}</div>
              ) : (
                <div className="font-body text-sm text-on-primary/60">{t.overview_no_recommendation as string}</div>
              )}
            </div>
            {rec && <div className="font-headline text-2xl">{rec.pct}%</div>}
          </div>

          {/* Basic info */}
          <div className="mb-8">
            <h3 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.overview_basic as string}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              <Field label={t.overview_field_name as string} value={c.survey.studentName} />
              <Field label={t.overview_field_grade as string} value={c.survey.grade} />
              <Field label={t.overview_field_phone as string} value={c.survey.parentPhone || ''} />
              <Field label={t.overview_field_target as string} value={c.survey.educationGoal} />
              <Field label={t.obs_sessions_title as string} value={String(c.observations.length)} />
              <Field label={t.reports_title as string} value={String(c.reports.length)} />
            </div>
          </div>

          {c.survey.keyQuestion && (
            <div className="mb-8 bg-surface-container-low p-5 border-l-2 border-secondary">
              <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">{t.overview_field_key as string}</div>
              <p className="font-body text-sm text-primary leading-relaxed">{c.survey.keyQuestion}</p>
            </div>
          )}

          {/* Quick actions */}
          <div>
            <h3 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.overview_quick_actions as string}</h3>
            <div className="flex gap-2 flex-wrap">
              <QuickAction icon="edit_note" label={t.overview_open_survey as string} onClick={() => onNav('survey')} />
              <QuickAction icon="checklist" label={t.overview_open_observation as string} onClick={() => onNav('observations')} />
              <QuickAction icon="auto_awesome" label={t.detail_tab_recommendation as string} onClick={() => onNav('recommendation')} />
              <QuickAction icon="picture_as_pdf" label={t.overview_open_export as string} onClick={() => onNav('export')} />
            </div>
          </div>
        </>
      ) : (
        <>
          {/* General status */}
          <div className="mb-8 bg-surface-container-low p-5 border-l-2 border-secondary">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50">
                  {t.general_status_label as string}
                </span>
                <GeneralStatusChip status={generalStatus} />
              </div>
              {save && (
                <button
                  type="button"
                  onClick={() => setShowStatusPicker((v) => !v)}
                  className="font-label text-[10px] uppercase tracking-widest text-secondary hover:text-secondary/70 transition-colors"
                >
                  {t.general_status_update as string}
                </button>
              )}
            </div>
            {showStatusPicker && save && (
              <div className="flex flex-wrap gap-2 pt-2 border-t border-outline-variant/15">
                {(['not-started', 'surveyed', 'consulting', 'proposed', 'confirmed', 'completed'] as GeneralStatus[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      const updated = updateGeneralStatus(c, s)
                      save(updated)
                      setShowStatusPicker(false)
                    }}
                    className={`px-3 py-1.5 font-body text-xs border transition-colors ${
                      generalStatus === s
                        ? 'bg-secondary text-on-secondary border-secondary'
                        : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:border-secondary/50'
                    }`}
                  >
                    {(t as unknown as Record<string, string>)[`general_status_${s.replace(/-/g, '_')}`] ?? s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Basic info */}
          <div className="mb-8">
            <h3 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.overview_basic as string}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              <Field label={t.overview_field_name as string} value={c.student.name} />
              {c.student.studyAbroadPurpose && (
                <Field label={t.students_modal_purpose as string}
                  value={(t as unknown as Record<string, string>)[STUDY_PURPOSE_LABELS[c.student.studyAbroadPurpose]] ?? ''} />
              )}
              {c.student.regionsOfInterest && (
                <Field label={t.profile_regions as string} value={c.student.regionsOfInterest} />
              )}
              {c.student.schoolsOfInterest && (
                <Field label={t.profile_schools as string} value={c.student.schoolsOfInterest} />
              )}
              {c.student.budget && (
                <Field label={t.profile_budget as string} value={c.student.budget} />
              )}
            </div>
          </div>

          {(c.student.programs ?? []).length > 0 && (
            <div className="mb-8">
              <h3 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-3">{t.profile_programs as string}</h3>
              <div className="flex flex-wrap gap-2">
                {(c.student.programs ?? []).map((pk) => (
                  <span key={pk} className="px-3 py-1 font-body text-xs bg-secondary/10 text-secondary border border-secondary/20">
                    {(t as unknown as Record<string, string>)[PROGRAM_KEY_LABELS[pk]] || pk}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div>
            <h3 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.overview_quick_actions as string}</h3>
            <div className="flex gap-2 flex-wrap">
              <QuickAction icon="edit_note" label={t.detail_tab_purpose_survey as string} onClick={() => onNav('survey')} />
              <QuickAction icon="person" label={t.detail_tab_profile as string} onClick={() => onNav('profile')} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function statusCopy(s: Status, t: ReturnType<typeof useLanguage>['t']): string {
  if (s === 'not-started') return t.ws_empty_body as string
  if (s === 'awaiting-observation') return t.overview_no_recommendation as string
  if (s === 'ready-for-review') return t.detail_tab_recommendation as string
  if (s === 'ready-for-pdf') return t.export_sub as string
  return t.status_completed as string
}

function SurveyTab({ c, save }: { c: StudentCase; save: (c: StudentCase) => void }) {
  const shim = caseToDiagnosisData(c)
  return (
    <ParentStepForm
      data={shim}
      onChange={(next) => save(updateSurvey(c, next.parent))}
    />
  )
}

function ObservationsTab({ c, save }: { c: StudentCase; save: (c: StudentCase) => void }) {
  const { t } = useLanguage()
  const [editingId, setEditingId] = useState<string | null>(null)
  const editing = editingId ? c.observations.find((o) => o.id === editingId) || null : null

  const handleAdd = () => {
    const next = addObservation(c)
    save(next)
    // Open the newly added one
    const newest = next.observations[next.observations.length - 1]
    setEditingId(newest.id)
  }

  const handleDelete = (id: string) => {
    if (!confirm(t.obs_session_delete_confirm as string)) return
    save(deleteObservation(c, id))
  }

  if (editing) {
    const shim: DiagnosisData = {
      ...caseToDiagnosisData(c, editing.observer),
      summary: {
        type: [],
        overallNote: editing.overallNote || '',
        recommendedDirection: '',
        nextSteps: '',
      },
    }
    return (
      <div>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant/10">
          <button onClick={() => setEditingId(null)}
            className="font-body text-sm text-on-surface-variant/60 hover:text-primary transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">arrow_back</span>
            {t.obs_session_back as string}
          </button>
          <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
            {(t.obs_session_editing as string).replace('{label}', editing.sessionLabel || editing.sessionDate)}
          </span>
        </div>
        <ObserverChecklist
          data={shim}
          onChange={(nextData) => {
            save(updateObservation(c, editing.id, {
              observer: nextData.observer,
              overallNote: nextData.summary.overallNote,
            }))
          }}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-headline text-2xl text-primary tracking-tight mb-1">{t.obs_sessions_title as string}</h2>
          <p className="font-body text-sm text-on-surface-variant/60">{t.obs_sessions_sub as string}</p>
        </div>
        <button onClick={handleAdd}
          className="px-5 py-2 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-base">add</span>
          {t.obs_add_session as string}
        </button>
      </div>

      {c.observations.length === 0 ? (
        <div className="border border-dashed border-outline-variant/25 py-16 text-center">
          <p className="font-body text-sm text-on-surface-variant/40">{t.obs_session_no_sessions as string}</p>
        </div>
      ) : (
        <div className="border border-outline-variant/15">
          <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-surface-container-low font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50">
            <div className="col-span-3">{t.obs_session_default_label as string}</div>
            <div className="col-span-3">{t.obs_session_date as string}</div>
            <div className="col-span-3">{t.obs_session_avg as string}</div>
            <div className="col-span-3 text-right"> </div>
          </div>
          {c.observations.map((o) => <ObservationRow key={o.id} obs={o} onOpen={() => setEditingId(o.id)} onDelete={() => handleDelete(o.id)} />)}
        </div>
      )}
    </div>
  )
}

function ObservationRow({ obs, onOpen, onDelete }: { obs: Observation; onOpen: () => void; onDelete: () => void }) {
  const { t } = useLanguage()
  const avgs = computeDomainAverages(obs.observer)
  const overall = OBSERVER_DOMAIN_KEYS.reduce((s, k) => s + avgs[k], 0) / OBSERVER_DOMAIN_KEYS.length
  return (
    <div className="grid grid-cols-12 gap-3 px-5 py-4 border-t border-outline-variant/10 hover:bg-surface-container-lowest transition-colors items-center">
      <div className="col-span-3 font-body text-sm text-primary font-medium">{obs.sessionLabel || '—'}</div>
      <div className="col-span-3 font-body text-sm text-on-surface-variant/60">{obs.sessionDate}</div>
      <div className="col-span-3 flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-outline-variant/15 overflow-hidden rounded-full max-w-[120px]">
          <div className="h-full bg-secondary" style={{ width: `${(overall / 5) * 100}%` }} />
        </div>
        <span className="font-body text-sm text-primary">{overall.toFixed(1)}</span>
      </div>
      <div className="col-span-3 flex items-center justify-end gap-1">
        <button onClick={onOpen}
          className="px-3 py-1 font-body text-xs border border-outline-variant/25 text-on-surface-variant/70 hover:border-secondary hover:text-secondary transition-colors">
          {t.obs_session_open as string}
        </button>
        <button onClick={onDelete} className="px-2 py-1 text-on-surface-variant/30 hover:text-rose-700 transition-colors">
          <span className="material-symbols-outlined text-sm">delete</span>
        </button>
      </div>
    </div>
  )
}

function RecommendationTab({ c, save }: { c: StudentCase; save: (c: StudentCase) => void }) {
  const { t } = useLanguage()
  const agg = aggregateObservations(c.observations)
  const avgs = computeDomainAverages(agg)
  const overall = OBSERVER_DOMAIN_KEYS.reduce((s, k) => s + avgs[k], 0) / OBSERVER_DOMAIN_KEYS.length
  const fits = c.observations.length ? computeTrackFits(avgs) : []
  const trackNames = t.diag_obs_track_names as Record<string, string>
  const last = c.reports[c.reports.length - 1]
  const [recText, setRecText] = useState<string>(last?.recommendation || '')
  const [nextStepsText, setNextStepsText] = useState<string>(last?.nextSteps || '')
  const [nextProgramKey, setNextProgramKey] = useState<string>(last?.nextProgram || '')
  const [roadmapShort, setRoadmapShort] = useState<string>(last?.roadmapShort || '')
  const [roadmapMid, setRoadmapMid] = useState<string>(last?.roadmapMid || '')
  const [roadmapLong, setRoadmapLong] = useState<string>(last?.roadmapLong || '')
  const [closing, setClosing] = useState<string>(last?.closingMessage || '')

  useEffect(() => {
    setRecText(last?.recommendation || '')
    setNextStepsText(last?.nextSteps || '')
    setNextProgramKey(last?.nextProgram || '')
    setRoadmapShort(last?.roadmapShort || '')
    setRoadmapMid(last?.roadmapMid || '')
    setRoadmapLong(last?.roadmapLong || '')
    setClosing(last?.closingMessage || '')
  }, [last])

  const best = fits.length ? pickRecommendedTrack(fits, overall).track : null

  const handleSave = () => {
    save(upsertDraftReport(c, {
      recommendation: recText,
      nextProgram: nextProgramKey || best?.key,
      nextSteps: nextStepsText,
      roadmapShort,
      roadmapMid,
      roadmapLong,
      closingMessage: closing,
    }))
  }

  return (
    <div>
      {c.observations.length === 0 ? (
        <div className="border border-dashed border-outline-variant/25 py-16 text-center">
          <p className="font-body text-sm text-on-surface-variant/40">{t.overview_no_recommendation as string}</p>
        </div>
      ) : (
        <>
          {/* Aggregate scores */}
          <div className="mb-8 bg-surface-container-low p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-label text-[10px] uppercase tracking-widest text-secondary">{t.preview_track_fits as string}</h3>
              <span className="font-body text-xs text-on-surface-variant/40">{t.diag_res_overall_short} {overall.toFixed(1)}</span>
            </div>
            <div className="space-y-2">
              {fits.map((f) => (
                <div key={f.key} className="flex items-center gap-3">
                  <span className="font-body text-sm w-44 shrink-0 text-primary">{trackNames[f.key as TrackKey]}</span>
                  <div className="flex-1 h-1.5 bg-outline-variant/20 overflow-hidden rounded-full">
                    <div className={`h-full ${best && f.key === best.key ? 'bg-primary' : 'bg-secondary/60'}`} style={{ width: `${f.pct}%` }} />
                  </div>
                  <span className="font-body text-sm w-10 text-right text-primary">{f.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation editor */}
          <div className="space-y-5 mb-6">
            <label className="block">
              <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-1 block">{t.reports_next_program as string}</span>
              <div className="flex gap-2 flex-wrap">
                {fits.map((f) => (
                  <button key={f.key} type="button" onClick={() => setNextProgramKey(f.key)}
                    className={`px-4 py-2 font-body text-xs border transition-colors ${
                      nextProgramKey === f.key ? 'border-secondary bg-secondary/10 text-secondary' : 'border-outline-variant/25 text-on-surface-variant/70 hover:border-secondary/60'
                    }`}>
                    {trackNames[f.key as TrackKey]} · {f.pct}%
                  </button>
                ))}
              </div>
            </label>
            <label className="block">
              <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-1 block">{t.reports_recommendation as string}</span>
              <textarea value={recText} onChange={(e) => setRecText(e.target.value)} rows={5}
                placeholder={t.diag_res_recommended_direction_ph as string}
                className="w-full border border-outline-variant/25 px-4 py-3 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary resize-none" />
            </label>
            <label className="block">
              <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-1 block">{t.diag_res_next_steps as string}</span>
              <textarea value={nextStepsText} onChange={(e) => setNextStepsText(e.target.value)} rows={3}
                placeholder={t.diag_res_next_steps_ph as string}
                className="w-full border border-outline-variant/25 px-4 py-3 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary resize-none" />
            </label>
          </div>

          {/* Growth Roadmap (folded from former Growth Report) */}
          <div className="mb-6 pt-6 border-t border-outline-variant/15">
            <h3 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.reports_roadmap_label as string}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label className="block">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50 mb-1 block">{t.reports_roadmap_short as string}</span>
                <textarea value={roadmapShort} onChange={(e) => setRoadmapShort(e.target.value)} rows={3}
                  className="w-full border border-outline-variant/25 px-3 py-2 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary resize-none" />
              </label>
              <label className="block">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50 mb-1 block">{t.reports_roadmap_mid as string}</span>
                <textarea value={roadmapMid} onChange={(e) => setRoadmapMid(e.target.value)} rows={3}
                  className="w-full border border-outline-variant/25 px-3 py-2 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary resize-none" />
              </label>
              <label className="block">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50 mb-1 block">{t.reports_roadmap_long as string}</span>
                <textarea value={roadmapLong} onChange={(e) => setRoadmapLong(e.target.value)} rows={3}
                  className="w-full border border-outline-variant/25 px-3 py-2 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary resize-none" />
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block">
              <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-1 block">{t.reports_closing_label as string}</span>
              <textarea value={closing} onChange={(e) => setClosing(e.target.value)} rows={3}
                placeholder={t.reports_closing_ph as string}
                className="w-full border border-outline-variant/25 px-4 py-3 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary resize-none" />
            </label>
          </div>

          <button onClick={handleSave}
            className="px-6 py-2.5 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-base">save</span>
            {t.ws_action_generate_rec as string}
          </button>
        </>
      )}
    </div>
  )
}

function PreviewTab({ c, onOpen }: { c: StudentCase; onOpen: () => void }) {
  const { t } = useLanguage()
  const agg = aggregateObservations(c.observations)
  const avgs = computeDomainAverages(agg)
  const overall = OBSERVER_DOMAIN_KEYS.reduce((s, k) => s + avgs[k], 0) / OBSERVER_DOMAIN_KEYS.length
  const fits = c.observations.length ? computeTrackFits(avgs) : []
  const best = fits.length ? pickRecommendedTrack(fits, overall).track : null
  const trackNames = t.diag_obs_track_names as Record<string, string>
  const interp = t.diag_obs_interp as Record<string, Record<'high' | 'mid' | 'low', string>>
  const itemLabels = t.diag_obs_items as Record<string, { label: string }>
  const domainLabels = t.diag_obs_domains as Record<string, string>

  type Entry = { label: string; score: number; category: string }
  const entries: Entry[] = []
  for (const k of OBSERVER_DOMAIN_KEYS) {
    for (const it of agg[k].items) {
      entries.push({ label: itemLabels[it.key]?.label || it.label, score: it.score, category: domainLabels[k] })
    }
  }
  const strengths = [...entries].sort((a, b) => b.score - a.score).slice(0, 3)
  const risks = [...entries].sort((a, b) => a.score - b.score).slice(0, 2)
  const lastReport = c.reports[c.reports.length - 1]

  return (
    <div>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-headline text-2xl text-primary tracking-tight mb-1">{t.preview_title as string}</h2>
          <p className="font-body text-sm text-on-surface-variant/60">{t.preview_sub as string}</p>
        </div>
        <button onClick={onOpen}
          className="px-5 py-2 font-body text-xs border border-outline-variant/25 text-on-surface-variant/70 hover:border-secondary hover:text-secondary transition-colors flex items-center gap-1.5">
          <span className="material-symbols-outlined text-base">slideshow</span>
          {t.preview_open_full as string}
        </button>
      </div>

      {best ? (
        <div className="mb-8 bg-primary text-on-primary p-6">
          <div className="font-label text-[10px] uppercase tracking-[0.22em] text-secondary/90 mb-2">{t.preview_executive as string}</div>
          <div className="font-headline text-2xl tracking-tight mb-2">{trackNames[best.key as TrackKey]}</div>
          <div className="font-body text-sm text-on-primary/70">
            {interp[best.top3[0].domain][scoreLevel(avgs[best.top3[0].domain])]}
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-outline-variant/25 py-10 text-center mb-8">
          <p className="font-body text-sm text-on-surface-variant/40">{t.overview_no_recommendation as string}</p>
        </div>
      )}

      {best && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="border border-outline-variant/15 p-5 bg-surface-container-lowest">
              <div className="font-label text-[10px] uppercase tracking-widest text-emerald-700 mb-3">{t.preview_strengths as string}</div>
              {strengths.map((s, i) => (
                <div key={i} className="flex justify-between py-1.5 font-body text-sm">
                  <span className="text-primary">{s.label}</span>
                  <span className="text-emerald-700 font-semibold">{s.score}/5</span>
                </div>
              ))}
            </div>
            <div className="border border-outline-variant/15 p-5 bg-[#FBF3EE]">
              <div className="font-label text-[10px] uppercase tracking-widest text-rose-700 mb-3">{t.preview_risks as string}</div>
              {risks.map((s, i) => (
                <div key={i} className="flex justify-between py-1.5 font-body text-sm">
                  <span className="text-primary">{s.label}</span>
                  <span className="text-rose-700 font-semibold">{s.score}/5</span>
                </div>
              ))}
            </div>
          </div>

          {lastReport?.recommendation && (
            <div className="border-l-2 border-secondary pl-5 py-1">
              <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">{t.preview_consultant_note as string}</div>
              <p className="font-body text-sm text-primary leading-relaxed whitespace-pre-wrap">{lastReport.recommendation}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function ExportTab({ c, exportable, onExport }: { c: StudentCase; exportable: boolean; onExport: () => void }) {
  const { t } = useLanguage()
  const reports = [...c.reports].reverse()

  return (
    <div>
      <div className="max-w-xl mx-auto text-center py-8">
        <span className="material-symbols-outlined text-secondary text-4xl mb-4 block">picture_as_pdf</span>
        <h2 className="font-headline text-2xl text-primary tracking-tight mb-2">{t.export_title as string}</h2>
        <p className="font-body text-sm text-on-surface-variant/60 mb-8">{t.export_sub as string}</p>

        {!exportable && (
          <div className="mb-6 bg-[#FBF3EE] border border-amber-700/20 p-4 text-left">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-amber-700 text-base mt-0.5">warning</span>
              <p className="font-body text-xs text-amber-900 leading-relaxed">{t.ws_pdf_disabled_tip as string}</p>
            </div>
          </div>
        )}

        <button onClick={onExport} disabled={!exportable}
          className="px-10 py-3.5 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors tracking-wide inline-flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed">
          <span className="material-symbols-outlined text-base">download</span>
          {t.export_btn as string}
        </button>
      </div>

      {/* Version history */}
      <div className="mt-10 pt-8 border-t border-outline-variant/15">
        <h3 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.reports_title as string}</h3>
        {reports.length === 0 ? (
          <p className="font-body text-xs text-on-surface-variant/40">{t.reports_no_versions as string}</p>
        ) : (
          <div className="space-y-2">
            {reports.map((r) => (
              <div key={r.id} className="border border-outline-variant/15 p-4 bg-surface-container-lowest">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="font-body text-sm font-medium text-primary">
                    {(t.reports_version as string).replace('{n}', String(r.version))}
                  </span>
                  {r.generatedAt ? (
                    <span className="font-body text-[11px] text-emerald-700">
                      <span className="material-symbols-outlined text-xs align-middle mr-1">check_circle</span>
                      {(t.reports_exported_on as string).replace('{date}', new Date(r.generatedAt).toLocaleString())}
                    </span>
                  ) : (
                    <span className="font-body text-[11px] text-on-surface-variant/50">{t.reports_draft as string}</span>
                  )}
                </div>
                {r.recommendation && <p className="font-body text-xs text-on-surface-variant/70 line-clamp-2">{r.recommendation}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────── Consultation Log Tab ─────────────────────── */

function ConsultationLogTab({ c, save }: { c: StudentCase; save: (c: StudentCase) => void }) {
  const { t } = useLanguage()
  const tt = t as unknown as Record<string, string>
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isNew, setIsNew] = useState(false)

  const sorted = [...(c.consultationLogs || [])].sort((a, b) => b.date.localeCompare(a.date))

  const handleAdd = () => {
    setEditingId(null)
    setIsNew(true)
  }

  const handleOpen = (id: string) => {
    setIsNew(false)
    setEditingId(id)
  }

  const handleDelete = (id: string) => {
    if (!confirm(tt.cons_delete_confirm)) return
    save(deleteConsultationLog(c, id))
  }

  const handleBack = () => {
    setEditingId(null)
    setIsNew(false)
  }

  if (isNew || editingId) {
    const existing = editingId ? (c.consultationLogs || []).find((l) => l.id === editingId) : undefined
    return (
      <ConsultationLogForm
        initial={existing}
        onSave={(patch) => {
          if (editingId && existing) {
            save(updateConsultationLog(c, editingId, patch))
          } else {
            save(addConsultationLog(c, patch))
          }
          handleBack()
        }}
        onCancel={handleBack}
      />
    )
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-headline text-2xl text-primary tracking-tight mb-1">{tt.cons_list_title}</h2>
          <p className="font-body text-sm text-on-surface-variant/60">{tt.cons_list_sub}</p>
        </div>
        <button onClick={handleAdd}
          className="px-5 py-2 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-base">add</span>
          {tt.cons_add}
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className="border border-dashed border-outline-variant/25 py-16 text-center">
          <p className="font-body text-sm text-on-surface-variant/40">{tt.cons_no_entries}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((log) => (
            <ConsultationLogRow key={log.id} log={log} onOpen={() => handleOpen(log.id)} onDelete={() => handleDelete(log.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

function ConsultationLogRow({ log, onOpen, onDelete }: { log: ConsultationLog; onOpen: () => void; onDelete: () => void }) {
  const { t } = useLanguage()
  const tt = t as unknown as Record<string, string>
  return (
    <div className="border border-outline-variant/15 px-5 py-4 hover:bg-surface-container-lowest transition-colors">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <span className="font-label text-[11px] uppercase tracking-widest text-secondary">{log.date}</span>
            {log.specialNotes && (
              <span className="px-1.5 py-0.5 font-label text-[9px] uppercase tracking-widest bg-amber-50 text-amber-700 border border-amber-200">
                {tt.cons_special_notes}
              </span>
            )}
            {log.cautions && (
              <span className="px-1.5 py-0.5 font-label text-[9px] uppercase tracking-widest bg-rose-50 text-rose-700 border border-rose-200">
                {tt.cons_cautions}
              </span>
            )}
          </div>
          <p className="font-body text-sm text-primary line-clamp-2">{log.content || '—'}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={onOpen}
            className="px-3 py-1 font-body text-xs border border-outline-variant/25 text-on-surface-variant/70 hover:border-secondary hover:text-secondary transition-colors">
            {tt.obs_session_open}
          </button>
          <button onClick={onDelete} className="px-2 py-1 text-on-surface-variant/30 hover:text-rose-700 transition-colors">
            <span className="material-symbols-outlined text-sm">delete</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function ConsultationLogForm({ initial, onSave, onCancel }: {
  initial?: ConsultationLog
  onSave: (patch: Partial<ConsultationLog>) => void
  onCancel: () => void
}) {
  const { t } = useLanguage()
  const tt = t as unknown as Record<string, string>
  const today = new Date().toISOString().slice(0, 10)
  const [date, setDate] = useState(initial?.date || today)
  const [content, setContent] = useState(initial?.content || '')
  const [specialNotes, setSpecialNotes] = useState(initial?.specialNotes || '')
  const [cautions, setCautions] = useState(initial?.cautions || '')
  const [saved, setSaved] = useState(false)

  const inputCls = 'w-full border border-outline-variant/25 px-3 py-2 font-body text-sm outline-none focus:border-secondary'
  const labelCls = 'font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-1 block'

  const handleSave = () => {
    onSave({ date, content, specialNotes, cautions })
    setSaved(true)
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onCancel} className="text-on-surface-variant/50 hover:text-primary transition-colors flex items-center gap-1 font-body text-xs">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          {tt.cons_back}
        </button>
        <span className="text-outline-variant/30">/</span>
        <span className="font-label text-[11px] uppercase tracking-widest text-secondary">
          {initial ? initial.date : tt.cons_new_entry}
        </span>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className={labelCls}>{tt.cons_date}</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
        </label>
        <label className="block">
          <span className={labelCls}>{tt.cons_content}</span>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={6}
            placeholder={tt.cons_content_ph}
            className={`${inputCls} resize-none`} />
        </label>
        <label className="block">
          <span className={labelCls}>{tt.cons_special_notes}</span>
          <textarea value={specialNotes} onChange={(e) => setSpecialNotes(e.target.value)} rows={3}
            placeholder={tt.cons_special_notes_ph}
            className={`${inputCls} resize-none`} />
        </label>
        <label className="block">
          <span className={labelCls}>{tt.cons_cautions}</span>
          <textarea value={cautions} onChange={(e) => setCautions(e.target.value)} rows={3}
            placeholder={tt.cons_cautions_ph}
            className={`${inputCls} resize-none`} />
        </label>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button onClick={handleSave}
          className="px-6 py-2.5 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-base">save</span>
          {tt.cons_save}
        </button>
        <button onClick={onCancel} className="px-4 py-2.5 font-body text-sm border border-outline-variant/25 text-on-surface-variant/70 hover:border-secondary hover:text-secondary transition-colors">
          {tt.common_cancel || 'Cancel'}
        </button>
        {saved && (
          <span className="font-body text-xs text-emerald-700 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            {tt.cons_saved}
          </span>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────── Profile Tab (no own program) ─────────────────────── */

function ProfileTab({ c, save }: { c: StudentCase; save: (c: StudentCase) => void }) {
  const { t } = useLanguage()
  const tt = t as unknown as Record<string, string>
  const [toast, setToast] = useState<string | null>(null)

  // Basic info
  const [dob, setDob] = useState(c.student.dateOfBirth || '')
  const [grade, setGrade] = useState(c.student.grade || '')
  const [school, setSchool] = useState(c.student.school || '')
  // Guardian
  const [parentName, setParentName] = useState(c.student.parentName || '')
  const [parentPhone, setParentPhone] = useState(c.student.parentPhone || '')
  // Study abroad
  const [purpose, setPurpose] = useState<StudyAbroadPurpose | ''>(c.student.studyAbroadPurpose || '')
  const programs = c.student.programs || []
  const [regions, setRegions] = useState(c.student.regionsOfInterest || '')
  const [schools, setSchools] = useState(c.student.schoolsOfInterest || '')
  const [budget, setBudget] = useState(c.student.budget || '')
  const [notes, setNotes] = useState(c.student.generalNotes || '')

  const isMinor = (() => {
    if (!dob) return true
    const age = Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    return age < 19
  })()

  const handleSave = () => {
    save({
      ...c,
      student: {
        ...c.student,
        dateOfBirth: dob,
        grade,
        school,
        parentName,
        parentPhone,
        studyAbroadPurpose: purpose || undefined,
        programs,
        regionsOfInterest: regions,
        schoolsOfInterest: schools,
        budget,
        generalNotes: notes,
      },
    })
    setToast(tt.profile_saved)
    setTimeout(() => setToast(null), 2000)
  }

  const inputCls = 'w-full border border-outline-variant/25 px-3 py-2 font-body text-sm outline-none focus:border-secondary'
  const labelCls = 'font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60 mb-1 block'
  const sectionHeadCls = 'font-label text-[11px] uppercase tracking-widest text-on-surface-variant/40 mb-4 mt-2'

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h2 className="font-headline text-2xl text-primary tracking-tight mb-1">{tt.profile_no_program_title}</h2>
        <p className="font-body text-sm text-on-surface-variant/60">{tt.profile_no_program_sub}</p>
      </div>

      {/* Basic info */}
      <div className="mb-8">
        <p className={sectionHeadCls}>{tt.profile_section_basic}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <span className={labelCls}>{tt.profile_dob}</span>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
              placeholder={tt.profile_dob_ph}
              className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>{tt.profile_grade}</span>
            <input value={grade} onChange={(e) => setGrade(e.target.value)}
              placeholder={tt.profile_grade_ph}
              className={inputCls} />
          </label>
          <label className="block md:col-span-2">
            <span className={labelCls}>{tt.profile_school_name}</span>
            <input value={school} onChange={(e) => setSchool(e.target.value)}
              placeholder={tt.profile_school_ph}
              className={inputCls} />
          </label>
        </div>
      </div>

      {/* Guardian info — shown when minor or DOB not filled */}
      {isMinor && (
        <div className="mb-8 border-l-2 border-outline-variant/20 pl-4">
          <p className={sectionHeadCls}>{tt.profile_section_guardian}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block">
              <span className={labelCls}>{tt.profile_parent_name}</span>
              <input value={parentName} onChange={(e) => setParentName(e.target.value)}
                placeholder={tt.profile_parent_name_ph}
                className={inputCls} />
            </label>
            <label className="block">
              <span className={labelCls}>{tt.profile_parent_phone}</span>
              <input value={parentPhone} onChange={(e) => setParentPhone(e.target.value)}
                placeholder={tt.profile_parent_phone_ph}
                className={inputCls} />
            </label>
          </div>
        </div>
      )}

      {/* Study abroad preferences */}
      <div className="mb-8">
        <p className={sectionHeadCls}>{tt.profile_section_abroad}</p>

        <div className="mb-6">
          <span className={labelCls}>{tt.profile_study_purpose}</span>
          <div className="flex flex-col gap-2">
            {PRODUCT_OPTIONS.map(({ key, i18nKey }) => (
              <label key={key} className="flex items-center gap-2.5 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  purpose === key ? 'border-secondary bg-secondary' : 'border-outline-variant/40 group-hover:border-secondary/60'
                }`} onClick={() => setPurpose(purpose === key ? '' : key as StudyAbroadPurpose)}>
                  {purpose === key && <div className="w-1.5 h-1.5 rounded-full bg-on-primary" />}
                </div>
                <span className="font-body text-sm text-primary cursor-pointer" onClick={() => setPurpose(purpose === key ? '' : key as StudyAbroadPurpose)}>
                  {tt[i18nKey]}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <label className="block">
            <span className={labelCls}>{tt.profile_regions}</span>
            <input value={regions} onChange={(e) => setRegions(e.target.value)}
              placeholder={tt.profile_regions_ph}
              className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>{tt.profile_schools}</span>
            <input value={schools} onChange={(e) => setSchools(e.target.value)}
              placeholder={tt.profile_schools_ph}
              className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>{tt.profile_budget}</span>
            <input value={budget} onChange={(e) => setBudget(e.target.value)}
              placeholder={tt.profile_budget_ph}
              className={inputCls} />
          </label>
          <label className="block">
            <span className={labelCls}>{tt.profile_notes}</span>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}
              placeholder={tt.profile_notes_ph}
              className={`${inputCls} resize-none`} />
          </label>
        </div>
      </div>

      <button onClick={handleSave}
        className="px-6 py-2.5 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors flex items-center gap-2">
        <span className="material-symbols-outlined text-base">save</span>
        {tt.profile_save}
      </button>

      {toast && (
        <div className="mt-3 font-body text-xs text-emerald-700 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          {toast}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────── Helpers ─────────────────────── */

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50 mb-1">{label}</div>
      <div className="font-body text-sm text-primary">{value || '—'}</div>
    </div>
  )
}

function QuickAction({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="px-4 py-2 border border-outline-variant/25 text-on-surface-variant/80 hover:border-secondary hover:text-secondary transition-colors flex items-center gap-2 font-body text-sm">
      <span className="material-symbols-outlined text-base">{icon}</span>
      {label}
    </button>
  )
}
