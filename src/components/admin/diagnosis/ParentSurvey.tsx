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

const INTEREST_KO: Record<string, string> = {
  'Reading': '독서', 'Math / Science': '수학/과학', 'Sports': '운동', 'Art / Drawing': '미술/그림',
  'Music': '음악', 'Coding / Tech': '코딩/기술', 'Writing': '글쓰기', 'Debate': '토론',
  'Travel': '여행', 'Gaming': '게임',
}

export function ParentSurvey({ data, onChange }: Props) {
  const { language } = useLanguage()
  const ko = language === 'ko'
  const p = data.parent

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
        {ko ? '상담 전 작성합니다. 아이의 배경과 부모님의 목표를 파악하는 데 도움이 됩니다.' : 'Fill out before the consultation. Helps us understand the child\'s background and parent goals.'}
      </p>

      <Field label={ko ? '학생 이름' : 'Student Name'} value={p.studentName} onChange={(v) => set('studentName', v)} placeholder={ko ? '예: 김소피아' : 'e.g. Sophia Kim'} />
      <Field label={ko ? '학년 / 나이' : 'Grade / Age'} value={p.grade} onChange={(v) => set('grade', v)} placeholder={ko ? '예: 초등 4학년 / 10세' : 'e.g. Grade 4 / 10 years old'} />
      <Field label={ko ? '학교명' : 'School Name'} value={p.school} onChange={(v) => set('school', v)} placeholder={ko ? '예: 서울국제학교' : 'e.g. Seoul International School'} />
      <Field label={ko ? '커리큘럼' : 'Curriculum'} value={p.curriculum} onChange={(v) => set('curriculum', v)} placeholder={ko ? '예: IB, AP, 국내 교과과정 등' : 'e.g. IB, AP, Korean National, etc.'} />
      <Field label={ko ? '영어 노출 경험' : 'English Exposure'} value={p.englishExposure} onChange={(v) => set('englishExposure', v)} placeholder={ko ? '예: 국제학교 3년 / 7세부터 영어학원' : 'e.g. 3 years at international school'} />

      <div className="mb-5">
        <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-2 block">{ko ? '아이의 관심사 (해당 항목 모두 선택)' : 'Child\'s Interests (select all that apply)'}</span>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((item) => {
            const active = p.interests.includes(item)
            return (
              <button key={item} type="button" onClick={() => toggleInterest(item)}
                className={`px-3 py-1.5 font-body text-xs border transition-colors ${active ? 'border-secondary bg-secondary/10 text-secondary' : 'border-outline-variant/30 text-on-surface-variant/50 hover:border-secondary'}`}>
                {ko ? INTEREST_KO[item] || item : item}
              </button>
            )
          })}
        </div>
      </div>

      <Field label={ko ? '교육 목표' : 'Education Goal'} value={p.educationGoal} onChange={(v) => set('educationGoal', v)} multiline
        placeholder={ko ? '아이의 교육에 대해 바라시는 점은? 예: 미국 대학 입학, 방향 찾기, 영어 실력 향상...' : 'What do you hope for your child\'s education?'} />
      <Field label={ko ? '해외 경험' : 'Overseas Experience'} value={p.overseasExperience} onChange={(v) => set('overseasExperience', v)}
        placeholder={ko ? '예: 싱가포르 2년 거주 / 해외 경험 없음' : 'e.g. Lived in Singapore for 2 years'} />
      <Field label={ko ? '우려 사항 또는 질문' : 'Concerns or Questions'} value={p.concerns} onChange={(v) => set('concerns', v)} multiline
        placeholder={ko ? '아이의 교육 경로에 대한 구체적인 우려 사항이 있으시면 적어주세요...' : 'Any specific concerns about your child\'s education path...'} />
    </div>
  )
}
