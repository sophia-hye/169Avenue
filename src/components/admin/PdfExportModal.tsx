import { useState, useRef, useEffect, useCallback } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { ReportPreview } from './ReportPreview'
import type { ReportData } from '../../data/report-template'

const SECTIONS = [
  { id: 0, name: 'Cover' },
  { id: 1, name: 'Executive Summary' },
  { id: 2, name: 'Area Assessment' },
  { id: 3, name: 'Personality Analysis' },
  { id: 4, name: 'Growth Roadmap' },
  { id: 5, name: 'Recommended Path' },
  { id: 6, name: 'Closing' },
]

interface Props {
  data: ReportData
  onClose: () => void
}

export function PdfExportModal({ data, onClose }: Props) {
  // mergeWithNext[i] = true means section i merges into the same page as section i+1
  const [mergeWithNext, setMergeWithNext] = useState<boolean[]>([false, false, false, false, false, false])
  const [generating, setGenerating] = useState(false)
  const [currentPreviewPage, setCurrentPreviewPage] = useState(0)
  const renderRef = useRef<HTMLDivElement>(null)

  // Compute page groups from merge config
  const pageGroups = computePageGroups(mergeWithNext)

  const toggleMerge = (index: number) => {
    setMergeWithNext((prev) => prev.map((v, i) => i === index ? !v : v))
  }

  // Reset preview page if it exceeds new page count
  useEffect(() => {
    if (currentPreviewPage >= pageGroups.length) {
      setCurrentPreviewPage(Math.max(0, pageGroups.length - 1))
    }
  }, [pageGroups.length, currentPreviewPage])

  const handleDownload = useCallback(async () => {
    if (!renderRef.current) return
    setGenerating(true)
    try {
      const allSections = renderRef.current.querySelectorAll<HTMLElement>('[data-section-id]')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

      for (let pageIdx = 0; pageIdx < pageGroups.length; pageIdx++) {
        const group = pageGroups[pageIdx]

        // Create a temporary container for this page's sections
        const container = document.createElement('div')
        container.style.width = '210mm'
        container.style.minHeight = '297mm'
        container.style.background = '#FAFAF7'
        container.style.position = 'absolute'
        container.style.left = '-9999px'
        container.style.top = '0'
        container.style.fontFamily = '"Pretendard", "Noto Sans KR", "Inter", sans-serif'
        container.style.color = '#2C2C2C'
        container.style.lineHeight = '1.6'
        container.style.boxSizing = 'border-box'
        document.body.appendChild(container)

        // Clone and append each section in this group
        for (const sectionId of group) {
          const section = allSections[sectionId]
          if (section) {
            const clone = section.cloneNode(true) as HTMLElement
            clone.style.display = ''
            clone.style.minHeight = group.length === 1 ? '297mm' : 'auto'
            clone.style.pageBreakAfter = 'auto'
            clone.style.boxShadow = 'none'
            container.appendChild(clone)
          }
        }

        const canvas = await html2canvas(container, { scale: 2, useCORS: true, backgroundColor: '#FAFAF7' })
        if (pageIdx > 0) pdf.addPage()
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 210, 297)

        document.body.removeChild(container)
      }

      const filename = data.studentName
        ? `Growth_Report_${data.studentName.replace(/\s+/g, '_')}.pdf`
        : 'Student_Growth_Report.pdf'
      pdf.save(filename)
      onClose()
    } finally {
      setGenerating(false)
    }
  }, [data, pageGroups, onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-surface w-full max-w-5xl mx-4 shadow-xl flex flex-col" style={{ maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-outline-variant/15">
          <div>
            <h2 className="font-headline text-xl text-primary">Export PDF</h2>
            <p className="font-body text-xs text-on-surface-variant/50 mt-1">
              {pageGroups.length} page{pageGroups.length > 1 ? 's' : ''} total. Toggle merges to combine sections.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="px-5 py-2.5 font-body text-sm text-primary/60 border border-outline-variant/30 hover:bg-surface-container-low transition-colors">
              Cancel
            </button>
            <button onClick={handleDownload} disabled={generating}
              className="px-6 py-2.5 font-body text-sm bg-primary text-on-primary hover:bg-secondary transition-colors disabled:opacity-50 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">download</span>
              {generating ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Section list with merge toggles */}
          <div className="w-72 shrink-0 border-r border-outline-variant/15 overflow-y-auto p-5">
            <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40 mb-4">Page Layout</div>
            {SECTIONS.map((section, i) => {
              // Find which page this section belongs to
              const pageIndex = pageGroups.findIndex((g) => g.includes(section.id))
              return (
                <div key={section.id}>
                  {/* Section card */}
                  <button
                    onClick={() => setCurrentPreviewPage(pageIndex)}
                    className={`w-full text-left px-4 py-3 mb-1 border transition-colors ${
                      currentPreviewPage === pageIndex
                        ? 'border-secondary bg-secondary/5 text-primary'
                        : 'border-outline-variant/15 text-on-surface-variant hover:border-outline-variant/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-headline text-xs text-on-surface-variant/30">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-body text-sm">{section.name}</span>
                    </div>
                    <div className="font-body text-[10px] text-on-surface-variant/40 mt-1">
                      Page {pageIndex + 1}
                    </div>
                  </button>

                  {/* Merge toggle (between sections, not after last) */}
                  {i < SECTIONS.length - 1 && (
                    <div className="flex items-center justify-center py-1.5">
                      <button
                        onClick={() => toggleMerge(i)}
                        className={`flex items-center gap-1.5 px-3 py-1 font-body text-[10px] uppercase tracking-widest transition-colors ${
                          mergeWithNext[i]
                            ? 'text-secondary bg-secondary/10 border border-secondary/30'
                            : 'text-on-surface-variant/30 hover:text-on-surface-variant/60'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {mergeWithNext[i] ? 'link' : 'link_off'}
                        </span>
                        {mergeWithNext[i] ? 'Merged' : 'Merge'}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Right: A4 Preview */}
          <div className="flex-1 overflow-y-auto p-6 bg-[#E8E4DE]">
            {/* Page tabs */}
            <div className="flex items-center gap-2 mb-4">
              {pageGroups.map((group, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPreviewPage(i)}
                  className={`px-3 py-1.5 font-body text-xs transition-colors ${
                    i === currentPreviewPage
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface/80 text-on-surface-variant/60 hover:bg-surface'
                  }`}
                >
                  Page {i + 1}
                  <span className="text-[10px] ml-1 opacity-50">
                    ({group.map((id) => SECTIONS[id].name.split(' ')[0]).join(' + ')})
                  </span>
                </button>
              ))}
            </div>

            {/* A4 page preview */}
            <div className="flex justify-center">
              <div style={{ width: '210mm', maxWidth: '100%', transform: 'scale(0.6)', transformOrigin: 'top center', marginBottom: -400 }}>
                <div style={{ background: '#FAFAF7', minHeight: '297mm', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                  <GroupedPagePreview data={data} sectionIds={pageGroups[currentPreviewPage] || [0]} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden full render for PDF capture */}
        <div ref={renderRef} style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1 }}>
          <FullRenderForCapture data={data} />
        </div>
      </div>
    </div>
  )
}

/** Compute page groups from merge toggles */
function computePageGroups(mergeWithNext: boolean[]): number[][] {
  const groups: number[][] = []
  let current: number[] = [0]

  for (let i = 0; i < mergeWithNext.length; i++) {
    if (mergeWithNext[i]) {
      current.push(i + 1)
    } else {
      groups.push(current)
      current = [i + 1]
    }
  }
  groups.push(current)
  return groups
}

/** Renders specific sections grouped on one preview page */
function GroupedPagePreview({ data, sectionIds }: { data: ReportData; sectionIds: number[] }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const sections = ref.current.querySelectorAll<HTMLElement>('section')
    sections.forEach((s, i) => {
      if (sectionIds.includes(i)) {
        s.style.display = ''
        s.style.minHeight = sectionIds.length === 1 ? '297mm' : 'auto'
        s.style.pageBreakAfter = 'auto'
        s.style.boxShadow = 'none'
      } else {
        s.style.display = 'none'
      }
    })
    // Remove wrapper padding
    const wrapper = ref.current.firstElementChild as HTMLElement | null
    if (wrapper) {
      wrapper.style.padding = '0'
      wrapper.style.background = 'transparent'
    }
  }, [sectionIds, data])

  return (
    <div ref={ref}>
      <ReportPreview data={data} />
    </div>
  )
}

/** Full render with all sections visible for PDF capture */
function FullRenderForCapture({ data }: { data: ReportData }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const wrapper = ref.current.firstElementChild as HTMLElement | null
    if (wrapper) {
      wrapper.style.padding = '0'
      wrapper.style.background = 'transparent'
    }
    const sections = ref.current.querySelectorAll<HTMLElement>('section')
    sections.forEach((s) => {
      s.style.display = ''
      s.style.boxShadow = 'none'
    })
  }, [data])

  return (
    <div ref={ref}>
      <ReportPreview data={data} />
    </div>
  )
}
