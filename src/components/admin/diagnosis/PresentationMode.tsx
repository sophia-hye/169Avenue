import { useState, useRef, useCallback } from 'react'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { calcRadarScores, type DiagnosisData } from '../../../data/diagnosis-template'
import { PERSONALITY_LABELS } from '../../../data/report-template'
import { RadarChart } from './RadarChart'
import { useLanguage } from '../../../context/LanguageContext'

interface Props {
  data: DiagnosisData
  onClose: () => void
}

const AXIS_KO: Record<string, string> = {
  'English': '영어', 'Attitude': '태도', 'Interest': '관심', 'Personality': '성향', 'Overseas': '해외',
}

export function PresentationMode({ data, onClose }: Props) {
  const [slide, setSlide] = useState(0)
  const [generating, setGenerating] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const ko = language === 'ko'
  const scores = calcRadarScores(data.observer)
  const displayScores = ko ? scores.map((s) => ({ ...s, axis: AXIS_KO[s.axis] || s.axis })) : scores

  const SLIDES = ko
    ? ['표지', '프로필', '5축 평가', '성향 분석', '추천 방향', '다음 단계']
    : ['Cover', 'Profile', 'Assessment', 'Personality', 'Direction', 'Next Steps']

  const prev = () => setSlide(Math.max(0, slide - 1))
  const next = () => setSlide(Math.min(SLIDES.length - 1, slide + 1))

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') next()
    if (e.key === 'ArrowLeft') prev()
    if (e.key === 'Escape') onClose()
  }

  const allSlidesRef = useRef<HTMLDivElement>(null)

  const handleDownloadPdf = useCallback(async () => {
    if (!allSlidesRef.current) return
    setGenerating(true)
    try {
      // Move the container on-screen temporarily
      allSlidesRef.current.style.left = '0'
      allSlidesRef.current.style.zIndex = '10000'
      await new Promise((r) => setTimeout(r, 200))

      const slideEls = allSlidesRef.current.children
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [960, 540] })

      for (let i = 0; i < slideEls.length; i++) {
        const el = slideEls[i] as HTMLElement
        const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#FAF8F5' })
        if (i > 0) pdf.addPage()
        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 960, 540)
      }

      // Move back off-screen
      allSlidesRef.current.style.left = '-9999px'
      allSlidesRef.current.style.zIndex = ''

      const filename = data.parent.studentName
        ? `Diagnosis_${data.parent.studentName.replace(/\s+/g, '_')}.pdf`
        : 'Student_Diagnosis.pdf'
      pdf.save(filename)
    } finally {
      if (allSlidesRef.current) {
        allSlidesRef.current.style.left = '-9999px'
        allSlidesRef.current.style.zIndex = ''
      }
      setGenerating(false)
    }
  }, [data])

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
          <button onClick={handleDownloadPdf} disabled={generating}
            className="px-4 py-1.5 font-body text-xs bg-surface border border-outline-variant/30 text-primary/60 hover:text-primary hover:border-primary transition-colors flex items-center gap-1.5 disabled:opacity-40">
            <span className="material-symbols-outlined text-sm">download</span>
            {generating ? (ko ? '생성 중...' : 'Generating...') : 'PDF'}
          </button>
          <button onClick={onClose} className="p-2 text-on-surface-variant/50 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center px-16 py-10 overflow-hidden">
        <div ref={slideRef} className="w-full max-w-4xl bg-[#FAF8F5] p-8" style={{ minHeight: 420 }}>
          {slide === 0 && <SlideCover data={data} ko={ko} />}
          {slide === 1 && <SlideProfile data={data} ko={ko} />}
          {slide === 2 && <SlideAssessment scores={displayScores} data={data} ko={ko} />}
          {slide === 3 && <SlidePersonality data={data} ko={ko} />}
          {slide === 4 && <SlideDirection data={data} ko={ko} />}
          {slide === 5 && <SlideNextSteps data={data} ko={ko} />}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-8 py-3 border-t border-outline-variant/10">
        <button onClick={prev} disabled={slide === 0}
          className="px-6 py-2 font-body text-sm border border-outline-variant/30 text-primary/60 hover:text-primary disabled:opacity-25 transition-colors">
          {ko ? '이전' : 'Previous'}
        </button>
        <div className="flex gap-2">
          {SLIDES.map((name, i) => (
            <button key={i} onClick={() => setSlide(i)} title={name}
              className={`h-1.5 rounded-full transition-all ${i === slide ? 'bg-secondary w-8' : 'bg-outline-variant/20 w-1.5 hover:bg-outline-variant/40'}`} />
          ))}
        </div>
        <button onClick={next} disabled={slide === SLIDES.length - 1}
          className="px-6 py-2 font-body text-sm bg-primary text-on-primary hover:bg-secondary disabled:opacity-25 transition-colors">
          {ko ? '다음' : 'Next'}
        </button>
      </div>

      {/* All slides pre-rendered off-screen for PDF capture */}
      <div ref={allSlidesRef} aria-hidden="true" style={{ position: 'absolute', top: 0, left: '-9999px', width: 960 }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ width: 960, height: 540, background: '#FAF8F5', padding: 40, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ width: '100%', maxWidth: 800 }}>
              {i === 0 && <SlideCover data={data} ko={ko} />}
              {i === 1 && <SlideProfile data={data} ko={ko} />}
              {i === 2 && <SlideAssessment scores={displayScores} data={data} ko={ko} />}
              {i === 3 && <SlidePersonality data={data} ko={ko} />}
              {i === 4 && <SlideDirection data={data} ko={ko} />}
              {i === 5 && <SlideNextSteps data={data} ko={ko} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════ Slide Components ══════════════════ */

function SlideCover({ data, ko }: { data: DiagnosisData; ko: boolean }) {
  return (
    <div className="text-center flex flex-col items-center justify-center" style={{ minHeight: 380 }}>
      <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-16 brightness-0 opacity-70 mb-6" />
      <div className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40 mb-6">
        {ko ? '학생 진단 리포트' : 'Student Diagnosis Report'}
      </div>
      <div className="w-12 h-px bg-outline-variant/30 mb-6" />
      <h1 className="font-headline text-5xl text-primary tracking-tight mb-4">{data.parent.studentName || (ko ? '학생 이름' : 'Student Name')}</h1>
      <div className="font-body text-on-surface-variant">{data.parent.grade} | {data.parent.school || (ko ? '학교' : 'School')}</div>
      <div className="font-body text-sm text-on-surface-variant/50 mt-2">{data.createdAt}</div>
    </div>
  )
}

function SlideProfile({ data, ko }: { data: DiagnosisData; ko: boolean }) {
  const p = data.parent
  const fields = ko
    ? [['커리큘럼', p.curriculum], ['영어 노출', p.englishExposure], ['해외 경험', p.overseasExperience], ['교육 목표', p.educationGoal]]
    : [['Curriculum', p.curriculum], ['English Exposure', p.englishExposure], ['Overseas Experience', p.overseasExperience], ['Education Goal', p.educationGoal]]
  return (
    <div>
      <h2 className="font-headline text-3xl text-primary mb-2">{ko ? '학생 프로필' : 'Student Profile'}</h2>
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
          <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-3">{ko ? '관심사' : 'Interests'}</div>
          <div className="flex flex-wrap gap-2">
            {p.interests.map((i) => <span key={i} className="px-3 py-1 bg-secondary/10 text-secondary font-body text-sm">{i}</span>)}
          </div>
        </div>
      )}
      {p.concerns && (
        <div className="mt-6 bg-[#F5F1EB] p-5 border-l-2 border-secondary/30">
          <div className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant/40 mb-2">{ko ? '부모님 우려 사항' : 'Parent Concerns'}</div>
          <p className="font-body text-sm text-primary">{p.concerns}</p>
        </div>
      )}
    </div>
  )
}

function SlideAssessment({ scores, ko }: { scores: { axis: string; value: number }[]; data: DiagnosisData; ko: boolean }) {
  const overall = scores.reduce((sum, s) => sum + s.value, 0) / scores.length
  return (
    <div>
      <h2 className="font-headline text-3xl text-primary mb-2">{ko ? '5축 종합 평가' : '5-Axis Assessment'}</h2>
      <div className="w-8 h-0.5 bg-[#6B4F4F] mb-8" />
      <div className="flex gap-12 items-center">
        <div className="shrink-0"><RadarChart data={scores} size={320} /></div>
        <div className="flex-1 space-y-5">
          <div className="bg-[#F5F1EB] p-4 text-center mb-4">
            <div className="font-headline text-3xl text-primary">{overall.toFixed(1)}<span className="text-lg text-on-surface-variant/40"> / 5.0</span></div>
            <div className="font-label text-[9px] uppercase tracking-widest text-secondary mt-1">{ko ? '종합 점수' : 'Overall Score'}</div>
          </div>
          {scores.map((s) => (
            <div key={s.axis} className="flex items-center gap-4">
              <span className="font-body text-sm text-on-surface-variant w-20 shrink-0">{s.axis}</span>
              <div className="flex-1 h-2.5 bg-outline-variant/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#6B4F4F] rounded-full transition-all" style={{ width: `${(s.value / 5) * 100}%` }} />
              </div>
              <span className="font-headline text-base text-primary w-8 text-right">{s.value.toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SlidePersonality({ data, ko }: { data: DiagnosisData; ko: boolean }) {
  const bars = data.observer.personality
  const LABEL_KO: Record<string, string> = { 'Exploratory Drive': '탐색 성향', 'Depth of Focus': '집중 깊이', 'Expressiveness': '표현력', 'Social Confidence': '사회적 자신감' }
  return (
    <div>
      <h2 className="font-headline text-3xl text-primary mb-2">{ko ? '성향 분석' : 'Personality Analysis'}</h2>
      <div className="w-8 h-0.5 bg-[#6B4F4F] mb-8" />
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          {bars.map((b) => (
            <div key={b.label}>
              <div className="flex justify-between mb-2">
                <span className="font-body text-sm text-primary">{ko ? LABEL_KO[b.label] || b.label : b.label}</span>
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
              <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">{ko ? '진단 유형' : 'Diagnosed Type'}</div>
              {data.summary.type.map((t) => {
                const info = PERSONALITY_LABELS[t]
                return (
                  <div key={t} className="p-5 border border-[#6B4F4F]/20 bg-[#F5F1EB]">
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

function SlideDirection({ data, ko }: { data: DiagnosisData; ko: boolean }) {
  return (
    <div>
      <h2 className="font-headline text-3xl text-primary mb-2">{ko ? '추천 방향' : 'Recommended Direction'}</h2>
      <div className="w-8 h-0.5 bg-[#6B4F4F] mb-8" />
      {data.summary.recommendedDirection ? (
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-[#F5F1EB] p-8">
            <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{ko ? '방향 제안' : 'Direction'}</div>
            <p className="font-body text-lg text-primary leading-relaxed">{data.summary.recommendedDirection}</p>
          </div>
          {data.summary.overallNote && !data.summary.recommendedDirection.includes(data.summary.overallNote) && (
            <div className="border-l-2 border-secondary/30 pl-6">
              <div className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40 mb-2">{ko ? '종합 소견' : 'Assessment Summary'}</div>
              <p className="font-body text-base text-primary leading-relaxed">{data.summary.overallNote}</p>
            </div>
          )}
        </div>
      ) : (
        <p className="font-body text-on-surface-variant/50">{ko ? '진단 결과 탭에서 추천 방향을 입력하세요.' : 'Add recommended direction in the Result tab.'}</p>
      )}
    </div>
  )
}

function SlideNextSteps({ data, ko }: { data: DiagnosisData; ko: boolean }) {
  const steps = data.summary.nextSteps.split('\n').filter(Boolean)
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-headline text-3xl text-primary mb-2">{ko ? '다음 단계' : 'Next Steps'}</h2>
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
        <p className="font-body text-on-surface-variant/50">{ko ? '진단 결과 탭에서 다음 단계를 입력하세요.' : 'Add next steps in the Result tab.'}</p>
      )}
      <div className="mt-12">
        <div className="inline-block bg-primary text-on-primary px-8 py-4 font-body text-sm uppercase tracking-widest">
          {ko ? '상담 예약하기' : 'Schedule a Consultation'}
        </div>
      </div>
      <div className="mt-8">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-10 brightness-0 opacity-20" />
      </div>
    </div>
  )
}
