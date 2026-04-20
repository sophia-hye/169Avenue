import { useState } from 'react'
import { calcRadarScores, type DiagnosisData } from '../../../data/diagnosis-template'
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
    const fields: [string, string][] = [
      [tr.curriculum, p.curriculum],
      [tr.englishExposure, p.englishExposure],
      [tr.overseasExp, p.overseasExperience],
      [tr.educationGoal, p.educationGoal],
    ]
    const steps = data.summary.nextSteps.split('\n').filter(Boolean)

    // Generate radar chart SVG
    const radarSvg = (() => {
      const size = 280, cx = size / 2, cy = size / 2, r = size * 0.38, n = ds.length
      const step = (2 * Math.PI) / n
      const pt = (idx: number, val: number) => {
        const a = step * idx - Math.PI / 2, d = (val / 5) * r
        return { x: cx + d * Math.cos(a), y: cy + d * Math.sin(a) }
      }
      const grid = [1,2,3,4,5].map(lv => {
        const pts = Array.from({length:n},(_,i)=>pt(i,lv))
        return `<polygon points="${pts.map(p=>`${p.x},${p.y}`).join(' ')}" fill="none" stroke="#E5E0D8" stroke-width="0.5"/>`
      }).join('')
      const axes = Array.from({length:n},(_,i)=>{const e=pt(i,5);return `<line x1="${cx}" y1="${cy}" x2="${e.x}" y2="${e.y}" stroke="#E5E0D8" stroke-width="0.5"/>`}).join('')
      const dataPts = ds.map((d,i)=>pt(i,d.value))
      const dataPath = `<polygon points="${dataPts.map(p=>`${p.x},${p.y}`).join(' ')}" fill="#6B4F4F" fill-opacity="0.15" stroke="#6B4F4F" stroke-width="1.5"/>`
      const dots = dataPts.map((p)=>`<circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#6B4F4F"/>`).join('')
      const labels = ds.map((d,i)=>{const lp=pt(i,5.8);return `<text x="${lp.x}" y="${lp.y}" text-anchor="middle" dominant-baseline="middle" style="font-size:11px;fill:#5A5550;font-family:Pretendard,sans-serif">${d.axis}</text>`}).join('')
      const vals = ds.map((d,i)=>{const vp=pt(i,d.value+0.7);return `<text x="${vp.x}" y="${vp.y}" text-anchor="middle" dominant-baseline="middle" style="font-size:10px;fill:#6B4F4F;font-weight:600;font-family:Pretendard,sans-serif">${d.value.toFixed(1)}</text>`}).join('')
      return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${grid}${axes}${dataPath}${dots}${labels}${vals}</svg>`
    })()

    // Key findings per axis
    const axisKeys = ['english','attitude','interest','personality','overseas'] as const
    const keyFindings = ds.map((sc, i) => {
      const entries = data.observer[axisKeys[i]]
      const top = [...entries].sort((a,b) => b.score - a.score)[0]
      const low = [...entries].sort((a,b) => a.score - b.score)[0]
      return { axis: sc.axis, value: sc.value, top, low }
    })

    // Observation notes
    const notes = Object.values(data.observer).flat().filter(e => e.note)

    const TAG = 'font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#9B958D'
    const CARD = 'padding:16px;border:1px solid #E5E0D8;background:#F5F1EB'
    const svgBar = (pct: number, color = '#6B4F4F', wd = 300, h = 10) =>
      `<svg width="${wd}" height="${h}" style="display:block;flex:1"><rect width="${wd}" height="${h}" rx="4" fill="#E5E0D8"/><rect width="${Math.round(wd * pct / 100)}" height="${h}" rx="4" fill="${color}"/></svg>`
    const svgLine = (wd = 32, color = '#6B4F4F') =>
      `<svg width="${wd}" height="2" style="display:block;margin:12px 0 24px"><rect width="${wd}" height="2" fill="${color}"/></svg>`

    const S = 'width:100vw;height:100vh;padding:40px 64px;display:flex;align-items:center;justify-content:center;page-break-after:always;background:#FAF8F5'
    const SL = 'width:100vw;height:100vh;padding:40px 64px;display:flex;align-items:center;justify-content:center;background:#FAF8F5'
    const I = 'width:100%;max-width:900px'

    const html = `<!DOCTYPE html><html><head><title>Diagnosis - ${p.studentName || 'Student'}</title>
<style>
@page{size:landscape;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Pretendard','Noto Sans KR',sans-serif;color:#2C2C2C;background:#FAF8F5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1,h2{font-family:Georgia,'Noto Serif KR',serif}
</style></head><body>

<div style="${S}"><div style="${I};text-align:center">
<div style="${TAG};margin-bottom:24px">${tr.reportTitle}</div>
<div style="width:48px;height:1px;background:#E5E0D8;margin:0 auto 24px"></div>
<h1 style="font-size:44px;font-weight:400;margin-bottom:16px">${p.studentName || tr.studentNameFallback}</h1>
<div style="color:#9B958D;font-size:16px">${p.grade}${p.school ? ' | ' + p.school : ''}</div>
<div style="color:#9B958D;font-size:14px;margin-top:8px">${data.createdAt}</div>
</div></div>

<div style="${S}"><div style="${I}">
<h2 style="font-size:26px;font-weight:400">${tr.profileTitle}</h2>${svgLine()}
<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px 48px">
${fields.map(([l,v]) => `<div><div style="${TAG};margin-bottom:4px">${l}</div><div style="font-size:15px">${v||'-'}</div></div>`).join('')}
</div>
${p.interests.length ? `<div style="margin-top:20px"><div style="${TAG};margin-bottom:8px">${tr.interests}</div><div>${p.interests.map(x=>`<span style="display:inline-block;padding:4px 12px;background:#F5F1EB;margin:3px;font-size:13px">${x}</span>`).join('')}</div></div>` : ''}
</div></div>

<div style="${S}"><div style="${I}">
<h2 style="font-size:26px;font-weight:400">${tr.assessmentTitle}</h2>${svgLine()}
<div style="display:flex;gap:40px;align-items:flex-start">
<div style="flex-shrink:0">${radarSvg}</div>
<div style="flex:1">
<div style="background:#F5F1EB;padding:12px;text-align:center;margin-bottom:20px">
<div style="font-size:28px">${overall.toFixed(1)} <span style="font-size:14px;color:#9B958D">/ 5.0</span></div>
<div style="${TAG};margin-top:4px">${tr.overallScore}</div></div>
${ds.map(s => `<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
<span style="width:64px;font-size:12px;color:#5A5550">${s.axis}</span>
${svgBar((s.value/5)*100)}
<span style="width:28px;text-align:right;font-size:14px">${s.value.toFixed(1)}</span>
</div>`).join('')}
</div></div>
</div></div>

<div style="${S}"><div style="${I}">
<h2 style="font-size:26px;font-weight:400">${tr.keyFindings}</h2>${svgLine()}
<table style="width:100%;border-collapse:collapse">
<thead><tr>
<th style="text-align:left;padding:8px 0;font-size:11px;color:#9B958D;font-weight:400;width:80px">${tr.area}</th>
<th style="padding:8px 0;width:40%"></th>
<th style="text-align:right;padding:8px 0;font-size:11px;color:#9B958D;font-weight:400;width:36px">${tr.score}</th>
<th style="text-align:center;padding:8px 0;font-size:11px;color:#9B958D;font-weight:400;width:64px">${tr.gradeLabel}</th>
<th style="text-align:left;padding:8px 0;font-size:11px;color:#9B958D;font-weight:400">${tr.strengthImprove}</th>
</tr></thead>
<tbody>
${keyFindings.map(f => {
  const grade = f.value >= 4.5 ? tr.grades.excellent : f.value >= 3.5 ? tr.grades.good : f.value >= 2.5 ? tr.grades.average : tr.grades.developing
  const gColor = f.value >= 4.5 ? '#2D6A4F' : f.value >= 3.5 ? '#6B4F4F' : f.value >= 2.5 ? '#7A7560' : '#9B958D'
  return `<tr style="border-bottom:1px solid #E5E0D8">
<td style="padding:14px 0;font-size:13px;font-weight:500;vertical-align:middle">${f.axis}</td>
<td style="padding:14px 8px;vertical-align:middle">${svgBar((f.value/5)*100, gColor, 250, 8)}</td>
<td style="padding:14px 0;text-align:right;font-size:14px;font-weight:600;vertical-align:middle">${f.value.toFixed(1)}</td>
<td style="padding:14px 8px;text-align:center;vertical-align:middle"><span style="font-size:11px;color:${gColor};padding:2px 8px">${grade}</span></td>
<td style="padding:14px 0;font-size:11px;color:#9B958D;vertical-align:middle">${f.top.label}${f.low.label !== f.top.label ? ` / ${f.low.label}` : ''}</td>
</tr>`}).join('')}
</tbody></table>
${notes.length ? `<div style="margin-top:24px"><div style="${TAG};margin-bottom:8px">${tr.observationNotes}</div>
${notes.map(n => `<div style="font-size:12px;padding:6px 0;border-bottom:1px solid #F5F1EB"><span style="color:#6B4F4F">${n.category}</span> <span style="color:#9B958D">${n.label}:</span> ${n.note}</div>`).join('')}</div>` : ''}
</div></div>

<div style="${S}"><div style="${I}">
<h2 style="font-size:26px;font-weight:400">${tr.personalityTitle}</h2>${svgLine()}
<div style="display:grid;grid-template-columns:1fr 1fr;gap:40px"><div>
${data.observer.personality.map(b => `<div style="margin-bottom:20px">
<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><span style="font-size:14px;font-weight:500">${tr.personalityLabel[b.label] || b.label}</span><span style="color:#6B4F4F;font-size:14px;font-weight:600">${b.score}/5</span></div>
${svgBar((b.score/5)*100, '#6B4F4F', 300, 10)}
</div>`).join('')}
</div><div>
${data.summary.type.length ? `<div style="${TAG};margin-bottom:12px">${tr.diagnosedType}</div>
${data.summary.type.map(type=>{const info=PERSONALITY_LABELS[type];return `<div style="${CARD};margin-bottom:8px;text-align:center"><div style="font-size:18px;font-family:Georgia,serif;margin-bottom:4px">${ko?info.ko:info.en}</div><div style="font-size:12px;color:#9B958D">${ko?info.desc_ko:info.desc_en}</div></div>`}).join('')}` : ''}
${data.summary.overallNote ? `<div style="margin-top:16px;border-left:2px solid #6B4F4F30;padding-left:16px"><p style="font-size:13px;line-height:1.7">${data.summary.overallNote}</p></div>` : ''}
</div></div>
</div></div>

<div style="${S}"><div style="${I}">
<h2 style="font-size:26px;font-weight:400">${tr.directionTitle}</h2>${svgLine()}
${data.summary.recommendedDirection ? `<div style="background:#F5F1EB;padding:24px"><div style="${TAG};margin-bottom:12px">${tr.directionLabel}</div><p style="font-size:16px;line-height:1.8">${data.summary.recommendedDirection}</p></div>` : `<p style="color:#9B958D">${tr.noDirectionPdf}</p>`}
${data.summary.overallNote && data.summary.recommendedDirection ? `<div style="margin-top:20px;border-left:2px solid #6B4F4F30;padding-left:20px"><div style="${TAG};margin-bottom:8px">${tr.summaryLabel}</div><p style="font-size:14px;line-height:1.7">${data.summary.overallNote}</p></div>` : ''}
</div></div>

<div style="${SL}"><div style="${I};text-align:center">
<h2 style="font-size:26px;font-weight:400">${tr.nextStepsTitle}</h2>${svgLine()}
${steps.length ? `<div style="max-width:480px;margin:0 auto;text-align:left">${steps.map((s,i)=>`<div style="display:flex;gap:20px;padding:16px 0;border-bottom:1px solid #E5E0D8"><span style="font-size:28px;color:#6B4F4F40;font-family:Georgia,serif">${String(i+1).padStart(2,'0')}</span><span style="font-size:17px;padding-top:4px">${s}</span></div>`).join('')}</div>` : ''}
<div style="margin-top:36px;display:inline-block;background:#2C2C2C;color:#fff;padding:12px 28px;font-size:13px;letter-spacing:0.08em">${tr.scheduleConsult}</div>
</div></div>

</body></html>`

    w.document.write(html)
    w.document.close()
    w.onload = () => w.print()
  }

  const slideComponents = [
    <SlideCover key={0} data={data} ko={ko} tr={tr} />,
    <SlideProfile key={1} data={data} tr={tr} />,
    <SlideAssessment key={2} scores={displayScores} tr={tr} />,
    <SlideKeyFindings key={3} scores={displayScores} data={data} tr={tr} />,
    <SlidePersonality key={4} data={data} ko={ko} tr={tr} />,
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

function SlideKeyFindings({ scores, data, tr }: { scores: { axis: string; value: number }[]; data: DiagnosisData; tr: Translations }) {
  const axisKeys = ['english', 'attitude', 'interest', 'personality', 'overseas'] as const
  const gradeInfo = (v: number) => {
    if (v >= 4.5) return { label: tr.grades.excellent, color: '#2D6A4F' }
    if (v >= 3.5) return { label: tr.grades.good, color: '#6B4F4F' }
    if (v >= 2.5) return { label: tr.grades.average, color: '#7A7560' }
    return { label: tr.grades.developing, color: '#9B958D' }
  }
  const notes = Object.values(data.observer).flat().filter(e => e.note)

  return (
    <div>
      <h2 className="font-headline text-3xl text-primary mb-2">{tr.keyFindings}</h2>
      <div className="w-8 h-0.5 bg-[#6B4F4F] mb-8" />
      <div className="grid grid-cols-1 gap-4 mb-6">
        {scores.map((sc, i) => {
          const entries = data.observer[axisKeys[i]]
          const top = [...entries].sort((a, b) => b.score - a.score)[0]
          const low = [...entries].sort((a, b) => a.score - b.score)[0]
          const g = gradeInfo(sc.value)
          return (
            <div key={sc.axis} className="flex items-center gap-4 py-3 border-b border-outline-variant/10">
              <span className="font-body text-sm font-medium text-primary w-20 shrink-0">{sc.axis}</span>
              <div className="flex-1 h-2.5 bg-outline-variant/10 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(sc.value / 5) * 100}%`, background: g.color }} />
              </div>
              <span className="font-headline text-base text-primary w-8 text-right">{sc.value.toFixed(1)}</span>
              <span className="font-body text-xs px-2 py-0.5 shrink-0" style={{ color: g.color, background: `${g.color}15` }}>{g.label}</span>
              <span className="font-body text-[11px] text-on-surface-variant/50 w-48 shrink-0 truncate">
                {tr.best}: {top.label} ({top.score}) {low.label !== top.label ? `| ${tr.grow}: ${low.label} (${low.score})` : ''}
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

function SlidePersonality({ data, ko, tr }: { data: DiagnosisData; ko: boolean; tr: Translations }) {
  const bars = data.observer.personality
  return (
    <div>
      <h2 className="font-headline text-3xl text-primary mb-2">{tr.personalityTitle}</h2>
      <div className="w-8 h-0.5 bg-[#6B4F4F] mb-8" />
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          {bars.map((b) => (
            <div key={b.label}>
              <div className="flex justify-between mb-2">
                <span className="font-body text-sm text-primary">{tr.personalityLabel[b.label] || b.label}</span>
                <span className="font-body text-sm text-on-surface-variant/50">{b.score}/5</span>
              </div>
              <div className="h-3 bg-outline-variant/10 rounded-full overflow-hidden">
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
