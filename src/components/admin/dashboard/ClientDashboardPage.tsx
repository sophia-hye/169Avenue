import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../Navbar'
import { MobileTopBar } from '../../MobileTopBar'
import { MobileBottomNav } from '../../MobileBottomNav'
import { useLanguage } from '../../../context/LanguageContext'
import {
  getCase,
  initStudentStore,
  listStudents,
  updateClientDashboard,
  type ClientDashboardEntry,
  type ClientDashboardStatus,
  type DashboardPriority,
  type StudentCase,
  type StudentIndexEntry,
  type StudyAbroadPurpose,
} from '../../../data/student-store'

/* ─── constants ─── */

const PRIORITIES: DashboardPriority[] = ['1', '2', '3', '4', '5']

const DASHBOARD_STATUSES: ClientDashboardStatus[] = [
  'app_submitted',
  'paid',
  'in_review',
  'visa_interview',
  'enrolled',
  'partnership_in_progress',
  'docs_collection_needed',
  'pending_delivery',
]

const STATUS_LABELS: Record<ClientDashboardStatus, string> = {
  app_submitted:           'App Submitted',
  paid:                    'Paid',
  in_review:               'In Review (Admissions)',
  visa_interview:          'Visa Interview',
  enrolled:                'Enrolled',
  partnership_in_progress: 'Partnership (In Progress)',
  docs_collection_needed:  'Docs Collection Needed',
  pending_delivery:        'Pending (자료 전달)',
}

const STATUS_COLORS: Record<ClientDashboardStatus, { text: string; bg: string }> = {
  app_submitted:           { text: 'text-blue-700',    bg: 'bg-blue-50' },
  paid:                    { text: 'text-emerald-700', bg: 'bg-emerald-50' },
  in_review:               { text: 'text-amber-700',   bg: 'bg-amber-50' },
  visa_interview:          { text: 'text-violet-700',  bg: 'bg-violet-50' },
  enrolled:                { text: 'text-teal-700',    bg: 'bg-teal-50' },
  partnership_in_progress: { text: 'text-indigo-700',  bg: 'bg-indigo-50' },
  docs_collection_needed:  { text: 'text-rose-700',    bg: 'bg-rose-50' },
  pending_delivery:        { text: 'text-orange-700',  bg: 'bg-orange-50' },
}

const PURPOSE_LABELS: Record<StudyAbroadPurpose, string> = {
  language_study:       '어학연수',
  university_admission: '대학/대학원 진학',
  summer_winter_camp:   '캠프',
  immigration:          '이민',
  own_program:          '169 Program',
}

/* ─── helpers ─── */

function emptyDashboard(): ClientDashboardEntry {
  return {
    priority: '',
    followUpTasks: '',
    dashboardStatus: '',
    paymentReceivedDate: '',
    tuition: '',
    institutions: '',
    pointOfContact: '',
    major: '',
    engScore: '',
    gpa: '',
    postSecondaryCredits: '',
    notes: '',
    completed: false,
    updatedAt: new Date().toISOString(),
  }
}

interface RowData {
  entry: StudentIndexEntry
  case: StudentCase
  dashboard: ClientDashboardEntry
}

/* ─── Page ─── */

export function ClientDashboardPage() {
  const { t } = useLanguage()
  const [rows, setRows] = useState<RowData[]>([])
  const [loading, setLoading] = useState(true)
  const [filterCompleted, setFilterCompleted] = useState<'all' | 'active' | 'completed'>('all')

  const load = useCallback(async () => {
    await initStudentStore()
    const list = listStudents()
    const loaded: RowData[] = list.map((entry) => {
      const c = getCase(entry.id)!
      return { entry, case: c, dashboard: c.clientDashboard ?? emptyDashboard() }
    })
    setRows(loaded)
    setLoading(false)
  }, [])

  useEffect(() => { void load() }, [load])

  const handlePatch = useCallback((id: string, patch: Partial<ClientDashboardEntry>) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.entry.id !== id) return r
        const updated = updateClientDashboard(r.case, patch)
        return { ...r, case: updated, dashboard: updated.clientDashboard! }
      })
    )
  }, [])

  const visible = rows
    .filter((r) => {
      if (filterCompleted === 'active')    return !r.dashboard.completed
      if (filterCompleted === 'completed') return r.dashboard.completed
      return true
    })
    .sort((a, b) => {
      const pa = a.dashboard.priority ? parseInt(a.dashboard.priority) : 99
      const pb = b.dashboard.priority ? parseInt(b.dashboard.priority) : 99
      return pa - pb
    })

  const tt = t as unknown as Record<string, string>

  return (
    <>
      <Navbar />
      <MobileTopBar />
      <main className="pt-20 md:pt-24 pb-24 md:pb-10" style={{ maxWidth: 1600, margin: '0 auto' }}>
        <div className="px-4 md:px-6">
          {/* Header */}
          <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-headline text-2xl md:text-3xl text-primary tracking-tight">
                {tt.dashboard_title}
              </h1>
              <p className="font-body text-xs text-on-surface-variant/50 mt-1">{tt.dashboard_sub}</p>
            </div>
            <div className="flex items-center gap-2">
              {(['all', 'active', 'completed'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterCompleted(f)}
                  className={`px-3 py-1.5 font-body text-xs border transition-colors ${
                    filterCompleted === f
                      ? 'bg-secondary text-on-secondary border-secondary'
                      : 'border-outline-variant/30 text-on-surface-variant/60 hover:border-secondary/50'
                  }`}
                >
                  {tt[`dashboard_filter_${f}`]}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="font-body text-sm text-on-surface-variant/50 py-12 text-center">{tt.dashboard_loading}</p>
          ) : visible.length === 0 ? (
            <p className="font-body text-sm text-on-surface-variant/50 py-12 text-center">{tt.dashboard_empty}</p>
          ) : (
            <div className="overflow-x-auto border border-outline-variant/20 rounded-none">
              <table className="w-full border-collapse text-[12px]" style={{ minWidth: 1400 }}>
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant/20">
                    <Th sticky>{tt.dashboard_col_done}</Th>
                    <Th>{tt.dashboard_col_name}</Th>
                    <Th>{tt.dashboard_col_priority}</Th>
                    <Th>{tt.dashboard_col_follow_up}</Th>
                    <Th>{tt.dashboard_col_product}</Th>
                    <Th>{tt.dashboard_col_status}</Th>
                    <Th>{tt.dashboard_col_payment_date}</Th>
                    <Th>{tt.dashboard_col_tuition}</Th>
                    <Th>{tt.dashboard_col_institutions}</Th>
                    <Th>{tt.dashboard_col_contact}</Th>
                    <Th>{tt.dashboard_col_major}</Th>
                    <Th>{tt.dashboard_col_eng_score}</Th>
                    <Th>{tt.dashboard_col_gpa}</Th>
                    <Th>{tt.dashboard_col_post_credits}</Th>
                    <Th>{tt.dashboard_col_notes}</Th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((r) => (
                    <DashboardRow key={r.entry.id} row={r} onPatch={handlePatch} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <MobileBottomNav />
    </>
  )
}

/* ─── Row ─── */

function DashboardRow({
  row,
  onPatch,
}: {
  row: RowData
  onPatch: (id: string, patch: Partial<ClientDashboardEntry>) => void
}) {
  const { entry, case: c, dashboard: d } = row
  const id = entry.id
  const completed = d.completed

  const product = c.student.studyAbroadPurpose
    ? PURPOSE_LABELS[c.student.studyAbroadPurpose]
    : c.student.program || '—'

  const contactValue = (() => {
    if (d.pointOfContact) return d.pointOfContact
    if (c.student.phone) return c.student.phone
    if (c.student.parentPhone) return `${c.student.parentName || ''} ${c.student.parentPhone}`.trim()
    return ''
  })()

  const rowCls = `border-b border-outline-variant/15 transition-colors ${
    completed ? 'bg-surface-container-lowest/40 opacity-60' : 'hover:bg-surface-container-lowest/60'
  }`

  return (
    <tr className={rowCls}>
      {/* Completed checkbox */}
      <td className="px-3 py-2 text-center">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => onPatch(id, { completed: e.target.checked })}
          className="w-4 h-4 accent-secondary cursor-pointer"
        />
      </td>

      {/* Name */}
      <td className="px-3 py-2 whitespace-nowrap">
        <Link
          to={`/admin/students/${id}`}
          className="font-body text-primary font-medium hover:text-secondary underline-offset-2 hover:underline transition-colors"
        >
          {entry.name || '—'}
        </Link>
      </td>

      {/* Priority select */}
      <td className="px-2 py-2">
        <select
          value={d.priority}
          disabled={completed}
          onChange={(e) => onPatch(id, { priority: e.target.value as DashboardPriority | '' })}
          className={`w-14 font-body text-[11px] border border-outline-variant/25 bg-transparent px-1 py-1 focus:outline-none focus:border-secondary transition-colors ${
            completed ? 'opacity-50 cursor-not-allowed' : ''
          } ${d.priority ? priorityColor(d.priority) : 'text-on-surface-variant/50'}`}
        >
          <option value="">—</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </td>

      {/* Follow-up Tasks */}
      <EditCell
        value={d.followUpTasks}
        disabled={completed}
        onChange={(v) => onPatch(id, { followUpTasks: v })}
        wide
      />

      {/* Product (read-only) */}
      <td className="px-3 py-2 font-body text-on-surface-variant/70 whitespace-nowrap">{product}</td>

      {/* Status dropdown */}
      <td className="px-2 py-2">
        <select
          value={d.dashboardStatus}
          disabled={completed}
          onChange={(e) => onPatch(id, { dashboardStatus: e.target.value as ClientDashboardStatus | '' })}
          className={`font-body text-[11px] border border-outline-variant/25 bg-transparent px-1 py-1 focus:outline-none focus:border-secondary transition-colors ${
            completed ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{ minWidth: 170 }}
        >
          <option value="">—</option>
          {DASHBOARD_STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
        {d.dashboardStatus && (
          <div className={`mt-1 inline-block px-1.5 py-0.5 font-body text-[10px] rounded-sm ${STATUS_COLORS[d.dashboardStatus as ClientDashboardStatus].bg} ${STATUS_COLORS[d.dashboardStatus as ClientDashboardStatus].text}`}>
            {STATUS_LABELS[d.dashboardStatus as ClientDashboardStatus]}
          </div>
        )}
      </td>

      {/* Payment Date */}
      <EditCell value={d.paymentReceivedDate} disabled={completed} onChange={(v) => onPatch(id, { paymentReceivedDate: v })} placeholder="YYYY-MM-DD" />

      {/* Tuition */}
      <EditCell value={d.tuition} disabled={completed} onChange={(v) => onPatch(id, { tuition: v })} placeholder="e.g. $3,000" />

      {/* Institutions */}
      <EditCell value={d.institutions} disabled={completed} onChange={(v) => onPatch(id, { institutions: v })} wide />

      {/* Point of Contact */}
      <EditCell value={contactValue} disabled={completed} onChange={(v) => onPatch(id, { pointOfContact: v })} />

      {/* Major */}
      <EditCell value={d.major || c.student.targetFieldOfStudy || ''} disabled={completed} onChange={(v) => onPatch(id, { major: v })} />

      {/* Eng Score */}
      <EditCell value={d.engScore} disabled={completed} onChange={(v) => onPatch(id, { engScore: v })} narrow />

      {/* GPA */}
      <EditCell value={d.gpa} disabled={completed} onChange={(v) => onPatch(id, { gpa: v })} narrow />

      {/* Post-secondary Credits */}
      <EditCell value={d.postSecondaryCredits} disabled={completed} onChange={(v) => onPatch(id, { postSecondaryCredits: v })} narrow />

      {/* Notes */}
      <EditCell value={d.notes} disabled={completed} onChange={(v) => onPatch(id, { notes: v })} wide />
    </tr>
  )
}

/* ─── EditCell ─── */

function EditCell({
  value,
  disabled,
  onChange,
  placeholder,
  wide,
  narrow,
}: {
  value: string
  disabled: boolean
  onChange: (v: string) => void
  placeholder?: string
  wide?: boolean
  narrow?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setDraft(value) }, [value])
  useEffect(() => { if (editing) inputRef.current?.focus() }, [editing])

  const commit = () => {
    setEditing(false)
    if (draft !== value) onChange(draft)
  }

  const w = wide ? 'min-w-[140px]' : narrow ? 'min-w-[70px]' : 'min-w-[100px]'

  if (editing && !disabled) {
    return (
      <td className={`px-1 py-1 ${w}`}>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') { setDraft(value); setEditing(false) } }}
          placeholder={placeholder}
          className="w-full font-body text-[12px] px-2 py-1 border border-secondary/50 bg-surface focus:outline-none"
        />
      </td>
    )
  }

  return (
    <td
      className={`px-3 py-2 font-body text-on-surface-variant/80 ${w} ${!disabled ? 'cursor-pointer hover:bg-surface-container/50' : ''} group`}
      onClick={() => { if (!disabled) setEditing(true) }}
    >
      <span className={value ? '' : 'text-on-surface-variant/30'}>{value || (disabled ? '—' : placeholder || '—')}</span>
    </td>
  )
}

/* ─── Th ─── */

function Th({ children, sticky }: { children: React.ReactNode; sticky?: boolean }) {
  return (
    <th
      className={`px-3 py-2.5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50 text-left whitespace-nowrap border-r border-outline-variant/10 last:border-r-0 ${sticky ? 'sticky left-0 bg-surface-container-low z-10' : ''}`}
    >
      {children}
    </th>
  )
}

/* ─── helpers ─── */

function priorityColor(p: string): string {
  switch (p) {
    case '1': return 'text-rose-600 font-bold'
    case '2': return 'text-orange-500 font-semibold'
    case '3': return 'text-amber-600'
    case '4': return 'text-sky-600'
    case '5': return 'text-on-surface-variant/50'
    default:  return ''
  }
}
