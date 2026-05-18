import { useState } from 'react'
import { useLanguage } from '../../../context/LanguageContext'
import type {
  CampSurvey,
  ImmigrationSurvey,
  LanguageStudySurvey,
  OwnProgramSurvey,
  PurposeSurvey,
  StudentCase,
  StudyAbroadPurpose,
  UniversityAdmissionSurvey,
} from '../../../data/student-store'
import { updatePurposeSurvey } from '../../../data/student-store'

/* ─── shared primitives ─── */

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant/60">
        {label}{required && <span className="text-error ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-outline-variant/30 bg-surface px-3 py-2 font-body text-sm text-on-surface focus:outline-none focus:border-secondary"
    />
  )
}

function TextArea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full border border-outline-variant/30 bg-surface px-3 py-2 font-body text-sm text-on-surface focus:outline-none focus:border-secondary resize-none"
    />
  )
}

function RadioGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 font-body text-xs border transition-colors ${
            value === opt.value
              ? 'bg-secondary text-on-secondary border-secondary'
              : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:border-secondary/50'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

function CheckboxGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T[]
  onChange: (v: T[]) => void
  options: { value: T; label: string }[]
}) {
  function toggle(v: T) {
    if (value.includes(v)) onChange(value.filter((x) => x !== v))
    else onChange([...value, v])
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => toggle(opt.value)}
          className={`px-3 py-1.5 font-body text-xs border transition-colors ${
            value.includes(opt.value)
              ? 'bg-secondary text-on-secondary border-secondary'
              : 'bg-surface text-on-surface-variant border-outline-variant/30 hover:border-secondary/50'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

/* ─── Language Study form ─── */

function defaultLanguageStudySurvey(): LanguageStudySurvey {
  return {
    targetCountry: '',
    targetRegion: '',
    institutions: '',
    studyGoal: '',
    duration: '',
    budget: '',
  }
}

function LanguageStudyForm({
  data,
  onChange,
}: {
  data: LanguageStudySurvey
  onChange: (d: LanguageStudySurvey) => void
}) {
  const { t } = useLanguage()
  const tt = t as unknown as Record<string, string>
  const set = <K extends keyof LanguageStudySurvey>(k: K, v: LanguageStudySurvey[K]) =>
    onChange({ ...data, [k]: v })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label={tt.ls_target_country} required>
        <TextInput value={data.targetCountry} onChange={(v) => set('targetCountry', v)} placeholder={tt.ls_target_country_ph} />
      </Field>

      <Field label={tt.ls_target_region}>
        <TextInput value={data.targetRegion} onChange={(v) => set('targetRegion', v)} placeholder={tt.ls_target_region_ph} />
      </Field>

      <div className="md:col-span-2">
        <Field label={tt.ls_institutions}>
          <TextInput value={data.institutions} onChange={(v) => set('institutions', v)} placeholder={tt.ls_institutions_ph} />
        </Field>
      </div>

      <div className="md:col-span-2">
        <Field label={tt.ls_study_goal}>
          <RadioGroup
            value={data.studyGoal}
            onChange={(v) => set('studyGoal', v)}
            options={[
              { value: 'conversation', label: tt.ls_goal_conversation },
              { value: 'certificate', label: tt.ls_goal_certificate },
              { value: 'admission_prep', label: tt.ls_goal_admission },
              { value: 'daily_life', label: tt.ls_goal_daily },
            ]}
          />
        </Field>
      </div>

      <Field label={tt.ls_duration}>
        <RadioGroup
          value={data.duration}
          onChange={(v) => set('duration', v)}
          options={[
            { value: 'under_1m', label: tt.ls_duration_under_1m },
            { value: '1_3m', label: tt.ls_duration_1_3m },
            { value: '3_6m', label: tt.ls_duration_3_6m },
            { value: 'over_6m', label: tt.ls_duration_over_6m },
          ]}
        />
      </Field>

      <Field label={tt.ls_budget}>
        <TextInput value={data.budget} onChange={(v) => set('budget', v)} placeholder={tt.ls_budget_ph} />
      </Field>
    </div>
  )
}

/* ─── University Admission form ─── */

function defaultUniversityAdmissionSurvey(): UniversityAdmissionSurvey {
  return {
    targetCountry: '',
    targetRegion: '',
    universities: '',
    budget: '',
    currentDegree: '',
    targetDegree: '',
  }
}

function UniversityAdmissionForm({
  data,
  onChange,
}: {
  data: UniversityAdmissionSurvey
  onChange: (d: UniversityAdmissionSurvey) => void
}) {
  const { t } = useLanguage()
  const tt = t as unknown as Record<string, string>
  const set = <K extends keyof UniversityAdmissionSurvey>(k: K, v: UniversityAdmissionSurvey[K]) =>
    onChange({ ...data, [k]: v })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label={tt.ua_target_country} required>
        <TextInput value={data.targetCountry} onChange={(v) => set('targetCountry', v)} placeholder={tt.ua_target_country_ph} />
      </Field>

      <Field label={tt.ua_target_region}>
        <TextInput value={data.targetRegion} onChange={(v) => set('targetRegion', v)} placeholder={tt.ua_target_region_ph} />
      </Field>

      <div className="md:col-span-2">
        <Field label={tt.ua_universities}>
          <TextArea value={data.universities} onChange={(v) => set('universities', v)} placeholder={tt.ua_universities_ph} rows={4} />
        </Field>
      </div>

      <Field label={tt.ua_budget}>
        <TextInput value={data.budget} onChange={(v) => set('budget', v)} placeholder={tt.ua_budget_ph} />
      </Field>

      <Field label={tt.ua_current_degree}>
        <RadioGroup
          value={data.currentDegree}
          onChange={(v) => set('currentDegree', v)}
          options={[
            { value: 'bachelor', label: tt.ua_degree_bachelor },
            { value: 'master', label: tt.ua_degree_master },
            { value: 'phd', label: tt.ua_degree_phd },
          ]}
        />
      </Field>

      <div className="md:col-span-2">
        <Field label={tt.ua_target_degree}>
          <RadioGroup
            value={data.targetDegree}
            onChange={(v) => set('targetDegree', v)}
            options={[
              { value: 'bachelor', label: tt.ua_target_bachelor },
              { value: 'master', label: tt.ua_target_master },
              { value: 'phd', label: tt.ua_target_phd },
              { value: 'integrated', label: tt.ua_target_integrated },
              { value: 'postdoc', label: tt.ua_target_postdoc },
            ]}
          />
        </Field>
      </div>
    </div>
  )
}

/* ─── Camp form ─── */

function defaultCampSurvey(): CampSurvey {
  return {
    targetCountry: '',
    englishLevel: '',
    englishTestScore: '',
    duration: '',
    budget: '',
    parentAccompanying: '',
  }
}

function CampForm({ data, onChange }: { data: CampSurvey; onChange: (d: CampSurvey) => void }) {
  const { t } = useLanguage()
  const tt = t as unknown as Record<string, string>
  const set = <K extends keyof CampSurvey>(k: K, v: CampSurvey[K]) => onChange({ ...data, [k]: v })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label={tt.camp_target_country} required>
        <TextInput value={data.targetCountry} onChange={(v) => set('targetCountry', v)} placeholder={tt.camp_target_country_ph} />
      </Field>

      <Field label={tt.camp_english_level}>
        <TextInput value={data.englishLevel} onChange={(v) => set('englishLevel', v)} placeholder={tt.camp_english_level_ph} />
      </Field>

      <Field label={tt.camp_english_test_score}>
        <TextInput value={data.englishTestScore} onChange={(v) => set('englishTestScore', v)} placeholder={tt.camp_english_test_score_ph} />
      </Field>

      <Field label={tt.camp_duration}>
        <TextInput value={data.duration} onChange={(v) => set('duration', v)} placeholder={tt.camp_duration_ph} />
      </Field>

      <Field label={tt.camp_budget}>
        <TextInput value={data.budget} onChange={(v) => set('budget', v)} placeholder={tt.camp_budget_ph} />
      </Field>

      <Field label={tt.camp_parent_accompanying}>
        <RadioGroup
          value={data.parentAccompanying}
          onChange={(v) => set('parentAccompanying', v)}
          options={[
            { value: 'yes', label: tt.camp_parent_yes },
            { value: 'no', label: tt.camp_parent_no },
          ]}
        />
      </Field>
    </div>
  )
}

/* ─── Immigration form ─── */

function defaultImmigrationSurvey(): ImmigrationSurvey {
  return {
    applicantName: '',
    age: '',
    targetCountry: '',
    immigrationType: '',
    currentVisaStatus: '',
    familyComposition: '',
    education: '',
    occupation: '',
    targetTimeline: '',
    budget: '',
    notes: '',
  }
}

function ImmigrationForm({
  data,
  onChange,
}: {
  data: ImmigrationSurvey
  onChange: (d: ImmigrationSurvey) => void
}) {
  const { t } = useLanguage()
  const tt = t as unknown as Record<string, string>
  const set = <K extends keyof ImmigrationSurvey>(k: K, v: ImmigrationSurvey[K]) =>
    onChange({ ...data, [k]: v })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label={tt.imm_applicant_name}>
        <TextInput value={data.applicantName} onChange={(v) => set('applicantName', v)} />
      </Field>

      <Field label={tt.imm_age}>
        <TextInput value={data.age} onChange={(v) => set('age', v)} placeholder={tt.imm_age_ph} />
      </Field>

      <Field label={tt.imm_target_country} required>
        <TextInput value={data.targetCountry} onChange={(v) => set('targetCountry', v)} placeholder={tt.imm_target_country_ph} />
      </Field>

      <Field label={tt.imm_immigration_type}>
        <RadioGroup
          value={data.immigrationType}
          onChange={(v) => set('immigrationType', v)}
          options={[
            { value: 'skilled', label: tt.imm_type_skilled },
            { value: 'investment', label: tt.imm_type_investment },
            { value: 'family', label: tt.imm_type_family },
            { value: 'post_study', label: tt.imm_type_post_study },
            { value: 'business', label: tt.imm_type_business },
          ]}
        />
      </Field>

      <Field label={tt.imm_current_visa}>
        <RadioGroup
          value={data.currentVisaStatus}
          onChange={(v) => set('currentVisaStatus', v)}
          options={[
            { value: 'none', label: tt.imm_visa_none },
            { value: 'student', label: tt.imm_visa_student },
            { value: 'work', label: tt.imm_visa_work },
            { value: 'other', label: tt.imm_visa_other },
          ]}
        />
      </Field>

      <Field label={tt.imm_family}>
        <RadioGroup
          value={data.familyComposition}
          onChange={(v) => set('familyComposition', v)}
          options={[
            { value: 'alone', label: tt.imm_family_alone },
            { value: 'with_spouse', label: tt.imm_family_spouse },
            { value: 'with_children', label: tt.imm_family_children },
            { value: 'whole_family', label: tt.imm_family_whole },
          ]}
        />
      </Field>

      <Field label={tt.imm_education}>
        <RadioGroup
          value={data.education}
          onChange={(v) => set('education', v)}
          options={[
            { value: 'high_school', label: tt.imm_edu_high_school },
            { value: 'bachelor', label: tt.imm_edu_bachelor },
            { value: 'master', label: tt.imm_edu_master },
            { value: 'phd', label: tt.imm_edu_phd },
          ]}
        />
      </Field>

      <Field label={tt.imm_occupation}>
        <TextInput value={data.occupation} onChange={(v) => set('occupation', v)} placeholder={tt.imm_occupation_ph} />
      </Field>

      <Field label={tt.imm_timeline}>
        <TextInput value={data.targetTimeline} onChange={(v) => set('targetTimeline', v)} placeholder={tt.imm_timeline_ph} />
      </Field>

      <Field label={tt.imm_budget}>
        <TextInput value={data.budget} onChange={(v) => set('budget', v)} placeholder={tt.imm_budget_ph} />
      </Field>

      <div className="md:col-span-2">
        <Field label={tt.imm_notes}>
          <TextArea value={data.notes} onChange={(v) => set('notes', v)} placeholder={tt.imm_notes_ph} />
        </Field>
      </div>
    </div>
  )
}

/* ─── Own Program form ─── */

function defaultOwnProgramSurvey(): OwnProgramSurvey {
  return {
    interestAreas: [],
    budget: '',
    interestedSchools: '',
  }
}

function OwnProgramForm({
  data,
  onChange,
}: {
  data: OwnProgramSurvey
  onChange: (d: OwnProgramSurvey) => void
}) {
  const { t } = useLanguage()
  const tt = t as unknown as Record<string, string>
  const set = <K extends keyof OwnProgramSurvey>(k: K, v: OwnProgramSurvey[K]) =>
    onChange({ ...data, [k]: v })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <Field label={tt.op_interest_areas}>
          <CheckboxGroup
            value={data.interestAreas}
            onChange={(v) => set('interestAreas', v as OwnProgramSurvey['interestAreas'])}
            options={[
              { value: 'art', label: tt.op_interest_art },
              { value: 'sports', label: tt.op_interest_sports },
              { value: 'music', label: tt.op_interest_music },
              { value: 'academics', label: tt.op_interest_academics },
            ]}
          />
        </Field>
      </div>

      <Field label={tt.op_budget}>
        <TextInput value={data.budget} onChange={(v) => set('budget', v)} placeholder={tt.op_budget_ph} />
      </Field>

      <Field label={tt.op_interested_schools}>
        <TextInput value={data.interestedSchools} onChange={(v) => set('interestedSchools', v)} placeholder={tt.op_interested_schools_ph} />
      </Field>
    </div>
  )
}

/* ─── Public export: PurposeSurveyForm ─── */

function buildDefaultSurvey(purpose: StudyAbroadPurpose): PurposeSurvey {
  switch (purpose) {
    case 'language_study':
      return { type: 'language_study', data: defaultLanguageStudySurvey() }
    case 'university_admission':
      return { type: 'university_admission', data: defaultUniversityAdmissionSurvey() }
    case 'summer_winter_camp':
      return { type: 'summer_winter_camp', data: defaultCampSurvey() }
    case 'immigration':
      return { type: 'immigration', data: defaultImmigrationSurvey() }
    case 'own_program':
      return { type: 'own_program', data: defaultOwnProgramSurvey() }
  }
}

export function PurposeSurveyForm({ c, save }: { c: StudentCase; save: (c: StudentCase) => void }) {
  const { t } = useLanguage()
  const tt = t as unknown as Record<string, string>
  const purpose = c.student.studyAbroadPurpose

  const initial: PurposeSurvey = c.purposeSurvey ??
    (purpose ? buildDefaultSurvey(purpose) : { type: 'language_study', data: defaultLanguageStudySurvey() })

  const [draft, setDraft] = useState<PurposeSurvey>(initial)
  const [saved, setSaved] = useState(false)

  if (!purpose) {
    return (
      <div className="py-12 text-center font-body text-sm text-on-surface-variant/50">
        {tt.students_modal_purpose} 설정되지 않았습니다.
      </div>
    )
  }

  function handleSave() {
    const updated = updatePurposeSurvey(c, draft)
    save(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const titleKey: Record<StudyAbroadPurpose, string> = {
    language_study: tt.ls_survey_title,
    university_admission: tt.ua_survey_title,
    summer_winter_camp: tt.camp_survey_title,
    immigration: tt.imm_survey_title,
    own_program: tt.op_survey_title,
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-lg text-on-surface">{titleKey[purpose]}</h2>
        <p className="font-body text-sm text-on-surface-variant/60 mt-1">{tt.purpose_survey_sub}</p>
      </div>

      {draft.type === 'language_study' && (
        <LanguageStudyForm
          data={draft.data}
          onChange={(data) => setDraft({ type: 'language_study', data })}
        />
      )}
      {draft.type === 'university_admission' && (
        <UniversityAdmissionForm
          data={draft.data}
          onChange={(data) => setDraft({ type: 'university_admission', data })}
        />
      )}
      {draft.type === 'summer_winter_camp' && (
        <CampForm
          data={draft.data}
          onChange={(data) => setDraft({ type: 'summer_winter_camp', data })}
        />
      )}
      {draft.type === 'immigration' && (
        <ImmigrationForm
          data={draft.data}
          onChange={(data) => setDraft({ type: 'immigration', data })}
        />
      )}
      {draft.type === 'own_program' && (
        <OwnProgramForm
          data={draft.data}
          onChange={(data) => setDraft({ type: 'own_program', data })}
        />
      )}

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2.5 bg-secondary text-on-secondary font-label text-sm hover:bg-secondary/90 transition-colors"
        >
          {saved ? tt.purpose_survey_saved : tt.purpose_survey_save}
        </button>
      </div>
    </div>
  )
}
