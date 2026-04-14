import { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { Navbar } from '../Navbar'
import { ReportPreview } from './ReportPreview'
import { DEFAULT_REPORT, PERSONALITY_LABELS, type ReportData, type SkillEntry, type ExplorationEntry, type ProfileBar, type PersonalityType } from '../../data/report-template'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="font-headline text-lg text-primary mb-4 pb-2 border-b border-outline-variant/20">{title}</h3>
      {children}
    </div>
  )
}

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

export function StudentReportPage() {
  const [data, setData] = useState<ReportData>({ ...DEFAULT_REPORT })
  const [generating, setGenerating] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

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

  const handleDownload = async () => {
    if (!previewRef.current) return
    setGenerating(true)
    try {
      const pages = previewRef.current.querySelectorAll<HTMLElement>('section')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      for (let i = 0; i < pages.length; i++) {
        const canvas = await html2canvas(pages[i], { scale: 2, useCORS: true, backgroundColor: '#f9f7f3' })
        if (i > 0) pdf.addPage()
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297)
      }
      const filename = data.studentName ? `Growth_Report_${data.studentName.replace(/\s+/g, '_')}.pdf` : 'Student_Growth_Report.pdf'
      pdf.save(filename)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 max-w-screen-xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-headline text-3xl text-primary tracking-tight">Student Growth Report</h1>
            <p className="font-body text-sm text-on-surface-variant/50 mt-1">Fill in the form, then download the PDF.</p>
          </div>
          <button onClick={handleDownload} disabled={generating} className="bg-primary text-on-primary px-8 py-3 font-body text-sm uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95 disabled:opacity-50 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">download</span>
            {generating ? 'Generating...' : 'Download PDF'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Form */}
          <div className="bg-surface border border-outline-variant/10 p-8">
            <Section title="1. Basic Info">
              <div className="grid grid-cols-2 gap-3">
                <Input label="Student Name" value={data.studentName} onChange={(v) => update('studentName', v)} placeholder="e.g. Sophia Kim" />
                <Input label="Grade" value={data.grade} onChange={(v) => update('grade', v)} placeholder="e.g. Grade 4" />
              </div>
              <Input label="Program Name" value={data.programName} onChange={(v) => update('programName', v)} />
              <div className="grid grid-cols-2 gap-3">
                <Input label="Program Period" value={data.programPeriod} onChange={(v) => update('programPeriod', v)} placeholder="e.g. 2 weeks" />
                <Input label="Date" value={data.date} onChange={(v) => update('date', v)} />
              </div>
              <Input label="Observer" value={data.observer} onChange={(v) => update('observer', v)} placeholder="e.g. Director Kim" />
            </Section>

            <Section title="2. Executive Summary">
              <Input label="Summary" value={data.summaryText} onChange={(v) => update('summaryText', v)} multiline placeholder="[Student] showed strong participation... recommended direction is..." />
              <div className="grid grid-cols-3 gap-3">
                <Input label="Strength" value={data.strength} onChange={(v) => update('strength', v)} placeholder="e.g. Communication" />
                <Input label="Direction" value={data.direction} onChange={(v) => update('direction', v)} placeholder="e.g. Exploration + Expression" />
                <Input label="Keywords" value={data.keywords} onChange={(v) => update('keywords', v)} placeholder="e.g. Presentation, Growth" />
              </div>
            </Section>

            <Section title="3. English / Communication & Learning">
              {data.skills.map((skill, i) => (
                <div key={i} className="mb-4 p-4 border border-outline-variant/10 bg-surface-container-low">
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <Input label="Skill Name" value={skill.name} onChange={(v) => updateSkill(i, 'name', v)} />
                    <label className="block mb-4">
                      <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-1 block">Stars (1-5)</span>
                      <input type="number" min={1} max={5} value={skill.stars} onChange={(e) => updateSkill(i, 'stars', Number(e.target.value))} className="w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface outline-none focus:border-secondary" />
                    </label>
                  </div>
                  <Input label="Observation" value={skill.description} onChange={(v) => updateSkill(i, 'description', v)} placeholder="Specific observations..." />
                </div>
              ))}
            </Section>

            <Section title="3b. Exploration Areas">
              {data.explorations.map((exp, i) => (
                <div key={i} className="mb-4 p-4 border border-outline-variant/10 bg-surface-container-low">
                  <Input label="Area" value={exp.name} onChange={(v) => updateExploration(i, 'name', v)} />
                  <Input label="Observation" value={exp.description} onChange={(v) => updateExploration(i, 'description', v)} placeholder="e.g. High reaction speed, competitive focus..." />
                </div>
              ))}
            </Section>

            <Section title="4. Personality Type">
              {data.profileBars.map((bar, i) => (
                <div key={i} className="grid grid-cols-3 gap-3 mb-3 items-end">
                  <Input label="Label" value={bar.label} onChange={(v) => updateBar(i, 'label', v)} />
                  <label className="block mb-4">
                    <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-1 block">Percent</span>
                    <input type="number" min={0} max={100} value={bar.percent} onChange={(e) => updateBar(i, 'percent', Number(e.target.value))} className="w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface outline-none focus:border-secondary" />
                  </label>
                  <label className="block mb-4">
                    <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-1 block">Color</span>
                    <select value={bar.color} onChange={(e) => updateBar(i, 'color', e.target.value)} className="w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface outline-none focus:border-secondary">
                      <option value="accent">Accent (Expressive)</option>
                      <option value="gray">Gray (Focused)</option>
                      <option value="blue">Blue (Exploratory)</option>
                    </select>
                  </label>
                </div>
              ))}

              <div className="mb-4">
                <span className="font-body text-xs text-on-surface-variant/60 uppercase tracking-widest mb-2 block">Primary Type(s)</span>
                <div className="flex gap-3 flex-wrap">
                  {(Object.keys(PERSONALITY_LABELS) as PersonalityType[]).map((type) => {
                    const info = PERSONALITY_LABELS[type]
                    const active = data.primaryType.includes(type)
                    return (
                      <button key={type} type="button" onClick={() => toggleType(type)}
                        className={`px-4 py-2 font-body text-sm border transition-colors ${active ? 'border-secondary bg-secondary/10 text-secondary' : 'border-outline-variant/30 text-on-surface-variant/50 hover:border-secondary'}`}>
                        {info.icon} {info.en} ({info.ko})
                      </button>
                    )
                  })}
                </div>
              </div>

              <Input label="Comprehensive Diagnosis" value={data.analysisNote} onChange={(v) => update('analysisNote', v)} multiline placeholder='This student shows "Exploratory + Expressive" tendencies...' />
            </Section>

            <Section title="5. Growth Roadmap">
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
            </Section>

            <Section title="6. Recommended Programs">
              {data.recommendedSteps.map((step, i) => (
                <input key={i} value={step} onChange={(e) => updateStep(i, e.target.value)} placeholder={`Program ${i + 1}`}
                  className="w-full border border-outline-variant/30 px-4 py-2.5 font-body text-sm text-primary bg-surface-container-low outline-none focus:border-secondary mb-2" />
              ))}
              <button onClick={addStep} className="text-xs text-secondary font-body hover:underline">+ Add program</button>
            </Section>

            <Section title="7. Closing">
              <Input label="Closing Message" value={data.closingMessage} onChange={(v) => update('closingMessage', v)} multiline placeholder="With the right guidance and continued exploration..." />
            </Section>
          </div>

          {/* RIGHT: Live Preview */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <h3 className="font-headline text-sm text-on-surface-variant/50 uppercase tracking-widest mb-4">Live Preview</h3>
              <div className="overflow-y-auto border border-outline-variant/10" style={{ maxHeight: 'calc(100vh - 160px)', transform: 'scale(0.38)', transformOrigin: 'top left', width: '263%' }}>
                <ReportPreview ref={previewRef} data={data} />
              </div>
            </div>
          </div>
        </div>

        {/* Hidden full-size preview for PDF (mobile) */}
        <div className="lg:hidden" style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <ReportPreview ref={previewRef} data={data} />
        </div>
      </main>
    </>
  )
}
