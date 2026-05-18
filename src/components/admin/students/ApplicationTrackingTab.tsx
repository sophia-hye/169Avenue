import { useState, useCallback } from 'react'
import { useLanguage } from '../../../context/LanguageContext'
import {
  type StudentCase,
  type ApplicationEntry,
  type ApplicationStatus,
  addApplicationEntry,
  updateApplicationEntry,
  deleteApplicationEntry,
} from '../../../data/student-store'

const STATUS_CONFIG: Record<ApplicationStatus, { labelKey: string; color: string; bg: string }> = {
  new:         { labelKey: 'app_status_new',         color: 'text-on-surface-variant/60', bg: 'bg-outline-variant/10' },
  in_progress: { labelKey: 'app_status_in_progress', color: 'text-blue-700',              bg: 'bg-blue-50' },
  accepted:    { labelKey: 'app_status_accepted',    color: 'text-emerald-700',            bg: 'bg-emerald-50' },
  rejected:    { labelKey: 'app_status_rejected',    color: 'text-rose-700',               bg: 'bg-rose-50' },
  waitlisted:  { labelKey: 'app_status_waitlisted',  color: 'text-amber-700',              bg: 'bg-amber-50' },
  shipped:     { labelKey: 'app_status_shipped',     color: 'text-violet-700',             bg: 'bg-violet-50' },
  delivered:   { labelKey: 'app_status_delivered',   color: 'text-indigo-700',             bg: 'bg-indigo-50' },
  completed:   { labelKey: 'app_status_completed',   color: 'text-teal-700',               bg: 'bg-teal-50' },
}

const ALL_STATUSES: ApplicationStatus[] = [
  'new', 'in_progress', 'accepted', 'rejected', 'waitlisted', 'shipped', 'delivered', 'completed',
]

const EMPTY_ENTRY: Omit<ApplicationEntry, 'id' | 'createdAt' | 'updatedAt'> = {
  priority: null,
  followUpTasks: '',
  status: 'new',
  paymentReceivedDate: '',
  tuitionFee: '',
  institution: '',
  pointOfContact: '',
  major: '',
  engScore: '',
  gpa: '',
  postSecondaryCredits: '',
  transferCredits: '',
  notes: '',
}

type EditableField = Exclude<keyof ApplicationEntry, 'id' | 'status' | 'createdAt' | 'updatedAt'>

interface Column {
  key: keyof ApplicationEntry
  labelKey: string
  width: string
  inputType: 'text' | 'number' | 'date' | 'status'
}

const COLUMNS: Column[] = [
  { key: 'priority',             labelKey: 'app_priority',         width: 'min-w-[60px]',   inputType: 'number' },
  { key: 'followUpTasks',        labelKey: 'app_follow_up_tasks',  width: 'min-w-[160px]',  inputType: 'text' },
  { key: 'status',               labelKey: 'app_status',           width: 'min-w-[130px]',  inputType: 'status' },
  { key: 'paymentReceivedDate',  labelKey: 'app_payment_date',     width: 'min-w-[130px]',  inputType: 'date' },
  { key: 'tuitionFee',           labelKey: 'app_tuition',          width: 'min-w-[110px]',  inputType: 'text' },
  { key: 'institution',          labelKey: 'app_institution',      width: 'min-w-[180px]',  inputType: 'text' },
  { key: 'pointOfContact',       labelKey: 'app_point_of_contact', width: 'min-w-[120px]',  inputType: 'text' },
  { key: 'major',                labelKey: 'app_major',            width: 'min-w-[140px]',  inputType: 'text' },
  { key: 'engScore',             labelKey: 'app_eng_score',        width: 'min-w-[90px]',   inputType: 'text' },
  { key: 'gpa',                  labelKey: 'app_gpa',              width: 'min-w-[70px]',   inputType: 'text' },
  { key: 'postSecondaryCredits', labelKey: 'app_post_secondary',   width: 'min-w-[110px]',  inputType: 'text' },
  { key: 'transferCredits',      labelKey: 'app_transfer',         width: 'min-w-[80px]',   inputType: 'text' },
  { key: 'notes',                labelKey: 'app_notes',            width: 'min-w-[200px]',  inputType: 'text' },
]

interface Props {
  c: StudentCase
  save: (next: StudentCase) => void
}

export function ApplicationTrackingTab({ c, save }: Props) {
  const { t } = useLanguage()
  const tt = t as unknown as Record<string, string>
  const entries = c.applicationTracking ?? []

  const [editingCell, setEditingCell] = useState<{ rowId: string; field: EditableField } | null>(null)
  const [statusDropdown, setStatusDropdown] = useState<string | null>(null)

  const handleAddRow = useCallback(() => {
    save(addApplicationEntry(c, EMPTY_ENTRY))
  }, [c, save])

  const handleDelete = useCallback((id: string) => {
    if (!confirm(tt.app_delete_confirm)) return
    save(deleteApplicationEntry(c, id))
  }, [c, save, tt.app_delete_confirm])

  const handleCellCommit = useCallback((
    rowId: string,
    field: EditableField,
    raw: string
  ) => {
    const value = field === 'priority' ? (raw === '' ? null : Number(raw)) : raw
    save(updateApplicationEntry(c, rowId, { [field]: value }))
    setEditingCell(null)
  }, [c, save])

  const handleStatusChange = useCallback((rowId: string, status: ApplicationStatus) => {
    save(updateApplicationEntry(c, rowId, { status }))
    setStatusDropdown(null)
  }, [c, save])

  const totalTuition = entries.reduce((sum, e) => {
    const num = parseFloat(e.tuitionFee.replace(/[^0-9.]/g, ''))
    return sum + (isNaN(num) ? 0 : num)
  }, 0)

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-headline text-xl text-primary tracking-tight mb-1">{tt.app_tab_title}</h2>
        <p className="font-body text-xs text-on-surface-variant/50">{tt.app_tab_sub}</p>
      </div>

      <div className="overflow-x-auto border border-outline-variant/15">
        <table className="w-full border-collapse font-body text-sm">
          <thead>
            <tr className="bg-surface-container-lowest border-b border-outline-variant/15">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={`${col.width} px-3 py-2.5 text-left font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50 whitespace-nowrap border-r border-outline-variant/10 last:border-r-0`}
                >
                  {tt[col.labelKey]}
                </th>
              ))}
              <th className="w-10 px-2 py-2.5" />
            </tr>
          </thead>

          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMNS.length + 1}
                  className="px-4 py-12 text-center font-body text-xs text-on-surface-variant/40"
                >
                  {tt.app_empty}
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-outline-variant/10 last:border-b-0 hover:bg-surface-container-lowest/40 group"
                >
                  {COLUMNS.map((col) => (
                    <td
                      key={col.key}
                      className={`${col.width} border-r border-outline-variant/10 last:border-r-0 relative p-0`}
                    >
                      {col.inputType === 'status' ? (
                        <StatusCell
                          entry={entry}
                          tt={tt}
                          isOpen={statusDropdown === entry.id}
                          onToggle={() => setStatusDropdown(
                            statusDropdown === entry.id ? null : entry.id
                          )}
                          onSelect={(s) => handleStatusChange(entry.id, s)}
                        />
                      ) : editingCell?.rowId === entry.id && editingCell.field === col.key ? (
                        <input
                          autoFocus
                          type={col.inputType === 'date' ? 'date' : col.inputType === 'number' ? 'number' : 'text'}
                          defaultValue={
                            col.key === 'priority'
                              ? (entry.priority ?? '')
                              : (entry[col.key as EditableField] as string) ?? ''
                          }
                          className="w-full px-3 py-2.5 outline-none bg-secondary/5 text-xs text-primary border-0 min-w-0"
                          onBlur={(e) => handleCellCommit(entry.id, col.key as EditableField, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
                            if (e.key === 'Escape') setEditingCell(null)
                          }}
                        />
                      ) : (
                        <button
                          className="w-full px-3 py-2.5 text-left text-xs text-primary hover:bg-surface-container-lowest truncate block"
                          onClick={() => setEditingCell({ rowId: entry.id, field: col.key as EditableField })}
                        >
                          {col.key === 'priority'
                            ? (entry.priority ?? '')
                            : (entry[col.key as EditableField] as string) ?? ''}
                        </button>
                      )}
                    </td>
                  ))}
                  <td className="w-10 px-2 py-2.5 text-center">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-on-surface-variant/20 hover:text-rose-700 transition-colors [@media(hover:none)]:opacity-100 opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>

          {entries.length > 0 && (
            <tfoot>
              <tr className="bg-surface-container-lowest/50 border-t border-outline-variant/15">
                {COLUMNS.map((col, i) => (
                  <td
                    key={col.key}
                    className={`${col.width} px-3 py-2 border-r border-outline-variant/10 last:border-r-0 text-xs font-medium`}
                  >
                    {col.key === 'tuitionFee' ? (
                      <span className="text-on-surface-variant/70">
                        ${totalTuition.toLocaleString()}
                      </span>
                    ) : i === 0 ? (
                      <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40">
                        {tt.app_total}
                      </span>
                    ) : null}
                  </td>
                ))}
                <td className="w-10" />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <button
        onClick={handleAddRow}
        className="mt-3 flex items-center justify-center gap-2 w-full px-4 py-2.5 font-body text-xs text-on-surface-variant/60 hover:text-primary border border-dashed border-outline-variant/25 hover:border-secondary/40 transition-colors"
      >
        <span className="material-symbols-outlined text-sm">add</span>
        {tt.app_add_row}
      </button>

      {statusDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setStatusDropdown(null)}
        />
      )}
    </div>
  )
}

function StatusCell({
  entry,
  tt,
  isOpen,
  onToggle,
  onSelect,
}: {
  entry: ApplicationEntry
  tt: Record<string, string>
  isOpen: boolean
  onToggle: () => void
  onSelect: (s: ApplicationStatus) => void
}) {
  const cfg = STATUS_CONFIG[entry.status]
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`w-full px-3 py-2.5 text-left text-xs font-medium flex items-center gap-1.5 ${cfg.color} ${cfg.bg}`}
      >
        <span className="truncate">{tt[cfg.labelKey]}</span>
        <span className="material-symbols-outlined text-[14px] ml-auto shrink-0">expand_more</span>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 z-20 bg-surface border border-outline-variant/20 shadow-lg min-w-[140px]">
          {ALL_STATUSES.map((s) => {
            const c = STATUS_CONFIG[s]
            return (
              <button
                key={s}
                onClick={() => onSelect(s)}
                className={`w-full px-3 py-2 text-left text-xs hover:bg-surface-container-lowest transition-colors ${c.color}`}
              >
                {tt[c.labelKey]}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
