import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { MidPageCTA } from './PageCTA'

const SERVICES_DATA = [
  {
    icon: 'public',
    titleEn: 'Global University Admissions',
    titleKo: '글로벌 대학 진학',
    descEn: 'GPA and activity-based strategy for US, UK, EU, and Asia-Pacific universities. Essay, interview, and multi-country application management.',
    descKo: 'GPA 및 활동 기반 미국/영국/유럽/아시아 대학 전략. 에세이, 면접, 다국가 지원 설계.',
    forEn: ['Students targeting US / UK / EU / Asia universities', 'Need essay and interview strategy', 'Planning multi-country applications'],
    forKo: ['미국/영국/유럽/아시아 대학 목표 학생', '에세이 및 면접 전략 필요', '다국가 동시 지원 계획'],
    resultsEn: ['Global target university list (reach / match / safety)', 'Essay & interview preparation plan', 'Multi-country application strategy', 'Execution timeline with deadlines'],
    resultsKo: ['글로벌 지원 대학 리스트 (상향 / 적정 / 안정)', '에세이 & 면접 준비 계획', '다국가 지원 전략', '마감일 포함 실행 일정표'],
    link: '/destinations',
    tag: { en: 'US / UK / EU / Asia', ko: '미국 / 영국 / 유럽 / 아시아' },
    core: { en: 'Global Strategy', ko: '글로벌 전략' },
  },
  {
    icon: 'flight_land',
    titleEn: 'Overseas HS → Korean University',
    titleKo: '해외고 → 한국대 진학',
    descEn: 'IB, AP, GPA-based strategy for Korean university admission through 재외국민/외국인 전형 and 학종 tracks.',
    descKo: 'IB, AP, GPA 기반 한국 대학 입시 전략 — 재외국민/외국인 전형 및 학종 대응.',
    forEn: ['Students at overseas or international schools', 'IB / AP curriculum students', 'Planning to apply to Korean universities'],
    forKo: ['해외고 또는 국제학교 재학생', 'IB / AP 커리큘럼 학생', '한국 대학 지원 예정자'],
    resultsEn: ['Target university list (reach / match / safety)', 'Major fit analysis', 'Acceptance strategy design', 'Application timeline & execution plan'],
    resultsKo: ['지원 가능 대학 리스트 (상향 / 적정 / 안정)', '전공 적합성 분석', '합격 전략 설계', '지원 일정 및 실행 계획'],
    link: '/domestic/freshman',
    tag: { en: 'IB / AP', ko: 'IB / AP' },
    core: { en: 'Strategy Design', ko: '전략 설계' },
  },
  {
    icon: 'swap_horiz',
    titleEn: 'Foreign Univ → Korean Transfer',
    titleKo: '해외대 → 한국대 편입',
    descEn: 'Credit-based feasibility analysis and university-specific transfer strategy for students currently enrolled abroad.',
    descKo: '해외 대학 재학생을 위한 학점 기반 가능성 분석 및 대학별 편입 전략.',
    forEn: ['Currently enrolled at a foreign university', 'Considering transfer to a Korean university', 'Unsure about credit transferability'],
    forKo: ['해외 대학 재학 중인 학생', '한국 대학 편입 고려 중', '학점 이전 가능 여부 불확실한 경우'],
    resultsEn: ['Credit transfer mapping & feasibility report', 'Target university list with transfer windows', 'Transfer narrative & document strategy', 'Risk assessment & backup plan'],
    resultsKo: ['학점 이전 매핑 및 가능성 리포트', '편입 시기별 지원 가능 대학 리스트', '편입 내러티브 및 서류 전략', '리스크 평가 및 백업 플랜'],
    link: '/domestic/transfer',
    tag: { en: 'University Student', ko: '대학 재학생' },
    core: { en: 'Feasibility Analysis', ko: '가능성 분석' },
  },
  {
    icon: 'school',
    titleEn: 'Korean Domestic Admissions',
    titleKo: '국내 입시 전략',
    descEn: '학생부종합 and 정시 strategy design — major direction, narrative building, and university targeting.',
    descKo: '학생부종합 및 정시 전략 설계 — 전공 방향, 스토리 구축, 지원 대학 매칭.',
    forEn: ['Korean high school students', 'Students preparing for 수능 or 학종', 'Undecided on major direction'],
    forKo: ['국내 고등학교 재학생', '수능 또는 학종 준비 중인 학생', '전공 방향 미정인 학생'],
    resultsEn: ['Major direction & narrative structure', 'University targeting strategy', 'Document & interview preparation plan', 'Monthly milestone timeline'],
    resultsKo: ['전공 방향 및 스토리 구조 설계', '지원 대학 전략 매칭', '서류 및 면접 준비 계획', '월별 마일스톤 일정표'],
    link: '/consultation',
    tag: { en: 'GPA / 내신', ko: 'GPA / 내신' },
    core: { en: 'Direction Design', ko: '방향 설계' },
  },
]

function ServicesContent() {
  const { language } = useLanguage()
  const ko = language === 'ko'

  return (
    <>
      {/* Header */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
          Our Services
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1] mb-6">
          {ko ? (
            <>전략은 상황에 따라<br /><span className="italic">달라집니다</span></>
          ) : (
            <>Strategy differs by<br /><span className="italic">situation</span></>
          )}
        </h1>
        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
          {ko
            ? '모든 학생의 케이스는 다릅니다. 해외고, 국내 입시, 편입 — 각 상황에 맞는 전략을 설계합니다.'
            : 'Every student\'s case is different. Overseas HS, domestic admissions, transfer — we design strategy for each situation.'
          }
        </p>
      </header>

      {/* Comparison Table */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-primary">
                <th className="text-left py-4 pr-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  {ko ? '서비스' : 'Service'}
                </th>
                <th className="text-left py-4 pr-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  {ko ? '대상' : 'For'}
                </th>
                <th className="text-left py-4 font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                  {ko ? '핵심' : 'Core'}
                </th>
              </tr>
            </thead>
            <tbody>
              {SERVICES_DATA.map((s) => (
                <tr key={s.icon} className="border-b border-outline-variant/15 hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-4 pr-6 font-headline text-base text-primary">{ko ? s.titleKo : s.titleEn}</td>
                  <td className="py-4 pr-6 font-body text-sm text-on-surface-variant">{ko ? s.tag.ko : s.tag.en}</td>
                  <td className="py-4 font-label text-xs uppercase tracking-widest text-secondary">{ko ? s.core.ko : s.core.en}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <MidPageCTA />

      {/* Service Cards */}
      {SERVICES_DATA.map((s, idx) => (
        <section key={s.icon} className={`px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24 ${idx % 2 === 1 ? '' : ''}`}>
          <div className={`${idx % 2 === 1 ? 'bg-surface-container-low' : 'bg-surface-container-lowest shadow-sm'} p-8 md:p-16`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Left: Info */}
              <div className="lg:col-span-7">
                <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">{s.icon}</span>
                <h2 className="font-headline text-2xl md:text-4xl text-primary mb-4">
                  {ko ? s.titleKo : s.titleEn}
                </h2>
                <p className="font-body text-on-surface-variant text-base leading-relaxed mb-8">
                  {ko ? s.descKo : s.descEn}
                </p>

                {/* For whom */}
                <div className="mb-8">
                  <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-4">
                    {ko ? '이런 분들에게 추천합니다' : 'Recommended for'}
                  </h4>
                  <ul className="space-y-2">
                    {(ko ? s.forKo : s.forEn).map((f) => (
                      <li key={f} className="flex items-start gap-2 font-body text-sm text-on-surface-variant">
                        <span className="material-symbols-outlined text-secondary text-xs mt-0.5">person</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/consultation" className="bg-primary text-on-primary px-8 py-4 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors text-center">
                    {ko ? '무료 진단' : 'Free Diagnosis'}
                  </Link>
                  <Link to={s.link} className="border border-primary text-primary px-8 py-4 font-label text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all text-center">
                    {ko ? '자세히 보기' : 'Learn More'}
                  </Link>
                </div>
              </div>

              {/* Right: Results */}
              <div className="lg:col-span-5">
                <div className="bg-surface p-8 border border-outline-variant/15 h-full">
                  <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-6">
                    {ko ? '이 서비스를 통해 얻는 것' : 'What You Get'}
                  </h4>
                  <ul className="space-y-4">
                    {(ko ? s.resultsKo : s.resultsEn).map((r) => (
                      <li key={r} className="flex items-start gap-3 font-body text-sm text-primary leading-relaxed">
                        <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Process Link */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-container-low p-8 md:p-12">
          <p className="font-headline italic text-xl md:text-2xl text-primary leading-snug text-center md:text-left">
            {ko ? '상담은 어떻게 진행되나요?' : 'How does a consultation work?'}
          </p>
          <Link to="/about" className="shrink-0 inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest border border-primary text-primary px-8 py-4 hover:bg-primary hover:text-on-primary transition-all group">
            {ko ? '상담 프로세스 보기' : 'See Our Process'}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <p className="font-headline italic text-xl md:text-2xl text-on-primary/70 mb-4">
            {ko ? '지금, 내 상황에 맞는 전략을 확인하세요.' : 'Find out the right strategy for your situation — today.'}
          </p>
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-12">
            {ko
              ? '"가능 여부가 아니라, 어디를 어떻게 합격할 수 있는지를 설계합니다."'
              : '"We don\'t just assess feasibility — we design where and how you can get accepted."'
            }
          </p>
          <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
            {ko ? '무료 진단' : 'Free Diagnosis'}
          </Link>
        </div>
      </section>
    </>
  )
}

export function PartnersPage() {
  usePageTitle('Services - 서비스 안내')
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><ServicesContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="partners"><ServicesContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
