import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { MidPageCTA } from './PageCTA'

const WHAT_WE_DO = [
  { icon: 'architecture',
    titleEn: 'Student Narrative Design', titleKo: '학생 서사 설계',
    descEn: 'We don\'t just list activities. We architect a cohesive story — connecting GPA, IB/AP scores, extracurriculars, and personal experiences into a compelling admissions narrative.', descKo: '단순 활동 나열이 아닙니다. GPA, IB/AP 점수, 과외활동, 개인 경험을 하나의 설득력 있는 입시 서사로 설계합니다.' },
  { icon: 'query_stats',
    titleEn: 'Data-Driven University Matching', titleKo: '데이터 기반 대학 매칭',
    descEn: 'Acceptance probability analysis based on IB scores, GPA, activities, and essay positioning. We match students to universities where their profile has the highest strategic advantage.', descKo: 'IB 점수, GPA, 활동, 에세이 포지셔닝을 기반으로 합격 확률을 분석합니다. 학생의 프로필이 가장 전략적 우위를 갖는 대학을 매칭합니다.' },
  { icon: 'route',
    titleEn: 'Long-term Growth Roadmap', titleKo: '장기 성장 로드맵',
    descEn: 'From middle school through university admission — we design a multi-year strategy that builds the right experiences, skills, and portfolio at each stage.', descKo: '중학교부터 대학 입학까지 — 각 단계에서 필요한 경험, 역량, 포트폴리오를 쌓아가는 다년간의 전략을 설계합니다.' },
]

const METHODS = [
  { en: 'IB / AP / GPA structure and difficulty analysis', ko: 'IB / AP / GPA 구조 및 난이도 분석' },
  { en: 'Extracurricular activity portfolio strategy', ko: '과외활동 포트폴리오 전략 설계' },
  { en: 'Admissions narrative and essay positioning', ko: '입시 서사 및 에세이 포지셔닝' },
  { en: 'Acceptance probability modeling by university', ko: '대학별 합격 확률 모델링' },
]

const RESULTS = [
  { icon: 'analytics', en: 'Acceptance Probability Report', ko: '합격 확률 분석 리포트', subEn: 'Data-driven probability by school', subKo: '대학별 데이터 기반 확률 분석' },
  { icon: 'auto_stories', en: 'Narrative Architecture', ko: '서사 설계 아키텍처', subEn: 'Story × Activities × Essay', subKo: '스토리 × 활동 × 에세이' },
  { icon: 'list_alt', en: 'Strategic University List', ko: '전략적 대학 리스트', subEn: 'Reach / Match / Safety with rationale', subKo: '상향 / 적정 / 안정 + 근거' },
  { icon: 'event_note', en: 'Multi-Year Execution Plan', ko: '다년간 실행 계획', subEn: 'Semester-by-semester milestones', subKo: '학기별 마일스톤' },
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
            <>대학 지원을 도와주지 않습니다.<br /><span className="italic">학생의 인생을 설계합니다.</span></>
          ) : (
            <>We don't help with applications.<br /><span className="italic">We architect student lives.</span></>
          )}
        </h1>
      </header>

      {/* ② Problem Definition */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="bg-surface-container-low p-8 md:p-16">
          <p className="font-body text-on-surface-variant text-base md:text-lg leading-[1.9] max-w-3xl">
            {ko
              ? '대부분의 유학원은 대학 리스트를 만들어주고 서류를 대신 작성해줍니다. 하지만 합격하는 학생에게는 한 가지 공통점이 있습니다 — 자신만의 서사가 있다는 것입니다. 169 Avenue는 IB 점수, GPA, 활동 데이터를 분석하여 학생 고유의 서사를 설계하고, 그 서사가 가장 강력하게 작동하는 대학을 매칭합니다.'
              : 'Most agencies make university lists and write documents. But students who get accepted share one thing — they have their own narrative. 169 Avenue analyzes IB scores, GPA, and activity data to architect each student\'s unique narrative, then matches them to universities where that narrative has the strongest strategic advantage.'
            }
          </p>
        </div>
      </section>

      {/* ③ Solution */}
      <section className="bg-primary text-on-primary py-20 md:py-32 px-6 md:px-16 mb-20 md:mb-32">
        <div className="max-w-screen-2xl mx-auto max-w-3xl">
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-8">
            {ko
              ? '우리는 유학원이 아닙니다. 학생 인생의 설계자입니다.'
              : 'We are not an agency. We are architects of student futures.'
            }
          </p>
          <p className="font-body text-on-primary/80 text-base md:text-lg leading-relaxed mb-8">
            {ko
              ? '단순 대학 지원 대행이 아닌, 데이터 기반 합격 확률 분석과 서사 설계를 통해 학생이 가장 유리한 포지션에서 입시에 임할 수 있도록 전략을 수립합니다. 한국에서 미국을 중심으로, 캐나다, 호주, 동남아 등 글로벌 확장이 가능한 인생 설계 플랫폼입니다.'
              : 'Not a simple application service — we build strategies through data-driven acceptance probability analysis and narrative design, positioning students for maximum advantage. Starting with Korea-to-US admissions, expandable to Canada, Australia, Southeast Asia, and beyond.'
            }
          </p>
          <div className="h-[2px] w-16 bg-secondary" />
        </div>
      </section>

      {/* ④ What We Do */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <p className="font-body text-on-surface-variant text-sm md:text-base mb-10">
          {ko ? '169 Avenue는 세 가지 축으로 입시 전략을 설계합니다.' : '169 Avenue designs admissions strategy across three pillars.'}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHAT_WE_DO.map((s) => (
            <div key={s.icon} className="bg-surface-container-low p-8 md:p-10">
              <span className="material-symbols-outlined text-secondary text-3xl mb-6 block">{s.icon}</span>
              <h3 className="font-headline text-xl text-primary mb-3">{ko ? s.titleKo : s.titleEn}</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">{ko ? s.descKo : s.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      <MidPageCTA />

      {/* ⑤ Our Approach */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-4">
              {ko ? '점수는 데이터일 뿐입니다.' : 'Scores are just data.'}
            </h2>
            <p className="font-headline italic text-xl md:text-2xl text-primary/60">
              {ko ? '우리는 데이터를 전략으로 바꿉니다.' : 'We turn data into strategy.'}
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
              <>유학원은 대학을 보내줍니다.<br /><br /><span className="text-secondary">우리는 학생의 서사를 설계하고<br />데이터로 합격 확률을 분석하여<br />가장 유리한 전략을 만듭니다.</span><br /><br />그것이 169 Avenue입니다.</>
            ) : (
              <>Agencies send students to universities.<br /><br /><span className="text-secondary">We architect student narratives,<br />analyze acceptance probability with data,<br />and build the strongest strategy.</span><br /><br />That is 169 Avenue.</>
            )}
          </p>
        </div>
      </section>

      {/* ⑧ Team */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="mb-12">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-2 block">
            {ko ? '전문가 네트워크' : 'Expert Network'}
          </span>
          <p className="font-body text-on-surface-variant text-base">
            {ko ? '입시 전략 총괄 디렉터를 중심으로, 각 분야 최고의 전문가 네트워크가 학생의 합격을 설계합니다.' : 'Led by the Director of Admissions Strategy, our network of top specialists designs each student\'s path to acceptance.'}
          </p>
        </div>

        {/* Director Card - Full Width */}
        <div className="bg-primary text-on-primary p-8 md:p-12 shadow-sm mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">Director</p>
              <h4 className="font-headline text-2xl md:text-3xl mb-2">
                {ko ? '입시 전략 총괄 디렉터' : 'Director of Admissions Strategy'}
              </h4>
              <p className="font-body text-on-primary/70 text-base leading-relaxed mb-8">
                {ko
                  ? '학생의 IB 점수, GPA, 활동 데이터를 분석하여 서사를 설계하고, 전문가 네트워크를 조율하여 합격 전략을 총괄합니다. 데이터 기반 대학 매칭과 합격 확률 분석을 통해 학생이 가장 유리한 포지션에서 입시에 임할 수 있도록 전체 전략을 수립합니다.'
                  : 'Analyzes student IB scores, GPA, and activity data to architect narratives, coordinates the expert network, and oversees the entire acceptance strategy. Builds data-driven university matching and acceptance probability analysis to position students for maximum advantage.'
                }
              </p>
              <ul className="space-y-3">
                {(ko
                  ? ['전체 입시 전략 설계 및 총괄', '데이터 기반 합격 확률 분석 및 대학 매칭', '학생 서사 아키텍처 설계', '전문가 네트워크 조율 및 로드맵 관리']
                  : ['Overall admissions strategy design & direction', 'Data-driven acceptance probability analysis & university matching', 'Student narrative architecture design', 'Expert network coordination & roadmap management']
                ).map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm font-body text-on-primary/80 leading-relaxed">
                    <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">check</span>{b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <div className="w-full bg-on-primary/5 border border-on-primary/10 p-8">
                <p className="font-headline italic text-lg text-on-primary/90 leading-relaxed">
                  {ko
                    ? '"모든 학생에게는 고유한 서사가 있습니다. 우리의 역할은 그 서사를 발견하고, 데이터로 검증하고, 가장 강력한 전략으로 만드는 것입니다."'
                    : '"Every student has a unique narrative. Our role is to discover it, validate it with data, and turn it into the strongest possible strategy."'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Specialist 1 */}
          <div className="bg-surface-container-lowest p-8 shadow-sm border-l-4 border-secondary">
            <h4 className="font-headline text-lg text-primary mb-1">
              {ko ? '합격 전략 컨설턴트' : 'Acceptance Strategy Consultant'}
            </h4>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">
              {ko ? '입학사정관 출신' : 'Former Admissions Officer'}
            </p>
            <ul className="space-y-2">
              {(ko
                ? ['대학별 합격 전략 수립', '에세이 및 면접 코칭', '입학사정관 관점의 서류 검토']
                : ['University-specific acceptance strategy', 'Essay & interview coaching', 'Document review from admissions officer perspective']
              ).map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm font-body text-on-surface-variant leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">check</span>{b}
                </li>
              ))}
            </ul>
          </div>

          {/* Specialist 2 */}
          <div className="bg-surface-container-lowest p-8 shadow-sm border-l-4 border-secondary">
            <h4 className="font-headline text-lg text-primary mb-1">
              {ko ? '특기/스펙 전문가' : 'Athletics & Talent Specialist'}
            </h4>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">
              {ko ? '운동 네트워크 기반' : 'Sports Network Based'}
            </p>
            <ul className="space-y-2">
              {(ko
                ? ['운동 특기 기반 입시 전략', '체육 장학금 및 리크루팅 연결', '특기/스펙 포트폴리오 설계']
                : ['Athletics-based admissions strategy', 'Sports scholarship & recruiting connections', 'Talent/spec portfolio design']
              ).map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm font-body text-on-surface-variant leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">check</span>{b}
                </li>
              ))}
            </ul>
          </div>

          {/* Specialist 3 */}
          <div className="bg-surface-container-lowest p-8 shadow-sm border-l-4 border-secondary">
            <h4 className="font-headline text-lg text-primary mb-1">
              {ko ? '포트폴리오 컨설턴트' : 'Portfolio Consultant'}
            </h4>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">
              {ko ? '미술 전문' : 'Art & Design Specialist'}
            </p>
            <ul className="space-y-2">
              {(ko
                ? ['미술/디자인 포트폴리오 설계', '아트 스쿨 지원 전략', '크리에이티브 분야 서사 구축']
                : ['Art & design portfolio architecture', 'Art school application strategy', 'Creative field narrative building']
              ).map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm font-body text-on-surface-variant leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">check</span>{b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="font-body text-on-surface-variant text-sm text-center mt-10 max-w-2xl mx-auto leading-relaxed">
          {ko
            ? '디렉터가 전체 전략을 총괄하고, 각 분야 전문가가 학생에게 필요한 영역을 담당합니다. 미국을 시작으로 캐나다, 호주, 동남아 등 다양한 국가로 확장 가능한 글로벌 입시 설계 플랫폼입니다.'
            : 'The Director oversees the entire strategy while each specialist covers their domain. Starting with the US, our platform is expandable to Canada, Australia, Southeast Asia, and beyond.'
          }
        </p>
      </section>

      {/* ⑨ CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <p className="font-headline italic text-xl md:text-2xl text-on-primary/70 mb-4">
            {ko ? '대학 리스트가 아니라, 합격 전략이 필요합니다.' : 'You don\'t need a university list. You need an acceptance strategy.'}
          </p>
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-12">
            {ko
              ? '"당신의 자녀에게 가장 강력한 서사를 설계해 드립니다."'
              : '"We will architect the most compelling narrative for your child."'
            }
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
              {ko ? '무료 전략 진단' : 'Free Strategy Diagnosis'}
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
