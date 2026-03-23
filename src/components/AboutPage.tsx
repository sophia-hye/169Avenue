import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'

const SERVICES = [
  { icon: 'flight_land', titleEn: 'Overseas HS → Korean University', titleKo: '해외고 → 한국대 진학 전략', descEn: 'Special admission tracks (재외국민/외국인 전형), IB/AP-based strategy, bilingual document support', descKo: '재외국민/외국인 특별전형, IB/AP 기반 전략 설계, 이중 언어 서류 지원' },
  { icon: 'school', titleEn: 'Korean Domestic Admissions', titleKo: '국내 입시 설계', descEn: '학생부종합 / 정시 strategy, major direction, narrative building', descKo: '학생부종합 / 정시 전략, 전공 방향 설정, 스토리 구축' },
  { icon: 'swap_horiz', titleEn: 'Foreign Univ → Korean Transfer', titleKo: '해외대 → 한국대 편입', descEn: 'Credit mapping, transfer feasibility analysis, university-specific strategy', descKo: '학점 매핑, 편입 가능성 분석, 대학별 편입 전략' },
]

const METHODS = [
  { icon: 'analytics', titleEn: 'GPA & Curriculum Analysis', titleKo: 'GPA & 커리큘럼 분석', descEn: 'We interpret your grades within the context of your specific curriculum — not just the numbers.', descKo: '단순 숫자가 아닌, 커리큘럼 구조 맥락에서 성적을 해석합니다.' },
  { icon: 'psychology', titleEn: 'Curriculum Interpretation', titleKo: '커리큘럼 해석', descEn: 'IB, AP, A-Level, Korean — each system is evaluated differently by admissions. We know how.', descKo: 'IB, AP, A-Level, 한국 교과 — 입시에서 각각 다르게 평가됩니다. 저희는 그 차이를 압니다.' },
  { icon: 'design_services', titleEn: 'Major Fit Design', titleKo: '전공 적합성 설계', descEn: 'We connect your courses, activities, and story into a coherent narrative that maximizes acceptance.', descKo: '과목, 활동, 스토리를 연결하여 합격 가능성을 극대화하는 일관된 내러티브를 설계합니다.' },
]

const DIFFERENTIATORS = [
  { titleEn: 'Integrated Strategy', titleKo: '통합 전략', descEn: 'Korean domestic + international admissions designed as one unified plan.', descKo: '국내 입시와 해외 입시를 하나의 통합 전략으로 설계합니다.' },
  { titleEn: 'Overseas HS Specialists', titleKo: '해외고 전문', descEn: 'Deep expertise in overseas Korean students applying to Korean top universities.', descKo: '한국 상위권 대학을 지원하는 해외고 학생 전문 컨설팅.' },
  { titleEn: 'Transfer Coverage', titleKo: '편입까지 연결', descEn: 'From freshman admission to university transfer — we cover the full spectrum.', descKo: '신입학부터 편입까지 — 전체 입시 스펙트럼을 커버합니다.' },
]

const TEAM = [
  { titleEn: 'Korean University Admissions', titleKo: '국내 입시 총괄', descEn: '학생부종합 / 정시 design, 재외국민 전형, international student tracks', descKo: '학생부종합 / 정시 설계, 재외국민 전형, 외국인 전형 전담' },
  { titleEn: 'International Admissions', titleKo: '해외 진학 전략 총괄', descEn: 'US/UK/EU application strategy, essay development, multi-country planning', descKo: '미국/영국/유럽 지원 전략, 에세이 개발, 다국가 지원 설계' },
  { titleEn: 'Curriculum & Document Strategy', titleKo: '학력 분석 & 서류 전략', descEn: 'IB/AP/A-Level analysis, GPA conversion, transcript & recommendation strategy', descKo: 'IB/AP/A-Level 분석, GPA 변환, 성적표 & 추천서 전략' },
]

function AboutContent() {
  const { language } = useLanguage()
  const isKo = language === 'ko'

  return (
    <>
      {/* ① Identity */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
          {isKo ? '169 Avenue 소개' : 'About 169 Avenue'}
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1] mb-8">
          {isKo ? (
            <>입시 정보를 전달하지 않습니다.<br /><span className="italic">합격 전략을 설계합니다.</span></>
          ) : (
            <>We don't deliver information.<br /><span className="italic">We design acceptance strategies.</span></>
          )}
        </h1>
        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
          {isKo
            ? '학생의 성적 구조와 가능성을 해석하고, 지원 가능 대학과 합격 전략을 명확하게 제시하는 프리미엄 1:1 진학 컨설팅입니다.'
            : 'We interpret your academic structure and potential, then clearly present target universities and acceptance strategies through premium 1:1 consulting.'
          }
        </p>
      </header>

      {/* ② What We Do */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-4 block">
          {isKo ? '우리가 하는 일' : 'What We Do'}
        </span>
        <h2 className="font-headline text-3xl md:text-4xl text-primary mb-12">
          {isKo ? '3가지 핵심 서비스' : 'Three Core Services'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <div key={s.icon} className="bg-surface-container-low p-8 md:p-10">
              <span className="material-symbols-outlined text-secondary text-3xl mb-6 block">{s.icon}</span>
              <h3 className="font-headline text-xl text-primary mb-3">{isKo ? s.titleKo : s.titleEn}</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">{isKo ? s.descKo : s.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ③ Our Approach */}
      <section className="bg-surface-container-low py-20 md:py-32 px-6 md:px-16 mb-20 md:mb-32">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-4 block">
              {isKo ? '우리의 방식' : 'Our Approach'}
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-4">
              {isKo ? '성적을 보는 것이 아니라' : 'We don\'t just see grades —'}
            </h2>
            <p className="font-headline text-2xl md:text-3xl text-primary/60 italic">
              {isKo ? '성적 구조와 가능성을 해석합니다' : 'we interpret structure and potential'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {METHODS.map((m) => (
              <div key={m.icon} className="space-y-4">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest">
                  <span className="material-symbols-outlined text-primary">{m.icon}</span>
                </div>
                <h4 className="font-headline text-lg text-primary">{isKo ? m.titleKo : m.titleEn}</h4>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">{isKo ? m.descKo : m.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ④ Why Us */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-4 block">
              {isKo ? '왜 우리인가' : 'Why Us'}
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-6">
              {isKo ? (
                <>국내 입시와 해외 입시를<br />하나의 전략으로 <span className="italic">연결합니다</span></>
              ) : (
                <>We connect domestic & international<br />into <span className="italic">one strategy</span></>
              )}
            </h2>
            <p className="font-body text-on-surface-variant leading-relaxed">
              {isKo
                ? '국내 입시와 해외 입시는 서로 다른 방식으로 작동합니다. 우리는 이 둘을 연결하여 하나의 전략으로 설계합니다.'
                : 'Korean domestic and international admissions operate on entirely different systems. We bridge them into a single, coherent strategy.'
              }
            </p>
          </div>
          <div className="lg:col-span-7 space-y-0">
            {DIFFERENTIATORS.map((d, i) => (
              <div key={i} className="flex items-start gap-6 py-8 border-b border-outline-variant/20">
                <span className="font-headline italic text-3xl text-outline-variant/30 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="font-headline text-xl text-primary mb-2">{isKo ? d.titleKo : d.titleEn}</h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">{isKo ? d.descKo : d.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤ Team */}
      <section className="bg-surface-container-low py-20 md:py-32 px-6 md:px-16 mb-20 md:mb-32">
        <div className="max-w-screen-2xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-4 block">
            {isKo ? '팀 구성' : 'Our Team'}
          </span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-12">
            {isKo ? '역할 중심의 전문 팀' : 'Role-Based Expert Team'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TEAM.map((t, i) => (
              <div key={i} className="bg-surface-container-lowest p-8 md:p-10 shadow-sm">
                <span className="font-headline italic text-4xl text-outline-variant/20 block mb-4">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-headline text-xl text-primary mb-3">{isKo ? t.titleKo : t.titleEn}</h4>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">{isKo ? t.descKo : t.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑥ CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-12">
            {isKo
              ? '"상담은 단순한 조언이 아니라, 가능성과 전략을 확인하는 과정입니다."'
              : '"A consultation is not just advice — it\'s the process of confirming your potential and strategy."'
            }
          </p>
          <Link
            to="/consultation"
            className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500"
          >
            {isKo ? '무료 진단 받기' : 'Free Diagnosis'}
          </Link>
        </div>
      </section>
    </>
  )
}

export function AboutPage() {
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
