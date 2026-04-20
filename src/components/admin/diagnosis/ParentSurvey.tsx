import { INTEREST_OPTIONS, type DiagnosisData } from '../../../data/diagnosis-template'
import { useLanguage } from '../../../context/LanguageContext'

interface Props {
  data: DiagnosisData
  onChange: (d: DiagnosisData) => void
}

function Field({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean
}) {
  const cls = "w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary transition-colors"
  return (
    <label className="block mb-5">
      <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-1 block">{label}</span>
      {multiline
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className={cls} />
        : <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </label>
  )
}

export function ParentSurvey({ data, onChange }: Props) {
  const { t } = useLanguage()
  const p = data.parent
  const interestLabels = t.diag_par_interest_labels as Record<string, string>

  const set = (field: keyof typeof p, value: string | string[]) => {
    onChange({ ...data, parent: { ...p, [field]: value } })
  }

  const toggleInterest = (item: string) => {
    const next = p.interests.includes(item) ? p.interests.filter((i) => i !== item) : [...p.interests, item]
    set('interests', next)
  }

  return (
    <div>
      <p className="font-body text-sm text-on-surface-variant/50 mb-6">
        {t.diag_par_intro}
      </p>

      <Field label={t.diag_par_student_name} value={p.studentName} onChange={(v) => set('studentName', v)} placeholder={t.diag_par_student_name_ph} />
      <Field label={t.diag_par_grade} value={p.grade} onChange={(v) => set('grade', v)} placeholder={t.diag_par_grade_ph} />
      <Field label={t.diag_par_school} value={p.school} onChange={(v) => set('school', v)} placeholder={t.diag_par_school_ph} />
      <Field label={t.diag_par_curriculum} value={p.curriculum} onChange={(v) => set('curriculum', v)} placeholder={t.diag_par_curriculum_ph} />
      <Field label={t.diag_par_english} value={p.englishExposure} onChange={(v) => set('englishExposure', v)} placeholder={t.diag_par_english_ph} />

      <div className="mb-5">
        <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-2 block">{t.diag_par_interests}</span>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((item) => {
            const active = p.interests.includes(item)
            return (
              <button key={item} type="button" onClick={() => toggleInterest(item)}
                className={`px-3 py-1.5 font-body text-xs border transition-colors ${active ? 'border-secondary bg-secondary/10 text-secondary' : 'border-outline-variant/30 text-on-surface-variant/50 hover:border-secondary'}`}>
                {interestLabels[item] || item}
              </button>
            )
          })}
        </div>
      </div>

      <Field label={t.diag_par_goal} value={p.educationGoal} onChange={(v) => set('educationGoal', v)} multiline placeholder={t.diag_par_goal_ph} />
      <Field label={t.diag_par_overseas} value={p.overseasExperience} onChange={(v) => set('overseasExperience', v)} placeholder={t.diag_par_overseas_ph} />
      <Field label={t.diag_par_concerns} value={p.concerns} onChange={(v) => set('concerns', v)} multiline placeholder={t.diag_par_concerns_ph} />
    </div>
  )
}
