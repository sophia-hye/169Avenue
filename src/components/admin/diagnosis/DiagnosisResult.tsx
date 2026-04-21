import { calcRadarScores, OBSERVER_DOMAIN_KEYS, PERSONALITY_LABELS, type DiagnosisData, type PersonalityType } from '../../../data/diagnosis-template'
import {
  computeDomainAverages,
  computeTrackFits,
  pickRecommendedTrack,
  computeAutoTypes,
} from '../../../data/observer-interpretation'
import { RadarChart } from './RadarChart'
import { useLanguage } from '../../../context/LanguageContext'

interface Props {
  data: DiagnosisData
  onChange: (d: DiagnosisData) => void
}

interface Grades { excellent: string; good: string; average: string; developing: string }

function ScoreGrade(score: number, grades: Grades): { label: string; color: string } {
  if (score >= 4.5) return { label: grades.excellent, color: '#2D6A4F' }
  if (score >= 3.5) return { label: grades.good, color: '#6B4F4F' }
  if (score >= 2.5) return { label: grades.average, color: '#7A7560' }
  return { label: grades.developing, color: '#9B958D' }
}

export function DiagnosisResult({ data, onChange }: Props) {
  const { t, language } = useLanguage()
  const ko = language === 'ko'
  const scores = calcRadarScores(data.observer)
  const axisMap = t.diag_res_axis as Record<string, string>
  const displayScores = scores.map((s) => ({ ...s, axis: axisMap[s.axis] || s.axis }))
  const s = data.summary
  const overall = scores.reduce((sum, sc) => sum + sc.value, 0) / scores.length

  const avgs = computeDomainAverages(data.observer)
  const fits = computeTrackFits(avgs)
  const { track: recTrack } = pickRecommendedTrack(fits, overall)
  const trackNames = t.diag_obs_track_names as Record<string, string>

  const set = (field: keyof typeof s, value: string | PersonalityType[]) => {
    onChange({ ...data, summary: { ...s, [field]: value } })
  }

  const toggleType = (type: PersonalityType) => {
    const next = s.type.includes(type) ? s.type.filter((x) => x !== type) : [...s.type, type]
    set('type', next)
  }

  const autoTypes = computeAutoTypes(avgs)
  const overallGrade = ScoreGrade(overall, t.diag_res_grades)

  return (
    <div>
      {/* Overall Score Banner */}
      <div className="bg-surface-container-low p-6 mb-8 flex items-center gap-8">
        <div className="text-center px-6 border-r border-outline-variant/15">
          <div className="font-headline text-4xl text-primary">{overall.toFixed(1)}</div>
          <div className="font-body text-xs mt-1" style={{ color: overallGrade.color }}>
            {overallGrade.label}
          </div>
          <div className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant/40 mt-1">
            {t.diag_res_overall}
          </div>
        </div>
        <div className="flex-1 grid grid-cols-6 gap-3">
          {displayScores.map((sc) => {
            const g = ScoreGrade(sc.value, t.diag_res_grades)
            return (
              <div key={sc.axis} className="text-center">
                <div className="font-headline text-xl text-primary">{sc.value.toFixed(1)}</div>
                <div className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant/50 mt-0.5 truncate">{sc.axis}</div>
                <div className="w-full h-1.5 bg-outline-variant/10 rounded-full mt-2 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(sc.value / 5) * 100}%`, background: g.color }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Auto-recommended track */}
      <div className="mb-8 bg-primary text-on-primary p-5 flex items-center justify-between gap-6 flex-wrap">
        <div>
          <div className="font-label text-[10px] uppercase tracking-[0.22em] text-secondary/80 mb-1">
            {t.diag_obs_rec_track_label}
          </div>
          <div className="font-headline text-xl tracking-tight">{trackNames[recTrack.key]}</div>
        </div>
        <div className="flex items-center gap-6">
          {fits.slice(0, 3).map((f) => (
            <div key={f.key} className="text-right">
              <div className="font-body text-[10px] uppercase tracking-widest opacity-60">{trackNames[f.key]}</div>
              <div className="font-headline text-base">{f.pct}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar Chart + Key Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="flex flex-col items-center justify-center bg-surface-container-low p-6">
          <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.diag_res_radar_title}</h4>
          <RadarChart data={displayScores} size={280} />
        </div>

        <div className="bg-surface-container-low p-6">
          <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.diag_res_findings_title}</h4>
          <div className="space-y-4">
            {scores.map((sc, i) => {
              const key = OBSERVER_DOMAIN_KEYS[i]
              const entries = data.observer[key].items
              const topEntry = [...entries].sort((a, b) => b.score - a.score)[0]
              const lowEntry = [...entries].sort((a, b) => a.score - b.score)[0]
              const g = ScoreGrade(sc.value, t.diag_res_grades)
              const items = t.diag_obs_items as Record<string, { label: string }>
              const topLabel = topEntry ? (items[topEntry.key]?.label || topEntry.label) : ''
              const lowLabel = lowEntry ? (items[lowEntry.key]?.label || lowEntry.label) : ''
              return (
                <div key={sc.axis} className="border-b border-outline-variant/10 pb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-body text-sm font-medium text-primary">{displayScores[i].axis}</span>
                    <span className="font-body text-xs px-2 py-0.5" style={{ color: g.color, background: `${g.color}10` }}>
                      {g.label}
                    </span>
                  </div>
                  <div className="flex gap-4 text-xs text-on-surface-variant/60">
                    <span>{t.diag_res_strength}: <span className="text-primary">{topLabel}</span> ({topEntry?.score}/5)</span>
                    {lowLabel !== topLabel && (
                      <span>{t.diag_res_improve}: <span className="text-primary">{lowLabel}</span> ({lowEntry?.score}/5)</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Personality Type */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary">{t.diag_res_personality_title}</h4>
          {autoTypes.length > 0 && (
            <span className="font-body text-xs text-on-surface-variant/40">
              {t.diag_res_auto_detected}: {autoTypes.map((type) => ko ? PERSONALITY_LABELS[type].ko : PERSONALITY_LABELS[type].en).join(', ')}
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(PERSONALITY_LABELS) as PersonalityType[]).map((type) => {
            const info = PERSONALITY_LABELS[type]
            const active = s.type.includes(type)
            const isAuto = autoTypes.includes(type)
            return (
              <button key={type} type="button" onClick={() => toggleType(type)}
                className={`p-4 border text-left transition-colors ${active ? 'border-secondary bg-secondary/5' : 'border-outline-variant/20 hover:border-secondary/50'}`}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-body text-sm font-medium ${active ? 'text-secondary' : 'text-on-surface-variant/60'}`}>
                    {ko ? info.ko : info.en}
                  </span>
                  {isAuto && <span className="text-[9px] text-secondary bg-secondary/10 px-1.5 py-0.5">AUTO</span>}
                </div>
                <span className="font-body text-xs text-on-surface-variant/40">{ko ? info.desc_ko : info.desc_en}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Observation Highlights (flattened item notes + domain mentor notes) */}
      <div className="mb-8 bg-surface-container-low p-6">
        <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.diag_res_observation_title}</h4>
        <div className="space-y-2">
          {OBSERVER_DOMAIN_KEYS.flatMap((key) => {
            const dom = data.observer[key]
            const domainLabel = (t.diag_obs_domains as Record<string, string>)[key]
            const itemLabels = t.diag_obs_items as Record<string, { label: string }>
            const rows: { category: string; label: string; note: string }[] = []
            if (dom.mentorNote) rows.push({ category: domainLabel, label: t.diag_obs_mentor_note_label as string, note: dom.mentorNote })
            for (const it of dom.items) {
              if (it.note) rows.push({ category: domainLabel, label: itemLabels[it.key]?.label || it.label, note: it.note })
            }
            return rows
          }).map((row, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-outline-variant/5">
              <span className="font-body text-xs text-secondary shrink-0 mt-0.5">{row.category}</span>
              <span className="font-body text-xs text-on-surface-variant/40 shrink-0">{row.label}:</span>
              <span className="font-body text-sm text-primary">{row.note}</span>
            </div>
          ))}
          {OBSERVER_DOMAIN_KEYS.every((k) => !data.observer[k].mentorNote && data.observer[k].items.every((it) => !it.note)) && (
            <p className="font-body text-xs text-on-surface-variant/30">{t.diag_res_no_observations}</p>
          )}
        </div>
      </div>

      {/* Summary Fields */}
      <div className="space-y-5">
        <label className="block">
          <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-1 block">{t.diag_res_overall_assessment}</span>
          <textarea value={s.overallNote} onChange={(e) => set('overallNote', e.target.value)} rows={4}
            placeholder={t.diag_res_overall_assessment_ph}
            className="w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary" />
        </label>
        <label className="block">
          <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-1 block">{t.diag_res_recommended_direction}</span>
          <textarea value={s.recommendedDirection} onChange={(e) => set('recommendedDirection', e.target.value)} rows={3}
            placeholder={t.diag_res_recommended_direction_ph}
            className="w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary" />
        </label>
        <label className="block">
          <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-1 block">{t.diag_res_next_steps}</span>
          <textarea value={s.nextSteps} onChange={(e) => set('nextSteps', e.target.value)} rows={3}
            placeholder={t.diag_res_next_steps_ph}
            className="w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary" />
        </label>
      </div>
    </div>
  )
}
