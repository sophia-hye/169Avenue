import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'

function DomesticContent() {
  const { language } = useLanguage()
  const ko = language === 'ko'

  return (
    <>
      {/* ① Headline */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
          Domestic Admissions
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1] mb-6">
          {ko ? (
            <>한국 대학 입시<br /><span className="italic">전략 설계</span></>
          ) : (
            <>Korean University<br /><span className="italic">Admissions Strategy</span></>
          )}
        </h1>
        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl mb-8">
          {ko
            ? '해외고 출신의 한국대 진학, 국내 입시, 편입 — 각 상황에 맞는 전략을 설계합니다.'
            : 'Overseas HS to Korean university, domestic admissions, transfer — we design strategy for each case.'}
        </p>
        <Link to="/consultation" className="bg-primary text-on-primary px-8 py-4 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors">
          {ko ? '무료 진단' : 'Free Diagnosis'}
        </Link>
      </header>

      {/* ② Problem Empathy */}
      <section className="bg-primary text-on-primary py-16 md:py-24 px-6 md:px-16 mb-16 md:mb-24">
        <div className="max-w-screen-2xl mx-auto max-w-3xl">
          <p className="font-headline italic text-2xl md:text-3xl leading-snug mb-6">
            {ko
              ? '내신은 있는데 방향이 없다면, 전략이 필요한 시점입니다.'
              : 'If you have grades but no direction, it\'s time for strategy.'}
          </p>
          <p className="font-body text-on-primary/70 leading-relaxed">
            {ko
              ? '성적만으로는 합격할 수 없습니다. 전공 방향, 지원 전략, 서류 구성까지 — 구조적으로 설계해야 합니다.'
              : 'Grades alone won\'t get you accepted. Major direction, application strategy, document composition — it all needs to be structurally designed.'}
          </p>
        </div>
      </section>

      {/* ③ Services */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <h2 className="font-headline text-3xl md:text-4xl text-primary mb-12">
          {ko ? '3가지 핵심 경로' : 'Three Core Pathways'}
        </h2>

        {/* Card 1: 해외고 → 한국대 */}
        <div className="bg-surface-container-lowest shadow-sm p-8 md:p-12 mb-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">flight_land</span>
            <h3 className="font-headline text-2xl md:text-3xl text-primary mb-4">
              {ko ? '해외고 → 한국대 진학' : 'Overseas HS → Korean University'}
            </h3>
            <p className="font-body text-on-surface-variant leading-relaxed mb-6">
              {ko
                ? 'IB, AP, GPA 기반으로 재외국민/외국인 전형 및 학종 대응 전략을 설계합니다.'
                : 'IB, AP, GPA-based strategy for 재외국민/외국인 전형 and 학종 tracks.'}
            </p>
            <div className="mb-6">
              <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-3">
                {ko ? '이런 학생에게 적합합니다' : 'Recommended for'}
              </h4>
              <ul className="space-y-1">
                {(ko
                  ? ['해외고 또는 국제학교 재학생', 'IB / AP 커리큘럼 학생', '한국 대학 지원 예정자']
                  : ['Students at overseas or international schools', 'IB / AP curriculum students', 'Planning to apply to Korean universities']
                ).map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm font-body text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-xs mt-0.5">person</span>{b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/consultation" className="bg-primary text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors text-center">
                {ko ? '무료 진단' : 'Free Diagnosis'}
              </Link>
              <Link to="/domestic/freshman" className="border border-primary text-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all text-center">
                {ko ? '자세히 보기' : 'Learn More'}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 bg-surface p-6 border border-outline-variant/15">
            <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-4">
              {ko ? '이 서비스를 통해 얻는 것' : 'What You Get'}
            </h4>
            <ul className="space-y-3">
              {(ko
                ? ['지원 가능 대학 리스트 (상향/적정/안정)', '커리큘럼 기반 전공 적합성 분석', '합격 전략 방향 설계', '지원 일정 및 실행 로드맵']
                : ['Target university list (reach/match/safety)', 'Curriculum-based major fit analysis', 'Acceptance strategy design', 'Application timeline & execution roadmap']
              ).map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm font-body text-primary leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 2: 국내 입시 */}
        <div className="bg-surface-container-low p-8 md:p-12 mb-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">school</span>
            <h3 className="font-headline text-2xl md:text-3xl text-primary mb-4">
              {ko ? '국내 입시 전략' : 'Korean Domestic Admissions'}
            </h3>
            <p className="font-body text-on-surface-variant leading-relaxed mb-6">
              {ko
                ? '학생부종합 및 정시 전략, 전공 방향 설정, 스토리 구축까지 구조적으로 설계합니다.'
                : '학생부종합 and 정시 strategy, major direction, narrative building — structurally designed.'}
            </p>
            <div className="mb-6">
              <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-3">
                {ko ? '이런 학생에게 적합합니다' : 'Recommended for'}
              </h4>
              <ul className="space-y-1">
                {(ko
                  ? ['학생부종합 전형 준비 중인 학생', '내신 기반으로 상위권 대학을 목표하는 학생', '전공 방향 설정이 필요한 학생', '전략 없이 지원을 고민 중인 학생']
                  : ['Students preparing for 학생부종합', 'Targeting top universities based on GPA', 'Students who need major direction', 'Considering applications without a clear strategy']
                ).map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm font-body text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-xs mt-0.5">person</span>{b}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/consultation" className="bg-primary text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors">
              {ko ? '무료 진단' : 'Free Diagnosis'}
            </Link>
          </div>
          <div className="lg:col-span-5 bg-surface p-6 border border-outline-variant/15">
            <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-4">
              {ko ? '이 서비스를 통해 얻는 것' : 'What You Get'}
            </h4>
            <ul className="space-y-3">
              {(ko
                ? ['학생부 기반 전공 적합성 분석', '지원 대학 전략 매칭 (상향/적정/안정)', '합격 전략 방향 설계', '월별 마일스톤 일정표']
                : ['Student record-based major fit analysis', 'University targeting (reach/match/safety)', 'Acceptance strategy design', 'Monthly milestone timeline']
              ).map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm font-body text-primary leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Card 3: 편입 */}
        <div className="bg-surface-container-lowest shadow-sm p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">swap_horiz</span>
            <h3 className="font-headline text-2xl md:text-3xl text-primary mb-4">
              {ko ? '해외대 → 한국대 편입' : 'Foreign Univ → Korean Transfer'}
            </h3>
            <p className="font-body text-on-surface-variant leading-relaxed mb-6">
              {ko
                ? '학점 및 이수 과목 기반 편입 가능성 분석, 대학별 전략을 설계합니다.'
                : 'Credit-based feasibility analysis and university-specific transfer strategy.'}
            </p>
            <div className="mb-6">
              <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-3">
                {ko ? '이런 학생에게 적합합니다' : 'Recommended for'}
              </h4>
              <ul className="space-y-1">
                {(ko
                  ? ['해외 대학 재학 중인 학생', '한국 대학 편입 고려 중', '학점 이전 가능 여부 불확실한 경우']
                  : ['Currently enrolled at a foreign university', 'Considering transfer to a Korean university', 'Unsure about credit transferability']
                ).map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm font-body text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-xs mt-0.5">person</span>{b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/consultation" className="bg-primary text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors text-center">
                {ko ? '무료 진단' : 'Free Diagnosis'}
              </Link>
              <Link to="/domestic/transfer" className="border border-primary text-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all text-center">
                {ko ? '자세히 보기' : 'Learn More'}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 bg-surface p-6 border border-outline-variant/15">
            <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-4">
              {ko ? '이 서비스를 통해 얻는 것' : 'What You Get'}
            </h4>
            <ul className="space-y-3">
              {(ko
                ? ['학점 이전 매핑 및 가능성 리포트', '편입 시기별 지원 가능 대학 리스트', '편입 내러티브 및 서류 전략', '리스크 평가 및 백업 플랜']
                : ['Credit transfer mapping & feasibility report', 'Target universities with transfer windows', 'Transfer narrative & document strategy', 'Risk assessment & backup plan']
              ).map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm font-body text-primary leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>{r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ④ Comparison */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <h3 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-6">
          {ko ? '일반 컨설팅과의 차이' : 'How We\'re Different'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-primary">
                <th className="text-left py-3 pr-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant" />
                <th className="text-left py-3 pr-6 font-body text-sm text-on-surface-variant">{ko ? '일반 컨설팅' : 'Typical Consulting'}</th>
                <th className="text-left py-3 font-body text-sm text-primary font-bold">169 Avenue</th>
              </tr>
            </thead>
            <tbody>
              {[
                { typEn: 'Information delivery', usEn: 'Strategy design', typKo: '정보 제공', usKo: '전략 설계' },
                { typEn: 'University recommendation', usEn: 'Acceptance design', typKo: '대학 추천', usKo: '합격 설계' },
                { typEn: 'One-off advice', usEn: 'Structural analysis', typKo: '단편 상담', usKo: '구조 분석' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-outline-variant/15">
                  <td className="py-4 pr-6 font-headline italic text-xl text-outline-variant/30">{String(i + 1).padStart(2, '0')}</td>
                  <td className="py-4 pr-6 font-body text-sm text-on-surface-variant line-through opacity-60">{ko ? row.typKo : row.typEn}</td>
                  <td className="py-4 font-body text-sm text-primary font-bold">{ko ? row.usKo : row.usEn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ⑤ Process */}
      <section className="bg-surface-container-low py-16 md:py-24 px-6 md:px-16 mb-16 md:mb-24">
        <div className="max-w-screen-2xl mx-auto">
          <h3 className="font-headline text-2xl md:text-3xl text-primary mb-10">
            {ko ? '상담 프로세스' : 'Consultation Process'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'analytics', en: 'Student Record Analysis', ko: '학생부 / 학력 분석' },
              { icon: 'psychology', en: 'Major Direction Design', ko: '전공 방향 설정' },
              { icon: 'target', en: 'University Matching', ko: '대학 매칭' },
              { icon: 'design_services', en: 'Strategy Design', ko: '전략 설계 및 실행' },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <span className="font-headline italic text-3xl text-outline-variant/30 block mb-2">{String(i + 1).padStart(2, '0')}</span>
                <span className="material-symbols-outlined text-secondary text-2xl mb-3 block">{step.icon}</span>
                <p className="font-headline text-base text-primary">{ko ? step.ko : step.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑥ CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <p className="font-headline italic text-xl md:text-2xl text-on-primary/70 mb-4">
            {ko ? '성적만으로는 합격할 수 없습니다.' : 'Grades alone won\'t get you in.'}
          </p>
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-12">
            {ko
              ? '"전략이 합격을 만듭니다."'
              : '"Strategy makes acceptance."'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
              {ko ? '무료 진단' : 'Free Diagnosis'}
            </Link>
            <Link to="/about" className="border border-on-primary/30 text-on-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-surface hover:text-primary transition-all duration-500">
              {ko ? '전략 방식 보기' : 'See Our Approach'}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function DomesticPage() {
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><DomesticContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="about"><DomesticContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
