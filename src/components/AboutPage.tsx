import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

const SERVICES = [
  { icon: 'flight_land',
    titleEn: 'Overseas HS → Korean University', titleKo: '해외고 → 한국대 진학 전략',
    descEn: 'IB, AP, GPA-based strategy for 학종 and international admission tracks', descKo: 'IB, AP, GPA 기반 학종 및 국제전형 대응 전략 설계' },
  { icon: 'school',
    titleEn: 'Korean Domestic Admissions', titleKo: '국내 입시 전략',
    descEn: '학생부종합 and 정시 strategy, major direction and application design', descKo: '학생부종합 및 정시 기반 전공 방향 및 지원 전략 설계' },
  { icon: 'swap_horiz',
    titleEn: 'Foreign Univ → Korean Transfer', titleKo: '해외대 → 한국대 편입',
    descEn: 'Credit and course-based feasibility analysis and target university strategy', descKo: '학점 및 이수 과목 기반 지원 가능 대학 및 리스크 분석' },
]

const METHODS = [
  { en: 'GPA context and difficulty analysis', ko: 'GPA의 맥락과 난이도 분석' },
  { en: 'Curriculum interpretation (IB/AP/A-Level)', ko: '커리큘럼(IB/AP/A-Level) 해석' },
  { en: 'Major fit structure design', ko: '전공 적합성 구조 설계' },
  { en: 'Activities and story connection', ko: '활동과 스토리 연결' },
]

const RESULTS = [
  { icon: 'list_alt', en: 'Target University List', ko: '지원 가능 대학 리스트', subEn: 'Reach / Match / Safety', subKo: '상향 / 적정 / 안정' },
  { icon: 'psychology', en: 'Major Fit Analysis', ko: '전공 적합성 분석', subEn: 'Courses × Activities × Narrative', subKo: '과목 × 활동 × 스토리' },
  { icon: 'design_services', en: 'Acceptance Strategy', ko: '합격 전략 방향', subEn: 'Positioning & document plan', subKo: '포지셔닝 & 서류 전략' },
  { icon: 'event_note', en: 'Execution Timeline', ko: '지원 일정 및 실행 계획', subEn: 'Monthly milestones', subKo: '월별 마일스톤' },
]

function AboutContent() {
  const { language } = useLanguage()
  const ko = language === 'ko'

  return (
    <>
      {/* ① Hero */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
          {ko ? '169 Avenue 소개' : 'About 169 Avenue'}
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1] mb-8">
          {ko ? (
            <>입시 정보를 전달하지 않습니다.<br /><span className="italic">합격 전략을 설계합니다.</span></>
          ) : (
            <>We don't provide information.<br /><span className="italic">We design acceptance strategies.</span></>
          )}
        </h1>
      </header>

      {/* ② Problem Definition */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="bg-surface-container-low p-8 md:p-16">
          <p className="font-body text-on-surface-variant text-base md:text-lg leading-[1.9] max-w-3xl">
            {ko
              ? '해외 입시와 국내 입시는 전혀 다른 기준으로 평가됩니다. IB, AP, GPA와 같은 해외 학력은 한국 입시 기준으로 그대로 해석되지 않으며, 반대로 국내 입시 역시 해외 대학 기준과는 다르게 작동합니다. 많은 학생들이 이 차이 속에서 자신의 위치를 정확히 알지 못한 채 전략 없이 지원을 진행하고 있습니다.'
              : 'International and Korean admissions are evaluated on entirely different criteria. Overseas credentials like IB, AP, and GPA are not directly interpreted by Korean standards, and vice versa. Many students proceed without knowing exactly where they stand — applying without strategy.'
            }
          </p>
        </div>
      </section>

      {/* ③ Solution */}
      <section className="bg-primary text-on-primary py-20 md:py-32 px-6 md:px-16 mb-20 md:mb-32">
        <div className="max-w-screen-2xl mx-auto max-w-3xl">
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-8">
            {ko
              ? '우리는 이 두 시스템을 따로 보지 않습니다.'
              : 'We don\'t treat these systems separately.'
            }
          </p>
          <p className="font-body text-on-primary/80 text-base md:text-lg leading-relaxed mb-8">
            {ko
              ? '국내 입시와 해외 입시를 연결하여 하나의 전략으로 설계합니다. 단순히 가능 여부를 판단하는 것이 아니라, 어디를, 어떻게 합격할 수 있는지를 기준으로 현실적인 전략을 제시합니다.'
              : 'We connect domestic and international admissions into one unified strategy. We don\'t just assess feasibility — we present realistic strategies based on where and how you can get accepted.'
            }
          </p>
          <div className="h-[2px] w-16 bg-secondary" />
        </div>
      </section>

      {/* ④ What We Do */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <p className="font-body text-on-surface-variant text-sm md:text-base mb-10">
          {ko ? '우리는 다음과 같은 영역을 중심으로 입시 전략을 설계합니다.' : 'We design admissions strategies across the following areas.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.icon} className="bg-surface-container-low p-8 md:p-10">
              <span className="material-symbols-outlined text-secondary text-3xl mb-6 block">{s.icon}</span>
              <h3 className="font-headline text-xl text-primary mb-3">{ko ? s.titleKo : s.titleEn}</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">{ko ? s.descKo : s.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ⑤ Our Approach */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-4">
              {ko ? '우리는 학생의 점수만 보지 않습니다.' : 'We don\'t just look at scores.'}
            </h2>
            <p className="font-headline italic text-xl md:text-2xl text-primary/60">
              {ko ? '성적의 구조와 의미를 해석합니다.' : 'We interpret the structure and meaning behind them.'}
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-0">
              {METHODS.map((m, i) => (
                <li key={i} className="flex items-center gap-4 py-5 border-b border-outline-variant/20">
                  <span className="material-symbols-outlined text-secondary text-sm">check</span>
                  <span className="font-body text-base text-on-surface-variant">{ko ? m.ko : m.en}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ⑥ Results */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="bg-surface-container-lowest p-8 md:p-16 shadow-sm">
          <h2 className="font-headline text-2xl md:text-3xl text-primary mb-3">
            {ko ? '상담은 단순한 조언이 아니라' : 'A consultation is not just advice —'}
          </h2>
          <p className="font-headline italic text-xl md:text-2xl text-secondary mb-10">
            {ko ? '결과를 만드는 과정입니다' : 'it\'s a process that produces results'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESULTS.map((r) => (
              <div key={r.icon} className="border border-outline-variant/15 p-6">
                <span className="material-symbols-outlined text-secondary text-2xl mb-4 block">{r.icon}</span>
                <h4 className="font-headline text-lg text-primary mb-2">{ko ? r.ko : r.en}</h4>
                <p className="font-body text-xs text-on-surface-variant">{ko ? r.subKo : r.subEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑦ Differentiator */}
      <section className="bg-surface-container-low py-16 md:py-24 px-6 md:px-16 mb-20 md:mb-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-headline italic text-2xl md:text-3xl text-primary leading-snug">
            {ko ? (
              <>우리는 입시를 "정보"로 보지 않습니다.<br /><br /><span className="text-secondary">각기 다른 평가 시스템을 연결해<br />하나의 전략으로 설계하는 것.</span><br /><br />그것이 우리가 하는 일입니다.</>
            ) : (
              <>We don't see admissions as "information."<br /><br /><span className="text-secondary">Connecting different evaluation systems<br />into one unified strategy.</span><br /><br />That is what we do.</>
            )}
          </p>
        </div>
      </section>

      {/* ⑧ Team */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="mb-12">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-2 block">
            {ko ? '우리 팀' : 'Our Team'}
          </span>
          <p className="font-body text-on-surface-variant text-base">
            {ko ? '전략은 혼자서 완성되지 않습니다. 우리는 각 영역의 전문성을 기반으로 하나의 전략을 함께 설계합니다.' : 'Strategy is never completed alone. We combine expertise from each domain to design one cohesive plan.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-8 md:p-10 shadow-sm border-l-4 border-secondary">
            <h4 className="font-headline text-xl text-primary mb-1">Domestic Admissions Strategist</h4>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-6">
              {ko ? '국내 입시 전략 총괄' : 'Korean University Strategy Lead'}
            </p>
            <ul className="space-y-3 mb-8">
              {(ko
                ? ['학생부종합 및 정시 전략 설계', '전공 방향 및 스토리 구조 설계', '지원 대학 및 전략 매칭']
                : ['학생부종합 and 정시 strategy design', 'Major direction & story structure', 'University targeting & strategy matching']
              ).map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm font-body text-on-surface-variant leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">check</span>{b}
                </li>
              ))}
            </ul>
            <p className="font-headline italic text-base text-primary/80 border-t border-outline-variant/15 pt-6">
              {ko ? '학생의 데이터를 기반으로 현실적인 합격 전략을 설계합니다.' : 'Designs realistic acceptance strategies based on student data.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-8 md:p-10 shadow-sm border-l-4 border-secondary">
            <h4 className="font-headline text-xl text-primary mb-1">International Admissions Strategist</h4>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-6">
              {ko ? '해외 입시 및 커리큘럼 분석' : 'International Strategy & Curriculum Analysis'}
            </p>
            <ul className="space-y-3 mb-8">
              {(ko
                ? ['IB / AP / GPA 구조 분석', '국제전형 및 편입 전략 설계', '해외 학력 기반 지원 가능성 분석']
                : ['IB / AP / GPA structure analysis', 'International track & transfer strategy', 'Overseas credential feasibility analysis']
              ).map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm font-body text-on-surface-variant leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">check</span>{b}
                </li>
              ))}
            </ul>
            <p className="font-headline italic text-base text-primary/80 border-t border-outline-variant/15 pt-6">
              {ko ? '서로 다른 교육 시스템을 해석하여 입시 전략으로 연결합니다.' : 'Interprets different education systems and connects them into admissions strategy.'}
            </p>
          </div>
        </div>

        <p className="font-body text-on-surface-variant text-sm text-center mt-10 max-w-xl mx-auto leading-relaxed">
          {ko
            ? '우리는 각자의 전문 영역을 기반으로 하나의 전략을 함께 완성합니다. 국내와 해외, 두 시스템을 연결하는 것이 우리의 가장 큰 강점입니다.'
            : 'We complete one strategy together, each from our area of expertise. Connecting the domestic and international systems is our greatest strength.'
          }
        </p>
      </section>

      {/* ⑨ CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <p className="font-headline italic text-xl md:text-2xl text-on-primary/70 mb-4">
            {ko ? '지금, 자신의 위치를 정확히 아는 것이 가장 중요한 시작입니다.' : 'Knowing exactly where you stand is the most important first step.'}
          </p>
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-12">
            {ko
              ? '"상담은 단순한 조언이 아니라, 가능성과 전략을 확인하는 과정입니다."'
              : '"A consultation is not just advice — it\'s the process of confirming your potential and strategy."'
            }
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
              {ko ? '무료 진단' : 'Free Diagnosis'}
            </Link>
            <Link to="/consultation" className="border border-on-primary/30 text-on-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-surface hover:text-primary transition-all duration-500">
              {ko ? '상담 예약' : 'Book Consultation'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function AboutPage() {
  usePageTitle('About - 합격 전략을 설계합니다')
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><AboutContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="about"><AboutContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
