import { useState } from 'react'
import {
  calcRadarScores,
  flattenObserver,
  OBSERVER_DOMAIN_KEYS,
  type DiagnosisData,
  type ObserverDomainKey,
} from '../../../data/diagnosis-template'
import {
  computeDomainAverages,
  computeTrackFits,
  scoreLevel,
} from '../../../data/observer-interpretation'
import { PERSONALITY_LABELS } from '../../../data/report-template'
import { RadarChart } from './RadarChart'
import { useLanguage } from '../../../context/LanguageContext'

interface Props {
  data: DiagnosisData
  onClose: () => void
}

interface Translations {
  axis: Record<string, string>
  grades: { excellent: string; good: string; average: string; developing: string }
  personalityLabel: Record<string, string>
  reportTitle: string
  studentNameFallback: string
  schoolFallback: string
  profileTitle: string
  curriculum: string
  englishExposure: string
  overseasExp: string
  educationGoal: string
  interests: string
  parentConcerns: string
  assessmentTitle: string
  overallScore: string
  keyFindings: string
  area: string
  score: string
  gradeLabel: string
  strengthImprove: string
  observationNotes: string
  personalityTitle: string
  diagnosedType: string
  directionTitle: string
  directionLabel: string
  summaryLabel: string
  noDirection: string
  noDirectionPdf: string
  nextStepsTitle: string
  noNextSteps: string
  scheduleConsult: string
  best: string
  grow: string
}

export function PresentationMode({ data, onClose }: Props) {
  const [slide, setSlide] = useState(0)
  const { t, language } = useLanguage()
  const ko = language === 'ko'
  const scores = calcRadarScores(data.observer)
  const axisMap = t.diag_res_axis as Record<string, string>
  const displayScores = scores.map((s) => ({ ...s, axis: axisMap[s.axis] || s.axis }))

  const SLIDES = t.pres_slides

  const tr: Translations = {
    axis: axisMap,
    grades: t.diag_res_grades,
    personalityLabel: t.pres_personality_label_map as Record<string, string>,
    reportTitle: t.pres_report_title,
    studentNameFallback: t.pres_student_name_fallback,
    schoolFallback: t.pres_school_fallback,
    profileTitle: t.pres_profile_title,
    curriculum: t.pres_curriculum,
    englishExposure: t.pres_english_exposure,
    overseasExp: t.pres_overseas_exp,
    educationGoal: t.pres_education_goal,
    interests: t.pres_interests,
    parentConcerns: t.pres_parent_concerns,
    assessmentTitle: t.pres_assessment_title,
    overallScore: t.pres_overall_score,
    keyFindings: t.pres_key_findings,
    area: t.pres_area,
    score: t.pres_score,
    gradeLabel: t.pres_grade,
    strengthImprove: t.pres_strength_improve,
    observationNotes: t.pres_observation_notes,
    personalityTitle: t.pres_personality_title,
    diagnosedType: t.pres_diagnosed_type,
    directionTitle: t.pres_direction_title,
    directionLabel: t.pres_direction_label,
    summaryLabel: t.pres_summary_label,
    noDirection: t.pres_no_direction,
    noDirectionPdf: t.pres_no_direction_pdf,
    nextStepsTitle: t.pres_next_steps_title,
    noNextSteps: t.pres_no_next_steps,
    scheduleConsult: t.pres_schedule_consult,
    best: t.pres_best,
    grow: t.pres_grow,
  }

  const prev = () => setSlide(Math.max(0, slide - 1))
  const next = () => setSlide(Math.min(SLIDES.length - 1, slide + 1))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') next()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'Escape') onClose()
  }

  const handleDownloadPdf = () => {
    const w = window.open('', '_blank')
    if (!w) { alert(t.pres_popup_blocked); return }

    const overall = scores.reduce((s, r) => s + r.value, 0) / scores.length
    const ds = displayScores
    const p = data.parent

    // Domain value map (6 domains) + track fits from centralized engine
    const axisKeys = OBSERVER_DOMAIN_KEYS
    const axisVal = computeDomainAverages(data.observer)

    const trackMeta = t.pdf_tracks as readonly { key: string; name: string; blurb: string }[]
    const fits = computeTrackFits(axisVal)
    const trackScores = fits.map((f) => {
      const meta = trackMeta.find((m) => m.key === f.key)
      return {
        key: f.key,
        name: meta?.name || f.key,
        blurb: meta?.blurb || '',
        score: f.score,
        pct: f.pct,
        top3: f.top3.map((c) => ({ axis: c.domain, contrib: c.contribution })),
      }
    })
    const bestTrack = [...trackScores].sort((a, b) => b.score - a.score)[0]
    const bottomTracks = [...trackScores].sort((a, b) => a.score - b.score).slice(0, 2)

    // Key strengths & risks across all observer items (translated labels)
    const itemLabels = t.diag_obs_items as Record<string, { label: string }>
    const domainLabels = t.diag_obs_domains as Record<ObserverDomainKey, string>
    type ItemEntry = { domain: ObserverDomainKey; key: string; label: string; score: number; note: string; category: string }
    const allEntries: ItemEntry[] = []
    for (const dk of OBSERVER_DOMAIN_KEYS) {
      for (const it of data.observer[dk].items) {
        allEntries.push({
          domain: dk,
          key: it.key,
          label: itemLabels[it.key]?.label || it.label,
          score: it.score,
          note: it.note,
          category: domainLabels[dk],
        })
      }
    }
    const strengths = [...allEntries].sort((a, b) => b.score - a.score).slice(0, 3)
    const risks = [...allEntries].sort((a, b) => a.score - b.score).slice(0, 2)

    // Steps, notes
    const steps = data.summary.nextSteps.split('\n').filter(Boolean)
    const notes = allEntries.filter((e) => e.note)

    // Interpretation line
    const interpLine =
      overall >= 4.5 ? t.pdf_interp_excellent :
      overall >= 3.5 ? t.pdf_interp_good :
      overall >= 2.5 ? t.pdf_interp_average :
                       t.pdf_interp_developing
    const horizon =
      overall >= 4.0 ? t.pdf_horizon_6m :
      overall >= 3.0 ? t.pdf_horizon_12m :
                       t.pdf_horizon_18m

    // Per-domain interpretation (reused from Observer tab i18n)
    const interpByDomain = t.diag_obs_interp as Record<ObserverDomainKey, Record<'high' | 'mid' | 'low', string>>
    const readingFor = (dk: ObserverDomainKey, v: number) => interpByDomain[dk][scoreLevel(v)]
    const statusFor = (v: number): { label: string; key: 'fit' | 'needs_work' | 'redesign'; color: string; bg: string } => {
      if (v >= 4) return { label: t.pdf_status_fit,         key: 'fit',         color: '#2D6A4F', bg: '#E8F1EC' }
      if (v >= 3) return { label: t.pdf_status_needs_work,  key: 'needs_work',  color: '#7A5A20', bg: '#F5EBD7' }
      return       { label: t.pdf_status_redesign,          key: 'redesign',    color: '#8B3A3A', bg: '#F1E0E0' }
    }
    const recLevelFor = (pct: number): { label: string; color: string } => {
      if (pct >= 75) return { label: t.pdf_track_rec_high, color: '#2D6A4F' }
      if (pct >= 55) return { label: t.pdf_track_rec_mid,  color: '#7A5A20' }
      return          { label: t.pdf_track_rec_low,         color: '#9B958D' }
    }

    // Derived meta strings
    const field = p.interests.length > 0 ? p.interests.slice(0, 3).join(' · ') : t.pdf_field_general
    const reportId = `169-${(data.id || data.createdAt.replace(/-/g, '')).slice(-8).toUpperCase()}`

    /* ─── v2 derivations ─── */
    // Current Stage
    const currentStage: 'exploration' | 'decision' | 'specialization' =
      bestTrack.key === 'discovery' || overall < 3.0 ? 'exploration'
      : bestTrack.key === 'decision' || overall < 3.8 ? 'decision'
      : 'specialization'
    const stageLabel = currentStage === 'exploration' ? t.pdf_stage_exploration
      : currentStage === 'decision' ? t.pdf_stage_decision
      : t.pdf_stage_specialization

    // Environment Fit
    const envFit: 'structured' | 'semi' | 'open' =
      axisVal.focus >= 4 && axisVal.adaptability <= 3 ? 'structured'
      : axisVal.exploration >= 4 && axisVal.focus <= 3 ? 'open'
      : 'semi'
    const envFitLabel = envFit === 'structured' ? t.pdf_strategy_env_structured
      : envFit === 'open' ? t.pdf_strategy_env_open
      : t.pdf_strategy_env_semi

    // Learning Response Mode
    const mode: 'mentor' | 'explore' | 'hybrid' =
      axisVal.exploration > axisVal.coachability + 0.5 ? 'explore'
      : axisVal.coachability > axisVal.exploration + 0.5 ? 'mentor'
      : 'hybrid'
    const modeLabel = mode === 'mentor' ? t.pdf_strategy_mode_mentor
      : mode === 'explore' ? t.pdf_strategy_mode_explore
      : t.pdf_strategy_mode_hybrid

    // Learning Style Summary — top domain + its level
    const sortedDomains = [...axisKeys].sort((a, b) => axisVal[b] - axisVal[a])
    const topDomain = sortedDomains[0]
    const styleSummaryMap = t.pdf_strategy_summary as Record<ObserverDomainKey, Record<'high' | 'mid' | 'low', string>>
    const styleSummary = styleSummaryMap[topDomain][scoreLevel(axisVal[topDomain])]
    const envByTrack = t.pdf_strategy_env_by_track as Record<string, string>
    const recommendedEnv = envByTrack[bestTrack.key] || envByTrack.decision

    // Track tiers
    const sortedFits = [...trackScores].sort((a, b) => b.score - a.score)
    const bestTier = sortedFits[0]
    const secondaryTier = sortedFits.slice(1).filter((f) => f.pct >= 55)
    const notYetTier = sortedFits.slice(1).filter((f) => f.pct < 55)

    // Suits student type
    const suitsByTrack = t.pdf_suits_by_track as Record<string, string>
    const suitsCopy = suitsByTrack[bestTrack.key] || suitsByTrack.decision

    // Auto Options A/B
    const optionAByTrack = t.pdf_option_a_by_track as Record<string, string>
    const optionBByTrack = t.pdf_option_b_by_track as Record<string, string>
    const optionAText = optionAByTrack[bestTrack.key] || optionAByTrack.decision
    const optionBText = optionBByTrack[bestTrack.key] || optionBByTrack.decision

    // Comparison recommend logic
    const confidenceToScore: Record<string, number> = {
      none: 1, considering: 2, somewhat: 3.5, certain: 4.5,
    }
    const readinessScore = confidenceToScore[p.directionConfidence || ''] || 3
    const deriveCompareRec = (avg: number): 'yes' | 'watch' | 'wait' => {
      const combined = (avg + readinessScore) / 2
      if (combined >= 4) return 'yes'
      if (combined < 3) return 'wait'
      return 'watch'
    }
    const recommendLabel = (k: 'yes' | 'watch' | 'wait'): { label: string; color: string } =>
      k === 'yes' ? { label: t.pdf_compare_yes as string, color: '#2D6A4F' }
      : k === 'watch' ? { label: t.pdf_compare_watch as string, color: '#7A5A20' }
      : { label: t.pdf_compare_wait as string, color: '#8B3A3A' }

    const sustainability = axisVal.focus
    const readinessBar = readinessScore

    // Radar SVG
    const radarSvg = (() => {
      const size = 280, cx = size / 2, cy = size / 2, r = size * 0.38, n = ds.length
      const step = (2 * Math.PI) / n
      const pt = (idx: number, val: number) => {
        const a = step * idx - Math.PI / 2, d = (val / 5) * r
        return { x: cx + d * Math.cos(a), y: cy + d * Math.sin(a) }
      }
      const grid = [1,2,3,4,5].map(lv => {
        const pts = Array.from({length:n},(_,i)=>pt(i,lv))
        return `<polygon points="${pts.map(pp=>`${pp.x},${pp.y}`).join(' ')}" fill="none" stroke="#E5E0D8" stroke-width="0.5"/>`
      }).join('')
      const axesSvg = Array.from({length:n},(_,i)=>{const e=pt(i,5);return `<line x1="${cx}" y1="${cy}" x2="${e.x}" y2="${e.y}" stroke="#E5E0D8" stroke-width="0.5"/>`}).join('')
      const dataPts = ds.map((d,i)=>pt(i,d.value))
      const dataPath = `<polygon points="${dataPts.map(pp=>`${pp.x},${pp.y}`).join(' ')}" fill="#6B4F4F" fill-opacity="0.15" stroke="#6B4F4F" stroke-width="1.5"/>`
      const dots = dataPts.map((pp)=>`<circle cx="${pp.x}" cy="${pp.y}" r="3.5" fill="#6B4F4F"/>`).join('')
      const labels = ds.map((d,i)=>{const lp=pt(i,5.8);return `<text x="${lp.x}" y="${lp.y}" text-anchor="middle" dominant-baseline="middle" style="font-size:11px;fill:#5A5550;font-family:Pretendard,sans-serif">${d.axis}</text>`}).join('')
      const vals = ds.map((d,i)=>{const vp=pt(i,d.value+0.7);return `<text x="${vp.x}" y="${vp.y}" text-anchor="middle" dominant-baseline="middle" style="font-size:10px;fill:#6B4F4F;font-weight:600;font-family:Pretendard,sans-serif">${d.value.toFixed(1)}</text>`}).join('')
      return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${grid}${axesSvg}${dataPath}${dots}${labels}${vals}</svg>`
    })()

    const TAG = 'font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#9B958D;font-weight:600'
    const CARD = 'padding:16px;border:1px solid #E5E0D8;background:#F5F1EB'
    const svgBar = (pct: number, color = '#6B4F4F', wd = 300, h = 10) =>
      `<svg width="${wd}" height="${h}" style="display:block;flex:1"><rect width="${wd}" height="${h}" rx="4" fill="#E5E0D8"/><rect width="${Math.round(wd * Math.max(0, Math.min(100, pct)) / 100)}" height="${h}" rx="4" fill="${color}"/></svg>`
    const svgLine = (wd = 32, color = '#6B4F4F') =>
      `<svg width="${wd}" height="2" style="display:block;margin:10px 0 20px"><rect width="${wd}" height="2" fill="${color}"/></svg>`
    const H2 = 'font-size:24px;font-weight:400;font-family:Georgia,"Noto Serif KR",serif;color:#2C2C2C'
    const SUB = 'font-size:12px;color:#9B958D;margin-bottom:8px'
    const S  = 'width:100vw;height:100vh;padding:48px 64px;display:flex;align-items:center;justify-content:center;page-break-after:always;background:#FAF8F5'
    const SL = 'width:100vw;height:100vh;padding:48px 64px;display:flex;align-items:center;justify-content:center;background:#FAF8F5'
    const I  = 'width:100%;max-width:960px'
    const KV = (label: string, value: string) =>
      `<div><div style="${TAG};margin-bottom:4px">${label}</div><div style="font-size:14px">${value || '-'}</div></div>`

    const fields: [string, string][] = [
      [tr.curriculum, p.curriculum],
      [tr.englishExposure, p.englishExposure],
      [tr.overseasExp, p.overseasExperience],
      [tr.educationGoal, p.educationGoal],
    ]

    // PAGE 1 — Cover
    const page1 = `<div style="${S}"><div style="${I};text-align:center">
<div style="${TAG};margin-bottom:12px">${tr.reportTitle}</div>
<div style="font-size:13px;color:#9B958D;font-style:italic;margin-bottom:20px">${t.pres_report_subtitle}</div>
<div style="width:48px;height:1px;background:#6B4F4F;margin:0 auto 24px"></div>
<h1 style="font-size:48px;font-weight:400;margin-bottom:12px;font-family:Georgia,'Noto Serif KR',serif">${p.studentName || tr.studentNameFallback}</h1>
<div style="color:#5A5550;font-size:15px;margin-bottom:48px">${p.grade}${p.school ? ' | ' + p.school : ''}</div>
<div style="display:flex;justify-content:center;gap:48px;margin-top:16px;padding-top:24px;border-top:1px solid #E5E0D8">
  <div><div style="${TAG};margin-bottom:4px">${t.pdf_diag_date}</div><div style="font-size:13px">${data.createdAt}</div></div>
  <div><div style="${TAG};margin-bottom:4px">${t.pdf_diag_field}</div><div style="font-size:13px">${field}</div></div>
  <div><div style="${TAG};margin-bottom:4px">${t.pdf_report_id}</div><div style="font-size:13px;font-family:Georgia,serif">${reportId}</div></div>
</div>
</div></div>`

    // PAGE 2 — Executive Summary (reordered: Overall → Why → Strengths → Next Step)
    const recNextStep = steps[0] || optionAText
    const whyReasons = bestTrack.top3.map((c) => {
      const idx = axisKeys.indexOf(c.axis)
      const lv = scoreLevel(axisVal[c.axis])
      return { label: ds[idx].axis, value: axisVal[c.axis], reading: interpByDomain[c.axis][lv] }
    })
    const page2 = `<div style="${S}"><div style="${I}">
<div style="${TAG}">${t.pdf_exec_title}</div>
<div style="${SUB}">${t.pdf_exec_sub}</div>${svgLine()}

<!-- 1. Overall Recommendation -->
<div style="background:#2C2C2C;color:#fff;padding:22px 26px;margin-bottom:16px">
  <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#C9B99A;margin-bottom:8px;font-weight:600">${t.pdf_exec_overall}</div>
  <div style="font-size:22px;font-family:Georgia,'Noto Serif KR',serif;line-height:1.4">${bestTrack.name}</div>
  <div style="font-size:12px;color:#E5E0D8;margin-top:6px;line-height:1.6">${bestTrack.blurb}</div>
</div>

<!-- 2. Why This Path -->
<div style="margin-bottom:16px">
  <div style="${TAG};margin-bottom:10px">${t.pdf_exec_why}</div>
  <ol style="padding-left:20px;font-size:12px;line-height:1.7">
    ${whyReasons.map((r) => `<li style="margin-bottom:6px"><strong>${r.label} (${r.value.toFixed(1)}/5)</strong> — ${r.reading}</li>`).join('')}
  </ol>
</div>

<!-- 3. Key Strengths -->
<div style="${CARD};margin-bottom:16px">
  <div style="${TAG};margin-bottom:10px">${t.pdf_exec_strengths}</div>
  ${strengths.map(e => `<div style="display:flex;justify-content:space-between;padding:3px 0;font-size:12px"><span>${e.label}</span><span style="color:#2D6A4F;font-weight:600">${e.score}/5</span></div>`).join('')}
</div>

<!-- 4. Immediate Next Step -->
<div style="border-left:3px solid #6B4F4F;padding:8px 0 8px 16px">
  <div style="${TAG};margin-bottom:4px">${t.pdf_exec_nextstep}</div>
  <div style="font-size:13px;line-height:1.6">${recNextStep}</div>
</div>
</div></div>`

    // PAGE 3 — Student Snapshot
    const consultNote = data.summary.overallNote || p.concerns || ''
    const page3 = `<div style="${S}"><div style="${I}">
<div style="${TAG}">${t.pdf_snapshot_title}</div>
<div style="${SUB}">${t.pdf_snapshot_sub}</div>${svgLine()}
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px 48px;margin-bottom:20px">
${fields.map(([l,v]) => KV(l, v)).join('')}
</div>
${p.interests.length ? `<div style="margin-bottom:20px"><div style="${TAG};margin-bottom:8px">${tr.interests}</div><div>${p.interests.map(x=>`<span style="display:inline-block;padding:4px 12px;background:#F5F1EB;margin:3px;font-size:12px">${x}</span>`).join('')}</div></div>` : ''}
${consultNote ? `<div style="${CARD};border-left:3px solid #6B4F4F;margin-top:8px">
  <div style="${TAG};margin-bottom:8px">${t.pdf_consultant_note}</div>
  <p style="font-size:13px;line-height:1.7">${consultNote}</p>
</div>` : ''}
</div></div>`

    // PAGE 4 — Overall Dashboard (+ Current Stage chip)
    const stageChipBg = currentStage === 'specialization' ? '#2D6A4F' : currentStage === 'decision' ? '#6B4F4F' : '#7A5A20'
    const page4 = `<div style="${S}"><div style="${I}">
<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
  <div>
    <div style="${TAG}">${t.pdf_dashboard_title}</div>
    <div style="${SUB}">${t.pdf_dashboard_sub}</div>
  </div>
  <div style="text-align:right">
    <div style="${TAG};margin-bottom:4px">${t.pdf_stage_label}</div>
    <div style="display:inline-block;padding:6px 14px;background:${stageChipBg};color:#fff;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;font-weight:600">${stageLabel}</div>
  </div>
</div>
${svgLine()}
<div style="display:flex;gap:40px;align-items:flex-start">
<div style="flex-shrink:0">${radarSvg}</div>
<div style="flex:1">
<div style="background:#F5F1EB;padding:14px;text-align:center;margin-bottom:16px">
<div style="font-size:32px;font-family:Georgia,serif">${overall.toFixed(1)} <span style="font-size:14px;color:#9B958D">/ 5.0</span></div>
<div style="${TAG};margin-top:4px">${tr.overallScore}</div></div>
${ds.map(s => `<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
<span style="width:96px;font-size:12px;color:#5A5550">${s.axis}</span>
${svgBar((s.value/5)*100)}
<span style="width:28px;text-align:right;font-size:13px">${s.value.toFixed(1)}</span>
</div>`).join('')}
</div></div>
<div style="margin-top:20px;border-left:3px solid #6B4F4F;padding:6px 0 6px 16px">
  <div style="${TAG};margin-bottom:4px">${t.pdf_interp_label}</div>
  <div style="font-size:13px;line-height:1.6">${interpLine}</div>
</div>
</div></div>`

    // PAGE 5 — Domain-by-Domain (qualitative signals)
    const page5 = `<div style="${S}"><div style="${I}">
<div style="${TAG}">${t.pdf_domain_title}</div>
<div style="${SUB}">${t.pdf_domain_sub}</div>${svgLine()}
<table style="width:100%;border-collapse:collapse;font-size:11px">
<thead><tr style="border-bottom:1px solid #6B4F4F">
<th style="text-align:left;padding:8px 6px;color:#9B958D;font-weight:500;width:100px">${t.pdf_col_domain}</th>
<th style="text-align:left;padding:8px 6px;color:#9B958D;font-weight:500;width:108px">${t.pdf_col_status}</th>
<th style="text-align:left;padding:8px 6px;color:#9B958D;font-weight:500;width:150px">${t.pdf_col_positive}</th>
<th style="text-align:left;padding:8px 6px;color:#9B958D;font-weight:500;width:150px">${t.pdf_col_risk}</th>
<th style="text-align:left;padding:8px 6px;color:#9B958D;font-weight:500">${t.pdf_col_reading}</th>
</tr></thead>
<tbody>
${ds.map((sc, i) => {
  const key = axisKeys[i]
  const entries = data.observer[key].items
  const top = [...entries].sort((a,b) => b.score - a.score)[0]
  const low = [...entries].sort((a,b) => a.score - b.score)[0]
  const st = statusFor(sc.value)
  const reading = readingFor(key, sc.value)
  const topLabel = itemLabels[top.key]?.label || top.label
  const lowLabel = itemLabels[low.key]?.label || low.label
  return `<tr style="border-bottom:1px solid #E5E0D8">
<td style="padding:12px 6px;vertical-align:top;font-weight:500;color:#2C2C2C">${sc.axis} <span style="color:#9B958D;font-weight:400;font-family:Georgia,serif">${sc.value.toFixed(1)}</span></td>
<td style="padding:12px 6px;vertical-align:top"><span style="display:inline-block;padding:3px 10px;font-size:10px;color:${st.color};background:${st.bg};font-weight:600">${st.label}</span></td>
<td style="padding:12px 6px;vertical-align:top;color:#2D6A4F;font-size:10.5px;line-height:1.5"><span style="font-weight:600;text-transform:uppercase;letter-spacing:0.08em;font-size:9px;color:#9B958D">${t.pdf_signal_observed}</span><br/>${topLabel}</td>
<td style="padding:12px 6px;vertical-align:top;color:#8B3A3A;font-size:10.5px;line-height:1.5"><span style="font-weight:600;text-transform:uppercase;letter-spacing:0.08em;font-size:9px;color:#9B958D">${t.pdf_signal_watch}</span><br/>${lowLabel}</td>
<td style="padding:12px 6px;vertical-align:top;color:#2C2C2C;font-size:10.5px;line-height:1.5">${reading}</td>
</tr>`}).join('')}
</tbody></table>
${notes.length ? `<div style="margin-top:16px"><div style="${TAG};margin-bottom:6px">${tr.observationNotes}</div>
${notes.slice(0, 4).map(n => `<div style="font-size:10.5px;padding:4px 0;border-bottom:1px solid #F5F1EB;color:#5A5550"><span style="color:#6B4F4F">${n.category}</span> / ${n.label}: ${n.note}</div>`).join('')}</div>` : ''}
</div></div>`

    // PAGE 6 — Learning Strategy (replaces old Personality page)
    const page6 = `<div style="${S}"><div style="${I}">
<div style="${TAG}">${t.pdf_strategy_title}</div>
<div style="${SUB}">${t.pdf_strategy_sub}</div>${svgLine()}

<!-- 1. Learning Style Summary -->
<div style="background:#2C2C2C;color:#fff;padding:20px 24px;margin-bottom:16px">
  <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#C9B99A;font-weight:600;margin-bottom:8px">${t.pdf_strategy_summary_label}</div>
  <div style="font-size:18px;font-family:Georgia,'Noto Serif KR',serif;line-height:1.5">${styleSummary}</div>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">
  <!-- 2. Environment Fit -->
  <div style="${CARD}">
    <div style="${TAG};margin-bottom:8px">${t.pdf_strategy_env_label}</div>
    <div style="font-size:13px;line-height:1.6">${envFitLabel}</div>
  </div>
  <!-- 3. Learning Response Mode -->
  <div style="${CARD}">
    <div style="${TAG};margin-bottom:8px">${t.pdf_strategy_mode_label}</div>
    <div style="font-size:13px;line-height:1.6">${modeLabel}</div>
  </div>
</div>

<!-- 4. Recommended Environment -->
<div style="border-left:3px solid #6B4F4F;padding:8px 0 8px 16px">
  <div style="${TAG};margin-bottom:4px">${t.pdf_strategy_rec_env_label}</div>
  <div style="font-size:13px;line-height:1.7">${recommendedEnv}</div>
</div>

${data.summary.type.length ? `<div style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
${data.summary.type.map(type => { const info = PERSONALITY_LABELS[type]; return `<span style="padding:4px 10px;background:#F5F1EB;font-size:11px;color:#5A5550">${ko ? info.ko : info.en}</span>`}).join('')}
</div>` : ''}
</div></div>`

    // PAGE 7 — Track Fit Analysis (tiered: Best / Secondary / Not Yet)
    const bestReasons = bestTrack.top3.map(c => `${ds[axisKeys.indexOf(c.axis)].axis} <span style="color:#9B958D">(${axisVal[c.axis].toFixed(1)})</span>`)
    const renderTrackRow = (ts: typeof trackScores[number], accent: 'best' | 'secondary' | 'not-yet') => {
      const bg = accent === 'best' ? '#F5F1EB' : accent === 'secondary' ? '#FAF8F5' : '#F5F1EB'
      const border = accent === 'best' ? '2px solid #2C2C2C' : accent === 'secondary' ? '1px solid #6B4F4F40' : '1px dashed #9B958D'
      const barColor = accent === 'best' ? '#2C2C2C' : accent === 'secondary' ? '#6B4F4F' : '#9B958D'
      return `<div style="padding:10px 14px;margin-bottom:6px;background:${bg};border:${border}">
  <div style="display:flex;align-items:center;gap:14px">
    <div style="width:180px">
      <div style="font-size:13px;font-weight:600;color:#2C2C2C">${ts.name}</div>
      <div style="font-size:10px;color:#9B958D;margin-top:2px">${ts.blurb}</div>
    </div>
    <div style="flex:1">${svgBar(ts.pct, barColor, 380, 8)}</div>
    <div style="width:44px;text-align:right;font-size:14px;font-weight:600;font-family:Georgia,serif">${ts.pct}%</div>
  </div>
</div>`
    }
    const page7 = `<div style="${S}"><div style="${I}">
<div style="${TAG}">${t.pdf_track_title}</div>
<div style="${SUB}">${t.pdf_track_sub}</div>${svgLine()}

<!-- Best Fit -->
<div style="margin-bottom:12px">
  <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#2C2C2C;font-weight:700;margin-bottom:6px">${t.pdf_track_tier_best}</div>
  ${renderTrackRow(bestTier, 'best')}
</div>

${secondaryTier.length ? `<!-- Secondary Fit -->
<div style="margin-bottom:12px">
  <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#6B4F4F;font-weight:600;margin-bottom:6px">${t.pdf_track_tier_secondary}</div>
  ${secondaryTier.map((ts) => renderTrackRow(ts, 'secondary')).join('')}
</div>` : ''}

${notYetTier.length ? `<!-- Not Recommended Yet -->
<div style="margin-bottom:12px">
  <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#9B958D;font-weight:600;margin-bottom:6px">${t.pdf_track_tier_not_yet}</div>
  ${notYetTier.map((ts) => renderTrackRow(ts, 'not-yet')).join('')}
</div>` : ''}

<div style="margin-top:14px;background:#2C2C2C;color:#fff;padding:14px 18px">
  <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#C9B99A;font-weight:600;margin-bottom:6px">${t.pdf_best_fit_reason}</div>
  <div style="font-size:11px;color:#E5E0D8">${bestReasons.join(' · ')}</div>
</div>
</div></div>`

    // PAGE 8 — Comparative Fit Analysis (judgment-oriented: Response / Sustain / Readiness / Recommend)
    type CompareRow = { area: string; response: number; sustain: number; readiness: number; recommend: 'yes' | 'watch' | 'wait' }
    const compareAreas: CompareRow[] = (p.interests.length > 0
      ? p.interests.slice(0, 3).map((area): CompareRow => ({
          area,
          response: overall,
          sustain: sustainability,
          readiness: readinessBar,
          recommend: deriveCompareRec(overall),
        }))
      : trackScores.slice(0, 3).map((ts): CompareRow => ({
          area: ts.name,
          response: ts.score,
          sustain: sustainability,
          readiness: readinessBar,
          recommend: deriveCompareRec(ts.score),
        })))

    const miniBar = (val: number, max = 5, color = '#6B4F4F') =>
      `<svg width="80" height="6" style="vertical-align:middle"><rect width="80" height="6" rx="3" fill="#E5E0D8"/><rect width="${Math.round(80 * Math.max(0, Math.min(1, val / max)))}" height="6" rx="3" fill="${color}"/></svg>`

    const page8 = `<div style="${S}"><div style="${I}">
<div style="${TAG}">${t.pdf_compare_title}</div>
<div style="${SUB}">${t.pdf_compare_sub}</div>${svgLine()}
<table style="width:100%;border-collapse:collapse;font-size:11px">
<thead><tr style="border-bottom:1px solid #6B4F4F">
<th style="text-align:left;padding:10px 6px;color:#9B958D;font-weight:500">${t.pdf_compare_area}</th>
<th style="text-align:left;padding:10px 6px;color:#9B958D;font-weight:500">${t.pdf_compare_response}</th>
<th style="text-align:left;padding:10px 6px;color:#9B958D;font-weight:500">${t.pdf_compare_sustain}</th>
<th style="text-align:left;padding:10px 6px;color:#9B958D;font-weight:500">${t.pdf_compare_ready}</th>
<th style="text-align:left;padding:10px 6px;color:#9B958D;font-weight:500">${t.pdf_compare_recommend}</th>
</tr></thead>
<tbody>
${compareAreas.map(r => {
  const rec = recommendLabel(r.recommend)
  return `<tr style="border-bottom:1px solid #E5E0D8">
<td style="padding:12px 6px;font-weight:500">${r.area}</td>
<td style="padding:12px 6px">${miniBar(r.response)} <span style="font-family:Georgia,serif;color:#5A5550;margin-left:6px;font-size:11px">${r.response.toFixed(1)}</span></td>
<td style="padding:12px 6px">${miniBar(r.sustain, 5, '#2D6A4F')} <span style="font-family:Georgia,serif;color:#5A5550;margin-left:6px;font-size:11px">${r.sustain.toFixed(1)}</span></td>
<td style="padding:12px 6px">${miniBar(r.readiness, 5, '#7A5A20')} <span style="font-family:Georgia,serif;color:#5A5550;margin-left:6px;font-size:11px">${r.readiness.toFixed(1)}</span></td>
<td style="padding:12px 6px"><span style="display:inline-block;padding:3px 10px;font-size:10px;color:#fff;background:${rec.color};font-weight:600;letter-spacing:0.08em;text-transform:uppercase">${rec.label}</span></td>
</tr>`}).join('')}
</tbody></table>
</div></div>`

    // PAGE 9 — Final Recommendation (+ Suits Student Type)
    const bottomTrack = bottomTracks[0]
    const page9 = `<div style="${S}"><div style="${I}">
<div style="${TAG}">${t.pdf_final_title}</div>
<div style="${SUB}">${t.pdf_final_sub}</div>${svgLine()}

<div style="background:#2C2C2C;color:#fff;padding:22px 26px;margin-bottom:16px">
  <div style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#C9B99A;font-weight:600;margin-bottom:8px">${t.pdf_final_path}</div>
  <div style="font-size:26px;font-family:Georgia,'Noto Serif KR',serif;margin-bottom:6px">${bestTrack.name}</div>
  <div style="font-size:12px;color:#E5E0D8;line-height:1.6">${bestTrack.blurb}</div>
</div>

<div style="${CARD};margin-bottom:16px;border-left:3px solid #6B4F4F">
  <div style="${TAG};margin-bottom:6px">${t.pdf_suits_label}</div>
  <div style="font-size:13px;line-height:1.7;font-style:italic;color:#2C2C2C">${suitsCopy}</div>
</div>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px">
  <div>
    <div style="${TAG};margin-bottom:8px">${t.pdf_final_why}</div>
    <ol style="padding-left:20px;font-size:11.5px;line-height:1.65">
      ${bestTrack.top3.map((c) => {
        const idx = axisKeys.indexOf(c.axis)
        return `<li style="margin-bottom:5px"><strong>${ds[idx].axis}</strong> — ${readingFor(c.axis, axisVal[c.axis])}</li>`
      }).join('')}
    </ol>
  </div>
  <div>
    <div style="${TAG};margin-bottom:8px">${t.pdf_final_notyet}</div>
    <div style="padding:12px 14px;border:1px dashed #9B958D;font-size:11.5px;line-height:1.65">
      <div style="font-weight:600;margin-bottom:4px">${bottomTrack.name}</div>
      <div style="color:#5A5550">${bottomTrack.blurb}</div>
    </div>
  </div>
</div>

<div style="border-top:1px solid #E5E0D8;padding-top:12px">
  <div style="${TAG};margin-bottom:4px">${t.pdf_final_horizon}</div>
  <div style="font-size:17px;font-family:Georgia,serif">${horizon}</div>
</div>
</div></div>`

    // PAGE 10 — Next Step (auto-generated Options A & B; never empty)
    const optionA = [optionAText, steps[0]].filter(Boolean).join('\n\n')
    const optionB = [optionBText, steps[1]].filter(Boolean).join('\n\n')
    const agenda = t.pdf_agenda_items as readonly string[]
    const page10 = `<div style="${S}"><div style="${I}">
<div style="${TAG}">${t.pdf_nextstep_title}</div>
<div style="${SUB}">${t.pdf_nextstep_sub}</div>${svgLine()}

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:18px">
  <div style="padding:18px;border:2px solid #2C2C2C;background:#F5F1EB">
    <div style="${TAG};margin-bottom:8px">${t.pdf_option_a_label}</div>
    <div style="font-size:12.5px;line-height:1.7;white-space:pre-wrap">${optionA}</div>
  </div>
  <div style="padding:18px;border:1px dashed #9B958D;background:#FAF8F5">
    <div style="${TAG};margin-bottom:8px">${t.pdf_option_b_label}</div>
    <div style="font-size:12.5px;line-height:1.7;white-space:pre-wrap">${optionB}</div>
  </div>
</div>

<div>
  <div style="${TAG};margin-bottom:8px">${t.pdf_strategy_agenda}</div>
  <ol style="padding-left:20px;font-size:11.5px;line-height:1.8">
    ${agenda.map(item => `<li>${item}</li>`).join('')}
  </ol>
</div>
</div></div>`

    // PAGE 11 — Appendix / Scoring Guide
    const scaleRows = t.pdf_scale_rows as readonly { score: string; label: string; desc: string }[]
    const criteriaItems = t.pdf_criteria_items as readonly { label: string; desc: string }[]
    const page11 = `<div style="${SL}"><div style="${I}">
<div style="${TAG}">${t.pdf_appendix_title}</div>
<div style="${SUB}">${t.pdf_appendix_sub}</div>${svgLine()}

<div style="margin-bottom:24px">
  <div style="${TAG};margin-bottom:10px">${t.pdf_scale_title}</div>
  <table style="width:100%;border-collapse:collapse;font-size:12px">
    <thead><tr style="border-bottom:1px solid #6B4F4F">
      <th style="text-align:left;padding:8px 6px;color:#9B958D;font-weight:500;width:50px">${t.pdf_col_score}</th>
      <th style="text-align:left;padding:8px 6px;color:#9B958D;font-weight:500;width:110px">${t.pdf_col_status}</th>
      <th style="text-align:left;padding:8px 6px;color:#9B958D;font-weight:500">${t.pdf_col_reading}</th>
    </tr></thead>
    <tbody>
    ${scaleRows.map(r => `<tr style="border-bottom:1px solid #E5E0D8">
      <td style="padding:10px 6px;font-family:Georgia,serif;font-size:15px">${r.score}</td>
      <td style="padding:10px 6px;font-weight:500">${r.label}</td>
      <td style="padding:10px 6px;color:#5A5550">${r.desc}</td>
    </tr>`).join('')}
    </tbody>
  </table>
</div>

<div>
  <div style="${TAG};margin-bottom:10px">${t.pdf_criteria_title}</div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
    ${criteriaItems.map(c => `<div style="${CARD}">
      <div style="font-size:12px;font-weight:600;margin-bottom:6px">${c.label}</div>
      <div style="font-size:11px;color:#5A5550;line-height:1.6">${c.desc}</div>
    </div>`).join('')}
  </div>
</div>

<div style="margin-top:24px;text-align:center">
  <div style="display:inline-block;background:#2C2C2C;color:#fff;padding:10px 22px;font-size:11px;letter-spacing:0.18em;text-transform:uppercase">${tr.scheduleConsult}</div>
</div>
</div></div>`

    const html = `<!DOCTYPE html><html><head><title>Diagnosis - ${p.studentName || 'Student'}</title>
<style>
@page{size:landscape;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Pretendard','Noto Sans KR',sans-serif;color:#2C2C2C;background:#FAF8F5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1,h2{font-family:Georgia,'Noto Serif KR',serif}
table{border-spacing:0}
ol{font-family:'Pretendard','Noto Sans KR',sans-serif}
</style></head><body>
${page1}${page2}${page3}${page4}${page5}${page6}${page7}${page8}${page9}${page10}${page11}
</body></html>`

    w.document.write(html)
    w.document.close()
    w.onload = () => w.print()
  }

  const slideItemLabels = t.diag_obs_items as Record<string, { label: string }>
  const slideComponents = [
    <SlideCover key={0} data={data} ko={ko} tr={tr} />,
    <SlideProfile key={1} data={data} tr={tr} />,
    <SlideAssessment key={2} scores={displayScores} tr={tr} />,
    <SlideKeyFindings key={3} scores={displayScores} data={data} tr={tr} itemLabels={slideItemLabels} />,
    <SlidePersonality key={4} data={data} ko={ko} tr={tr} itemLabels={slideItemLabels} />,
    <SlideDirection key={5} data={data} tr={tr} />,
    <SlideNextSteps key={6} data={data} tr={tr} />,
  ]

  return (
    <div className="fixed inset-0 z-[200] bg-[#FAF8F5] flex flex-col" onKeyDown={handleKeyDown} tabIndex={0} autoFocus>
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-3 border-b border-outline-variant/10">
        <div className="flex items-center gap-4">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-8 brightness-0" />
          <span className="font-headline text-lg text-primary tracking-tight">169 Avenue</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-body text-sm text-on-surface-variant/50">{slide + 1} / {SLIDES.length}</span>
          <button onClick={handleDownloadPdf}
            className="px-4 py-1.5 font-body text-xs bg-surface border border-outline-variant/30 text-primary/60 hover:text-primary hover:border-primary transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">download</span>
            PDF
          </button>
          <button onClick={onClose} className="p-2 text-on-surface-variant/50 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      {/* Visible slide */}
      <div className="flex-1 flex items-center justify-center px-16 py-10 overflow-hidden">
        <div className="w-full max-w-4xl bg-[#FAF8F5] p-8" style={{ minHeight: 420 }}>
          {slideComponents[slide]}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-8 py-3 border-t border-outline-variant/10">
        <button onClick={prev} disabled={slide === 0}
          className="px-6 py-2 font-body text-sm border border-outline-variant/30 text-primary/60 hover:text-primary disabled:opacity-25 transition-colors">
          {t.pres_previous}
        </button>
        <div className="flex gap-2">
          {SLIDES.map((name, i) => (
            <button key={i} onClick={() => setSlide(i)} title={name}
              className={`h-1.5 rounded-full transition-all ${i === slide ? 'bg-secondary w-8' : 'bg-outline-variant/20 w-1.5 hover:bg-outline-variant/40'}`} />
          ))}
        </div>
        <button onClick={next} disabled={slide === SLIDES.length - 1}
          className="px-6 py-2 font-body text-sm bg-primary text-on-primary hover:bg-secondary disabled:opacity-25 transition-colors">
          {t.pres_next}
        </button>
      </div>
    </div>
  )
}

/* ══════════════════ Slide Components ══════════════════ */

function SlideCover({ data, tr }: { data: DiagnosisData; ko: boolean; tr: Translations }) {
  return (
    <div className="text-center flex flex-col items-center justify-center" style={{ minHeight: 380 }}>
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-16 brightness-0 opacity-70 mb-6" />
      <div className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40 mb-6">
        {tr.reportTitle}
      </div>
      <div className="w-12 h-px bg-outline-variant/30 mb-6" />
      <h1 className="font-headline text-5xl text-primary tracking-tight mb-4">{data.parent.studentName || tr.studentNameFallback}</h1>
      <div className="font-body text-on-surface-variant">{data.parent.grade} | {data.parent.school || tr.schoolFallback}</div>
      <div className="font-body text-sm text-on-surface-variant/50 mt-2">{data.createdAt}</div>
    </div>
  )
}

function SlideProfile({ data, tr }: { data: DiagnosisData; tr: Translations }) {
  const p = data.parent
  const fields: [string, string][] = [
    [tr.curriculum, p.curriculum],
    [tr.englishExposure, p.englishExposure],
    [tr.overseasExp, p.overseasExperience],
    [tr.educationGoal, p.educationGoal],
  ]
  return (
    <div>
      <h2 className="font-headline text-3xl text-primary mb-2">{tr.profileTitle}</h2>
      <div className="w-8 h-0.5 bg-[#6B4F4F] mb-8" />
      <div className="grid grid-cols-2 gap-x-16 gap-y-6">
        {fields.map(([label, value]) => (
          <div key={label}>
            <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-1">{label}</div>
            <div className="font-body text-base text-primary">{value || '-'}</div>
          </div>
        ))}
      </div>
      {p.interests.length > 0 && (
        <div className="mt-8">
          <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-3">{tr.interests}</div>
          <div className="flex flex-wrap gap-2">
            {p.interests.map((i) => <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary font-body text-sm">{i}</span>)}
          </div>
        </div>
      )}
      {p.concerns && (
        <div className="mt-6 bg-[#F5F1EB] p-5 border-l-2 border-secondary/30">
          <div className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant/40 mb-2">{tr.parentConcerns}</div>
          <p className="font-body text-sm text-primary">{p.concerns}</p>
        </div>
      )}
    </div>
  )
}

function SlideAssessment({ scores, tr }: { scores: { axis: string; value: number }[]; tr: Translations }) {
  const overall = scores.reduce((sum, s) => sum + s.value, 0) / scores.length
  return (
    <div>
      <h2 className="font-headline text-3xl text-primary mb-2">{tr.assessmentTitle}</h2>
      <div className="w-8 h-0.5 bg-[#6B4F4F] mb-8" />
      <div className="flex gap-12 items-center">
        <div className="shrink-0"><RadarChart data={scores} size={320} /></div>
        <div className="flex-1 space-y-5">
          <div className="bg-[#F5F1EB] p-4 text-center mb-4">
            <div className="font-headline text-3xl text-primary">{overall.toFixed(1)}<span className="text-lg text-on-surface-variant/40"> / 5.0</span></div>
            <div className="font-label text-[9px] uppercase tracking-widest text-secondary mt-1">{tr.overallScore}</div>
          </div>
          {scores.map((s) => (
            <div key={s.axis} className="flex items-center gap-4">
              <span className="font-body text-sm text-on-surface-variant w-20 shrink-0">{s.axis}</span>
              <div className="flex-1 h-2.5 bg-outline-variant/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#6B4F4F] rounded-full" style={{ width: `${(s.value / 5) * 100}%` }} />
              </div>
              <span className="font-headline text-base text-primary w-8 text-right">{s.value.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SlideKeyFindings({ scores, data, tr, itemLabels }: { scores: { axis: string; value: number }[]; data: DiagnosisData; tr: Translations; itemLabels: Record<string, { label: string }> }) {
  const gradeInfo = (v: number) => {
    if (v >= 4.5) return { label: tr.grades.excellent, color: '#2D6A4F' }
    if (v >= 3.5) return { label: tr.grades.good, color: '#6B4F4F' }
    if (v >= 2.5) return { label: tr.grades.average, color: '#7A7560' }
    return { label: tr.grades.developing, color: '#9B958D' }
  }
  const notes = flattenObserver(data.observer).filter((e) => e.note)

  return (
    <div>
      <h2 className="font-headline text-3xl text-primary mb-2">{tr.keyFindings}</h2>
      <div className="w-8 h-0.5 bg-[#6B4F4F] mb-8" />
      <div className="grid grid-cols-1 gap-3 mb-6">
        {scores.map((sc, i) => {
          const key = OBSERVER_DOMAIN_KEYS[i]
          const entries = data.observer[key].items
          const top = [...entries].sort((a, b) => b.score - a.score)[0]
          const low = [...entries].sort((a, b) => a.score - b.score)[0]
          const g = gradeInfo(sc.value)
          const topLabel = top ? (itemLabels[top.key]?.label || top.label) : ''
          const lowLabel = low ? (itemLabels[low.key]?.label || low.label) : ''
          return (
            <div key={sc.axis} className="flex items-center gap-3 py-2.5 border-b border-outline-variant/10">
              <span className="font-body text-xs font-medium text-primary w-24 shrink-0">{sc.axis}</span>
              <div className="flex-1 h-2 bg-outline-variant/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(sc.value / 5) * 100}%`, background: g.color }} />
              </div>
              <span className="font-headline text-sm text-primary w-8 text-right">{sc.value.toFixed(1)}</span>
              <span className="font-body text-[11px] px-2 py-0.5 shrink-0" style={{ color: g.color, background: `${g.color}15` }}>{g.label}</span>
              <span className="font-body text-[10px] text-on-surface-variant/50 w-52 shrink-0 truncate">
                {tr.best}: {topLabel} ({top?.score}) {lowLabel !== topLabel ? `| ${tr.grow}: ${lowLabel} (${low?.score})` : ''}
              </span>
            </div>
          )
        })}
      </div>
      {notes.length > 0 && (
        <div className="bg-[#F5F1EB] p-5">
          <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-3">{tr.observationNotes}</div>
          <div className="space-y-2">
            {notes.slice(0, 5).map((n, i) => (
              <div key={i} className="font-body text-xs text-on-surface-variant">
                <span className="text-[#6B4F4F] font-medium">{n.category}</span> {n.label}: <span className="text-primary">{n.note}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SlidePersonality({ data, ko, tr, itemLabels }: { data: DiagnosisData; ko: boolean; tr: Translations; itemLabels: Record<string, { label: string }> }) {
  const bars = [
    ...data.observer.confidence.items,
    ...data.observer.expression.items.slice(0, 2),
  ]
  return (
    <div>
      <h2 className="font-headline text-3xl text-primary mb-2">{tr.personalityTitle}</h2>
      <div className="w-8 h-0.5 bg-[#6B4F4F] mb-8" />
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-4">
          {bars.map((b) => (
            <div key={b.key}>
              <div className="flex justify-between mb-2">
                <span className="font-body text-sm text-primary">{itemLabels[b.key]?.label || b.label}</span>
                <span className="font-body text-sm text-on-surface-variant/50">{b.score}/5</span>
              </div>
              <div className="h-2.5 bg-outline-variant/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#6B4F4F] rounded-full" style={{ width: `${(b.score / 5) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div>
          {data.summary.type.length > 0 && (
            <div className="space-y-4">
              <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">{tr.diagnosedType}</div>
              {data.summary.type.map((type) => {
                const info = PERSONALITY_LABELS[type]
                return (
                  <div key={type} className="p-5 border border-[#6B4F4F]/20 bg-[#F5F1EB]">
                    <div className="font-headline text-xl text-primary mb-1">{ko ? info.ko : info.en}</div>
                    <div className="font-body text-sm text-on-surface-variant/60">{ko ? info.desc_ko : info.desc_en}</div>
                  </div>
                )
              })}
            </div>
          )}
          {data.summary.overallNote && (
            <div className="mt-6 border-l-2 border-secondary/30 pl-4">
              <p className="font-body text-sm text-primary leading-relaxed">{data.summary.overallNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SlideDirection({ data, tr }: { data: DiagnosisData; tr: Translations }) {
  return (
    <div>
      <h2 className="font-headline text-3xl text-primary mb-2">{tr.directionTitle}</h2>
      <div className="w-8 h-0.5 bg-[#6B4F4F] mb-8" />
      {data.summary.recommendedDirection ? (
        <div>
          <div className="bg-[#F5F1EB] p-8">
            <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{tr.directionLabel}</div>
            <p className="font-body text-lg text-primary leading-relaxed">{data.summary.recommendedDirection}</p>
          </div>
          {data.summary.overallNote && (
            <div className="mt-8 border-l-2 border-secondary/30 pl-6">
              <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40 mb-2">{tr.summaryLabel}</div>
              <p className="font-body text-base text-primary leading-relaxed">{data.summary.overallNote}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="font-body text-on-surface-variant/50">{tr.noDirection}</p>
      )}
    </div>
  )
}

function SlideNextSteps({ data, tr }: { data: DiagnosisData; tr: Translations }) {
  const steps = data.summary.nextSteps.split('\n').filter(Boolean)
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-headline text-3xl text-primary mb-2">{tr.nextStepsTitle}</h2>
      <div className="w-8 h-0.5 bg-[#6B4F4F] mb-10" />
      {steps.length > 0 ? (
        <div className="space-y-0 w-full max-w-lg">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-5 py-5 border-b border-outline-variant/10">
              <span className="font-headline text-3xl text-secondary/25 leading-none">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-body text-lg text-primary pt-1">{step}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-body text-on-surface-variant/50">{tr.noNextSteps}</p>
      )}
      <div className="mt-12">
        <div className="inline-block bg-primary text-on-primary px-8 py-4 font-body text-sm uppercase tracking-widest">
          {tr.scheduleConsult}
        </div>
      </div>
    </div>
  )
}
