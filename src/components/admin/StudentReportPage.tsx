import { useState, useRef, useCallback, useEffect } from 'react'
import { Navbar } from '../Navbar'
import { ReportPreview } from './ReportPreview'
import { PdfExportModal } from './PdfExportModal'
import { DEFAULT_REPORT, PERSONALITY_LABELS, type ReportData, type SkillEntry, type ExplorationEntry, type ProfileBar, type PersonalityType } from '../../data/report-template'
import { useLanguage } from '../../context/LanguageContext'

/* ── Shared UI ── */

function Input({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean
}) {
  const cls = "w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary transition-colors"
  return (
    <label className="block mb-4">
      <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-1 block">{label}</span>
      {multiline
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className={cls} />
        : <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </label>
  )
}

/** Renders one page from the full report, trimmed to fit */
function PagePreview({ data, pageIndex }: { data: ReportData; pageIndex: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    // Remove wrapper padding
    const wrapper = ref.current.firstElementChild as HTMLElement | null
    if (wrapper) {
      wrapper.style.padding = '0'
      wrapper.style.background = 'transparent'
    }
    // Show only the target page section
    const sections = ref.current.querySelectorAll<HTMLElement>('section')
    sections.forEach((s, i) => {
      if (i === pageIndex) {
        s.style.display = ''
        s.style.minHeight = 'auto'
        s.style.pageBreakAfter = 'auto'
        s.style.boxShadow = 'none'
      } else {
        s.style.display = 'none'
      }
    })
  }, [pageIndex, data])

  return (
    <div ref={ref} className="pointer-events-none">
      <ReportPreview data={data} />
    </div>
  )
}

/* ── Main Component ── */

export function StudentReportPage() {
  const [data, setData] = useState<ReportData>({ ...DEFAULT_REPORT })
  const [showExportModal, setShowExportModal] = useState(false)
  const { t, language } = useLanguage()
  const ko = language === 'ko'

  const update = useCallback(<K extends keyof ReportData>(key: K, value: ReportData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const updateSkill = useCallback((index: number, field: keyof SkillEntry, value: string | number) => {
    setData((prev) => ({ ...prev, skills: prev.skills.map((s, i) => i === index ? { ...s, [field]: value } : s) }))
  }, [])

  const updateExploration = useCallback((index: number, field: keyof ExplorationEntry, value: string) => {
    setData((prev) => ({ ...prev, explorations: prev.explorations.map((e, i) => i === index ? { ...e, [field]: value } : e) }))
  }, [])

  const updateRoadmap = useCallback((index: number, itemIndex: number, value: string) => {
    setData((prev) => ({ ...prev, roadmap: prev.roadmap.map((r, i) => i === index ? { ...r, items: r.items.map((it, j) => j === itemIndex ? value : it) } : r) }))
  }, [])

  const addRoadmapItem = useCallback((index: number) => {
    setData((prev) => ({ ...prev, roadmap: prev.roadmap.map((r, i) => i === index ? { ...r, items: [...r.items, ''] } : r) }))
  }, [])

  const updateBar = useCallback((index: number, field: keyof ProfileBar, value: string | number) => {
    setData((prev) => ({ ...prev, profileBars: prev.profileBars.map((b, i) => i === index ? { ...b, [field]: value } : b) }))
  }, [])

  const toggleType = useCallback((type: PersonalityType) => {
    setData((prev) => {
      const has = prev.primaryType.includes(type)
      return { ...prev, primaryType: has ? prev.primaryType.filter((tp) => tp !== type) : [...prev.primaryType, type] }
    })
  }, [])

  const updateStep = useCallback((index: number, value: string) => {
    setData((prev) => ({ ...prev, recommendedSteps: prev.recommendedSteps.map((s, i) => i === index ? value : s) }))
  }, [])

  const addStep = useCallback(() => {
    setData((prev) => ({ ...prev, recommendedSteps: [...prev.recommendedSteps, ''] }))
  }, [])

  /* ── Page Sections: each row = preview (left) + form (right) ── */

  const pages = [
    {
      title: t.rep_pages.cover,
      pageIndex: 0,
      form: (
        <>
          <Input label={t.rep_student_name} value={data.studentName} onChange={(v) => update('studentName', v)} placeholder={t.rep_student_name_ph} />
          <Input label={t.rep_grade} value={data.grade} onChange={(v) => update('grade', v)} placeholder={t.rep_grade_ph} />
          <Input label={t.rep_program_name} value={data.programName} onChange={(v) => update('programName', v)} />
          <Input label={t.rep_program_period} value={data.programPeriod} onChange={(v) => update('programPeriod', v)} placeholder={t.rep_program_period_ph} />
          <Input label={t.rep_date} value={data.date} onChange={(v) => update('date', v)} />
          <Input label={t.rep_observer} value={data.observer} onChange={(v) => update('observer', v)} placeholder={t.rep_observer_ph} />
        </>
      ),
    },
    {
      title: t.rep_pages.summary,
      pageIndex: 1,
      form: (
        <>
          <Input label={t.rep_summary} value={data.summaryText} onChange={(v) => update('summaryText', v)} multiline placeholder={t.rep_summary_ph} />
          <Input label={t.rep_strength} value={data.strength} onChange={(v) => update('strength', v)} placeholder={t.rep_strength_ph} />
          <Input label={t.rep_direction} value={data.direction} onChange={(v) => update('direction', v)} placeholder={t.rep_direction_ph} />
          <Input label={t.rep_keywords} value={data.keywords} onChange={(v) => update('keywords', v)} placeholder={t.rep_keywords_ph} />
        </>
      ),
    },
    {
      title: t.rep_pages.area,
      pageIndex: 2,
      form: (
        <>
          <p className="font-body text-xs text-on-surface-variant/50 mb-4">{t.rep_skills_section}</p>
          {data.skills.map((skill, i) => (
            <div key={i} className="mb-4 p-4 border border-outline-variant/10 bg-surface-container-low">
              <div className="flex items-center justify-between gap-3 mb-3">
                <Input label={t.rep_skill_name} value={skill.name} onChange={(v) => updateSkill(i, 'name', v)} />
                <div className="flex items-center gap-1 shrink-0 pt-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => updateSkill(i, 'stars', n)}
                      className={`text-lg transition-colors ${n <= skill.stars ? 'text-[#6B4F4F]' : 'text-outline-variant/30 hover:text-[#6B4F4F]/50'}`}>
                      {n <= skill.stars ? '\u2605' : '\u2606'}
                    </button>
                  ))}
                </div>
              </div>
              <Input label={t.rep_observation} value={skill.description} onChange={(v) => updateSkill(i, 'description', v)} placeholder={t.rep_observation_ph} />
            </div>
          ))}
          <p className="font-body text-xs text-on-surface-variant/50 mb-4 mt-6">{t.rep_exploration_section}</p>
          {data.explorations.map((exp, i) => (
            <div key={i} className="mb-4 p-4 border border-outline-variant/10 bg-surface-container-low">
              <Input label={t.rep_area} value={exp.name} onChange={(v) => updateExploration(i, 'name', v)} />
              <Input label={t.rep_observation} value={exp.description} onChange={(v) => updateExploration(i, 'description', v)} placeholder={t.rep_exploration_ph} />
            </div>
          ))}
        </>
      ),
    },
    {
      title: t.rep_pages.personality,
      pageIndex: 3,
      form: (
        <>
          {data.profileBars.map((bar, i) => {
            const colorLabel = bar.color === 'blue' ? '#4A5F78' : bar.color === 'accent' ? '#6B4F4F' : '#7A7560'
            return (
              <div key={i} className="mb-3 flex items-center gap-4">
                <div className="flex items-center gap-2 w-32 shrink-0">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: colorLabel }} />
                  <span className="font-body text-sm font-medium text-primary">{bar.label}</span>
                </div>
                <input type="range" min={0} max={100} value={bar.percent} onChange={(e) => updateBar(i, 'percent', Number(e.target.value))}
                  className="flex-1 h-2 accent-[#6B4F4F]" />
                <span className="font-body text-sm text-on-surface-variant/60 w-10 text-right">{bar.percent}%</span>
              </div>
            )
          })}
          <div className="mb-4">
            <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-2 block">{t.rep_primary_type}</span>
            <div className="flex flex-col gap-2">
              {(Object.keys(PERSONALITY_LABELS) as PersonalityType[]).map((type) => {
                const info = PERSONALITY_LABELS[type]
                const active = data.primaryType.includes(type)
                return (
                  <button key={type} type="button" onClick={() => toggleType(type)}
                    className={`px-4 py-2.5 font-body text-sm border transition-colors text-left ${active ? 'border-secondary bg-secondary/10 text-secondary' : 'border-outline-variant/30 text-on-surface-variant/50 hover:border-secondary'}`}>
                    {info.en} ({info.ko}) — {ko ? info.desc_ko : info.desc_en}
                  </button>
                )
              })}
            </div>
          </div>
          <Input label={t.rep_diagnosis} value={data.analysisNote} onChange={(v) => update('analysisNote', v)} multiline placeholder={t.rep_diagnosis_ph} />
        </>
      ),
    },
    {
      title: t.rep_pages.roadmap,
      pageIndex: 4,
      form: (
        <>
          {data.roadmap.map((entry, i) => (
            <div key={i} className="mb-4 p-4 border border-outline-variant/10 bg-surface-container-low">
              <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest block mb-2">{entry.period}</span>
              {entry.items.map((item, j) => (
                <input key={j} value={item} onChange={(e) => updateRoadmap(i, j, e.target.value)} placeholder={t.rep_goal_ph(j + 1)}
                  className="w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface outline-none focus:border-secondary mb-2" />
              ))}
              <button onClick={() => addRoadmapItem(i)} className="text-xs text-secondary font-body hover:underline">{t.rep_add_item}</button>
            </div>
          ))}
        </>
      ),
    },
    {
      title: t.rep_pages.recommended,
      pageIndex: 5,
      form: (
        <>
          {data.recommendedSteps.map((step, i) => (
            <input key={i} value={step} onChange={(e) => updateStep(i, e.target.value)} placeholder={t.rep_program_ph(i + 1)}
              className="w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary mb-2" />
          ))}
          <button onClick={addStep} className="text-xs text-secondary font-body hover:underline">{t.rep_add_program}</button>
        </>
      ),
    },
    {
      title: t.rep_pages.closing,
      pageIndex: 6,
      form: (
        <Input label={t.rep_closing_msg} value={data.closingMessage} onChange={(v) => update('closingMessage', v)} multiline placeholder={t.rep_closing_msg_ph} />
      ),
    },
  ]

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6" style={{ maxWidth: 1800, margin: '0 auto' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-headline text-3xl text-primary tracking-tight">{t.rep_page_title}</h1>
            <p className="font-body text-sm text-on-surface-variant/50 mt-1">{t.rep_page_intro}</p>
          </div>
          <button onClick={() => setShowExportModal(true)} className="bg-primary text-on-primary px-8 py-3 font-body text-sm uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">download</span>
            {t.rep_download_pdf}
          </button>
        </div>

        {/* Page-by-page rows */}
        <div className="space-y-16">
          {pages.map((p, idx) => (
            <div key={p.title}>
              {/* Section label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="font-headline text-sm text-on-surface-variant/30">{String(idx + 1).padStart(2, '0')}</span>
                <span className="font-label text-xs uppercase tracking-widest text-secondary">{p.title}</span>
                <div className="flex-1 h-px bg-outline-variant/15" />
              </div>

              {/* Preview (left) + Form (right) */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
                {/* Preview */}
                <div className="lg:col-span-3 border border-outline-variant/10 overflow-hidden" style={{ background: '#FAFAF7' }}>
                  <PagePreview data={data} pageIndex={p.pageIndex} />
                </div>

                {/* Form */}
                <div className="lg:col-span-2 bg-surface border border-outline-variant/10 p-6">
                  {p.form}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Download again at bottom */}
        <div className="mt-16 text-center">
          <button onClick={() => setShowExportModal(true)} className="bg-primary text-on-primary px-12 py-4 font-body text-sm uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95 inline-flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">download</span>
            {t.rep_download_pdf}
          </button>
        </div>

        {/* Export Modal */}
        {showExportModal && <PdfExportModal data={data} onClose={() => setShowExportModal(false)} />}
      </main>
    </>
  )
}
