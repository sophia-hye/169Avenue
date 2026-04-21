import { useState } from 'react'
import { useLanguage } from '../../../context/LanguageContext'
import type {
  DiagnosisData,
  ParentSurvey,
  SchoolType,
  MainActivity,
  ActivityDuration,
  EnglishLevel,
  DirectionDilemma,
  DirectionConfidence,
  NewActivityAttitude,
  FocusLevel,
  SelfDirection,
  ParentConcernType,
  TargetEducation,
  InterestField,
} from '../../../data/diagnosis-template'

interface Props {
  data: DiagnosisData
  onChange: (d: DiagnosisData) => void
}

const TOTAL_STEPS = 9

export function ParentStepForm({ data, onChange }: Props) {
  const { t } = useLanguage()
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [showError, setShowError] = useState(false)
  const p = data.parent

  const setParent = (patch: Partial<ParentSurvey>) => {
    const next = { ...p, ...patch }
    // Derive readable strings for legacy fields used by PDF/Result
    if (patch.englishLevel !== undefined) next.englishExposure = englishExposureLabel(patch.englishLevel)
    if (patch.targetEducation !== undefined) next.educationGoal = targetEducationLabel(patch.targetEducation)
    if (patch.schoolType !== undefined && !p.curriculum) next.curriculum = schoolTypeLabel(patch.schoolType)
    if (patch.mainActivity !== undefined) {
      const label = mainActivityLabel(patch.mainActivity)
      if (label && !p.interests.includes(label)) next.interests = [label, ...p.interests.filter((x) => x !== label)]
    }
    // Always re-compose concerns from structured fields so PDF receives full picture
    next.concerns = composeConcerns(next)
    onChange({ ...data, parent: next })
    setShowError(false)
  }

  const englishExposureLabel = (lvl: EnglishLevel) =>
    lvl === 'none' ? (t.diag_step_eng_none as string)
    : lvl === 'academy' ? (t.diag_step_eng_academy as string)
    : lvl === 'daily' ? (t.diag_step_eng_daily as string)
    : lvl === 'overseas' ? (t.diag_step_eng_overseas as string)
    : ''

  const targetEducationLabel = (tg: TargetEducation) =>
    tg === 'overseas-univ' ? (t.diag_step_tgt_overseas as string)
    : tg === 'domestic-univ' ? (t.diag_step_tgt_domestic as string)
    : tg === 'undecided' ? (t.diag_step_tgt_undecided as string)
    : ''

  const schoolTypeLabel = (st: SchoolType) =>
    st === 'general' ? (t.diag_step_school_general as string)
    : st === 'international' ? (t.diag_step_school_international as string)
    : st === 'overseas' ? (t.diag_step_school_overseas as string)
    : ''

  const mainActivityLabel = (a: MainActivity) =>
    a === 'academic' ? (t.diag_step_act_academic as string)
    : a === 'art' ? (t.diag_step_act_art as string)
    : a === 'tennis' ? (t.diag_step_act_tennis as string)
    : a === 'other' ? (t.diag_step_act_other as string)
    : ''

  const composeConcerns = (pp: ParentSurvey): string => {
    const parts: string[] = []
    if (pp.parentConcernType) {
      const labelMap: Record<ParentConcernType, string> = {
        '': '',
        'direction': t.diag_step_pc_direction as string,
        'continuation': t.diag_step_pc_continuation as string,
        'admission-link': t.diag_step_pc_admission as string,
        'losing-interest': t.diag_step_pc_losing_interest as string,
      }
      parts.push(`[${t.diag_step_q_parent_concern as string}] ${labelMap[pp.parentConcernType]}`)
    }
    if (pp.pastAttempts) parts.push(`[${t.diag_step_q_attempts as string}] ${pp.pastAttempts}`)
    if (pp.keyQuestion) parts.push(`[${t.diag_step_q_key as string}] ${pp.keyQuestion}`)
    return parts.join('\n')
  }

  // ── Validation ──
  const stepValid = (): boolean => {
    switch (step) {
      case 0: return true
      case 1: return !!p.studentName && !!p.grade
      case 2: return !!p.mainActivity && !!p.activityDuration && !!p.englishLevel
      case 3: return !!p.directionDilemma && !!p.directionConfidence
      case 4: return !!p.newActivityAttitude && !!p.focusLevel && !!p.selfDirection
      case 5: return !!p.parentConcernType
      case 6: return !!p.targetEducation && !!p.interestField
      case 7: return !!p.keyQuestion && p.keyQuestion.trim().length > 0
      case 8: return true
      default: return true
    }
  }

  const goNext = () => {
    if (!stepValid()) { setShowError(true); return }
    setShowError(false)
    setStep(Math.min(TOTAL_STEPS - 1, step + 1))
  }
  const goBack = () => {
    setShowError(false)
    setStep(Math.max(0, step - 1))
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  // ── UI ──
  const progressPct = Math.round(((step + 1) / TOTAL_STEPS) * 100)

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-label text-[10px] uppercase tracking-[0.25em] text-on-surface-variant/50">
            {(t.diag_step_progress as string).replace('{current}', String(step + 1)).replace('{total}', String(TOTAL_STEPS))}
          </span>
          <span className="font-body text-xs text-on-surface-variant/40">{progressPct}%</span>
        </div>
        <div className="h-0.5 bg-outline-variant/15 overflow-hidden">
          <div className="h-full bg-secondary transition-all duration-300" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="min-h-[380px]">
        {step === 0 && <IntroStep onStart={goNext} />}
        {step === 1 && <BasicStep p={p} setParent={setParent} />}
        {step === 2 && <CurrentStep p={p} setParent={setParent} />}
        {step === 3 && <DecisionStep p={p} setParent={setParent} />}
        {step === 4 && <PersonalityStep p={p} setParent={setParent} />}
        {step === 5 && <ParentConcernStep p={p} setParent={setParent} />}
        {step === 6 && <GoalStep p={p} setParent={setParent} />}
        {step === 7 && <FinalQuestionStep p={p} setParent={setParent} />}
        {step === 8 && <SubmitStep submitted={submitted} onSubmit={handleSubmit} />}
      </div>

      {/* Error message */}
      {showError && (
        <div className="mt-6 text-center font-body text-xs text-rose-700">
          {t.diag_step_required as string}
        </div>
      )}

      {/* Nav */}
      {step > 0 && step < TOTAL_STEPS - 1 && (
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-outline-variant/10">
          <button onClick={goBack}
            className="px-5 py-2.5 font-body text-sm text-on-surface-variant/60 hover:text-primary transition-colors">
            ← {t.diag_step_back as string}
          </button>
          <button onClick={goNext}
            className="px-7 py-2.5 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors">
            {t.diag_step_next as string} →
          </button>
        </div>
      )}
      {step === TOTAL_STEPS - 1 && !submitted && (
        <div className="flex items-center justify-start mt-10 pt-6 border-t border-outline-variant/10">
          <button onClick={goBack}
            className="px-5 py-2.5 font-body text-sm text-on-surface-variant/60 hover:text-primary transition-colors">
            ← {t.diag_step_back as string}
          </button>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────── Step Components ─────────────────────────── */

function IntroStep({ onStart }: { onStart: () => void }) {
  const { t } = useLanguage()
  return (
    <div className="text-center pt-12 pb-8">
      <div className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-6">
        {t.diag_step_intro_eyebrow as string}
      </div>
      <h2 className="font-headline text-2xl md:text-3xl text-primary tracking-tight leading-snug mb-6 max-w-xl mx-auto">
        {t.diag_step_intro_title as string}
      </h2>
      <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-10 max-w-md mx-auto">
        {t.diag_step_intro_body as string}
      </p>
      <button onClick={onStart}
        className="px-10 py-3.5 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors tracking-wide">
        {t.diag_step_intro_cta as string} →
      </button>
    </div>
  )
}

function StepHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-8">
      <h2 className="font-headline text-2xl text-primary tracking-tight mb-2">{title}</h2>
      <p className="font-body text-sm text-on-surface-variant/60">{sub}</p>
    </div>
  )
}

function QLabel({ children }: { children: React.ReactNode }) {
  return <div className="font-body text-sm text-primary mb-3 font-medium">{children}</div>
}

function TextInput({ value, onChange, placeholder, autoFocus }: {
  value: string; onChange: (v: string) => void; placeholder?: string; autoFocus?: boolean
}) {
  return (
    <input
      autoFocus={autoFocus}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border-b border-outline-variant/30 px-1 py-2.5 font-body text-base text-primary bg-transparent outline-none focus:border-secondary transition-colors"
    />
  )
}

function TextArea({ value, onChange, placeholder, rows = 4 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-outline-variant/30 px-4 py-3 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary transition-colors resize-none"
    />
  )
}

function OptionGroup<T extends string>({ value, options, onChange, columns = 2 }: {
  value: T | undefined
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  columns?: 2 | 3 | 4
}) {
  const grid = columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-4'
  return (
    <div className={`grid ${grid} gap-2`}>
      {options.map((o) => {
        const active = value === o.value
        return (
          <button key={o.value} type="button" onClick={() => onChange(o.value)}
            className={`px-4 py-3.5 font-body text-sm text-left border transition-colors ${
              active
                ? 'border-secondary bg-secondary/10 text-secondary font-medium'
                : 'border-outline-variant/25 text-on-surface-variant hover:border-secondary/60 hover:text-primary'
            }`}>
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

function FieldBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <QLabel>{label}</QLabel>
      {children}
    </div>
  )
}

interface StepProps {
  p: ParentSurvey
  setParent: (patch: Partial<ParentSurvey>) => void
}

function BasicStep({ p, setParent }: StepProps) {
  const { t } = useLanguage()
  return (
    <div>
      <StepHeader title={t.diag_step_basic_title as string} sub={t.diag_step_basic_sub as string} />
      <FieldBlock label={t.diag_step_q_name as string}>
        <TextInput autoFocus value={p.studentName} onChange={(v) => setParent({ studentName: v })} placeholder={t.diag_par_student_name_ph as string} />
      </FieldBlock>
      <FieldBlock label={t.diag_step_q_grade as string}>
        <TextInput value={p.grade} onChange={(v) => setParent({ grade: v })} placeholder={t.diag_step_q_grade_ph as string} />
      </FieldBlock>
      <FieldBlock label={t.diag_step_q_school_type as string}>
        <OptionGroup<SchoolType>
          value={p.schoolType}
          options={[
            { value: 'general', label: t.diag_step_school_general as string },
            { value: 'international', label: t.diag_step_school_international as string },
            { value: 'overseas', label: t.diag_step_school_overseas as string },
          ]}
          onChange={(v) => setParent({ schoolType: v })}
          columns={3}
        />
      </FieldBlock>
      <FieldBlock label={t.diag_step_q_phone as string}>
        <TextInput value={p.parentPhone || ''} onChange={(v) => setParent({ parentPhone: v })} placeholder={t.diag_step_q_phone_ph as string} />
      </FieldBlock>
    </div>
  )
}

function CurrentStep({ p, setParent }: StepProps) {
  const { t } = useLanguage()
  return (
    <div>
      <StepHeader title={t.diag_step_current_title as string} sub={t.diag_step_current_sub as string} />
      <FieldBlock label={t.diag_step_q_activity as string}>
        <OptionGroup<MainActivity>
          value={p.mainActivity}
          options={[
            { value: 'academic', label: t.diag_step_act_academic as string },
            { value: 'art',      label: t.diag_step_act_art as string },
            { value: 'tennis',   label: t.diag_step_act_tennis as string },
            { value: 'other',    label: t.diag_step_act_other as string },
          ]}
          onChange={(v) => setParent({ mainActivity: v })}
          columns={4}
        />
      </FieldBlock>
      <FieldBlock label={t.diag_step_q_duration as string}>
        <OptionGroup<ActivityDuration>
          value={p.activityDuration}
          options={[
            { value: 'lt-6m',  label: t.diag_step_dur_lt6 as string },
            { value: '6-12m',  label: t.diag_step_dur_6to12 as string },
            { value: 'gt-1y',  label: t.diag_step_dur_gt1y as string },
          ]}
          onChange={(v) => setParent({ activityDuration: v })}
          columns={3}
        />
      </FieldBlock>
      <FieldBlock label={t.diag_step_q_english_env as string}>
        <OptionGroup<EnglishLevel>
          value={p.englishLevel}
          options={[
            { value: 'none',     label: t.diag_step_eng_none as string },
            { value: 'academy',  label: t.diag_step_eng_academy as string },
            { value: 'daily',    label: t.diag_step_eng_daily as string },
            { value: 'overseas', label: t.diag_step_eng_overseas as string },
          ]}
          onChange={(v) => setParent({ englishLevel: v })}
          columns={4}
        />
      </FieldBlock>
    </div>
  )
}

function DecisionStep({ p, setParent }: StepProps) {
  const { t } = useLanguage()
  return (
    <div>
      <StepHeader title={t.diag_step_decision_title as string} sub={t.diag_step_decision_sub as string} />
      <FieldBlock label={t.diag_step_q_dilemma as string}>
        <OptionGroup<DirectionDilemma>
          value={p.directionDilemma}
          options={[
            { value: 'art-vs-academic',    label: t.diag_step_dil_art_acad as string },
            { value: 'tennis-vs-art',      label: t.diag_step_dil_tennis_art as string },
            { value: 'arts-vs-academic',   label: t.diag_step_dil_arts_acad as string },
            { value: 'unsure',             label: t.diag_step_dil_unsure as string },
          ]}
          onChange={(v) => setParent({ directionDilemma: v })}
          columns={2}
        />
      </FieldBlock>
      <FieldBlock label={t.diag_step_q_confidence as string}>
        <OptionGroup<DirectionConfidence>
          value={p.directionConfidence}
          options={[
            { value: 'none',         label: t.diag_step_conf_none as string },
            { value: 'considering',  label: t.diag_step_conf_considering as string },
            { value: 'somewhat',     label: t.diag_step_conf_somewhat as string },
            { value: 'certain',      label: t.diag_step_conf_certain as string },
          ]}
          onChange={(v) => setParent({ directionConfidence: v })}
          columns={4}
        />
      </FieldBlock>
    </div>
  )
}

function PersonalityStep({ p, setParent }: StepProps) {
  const { t } = useLanguage()
  return (
    <div>
      <StepHeader title={t.diag_step_personality_title as string} sub={t.diag_step_personality_sub as string} />
      <FieldBlock label={t.diag_step_q_new_attitude as string}>
        <OptionGroup<NewActivityAttitude>
          value={p.newActivityAttitude}
          options={[
            { value: 'active',       label: t.diag_step_att_active as string },
            { value: 'situational',  label: t.diag_step_att_situational as string },
            { value: 'passive',      label: t.diag_step_att_passive as string },
          ]}
          onChange={(v) => setParent({ newActivityAttitude: v })}
          columns={3}
        />
      </FieldBlock>
      <FieldBlock label={t.diag_step_q_focus as string}>
        <OptionGroup<FocusLevel>
          value={p.focusLevel}
          options={[
            { value: 'long',        label: t.diag_step_foc_long as string },
            { value: 'medium',      label: t.diag_step_foc_medium as string },
            { value: 'distracted',  label: t.diag_step_foc_distracted as string },
          ]}
          onChange={(v) => setParent({ focusLevel: v })}
          columns={3}
        />
      </FieldBlock>
      <FieldBlock label={t.diag_step_q_self as string}>
        <OptionGroup<SelfDirection>
          value={p.selfDirection}
          options={[
            { value: 'self',       label: t.diag_step_self_self as string },
            { value: 'when-told',  label: t.diag_step_self_when_told as string },
            { value: 'rarely',     label: t.diag_step_self_rarely as string },
          ]}
          onChange={(v) => setParent({ selfDirection: v })}
          columns={3}
        />
      </FieldBlock>
    </div>
  )
}

function ParentConcernStep({ p, setParent }: StepProps) {
  const { t } = useLanguage()
  return (
    <div>
      <StepHeader title={t.diag_step_parent_title as string} sub={t.diag_step_parent_sub as string} />
      <FieldBlock label={t.diag_step_q_parent_concern as string}>
        <OptionGroup<ParentConcernType>
          value={p.parentConcernType}
          options={[
            { value: 'direction',       label: t.diag_step_pc_direction as string },
            { value: 'continuation',    label: t.diag_step_pc_continuation as string },
            { value: 'admission-link',  label: t.diag_step_pc_admission as string },
            { value: 'losing-interest', label: t.diag_step_pc_losing_interest as string },
          ]}
          onChange={(v) => setParent({ parentConcernType: v })}
          columns={2}
        />
      </FieldBlock>
      <FieldBlock label={t.diag_step_q_attempts as string}>
        <TextArea value={p.pastAttempts || ''} onChange={(v) => setParent({ pastAttempts: v })} placeholder={t.diag_step_q_attempts_ph as string} rows={3} />
      </FieldBlock>
    </div>
  )
}

function GoalStep({ p, setParent }: StepProps) {
  const { t } = useLanguage()
  return (
    <div>
      <StepHeader title={t.diag_step_goal_title as string} sub={t.diag_step_goal_sub as string} />
      <FieldBlock label={t.diag_step_q_target as string}>
        <OptionGroup<TargetEducation>
          value={p.targetEducation}
          options={[
            { value: 'overseas-univ', label: t.diag_step_tgt_overseas as string },
            { value: 'domestic-univ', label: t.diag_step_tgt_domestic as string },
            { value: 'undecided',     label: t.diag_step_tgt_undecided as string },
          ]}
          onChange={(v) => setParent({ targetEducation: v })}
          columns={3}
        />
      </FieldBlock>
      <FieldBlock label={t.diag_step_q_interest_field as string}>
        <OptionGroup<InterestField>
          value={p.interestField}
          options={[
            { value: 'arts-sports', label: t.diag_step_if_arts_sports as string },
            { value: 'academic',    label: t.diag_step_if_academic as string },
            { value: 'both',        label: t.diag_step_if_both as string },
            { value: 'unsure',      label: t.diag_step_if_unsure as string },
          ]}
          onChange={(v) => setParent({ interestField: v })}
          columns={4}
        />
      </FieldBlock>
    </div>
  )
}

function FinalQuestionStep({ p, setParent }: StepProps) {
  const { t } = useLanguage()
  return (
    <div>
      <StepHeader title={t.diag_step_final_title as string} sub={t.diag_step_final_sub as string} />
      <FieldBlock label={t.diag_step_q_key as string}>
        <TextArea value={p.keyQuestion || ''} onChange={(v) => setParent({ keyQuestion: v })} placeholder={t.diag_step_q_key_ph as string} rows={5} />
      </FieldBlock>
    </div>
  )
}

function SubmitStep({ submitted, onSubmit }: { submitted: boolean; onSubmit: () => void }) {
  const { t } = useLanguage()
  if (submitted) {
    return (
      <div className="text-center pt-12 pb-8">
        <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-secondary/15 flex items-center justify-center">
          <span className="material-symbols-outlined text-secondary">check</span>
        </div>
        <h2 className="font-headline text-xl text-primary mb-3">{t.diag_step_submit_done as string}</h2>
      </div>
    )
  }
  return (
    <div className="text-center pt-8 pb-4">
      <div className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-6">
        {t.diag_step_submit_eyebrow as string}
      </div>
      <h2 className="font-headline text-xl md:text-2xl text-primary tracking-tight leading-snug mb-5 max-w-xl mx-auto">
        {t.diag_step_submit_title as string}
      </h2>
      <p className="font-body text-sm text-on-surface-variant/70 leading-relaxed mb-10 max-w-md mx-auto">
        {t.diag_step_submit_body as string}
      </p>
      <button onClick={onSubmit}
        className="px-10 py-3.5 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors tracking-wide">
        {t.diag_step_submit_cta as string} →
      </button>
    </div>
  )
}
