import type {
  ObserverMap,
  ObserverDomainKey,
} from './diagnosis-template'
import { OBSERVER_DOMAIN_KEYS } from './diagnosis-template'

export type TrackKey = 'discovery' | 'decision' | 'direction' | 'academic' | 'elite'
export const TRACK_KEYS: TrackKey[] = ['discovery', 'decision', 'direction', 'academic', 'elite']

/**
 * Track weights over 6 domains (each row sums to 1.0).
 * Tuned so that:
 *  - Discovery prizes exploration + expression + confidence (early talent-finding)
 *  - Decision prizes coachability + exploration + focus (direction-setting)
 *  - Direction prizes expression + coachability + focus (specialist execution)
 *  - Academic prizes focus + coachability (deep study)
 *  - Elite prizes a broad, balanced profile with focus + coachability as floor
 */
export const TRACK_WEIGHTS: Record<TrackKey, Record<ObserverDomainKey, number>> = {
  discovery: { exploration: 0.35, expression: 0.20, confidence: 0.20, coachability: 0.10, focus: 0.10, adaptability: 0.05 },
  decision:  { coachability: 0.25, exploration: 0.20, focus: 0.20, expression: 0.15, confidence: 0.10, adaptability: 0.10 },
  direction: { expression: 0.30, coachability: 0.25, focus: 0.20, confidence: 0.15, exploration: 0.05, adaptability: 0.05 },
  academic:  { focus: 0.35, coachability: 0.25, expression: 0.15, exploration: 0.10, confidence: 0.05, adaptability: 0.10 },
  elite:     { focus: 0.25, coachability: 0.20, expression: 0.20, confidence: 0.15, adaptability: 0.10, exploration: 0.10 },
}

/** Per-domain averages (1-5). */
export function computeDomainAverages(observer: ObserverMap): Record<ObserverDomainKey, number> {
  const out = {} as Record<ObserverDomainKey, number>
  for (const k of OBSERVER_DOMAIN_KEYS) {
    const items = observer[k].items
    out[k] = items.length ? items.reduce((s, it) => s + it.score, 0) / items.length : 0
  }
  return out
}

/** Overall 1-5 average across all 6 domains. */
export function computeOverall(avgs: Record<ObserverDomainKey, number>): number {
  const vals = OBSERVER_DOMAIN_KEYS.map((k) => avgs[k])
  return vals.reduce((s, v) => s + v, 0) / vals.length
}

export interface TrackFit {
  key: TrackKey
  score: number    // 1-5 (weighted avg across domains)
  pct: number      // 0-100
  top3: { domain: ObserverDomainKey; contribution: number }[]
}

/** Compute weighted fit score for each track. */
export function computeTrackFits(avgs: Record<ObserverDomainKey, number>): TrackFit[] {
  return TRACK_KEYS.map((k) => {
    const weights = TRACK_WEIGHTS[k]
    const score = OBSERVER_DOMAIN_KEYS.reduce((s, d) => s + weights[d] * avgs[d], 0)
    const contribs = OBSERVER_DOMAIN_KEYS.map((d) => ({
      domain: d,
      contribution: weights[d] * avgs[d],
    })).sort((a, b) => b.contribution - a.contribution)
    return { key: k, score, pct: Math.round(score * 20), top3: contribs.slice(0, 3) }
  })
}

/**
 * Recommend a track from fits.
 * Fallback rules:
 *  - If top two tracks are within 0.1 of each other AND overall < 3.0, prefer Discovery.
 *  - If top two tie AND overall >= 4.0, prefer Direction.
 *  - Otherwise highest wins.
 */
export function pickRecommendedTrack(
  fits: TrackFit[],
  overall: number,
): { track: TrackFit; confidence: 'high' | 'mid' | 'low' } {
  const sorted = [...fits].sort((a, b) => b.score - a.score)
  const top = sorted[0]
  const second = sorted[1]
  const gap = top.score - second.score
  const ambiguous = gap < 0.1

  let chosen = top
  if (ambiguous) {
    if (overall < 3.0) chosen = fits.find((f) => f.key === 'discovery') || top
    else if (overall >= 4.0) chosen = fits.find((f) => f.key === 'direction') || top
  }

  const confidence: 'high' | 'mid' | 'low' =
    gap >= 0.3 && top.score >= 3.5 ? 'high' :
    gap >= 0.15                     ? 'mid' : 'low'

  return { track: chosen, confidence }
}

/** Score level used for interpretation lookup. */
export type ScoreLevel = 'high' | 'mid' | 'low'
export function scoreLevel(avg: number): ScoreLevel {
  if (avg >= 4) return 'high'
  if (avg >= 3) return 'mid'
  return 'low'
}

/** Auto-detected personality types based on domain strengths. */
export function computeAutoTypes(avgs: Record<ObserverDomainKey, number>): ('exploratory' | 'focused' | 'expressive')[] {
  const out: ('exploratory' | 'focused' | 'expressive')[] = []
  if (avgs.exploration >= 4) out.push('exploratory')
  if (avgs.focus >= 4)       out.push('focused')
  if (avgs.expression >= 4)  out.push('expressive')
  return out
}
