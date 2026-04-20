import type { DiagnosisData, ObserverEntry } from '../../../data/diagnosis-template'
import { useLanguage } from '../../../context/LanguageContext'

interface Props {
  data: DiagnosisData
  onChange: (d: DiagnosisData) => void
}

const CATEGORY_ICONS: Record<keyof DiagnosisData['observer'], string> = {
  english: 'translate',
  attitude: 'psychology',
  interest: 'explore',
  personality: 'person_search',
  overseas: 'flight_takeoff',
}

const CATEGORY_ORDER: (keyof DiagnosisData['observer'])[] = ['english', 'attitude', 'interest', 'personality', 'overseas']

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
  const { t } = useLanguage()

  const updateEntry = (catKey: keyof DiagnosisData['observer'], idx: number, field: keyof ObserverEntry, value: string | number) => {
    onChange({
      ...data,
      observer: {
        ...data.observer,
        [catKey]: data.observer[catKey].map((e, i) => i === idx ? { ...e, [field]: value } : e),
      },
    })
  }

  const labels = t.diag_obs_labels as Record<string, string>

  return (
    <div>
      <p className="font-body text-sm text-on-surface-variant/50 mb-6">
        {t.diag_obs_intro}
      </p>

      <div className="space-y-8">
        {CATEGORY_ORDER.map((key) => (
          <div key={key}>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary text-lg">{CATEGORY_ICONS[key]}</span>
              <h4 className="font-headline text-base text-primary">{t.diag_obs_categories[key]}</h4>
            </div>
            <div className="space-y-3">
              {data.observer[key].map((entry, i) => (
                <div key={entry.label} className="bg-surface-container-low p-4 border border-outline-variant/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body text-sm text-primary">{labels[entry.label] || entry.label}</span>
                    <StarInput value={entry.score} onChange={(v) => updateEntry(key, i, 'score', v)} />
                  </div>
                  <input
                    value={entry.note}
                    onChange={(e) => updateEntry(key, i, 'note', e.target.value)}
                    placeholder={t.diag_obs_notes_placeholder}
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
