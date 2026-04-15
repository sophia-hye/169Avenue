import { useState, useRef, useCallback, useEffect } from 'react'
import { Navbar } from '../Navbar'
import { ReportPreview } from './ReportPreview'
import { PdfExportModal } from './PdfExportModal'
import { DEFAULT_REPORT, PERSONALITY_LABELS, type ReportData, type SkillEntry, type ExplorationEntry, type ProfileBar, type PersonalityType } from '../../data/report-template'

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
      return { ...prev, primaryType: has ? prev.primaryType.filter((t) => t !== type) : [...prev.primaryType, type] }
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
      title: 'Cover',
      pageIndex: 0,
      form: (
        <>
          <Input label="Student Name" value={data.studentName} onChange={(v) => update('studentName', v)} placeholder="e.g. Sophia Kim" />
          <Input label="Grade" value={data.grade} onChange={(v) => update('grade', v)} placeholder="e.g. Grade 4" />
          <Input label="Program Name" value={data.programName} onChange={(v) => update('programName', v)} />
          <Input label="Program Period" value={data.programPeriod} onChange={(v) => update('programPeriod', v)} placeholder="e.g. 2 weeks" />
          <Input label="Date" value={data.date} onChange={(v) => update('date', v)} />
          <Input label="Observer" value={data.observer} onChange={(v) => update('observer', v)} placeholder="e.g. Director Kim" />
        </>
      ),
    },
    {
      title: 'Executive Summary',
      pageIndex: 1,
      form: (
        <>
          <Input label="Summary" value={data.summaryText} onChange={(v) => update('summaryText', v)} multiline placeholder="[Student] showed strong participation... recommended direction is..." />
          <Input label="Strength" value={data.strength} onChange={(v) => update('strength', v)} placeholder="e.g. Communication / Active Participation" />
          <Input label="Direction" value={data.direction} onChange={(v) => update('direction', v)} placeholder="e.g. Exploration + Expression" />
          <Input label="Keywords" value={data.keywords} onChange={(v) => update('keywords', v)} placeholder="e.g. Presentation / Experience / Growth" />
        </>
      ),
    },
    {
      title: 'Area Assessment',
      pageIndex: 2,
      form: (
        <>
          <p className="font-body text-xs text-on-surface-variant/50 mb-4">English / Communication & Learning Attitude</p>
          {data.skills.map((skill, i) => (
            <div key={i} className="mb-4 p-4 border border-outline-variant/10 bg-surface-container-low">
              <div className="flex items-center justify-between gap-3 mb-3">
                <Input label="Skill Name" value={skill.name} onChange={(v) => updateSkill(i, 'name', v)} />
                <div className="flex items-center gap-1 shrink-0 pt-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => updateSkill(i, 'stars', n)}
                      className={`text-lg transition-colors ${n <= skill.stars ? 'text-[#6B4F4F]' : 'text-outline-variant/30 hover:text-[#6B4F4F]/50'}`}>
                      {n <= skill.stars ? '\u2605' : '\u2606'}
                    </button>
                  ))}
                </div>
              </div>
              <Input label="Observation" value={skill.description} onChange={(v) => updateSkill(i, 'description', v)} placeholder="Specific observations..." />
            </div>
          ))}
          <p className="font-body text-xs text-on-surface-variant/50 mb-4 mt-6">Exploration Areas</p>
          {data.explorations.map((exp, i) => (
            <div key={i} className="mb-4 p-4 border border-outline-variant/10 bg-surface-container-low">
              <Input label="Area" value={exp.name} onChange={(v) => updateExploration(i, 'name', v)} />
              <Input label="Observation" value={exp.description} onChange={(v) => updateExploration(i, 'description', v)} placeholder="e.g. High reaction speed, competitive focus..." />
            </div>
          ))}
        </>
      ),
    },
    {
      title: 'Personality Analysis',
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
            <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-2 block">Primary Type(s)</span>
            <div className="flex flex-col gap-2">
              {(Object.keys(PERSONALITY_LABELS) as PersonalityType[]).map((type) => {
                const info = PERSONALITY_LABELS[type]
                const active = data.primaryType.includes(type)
                return (
                  <button key={type} type="button" onClick={() => toggleType(type)}
                    className={`px-4 py-2.5 font-body text-sm border transition-colors text-left ${active ? 'border-secondary bg-secondary/10 text-secondary' : 'border-outline-variant/30 text-on-surface-variant/50 hover:border-secondary'}`}>
                    {info.en} ({info.ko}) — {info.desc_en}
                  </button>
                )
              })}
            </div>
          </div>
          <Input label="Comprehensive Diagnosis" value={data.analysisNote} onChange={(v) => update('analysisNote', v)} multiline placeholder='This student shows "Exploratory + Expressive" tendencies...' />
        </>
      ),
    },
    {
      title: 'Growth Roadmap',
      pageIndex: 4,
      form: (
        <>
          {data.roadmap.map((entry, i) => (
            <div key={i} className="mb-4 p-4 border border-outline-variant/10 bg-surface-container-low">
              <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest block mb-2">{entry.period}</span>
              {entry.items.map((item, j) => (
                <input key={j} value={item} onChange={(e) => updateRoadmap(i, j, e.target.value)} placeholder={`Goal ${j + 1}`}
                  className="w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface outline-none focus:border-secondary mb-2" />
              ))}
              <button onClick={() => addRoadmapItem(i)} className="text-xs text-secondary font-body hover:underline">+ Add item</button>
            </div>
          ))}
        </>
      ),
    },
    {
      title: 'Recommended Path',
      pageIndex: 5,
      form: (
        <>
          {data.recommendedSteps.map((step, i) => (
            <input key={i} value={step} onChange={(e) => updateStep(i, e.target.value)} placeholder={`Program ${i + 1}`}
              className="w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary mb-2" />
          ))}
          <button onClick={addStep} className="text-xs text-secondary font-body hover:underline">+ Add program</button>
        </>
      ),
    },
    {
      title: 'Closing',
      pageIndex: 6,
      form: (
        <Input label="Closing Message" value={data.closingMessage} onChange={(v) => update('closingMessage', v)} multiline placeholder="With the right guidance and continued exploration..." />
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
            <h1 className="font-headline text-3xl text-primary tracking-tight">Student Growth Report</h1>
            <p className="font-body text-sm text-on-surface-variant/50 mt-1">Scroll down to fill each page. Preview updates live on the left.</p>
          </div>
          <button onClick={() => setShowExportModal(true)} className="bg-primary text-on-primary px-8 py-3 font-body text-sm uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">download</span>
            Download PDF
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
            Download PDF
          </button>
        </div>

        {/* Export Modal */}
        {showExportModal && <PdfExportModal data={data} onClose={() => setShowExportModal(false)} />}
      </main>
    </>
  )
}
