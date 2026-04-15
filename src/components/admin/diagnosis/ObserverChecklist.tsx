import type { DiagnosisData, ObserverEntry } from '../../../data/diagnosis-template'
import { useLanguage } from '../../../context/LanguageContext'

interface Props {
  data: DiagnosisData
  onChange: (d: DiagnosisData) => void
}

const CATEGORY_META = (ko: boolean): { key: keyof DiagnosisData['observer']; label: string; icon: string }[] => [
  { key: 'english', label: ko ? '영어 / 커뮤니케이션' : 'English / Communication', icon: 'translate' },
  { key: 'attitude', label: ko ? '학습 태도' : 'Learning Attitude', icon: 'psychology' },
  { key: 'interest', label: ko ? '관심 분야 / 방향' : 'Interest / Direction', icon: 'explore' },
  { key: 'personality', label: ko ? '성향 유형' : 'Personality Type', icon: 'person_search' },
  { key: 'overseas', label: ko ? '해외 적합성' : 'Overseas Readiness', icon: 'flight_takeoff' },
]

const LABEL_KO: Record<string, string> = {
  'Conversation Level': '회화 수준', 'Presentation Confidence': '발표 자신감',
  'Listening Comprehension': '듣기 이해력', 'Vocabulary Range': '어휘 범위',
  'Focus / Concentration': '집중력', 'Task Completion': '과제 수행력',
  'Adaptability': '적응력', 'Participation': '참여도',
  'Academic Curiosity': '학업 호기심', 'Sports Engagement': '스포츠 참여도',
  'Art / Creative Expression': '예술 / 창의적 표현', 'Leadership Initiative': '리더십',
  'Exploratory Drive': '탐색 성향', 'Depth of Focus': '집중 깊이',
  'Expressiveness': '표현력', 'Social Confidence': '사회적 자신감',
  'Environmental Adaptability': '환경 적응력', 'Independence': '독립성',
  'Cultural Openness': '문화 개방성', 'Stress Resilience': '스트레스 회복력',
}

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onChange(n)}
          className={`text-lg transition-colors ${n <= value ? 'text-[#6B4F4F]' : 'text-outline-variant/25 hover:text-[#6B4F4F]/40'}`}>
          {n <= value ? '\u2605' : '\u2606'}
        </button>
      ))}
    </div>
  )
}

export function ObserverChecklist({ data, onChange }: Props) {
  const { language } = useLanguage()
  const ko = language === 'ko'

  const updateEntry = (catKey: keyof DiagnosisData['observer'], idx: number, field: keyof ObserverEntry, value: string | number) => {
    onChange({
      ...data,
      observer: {
        ...data.observer,
        [catKey]: data.observer[catKey].map((e, i) => i === idx ? { ...e, [field]: value } : e),
      },
    })
  }

  return (
    <div>
      <p className="font-body text-sm text-on-surface-variant/50 mb-6">
        {ko ? '프로그램 중 또는 후에 각 항목을 평가합니다. 특이사항은 메모에 기록하세요.' : 'Rate each item during or after the program. Add notes for anything notable.'}
      </p>

      <div className="space-y-8">
        {CATEGORY_META(ko).map(({ key, label, icon }) => (
          <div key={key}>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary text-lg">{icon}</span>
              <h4 className="font-headline text-base text-primary">{label}</h4>
            </div>
            <div className="space-y-3">
              {data.observer[key].map((entry, i) => (
                <div key={entry.label} className="bg-surface-container-low p-4 border border-outline-variant/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-sm text-primary">{ko ? LABEL_KO[entry.label] || entry.label : entry.label}</span>
                    <StarInput value={entry.score} onChange={(v) => updateEntry(key, i, 'score', v)} />
                  </div>
                  <input
                    value={entry.note}
                    onChange={(e) => updateEntry(key, i, 'note', e.target.value)}
                    placeholder={ko ? '메모 (선택)' : 'Notes (optional)'}
                    className="w-full border border-outline-variant/20 px-3 py-1.5 font-body text-xs text-on-surface-variant bg-surface outline-none focus:border-secondary"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
