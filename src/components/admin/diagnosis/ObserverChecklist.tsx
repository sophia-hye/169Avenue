import { useState } from 'react'
import type {
  DiagnosisData,
  ObserverDomain,
  ObserverDomainKey,
  ObserverItem,
} from '../../../data/diagnosis-template'
import { OBSERVER_DOMAIN_KEYS } from '../../../data/diagnosis-template'
import {
  computeDomainAverages,
  computeTrackFits,
  pickRecommendedTrack,
  scoreLevel,
} from '../../../data/observer-interpretation'
import { useLanguage } from '../../../context/LanguageContext'

interface Props {
  data: DiagnosisData
  onChange: (d: DiagnosisData) => void
}

export function ObserverChecklist({ data, onChange }: Props) {
  const { t } = useLanguage()
  const [open, setOpen] = useState<Record<ObserverDomainKey, boolean>>({
    focus: true, exploration: false, expression: false, coachability: false, confidence: false, adaptability: false,
  })
  const [criteriaFor, setCriteriaFor] = useState<string | null>(null)

  const domainLabels = t.diag_obs_domains as Record<ObserverDomainKey, string>
  const domainBlurbs = t.diag_obs_domain_blurb as Record<ObserverDomainKey, string>
  const domainIcons  = t.diag_obs_domain_icons as Record<ObserverDomainKey, string>
  const interp       = t.diag_obs_interp as Record<ObserverDomainKey, Record<'high' | 'mid' | 'low', string>>
  const items        = t.diag_obs_items as Record<string, { label: string; s1: string; s3: string; s5: string }>
  const trackNames   = t.diag_obs_track_names as Record<string, string>

  const avgs = computeDomainAverages(data.observer)
  const fits = computeTrackFits(avgs)
  const overall = OBSERVER_DOMAIN_KEYS.reduce((s, k) => s + avgs[k], 0) / OBSERVER_DOMAIN_KEYS.length
  const { track: recTrack, confidence: recConf } = pickRecommendedTrack(fits, overall)

  const updateItem = (domainKey: ObserverDomainKey, itemIdx: number, patch: Partial<ObserverItem>) => {
    const dom = data.observer[domainKey]
    const nextItems = dom.items.map((it, i) => i === itemIdx ? { ...it, ...patch } : it)
    updateDomain(domainKey, { items: nextItems })
  }

  const updateDomain = (domainKey: ObserverDomainKey, patch: Partial<ObserverDomain>) => {
    onChange({
      ...data,
      observer: { ...data.observer, [domainKey]: { ...data.observer[domainKey], ...patch } },
    })
  }

  const updateOverall = (v: string) => {
    onChange({ ...data, summary: { ...data.summary, overallNote: v } })
  }

  const toggle = (k: ObserverDomainKey) => setOpen({ ...open, [k]: !open[k] })
  const expandAll = () => setOpen({ focus: true, exploration: true, expression: true, coachability: true, confidence: true, adaptability: true })
  const collapseAll = () => setOpen({ focus: false, exploration: false, expression: false, coachability: false, confidence: false, adaptability: false })
  const allOpen = OBSERVER_DOMAIN_KEYS.every((k) => open[k])

  return (
    <div>
      {/* Header + live recommendation */}
      <div className="mb-8 pb-6 border-b border-outline-variant/15 flex items-start justify-between gap-8 flex-wrap">
        <div className="max-w-xl">
          <p className="font-body text-sm text-on-surface-variant/60 leading-relaxed">
            {t.diag_obs_intro}
          </p>
        </div>
        <div className="bg-primary text-on-primary px-5 py-3 min-w-[280px]">
          <div className="font-label text-[9px] uppercase tracking-[0.22em] text-secondary/90 mb-1">
            {t.diag_obs_rec_track_label}
          </div>
          <div className="flex items-baseline justify-between gap-3">
            <div className="font-headline text-lg tracking-tight">{trackNames[recTrack.key]}</div>
            <div className="flex items-baseline gap-2">
              <span className="font-body text-base font-semibold">{recTrack.pct}%</span>
              <span className={`font-label text-[9px] uppercase tracking-widest ${
                recConf === 'high' ? 'text-emerald-300' : recConf === 'mid' ? 'text-amber-300' : 'text-on-primary/50'
              }`}>
                {recConf}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expand/Collapse */}
      <div className="flex justify-end mb-3">
        <button onClick={allOpen ? collapseAll : expandAll}
          className="font-body text-xs text-on-surface-variant/50 hover:text-primary transition-colors">
          {allOpen ? t.diag_obs_collapse_all : t.diag_obs_expand_all}
        </button>
      </div>

      {/* Domain accordions */}
      <div className="space-y-3">
        {OBSERVER_DOMAIN_KEYS.map((key) => {
          const domain = data.observer[key]
          const avg = avgs[key]
          const level = scoreLevel(avg)
          const isOpen = open[key]
          const fitPct = Math.round((avg / 5) * 100)
          return (
            <div key={key} className="border border-outline-variant/15 bg-surface-container-lowest">
              {/* Header */}
              <button onClick={() => toggle(key)}
                className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-secondary text-xl shrink-0">{domainIcons[key]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-headline text-base text-primary tracking-tight">{domainLabels[key]}</h4>
                    <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant/40">
                      {domain.items.length} items
                    </span>
                  </div>
                  <p className="font-body text-xs text-on-surface-variant/50 truncate">
                    {interp[key][level]}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-24 h-1 bg-outline-variant/20 overflow-hidden rounded-full">
                    <div className="h-full bg-secondary transition-all" style={{ width: `${fitPct}%` }} />
                  </div>
                  <div className="font-headline text-lg text-primary w-10 text-right">{avg.toFixed(1)}</div>
                  <span className={`material-symbols-outlined text-on-surface-variant/40 text-base transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>
              </button>

              {/* Expanded: blurb + items + mentor note */}
              {isOpen && (
                <div className="px-5 pb-5 pt-2 border-t border-outline-variant/10">
                  <p className="font-body italic text-xs text-on-surface-variant/60 mb-4 mt-3">
                    &ldquo;{domainBlurbs[key]}&rdquo;
                  </p>

                  <div className="space-y-3">
                    {domain.items.map((it, i) => {
                      const copy = items[it.key] || { label: it.label, s1: '', s3: '', s5: '' }
                      const showCriteria = criteriaFor === `${key}-${it.key}`
                      return (
                        <div key={it.key} className="bg-surface-container-low p-3 border border-outline-variant/10">
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="font-body text-sm text-primary truncate">{copy.label}</span>
                              <button type="button"
                                onClick={() => setCriteriaFor(showCriteria ? null : `${key}-${it.key}`)}
                                title={t.diag_obs_criteria_title as string}
                                className={`material-symbols-outlined text-sm transition-colors ${
                                  showCriteria ? 'text-secondary' : 'text-on-surface-variant/30 hover:text-primary'
                                }`}>
                                info
                              </button>
                            </div>
                            <ScoreSegmented value={it.score} onChange={(v) => updateItem(key, i, { score: v })} />
                          </div>

                          {showCriteria && (
                            <div className="mt-2 mb-3 bg-surface p-3 border-l-2 border-secondary/40">
                              <div className="font-label text-[9px] uppercase tracking-widest text-secondary mb-2">
                                {t.diag_obs_criteria_title}
                              </div>
                              <div className="space-y-1.5 font-body text-xs text-on-surface-variant/80">
                                <div><span className="font-semibold text-primary mr-2">{t.diag_obs_criteria_1}</span>{copy.s1}</div>
                                <div><span className="font-semibold text-primary mr-2">{t.diag_obs_criteria_3}</span>{copy.s3}</div>
                                <div><span className="font-semibold text-primary mr-2">{t.diag_obs_criteria_5}</span>{copy.s5}</div>
                              </div>
                            </div>
                          )}

                          <input
                            value={it.note}
                            onChange={(e) => updateItem(key, i, { note: e.target.value })}
                            placeholder={t.diag_obs_notes_placeholder as string}
                            className="w-full border border-outline-variant/20 px-2.5 py-1.5 font-body text-xs text-on-surface-variant bg-surface outline-none focus:border-secondary transition-colors"
                          />
                        </div>
                      )
                    })}
                  </div>

                  {/* Mentor summary for this domain */}
                  <div className="mt-4">
                    <label className="block">
                      <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-1 block">
                        {t.diag_obs_mentor_note_label}
                      </span>
                      <textarea
                        value={domain.mentorNote}
                        onChange={(e) => updateDomain(key, { mentorNote: e.target.value })}
                        placeholder={t.diag_obs_mentor_note_ph as string}
                        rows={2}
                        className="w-full border border-outline-variant/25 px-3 py-2 font-body text-sm text-primary bg-surface outline-none focus:border-secondary transition-colors resize-none"
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Overall Observation */}
      <div className="mt-8 pt-6 border-t border-outline-variant/15">
        <label className="block">
          <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2 block">
            {t.diag_obs_overall_note_label}
          </span>
          <textarea
            value={data.summary.overallNote}
            onChange={(e) => updateOverall(e.target.value)}
            placeholder={t.diag_obs_overall_note_ph as string}
            rows={4}
            className="w-full border border-outline-variant/25 px-4 py-3 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary transition-colors resize-none"
          />
        </label>
      </div>
    </div>
  )
}

function ScoreSegmented({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= value
        return (
          <button key={n} type="button" onClick={() => onChange(n)}
            className={`w-7 h-7 font-body text-xs font-semibold border transition-colors ${
              active
                ? 'bg-[#6B4F4F] border-[#6B4F4F] text-white'
                : 'border-outline-variant/30 text-on-surface-variant/40 hover:border-[#6B4F4F]/60 hover:text-[#6B4F4F]'
            }`}>
            {n}
          </button>
        )
      })}
    </div>
  )
}
