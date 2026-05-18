import { useState } from 'react'
import { useLanguage } from '../../../context/LanguageContext'
import type {
  CampSurvey,
  ImmigrationSurvey,
  LanguageStudySurvey,
  PurposeSurvey,
  StudentCase,
  StudyAbroadPurpose,
  UniversityAdmissionSurvey,
} from '../../../data/student-store'
import { updatePurposeSurvey } from '../../../data/student-store'

/* ─── shared primitives ─── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant/60">{label}</label>
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

/* ─── Language Study form ─── */

function defaultLanguageStudySurvey(name: string): LanguageStudySurvey {
  return {
    studentName: name,
    gradeOrAge: '',
    currentEnglishLevel: '',
    studyGoal: '',
    targetCountry: '',
    duration: '',
    accommodation: '',
    overseasExperience: '',
    budget: '',
    notes: '',
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
  const set = <K extends keyof LanguageStudySurvey>(k: K, v: LanguageStudySurvey[K]) =>
    onChange({ ...data, [k]: v })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label={t.ls_grade_or_age as string}>
        <TextInput value={data.gradeOrAge} onChange={(v) => set('gradeOrAge', v)} placeholder={t.ls_grade_or_age_ph as string} />
      </Field>

      <Field label={t.ls_target_country as string}>
        <TextInput value={data.targetCountry} onChange={(v) => set('targetCountry', v)} placeholder={t.ls_target_country_ph as string} />
      </Field>

      <Field label={t.ls_english_level as string}>
        <RadioGroup
          value={data.currentEnglishLevel}
          onChange={(v) => set('currentEnglishLevel', v)}
          options={[
            { value: 'none', label: t.ls_english_none as string },
            { value: 'beginner', label: t.ls_english_beginner as string },
            { value: 'intermediate', label: t.ls_english_intermediate as string },
            { value: 'advanced', label: t.ls_english_advanced as string },
          ]}
        />
      </Field>

      <Field label={t.ls_study_goal as string}>
        <RadioGroup
          value={data.studyGoal}
          onChange={(v) => set('studyGoal', v)}
          options={[
            { value: 'conversation', label: t.ls_goal_conversation as string },
            { value: 'certificate', label: t.ls_goal_certificate as string },
            { value: 'admission_prep', label: t.ls_goal_admission as string },
            { value: 'daily_life', label: t.ls_goal_daily as string },
          ]}
        />
      </Field>

      <Field label={t.ls_duration as string}>
        <RadioGroup
          value={data.duration}
          onChange={(v) => set('duration', v)}
          options={[
            { value: 'under_1m', label: t.ls_duration_under_1m as string },
            { value: '1_3m', label: t.ls_duration_1_3m as string },
            { value: '3_6m', label: t.ls_duration_3_6m as string },
            { value: 'over_6m', label: t.ls_duration_over_6m as string },
          ]}
        />
      </Field>

      <Field label={t.ls_accommodation as string}>
        <RadioGroup
          value={data.accommodation}
          onChange={(v) => set('accommodation', v)}
          options={[
            { value: 'homestay', label: t.ls_acc_homestay as string },
            { value: 'dormitory', label: t.ls_acc_dormitory as string },
            { value: 'no_preference', label: t.ls_acc_no_pref as string },
          ]}
        />
      </Field>

      <Field label={t.ls_overseas_experience as string}>
        <RadioGroup
          value={data.overseasExperience}
          onChange={(v) => set('overseasExperience', v)}
          options={[
            { value: 'none', label: t.ls_exp_none as string },
            { value: 'short_visit', label: t.ls_exp_short as string },
            { value: 'long_stay', label: t.ls_exp_long as string },
          ]}
        />
      </Field>

      <Field label={t.ls_budget as string}>
        <TextInput value={data.budget} onChange={(v) => set('budget', v)} placeholder={t.ls_budget_ph as string} />
      </Field>

      <div className="md:col-span-2">
        <Field label={t.ls_notes as string}>
          <TextArea value={data.notes} onChange={(v) => set('notes', v)} placeholder={t.ls_notes_ph as string} />
        </Field>
      </div>
    </div>
  )
}

/* ─── University Admission form ─── */

function defaultUniversityAdmissionSurvey(name: string): UniversityAdmissionSurvey {
  return {
    studentName: name,
    currentGrade: '',
    targetCountry: '',
    targetMajor: '',
    targetUniversityLevel: '',
    currentGpa: '',
    englishTestScore: '',
    targetEnrollmentYear: '',
    extracurriculars: '',
    budget: '',
    scholarshipNeeded: '',
    notes: '',
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
  const set = <K extends keyof UniversityAdmissionSurvey>(k: K, v: UniversityAdmissionSurvey[K]) =>
    onChange({ ...data, [k]: v })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label={t.ua_current_grade as string}>
        <TextInput value={data.currentGrade} onChange={(v) => set('currentGrade', v)} placeholder={t.ua_current_grade_ph as string} />
      </Field>

      <Field label={t.ua_target_country as string}>
        <TextInput value={data.targetCountry} onChange={(v) => set('targetCountry', v)} placeholder={t.ua_target_country_ph as string} />
      </Field>

      <Field label={t.ua_target_major as string}>
        <RadioGroup
          value={data.targetMajor}
          onChange={(v) => set('targetMajor', v)}
          options={[
            { value: 'stem', label: t.ua_major_stem as string },
            { value: 'humanities', label: t.ua_major_humanities as string },
            { value: 'business', label: t.ua_major_business as string },
            { value: 'arts', label: t.ua_major_arts as string },
            { value: 'medicine', label: t.ua_major_medicine as string },
            { value: 'undecided', label: t.ua_major_undecided as string },
          ]}
        />
      </Field>

      <Field label={t.ua_university_level as string}>
        <RadioGroup
          value={data.targetUniversityLevel}
          onChange={(v) => set('targetUniversityLevel', v)}
          options={[
            { value: 'top_tier', label: t.ua_level_top as string },
            { value: 'upper', label: t.ua_level_upper as string },
            { value: 'mid', label: t.ua_level_mid as string },
            { value: 'safety', label: t.ua_level_safety as string },
          ]}
        />
      </Field>

      <Field label={t.ua_gpa as string}>
        <TextInput value={data.currentGpa} onChange={(v) => set('currentGpa', v)} placeholder={t.ua_gpa_ph as string} />
      </Field>

      <Field label={t.ua_english_score as string}>
        <TextInput value={data.englishTestScore} onChange={(v) => set('englishTestScore', v)} placeholder={t.ua_english_score_ph as string} />
      </Field>

      <Field label={t.ua_enrollment_year as string}>
        <TextInput value={data.targetEnrollmentYear} onChange={(v) => set('targetEnrollmentYear', v)} placeholder={t.ua_enrollment_year_ph as string} />
      </Field>

      <Field label={t.ua_budget as string}>
        <TextInput value={data.budget} onChange={(v) => set('budget', v)} placeholder={t.ua_budget_ph as string} />
      </Field>

      <Field label={t.ua_scholarship as string}>
        <RadioGroup
          value={data.scholarshipNeeded}
          onChange={(v) => set('scholarshipNeeded', v)}
          options={[
            { value: 'yes', label: t.ua_scholarship_yes as string },
            { value: 'if_available', label: t.ua_scholarship_if as string },
            { value: 'no', label: t.ua_scholarship_no as string },
          ]}
        />
      </Field>

      <div className="md:col-span-2">
        <Field label={t.ua_extracurriculars as string}>
          <TextArea value={data.extracurriculars} onChange={(v) => set('extracurriculars', v)} placeholder={t.ua_extracurriculars_ph as string} />
        </Field>
      </div>

      <div className="md:col-span-2">
        <Field label={t.ua_notes as string}>
          <TextArea value={data.notes} onChange={(v) => set('notes', v)} placeholder={t.ua_notes_ph as string} />
        </Field>
      </div>
    </div>
  )
}

/* ─── Camp form ─── */

function defaultCampSurvey(name: string): CampSurvey {
  return {
    studentName: name,
    gradeOrAge: '',
    campSeason: '',
    targetCountry: '',
    interestArea: '',
    duration: '',
    englishLevel: '',
    priorCampExperience: '',
    companion: '',
    budget: '',
    specialNeeds: '',
  }
}

function CampForm({ data, onChange }: { data: CampSurvey; onChange: (d: CampSurvey) => void }) {
  const { t } = useLanguage()
  const set = <K extends keyof CampSurvey>(k: K, v: CampSurvey[K]) => onChange({ ...data, [k]: v })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label={t.camp_grade_or_age as string}>
        <TextInput value={data.gradeOrAge} onChange={(v) => set('gradeOrAge', v)} placeholder={t.camp_grade_or_age_ph as string} />
      </Field>

      <Field label={t.camp_target_country as string}>
        <TextInput value={data.targetCountry} onChange={(v) => set('targetCountry', v)} placeholder={t.camp_target_country_ph as string} />
      </Field>

      <Field label={t.camp_season as string}>
        <RadioGroup
          value={data.campSeason}
          onChange={(v) => set('campSeason', v)}
          options={[
            { value: 'summer', label: t.camp_season_summer as string },
            { value: 'winter', label: t.camp_season_winter as string },
          ]}
        />
      </Field>

      <Field label={t.camp_interest_area as string}>
        <RadioGroup
          value={data.interestArea}
          onChange={(v) => set('interestArea', v)}
          options={[
            { value: 'language', label: t.camp_interest_language as string },
            { value: 'stem', label: t.camp_interest_stem as string },
            { value: 'arts', label: t.camp_interest_arts as string },
            { value: 'sports', label: t.camp_interest_sports as string },
            { value: 'culture', label: t.camp_interest_culture as string },
            { value: 'other', label: t.camp_interest_other as string },
          ]}
        />
      </Field>

      <Field label={t.camp_duration as string}>
        <RadioGroup
          value={data.duration}
          onChange={(v) => set('duration', v)}
          options={[
            { value: '2weeks', label: t.camp_duration_2w as string },
            { value: '3_4weeks', label: t.camp_duration_3_4w as string },
            { value: '5_6weeks', label: t.camp_duration_5_6w as string },
            { value: 'over_6weeks', label: t.camp_duration_over_6w as string },
          ]}
        />
      </Field>

      <Field label={t.camp_english_level as string}>
        <RadioGroup
          value={data.englishLevel}
          onChange={(v) => set('englishLevel', v)}
          options={[
            { value: 'none', label: t.ls_english_none as string },
            { value: 'beginner', label: t.ls_english_beginner as string },
            { value: 'intermediate', label: t.ls_english_intermediate as string },
            { value: 'advanced', label: t.ls_english_advanced as string },
          ]}
        />
      </Field>

      <Field label={t.camp_prior_experience as string}>
        <RadioGroup
          value={data.priorCampExperience}
          onChange={(v) => set('priorCampExperience', v)}
          options={[
            { value: 'none', label: t.camp_exp_none as string },
            { value: 'domestic', label: t.camp_exp_domestic as string },
            { value: 'overseas', label: t.camp_exp_overseas as string },
          ]}
        />
      </Field>

      <Field label={t.camp_companion as string}>
        <RadioGroup
          value={data.companion}
          onChange={(v) => set('companion', v)}
          options={[
            { value: 'alone', label: t.camp_alone as string },
            { value: 'with_friend', label: t.camp_with_friend as string },
            { value: 'with_sibling', label: t.camp_with_sibling as string },
          ]}
        />
      </Field>

      <Field label={t.camp_budget as string}>
        <TextInput value={data.budget} onChange={(v) => set('budget', v)} placeholder={t.camp_budget_ph as string} />
      </Field>

      <div className="md:col-span-2">
        <Field label={t.camp_special_needs as string}>
          <TextArea value={data.specialNeeds} onChange={(v) => set('specialNeeds', v)} placeholder={t.camp_special_needs_ph as string} />
        </Field>
      </div>
    </div>
  )
}

/* ─── Immigration form ─── */

function defaultImmigrationSurvey(name: string): ImmigrationSurvey {
  return {
    applicantName: name,
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
  const set = <K extends keyof ImmigrationSurvey>(k: K, v: ImmigrationSurvey[K]) =>
    onChange({ ...data, [k]: v })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label={t.imm_applicant_name as string}>
        <TextInput value={data.applicantName} onChange={(v) => set('applicantName', v)} />
      </Field>

      <Field label={t.imm_age as string}>
        <TextInput value={data.age} onChange={(v) => set('age', v)} placeholder={t.imm_age_ph as string} />
      </Field>

      <Field label={t.imm_target_country as string}>
        <TextInput value={data.targetCountry} onChange={(v) => set('targetCountry', v)} placeholder={t.imm_target_country_ph as string} />
      </Field>

      <Field label={t.imm_immigration_type as string}>
        <RadioGroup
          value={data.immigrationType}
          onChange={(v) => set('immigrationType', v)}
          options={[
            { value: 'skilled', label: t.imm_type_skilled as string },
            { value: 'investment', label: t.imm_type_investment as string },
            { value: 'family', label: t.imm_type_family as string },
            { value: 'post_study', label: t.imm_type_post_study as string },
            { value: 'business', label: t.imm_type_business as string },
          ]}
        />
      </Field>

      <Field label={t.imm_current_visa as string}>
        <RadioGroup
          value={data.currentVisaStatus}
          onChange={(v) => set('currentVisaStatus', v)}
          options={[
            { value: 'none', label: t.imm_visa_none as string },
            { value: 'student', label: t.imm_visa_student as string },
            { value: 'work', label: t.imm_visa_work as string },
            { value: 'other', label: t.imm_visa_other as string },
          ]}
        />
      </Field>

      <Field label={t.imm_family as string}>
        <RadioGroup
          value={data.familyComposition}
          onChange={(v) => set('familyComposition', v)}
          options={[
            { value: 'alone', label: t.imm_family_alone as string },
            { value: 'with_spouse', label: t.imm_family_spouse as string },
            { value: 'with_children', label: t.imm_family_children as string },
            { value: 'whole_family', label: t.imm_family_whole as string },
          ]}
        />
      </Field>

      <Field label={t.imm_education as string}>
        <RadioGroup
          value={data.education}
          onChange={(v) => set('education', v)}
          options={[
            { value: 'high_school', label: t.imm_edu_high_school as string },
            { value: 'bachelor', label: t.imm_edu_bachelor as string },
            { value: 'master', label: t.imm_edu_master as string },
            { value: 'phd', label: t.imm_edu_phd as string },
          ]}
        />
      </Field>

      <Field label={t.imm_occupation as string}>
        <TextInput value={data.occupation} onChange={(v) => set('occupation', v)} placeholder={t.imm_occupation_ph as string} />
      </Field>

      <Field label={t.imm_timeline as string}>
        <TextInput value={data.targetTimeline} onChange={(v) => set('targetTimeline', v)} placeholder={t.imm_timeline_ph as string} />
      </Field>

      <Field label={t.imm_budget as string}>
        <TextInput value={data.budget} onChange={(v) => set('budget', v)} placeholder={t.imm_budget_ph as string} />
      </Field>

      <div className="md:col-span-2">
        <Field label={t.imm_notes as string}>
          <TextArea value={data.notes} onChange={(v) => set('notes', v)} placeholder={t.imm_notes_ph as string} />
        </Field>
      </div>
    </div>
  )
}

/* ─── Public export: PurposeSurveyForm ─── */

function buildDefaultSurvey(purpose: StudyAbroadPurpose, name: string): PurposeSurvey {
  switch (purpose) {
    case 'language_study':
      return { type: 'language_study', data: defaultLanguageStudySurvey(name) }
    case 'university_admission':
      return { type: 'university_admission', data: defaultUniversityAdmissionSurvey(name) }
    case 'summer_winter_camp':
      return { type: 'summer_winter_camp', data: defaultCampSurvey(name) }
    case 'immigration':
      return { type: 'immigration', data: defaultImmigrationSurvey(name) }
  }
}

export function PurposeSurveyForm({ c, save }: { c: StudentCase; save: (c: StudentCase) => void }) {
  const { t } = useLanguage()
  const purpose = c.student.studyAbroadPurpose

  const initial: PurposeSurvey = c.purposeSurvey ??
    (purpose ? buildDefaultSurvey(purpose, c.student.name) : { type: 'language_study', data: defaultLanguageStudySurvey(c.student.name) })

  const [draft, setDraft] = useState<PurposeSurvey>(initial)
  const [saved, setSaved] = useState(false)

  if (!purpose) {
    return (
      <div className="py-12 text-center font-body text-sm text-on-surface-variant/50">
        {t.students_modal_purpose as string}이 설정되지 않았습니다.
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
    language_study: t.ls_survey_title as string,
    university_admission: t.ua_survey_title as string,
    summer_winter_camp: t.camp_survey_title as string,
    immigration: t.imm_survey_title as string,
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-lg text-on-surface">{titleKey[purpose]}</h2>
        <p className="font-body text-sm text-on-surface-variant/60 mt-1">{t.purpose_survey_sub as string}</p>
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

      <div className="flex justify-end pt-2">
        <button
          type="button"
          onClick={handleSave}
          className="px-6 py-2.5 bg-secondary text-on-secondary font-label text-sm hover:bg-secondary/90 transition-colors"
        >
          {saved ? (t.purpose_survey_saved as string) : (t.purpose_survey_save as string)}
        </button>
      </div>
    </div>
  )
}
