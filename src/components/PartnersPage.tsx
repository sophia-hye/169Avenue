import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function ServicesContent() {
  const { language } = useLanguage()
  const ko = language === 'ko'

  return (
    <>
      {/* Header */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
          Future Path Camp | {ko ? '미국 입시 시작 프로그램' : 'US Admissions Prep Starter'}
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1] mb-6">
          {ko ? (
            <>체험에서 확신으로,<br /><span className="italic">확신에서 투자로.</span></>
          ) : (
            <>From trial to conviction,<br /><span className="italic">from conviction to commitment.</span></>
          )}
        </h1>
        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
          {ko
            ? '주말 체험으로 시작해서, 1~2주 캠프로 방향을 확인하고, 1~3개월 프로그램으로 진짜 입시를 시작합니다. 모든 단계에서 리포트와 상담을 제공합니다.'
            : 'Start with a weekend trial, confirm direction through a 1-2 week camp, and begin real admissions prep with a 1-3 month program. Every step includes a report and consultation.'
          }
        </p>
      </header>

      {/* === COMMON STRUCTURE: Every Program === */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="bg-primary text-on-primary p-8 md:p-16">
          <h2 className="font-headline text-2xl md:text-3xl mb-3 text-center">
            {ko ? '모든 프로그램의 공통 구조' : 'Every Program Follows This Structure'}
          </h2>
          <p className="font-body text-sm text-on-primary/50 text-center mb-10 max-w-lg mx-auto">
            {ko ? '프로그램 → 리포트 → 상담 → 다음 단계. 부모님은 항상 "결과"를 받습니다.' : 'Program → Report → Consultation → Next step. Parents always receive "results."'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {(ko
              ? [
                  { step: '01', icon: 'stethoscope', title: '사전 상담', desc: '아이 상태 파악 — 학업, 성향, 경험, 부모님 목표', tag: '파악' },
                  { step: '02', icon: 'camp', title: '프로그램 진행', desc: '영어 + 체험 + 탐색 활동 (스포츠, 아트, 프로젝트)', tag: '경험' },
                  { step: '03', icon: 'description', title: '결과 리포트', desc: '성향 분석 + 추천 방향 + 향후 계획', tag: '진단' },
                  { step: '04', icon: 'record_voice_over', title: '후속 상담', desc: '부모님께 전략 설명 — 다음 단계, 전문가 연결, 장기 계획', tag: '핵심' },
                ]
              : [
                  { step: '01', icon: 'stethoscope', title: 'Pre-Consultation', desc: 'Assess the child — academics, aptitude, experience, parent goals', tag: 'Assess' },
                  { step: '02', icon: 'camp', title: 'Program', desc: 'English + experience + exploration (sports, art, projects)', tag: 'Experience' },
                  { step: '03', icon: 'description', title: 'Results Report', desc: 'Aptitude analysis + recommended direction + future plan', tag: 'Diagnose' },
                  { step: '04', icon: 'record_voice_over', title: 'Follow-up', desc: 'Explain strategy to parents — next steps, specialists, long-term plan', tag: 'Key' },
                ]
            ).map((item, i) => (
              <div key={item.step} className="relative">
                {i < 3 && <div className="hidden md:block absolute top-8 -right-3 text-on-primary/20 text-2xl">{'>'}</div>}
                <div className={`bg-on-primary/5 border border-on-primary/10 p-6 h-full ${i === 3 ? 'ring-1 ring-secondary' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-headline text-3xl text-on-primary/20">{item.step}</span>
                    <span className="material-symbols-outlined text-secondary text-xl">{item.icon}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-headline text-lg text-on-primary">{item.title}</h3>
                    {i === 3 && <span className="text-xs bg-secondary text-white px-2 py-0.5 font-label uppercase tracking-widest">core</span>}
                  </div>
                  <p className="font-body text-sm text-on-primary/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === 3-TIER PRICING LADDER === */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-8 md:mb-12">
        <h2 className="font-headline text-3xl md:text-4xl text-primary text-center mb-3">
          {ko ? '단계별 프로그램' : 'Programs by Stage'}
        </h2>
        <p className="font-body text-sm text-on-surface-variant text-center max-w-xl mx-auto">
          {ko
            ? '부담 없는 체험에서 시작해, 확신이 생기면 투자합니다.'
            : 'Start with a low-commitment trial. When conviction builds, invest.'
          }
        </p>
      </section>

      {/* --- ENTRY: Weekend --- */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
        <div className="bg-surface-container-lowest shadow-sm p-8 md:p-14 border-l-4 border-outline-variant/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-label text-[10px] uppercase tracking-widest bg-outline-variant/10 text-on-surface-variant px-3 py-1">Entry</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary">{ko ? '주말 / 2~3일' : 'Weekend / 2-3 days'}</span>
              </div>
              <h3 className="font-headline text-2xl md:text-3xl text-primary mb-2">
                {ko ? '주말 캠프' : 'Weekend Camp'}
              </h3>
              <p className="font-headline italic text-base text-primary/50 mb-6">
                {ko ? '"오, 생각보다 괜찮네?"' : '"Oh, this is actually pretty good?"'}
              </p>
              <p className="font-body text-on-surface-variant text-base leading-relaxed mb-6">
                {ko
                  ? '부담 없이 시작하는 맛보기. 아이가 어떤 반응을 보이는지 확인하고, 부모님은 169 Avenue의 접근법을 직접 경험합니다. 이 단계의 목표는 신뢰 확보입니다.'
                  : 'A low-commitment trial. See how your child responds, and experience the 169 Avenue approach firsthand. The goal at this stage is building trust.'
                }
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="border border-outline-variant/15 p-4">
                  <h4 className="font-headline text-sm text-primary mb-2">DAY 1</h4>
                  <ul className="space-y-1">
                    {(ko
                      ? ['영어 활동 (간단 발표)', '탐색 체험 (스포츠 or 아트)', '간단 프로젝트']
                      : ['English activity (simple presentation)', 'Exploration (sports or art)', 'Simple project']
                    ).map((b) => (
                      <li key={b} className="font-body text-xs text-on-surface-variant flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[10px] mt-0.5">check</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-outline-variant/15 p-4">
                  <h4 className="font-headline text-sm text-primary mb-2">DAY 2</h4>
                  <ul className="space-y-1">
                    {(ko
                      ? ['발표 & 피드백', '간단 리포트 작성', '부모님 후속 상담']
                      : ['Presentation & feedback', 'Brief report', 'Parent follow-up consultation']
                    ).map((b) => (
                      <li key={b} className="font-body text-xs text-on-surface-variant flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[10px] mt-0.5">check</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link to="/consultation" className="inline-block bg-primary text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors">
                {ko ? '주말 캠프 상담' : 'Weekend Camp Inquiry'}
              </Link>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <div className="bg-surface p-6 border border-outline-variant/15 w-full">
                <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{ko ? '부모님이 얻는 것' : 'What Parents Get'}</div>
                <ul className="space-y-3">
                  {(ko ? ['아이 반응 관찰 기회', '간단 적성 리포트', '후속 상담: "다음 단계는?"', '169 Avenue 접근법 체험'] : ['Opportunity to observe your child', 'Brief aptitude report', 'Follow-up: "What\'s next?"', 'Experience the 169 Avenue approach']).map((r) => (
                    <li key={r} className="flex items-start gap-2 font-body text-sm text-primary">
                      <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE: 1~2 Week --- */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
        <div className="bg-surface-container-low p-8 md:p-14 border-l-4 border-secondary">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-label text-[10px] uppercase tracking-widest bg-secondary/10 text-secondary px-3 py-1">Core</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary">{ko ? '1~2주' : '1-2 Weeks'}</span>
              </div>
              <h3 className="font-headline text-2xl md:text-3xl text-primary mb-2">
                {ko ? '단기 집중 캠프' : 'Intensive Camp'}
              </h3>
              <p className="font-headline italic text-base text-primary/50 mb-6">
                {ko ? '"이 아이 방향이 보이기 시작했다"' : '"I can see this child\'s direction now"'}
              </p>
              <p className="font-body text-on-surface-variant text-base leading-relaxed mb-6">
                {ko
                  ? '"이거 진짜 도움 된다"를 느끼는 단계. 매일 영어 발표/토론, 다양한 분야 탐색, 포트폴리오 결과물까지. 부모님은 구체적인 성향 분석과 방향 추천이 포함된 결과 리포트를 받습니다.'
                  : 'The stage where parents feel "this actually works." Daily English presentations, multi-field exploration, and portfolio deliverables. Parents receive a detailed results report with aptitude analysis and direction recommendations.'
                }
              </p>

              <ul className="space-y-3 mb-6">
                {(ko
                  ? [
                      { icon: 'school', text: '영어 + 발표: 매일 발표/토론 — 몰입 환경' },
                      { icon: 'explore', text: '탐색 프로그램: 테니스/골프 스포츠, 파슨스 졸업생 아트 클래스, 간단 프로젝트(발표)' },
                      { icon: 'folder', text: '포트폴리오 결과물: 발표 자료 + 간단 에세이' },
                      { icon: 'description', text: '결과 리포트: 성향 분석 + 추천 방향(학업/운동/예술) + 로드맵' },
                    ]
                  : [
                      { icon: 'school', text: 'English + Presentation: daily presentations/debates — immersive' },
                      { icon: 'explore', text: 'Exploration: tennis/golf sports, Parsons graduate art class, projects' },
                      { icon: 'folder', text: 'Portfolio deliverables: presentation materials + simple essay' },
                      { icon: 'description', text: 'Results Report: aptitude analysis + direction (academic/athletic/artistic) + roadmap' },
                    ]
                ).map((item) => (
                  <li key={item.icon} className="flex items-start gap-3 font-body text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-base mt-0.5 shrink-0">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <Link to="/consultation" className="inline-block bg-primary text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors">
                {ko ? '캠프 상담 신청' : 'Camp Inquiry'}
              </Link>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <div className="bg-surface p-6 border border-outline-variant/15 w-full">
                <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{ko ? '부모님이 얻는 것' : 'What Parents Get'}</div>
                <ul className="space-y-3 mb-6">
                  {(ko ? ['종합 성향 분석 리포트', '추천 방향: 학업 / 운동 / 예술', '향후 로드맵 (학기별)', '포트폴리오 첫 기록물', '후속 상담: 구체적 다음 단계'] : ['Comprehensive aptitude report', 'Recommended direction: academic / athletic / artistic', 'Future roadmap (by semester)', 'First portfolio entries', 'Follow-up: concrete next steps']).map((r) => (
                    <li key={r} className="flex items-start gap-2 font-body text-sm text-primary">
                      <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>{r}
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-secondary/5 border border-secondary/10">
                  <p className="font-headline italic text-sm text-primary">
                    {ko ? '"캠프"가 아니라 "진로 방향 진단 프로그램". 리포트가 돈의 이유입니다.' : 'Not a "camp" — a "direction diagnosis program." The report is what you\'re paying for.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PREMIUM: 1~3 Month --- */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="bg-primary text-on-primary p-8 md:p-14 border-l-4 border-secondary">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-label text-[10px] uppercase tracking-widest bg-secondary text-white px-3 py-1">Premium</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary">{ko ? '1~3개월' : '1-3 Months'}</span>
              </div>
              <h3 className="font-headline text-2xl md:text-3xl mb-2">
                {ko ? '장기 프로그램' : 'Long-term Program'}
              </h3>
              <p className="font-headline italic text-base text-on-primary/50 mb-6">
                {ko ? '"이제 진짜 입시 준비 시작했다"' : '"Now we\'ve actually started admissions prep"'}
              </p>
              <p className="font-body text-on-primary/80 text-base leading-relaxed mb-6">
                {ko
                  ? '이게 진짜 돈이 되는 구조입니다. 1:1 전략 설계, 활동 설계(대회 준비/포트폴리오), 전문가 연결(스포츠/아트/입학사정관), 주간 체크와 피드백까지. 실제 입시 준비가 시작됩니다.'
                  : 'This is where the real value is. 1:1 strategy design, activity design (competition prep/portfolio), specialist connections (sports/art/admissions officers), weekly check-ins and feedback. Real admissions prep begins.'
                }
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {(ko
                  ? [
                      { icon: 'architecture', title: '1:1 전략 설계', items: ['목표 설정', '방향 설계', '맞춤 로드맵'] },
                      { icon: 'build', title: '활동 설계', items: ['프로젝트 기획', '대회 준비', '포트폴리오 구축'] },
                      { icon: 'group', title: '전문가 연결', items: ['스포츠 코치', '아트 멘토 (파슨스)', '입학사정관 출신 컨설턴트'] },
                      { icon: 'event_repeat', title: '지속 관리', items: ['주간 체크', '피드백 & 조정', '부모님 정기 리포트'] },
                    ]
                  : [
                      { icon: 'architecture', title: '1:1 Strategy Design', items: ['Goal setting', 'Direction design', 'Custom roadmap'] },
                      { icon: 'build', title: 'Activity Design', items: ['Project planning', 'Competition prep', 'Portfolio building'] },
                      { icon: 'group', title: 'Specialist Connections', items: ['Sports coaches', 'Art mentors (Parsons)', 'Former admissions officers'] },
                      { icon: 'event_repeat', title: 'Ongoing Management', items: ['Weekly check-ins', 'Feedback & adjustments', 'Regular parent reports'] },
                    ]
                ).map((block) => (
                  <div key={block.icon} className="bg-on-primary/5 border border-on-primary/10 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-secondary text-lg">{block.icon}</span>
                      <h4 className="font-headline text-base text-on-primary">{block.title}</h4>
                    </div>
                    <ul className="space-y-1">
                      {block.items.map((b) => (
                        <li key={b} className="font-body text-xs text-on-primary/60 flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-secondary text-[10px] mt-0.5">check</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link to="/consultation" className="inline-block bg-surface text-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-secondary hover:text-white transition-colors">
                {ko ? '프리미엄 상담 신청' : 'Premium Program Inquiry'}
              </Link>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <div className="bg-on-primary/5 border border-on-primary/10 p-6 w-full">
                <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{ko ? '부모님이 얻는 것' : 'What Parents Get'}</div>
                <ul className="space-y-3 mb-6">
                  {(ko ? ['1:1 맞춤 입시 전략 문서', '활동 포트폴리오 (입시용)', '전문가 네트워크 직접 연결', '주간 진행 리포트', '정기 부모님 전략 브리핑', '장기 로드맵 (대학 지원까지)'] : ['1:1 custom admissions strategy document', 'Activity portfolio (admissions-ready)', 'Direct specialist network connections', 'Weekly progress reports', 'Regular parent strategy briefings', 'Long-term roadmap (through university application)']).map((r) => (
                    <li key={r} className="flex items-start gap-2 font-body text-sm text-on-primary/80">
                      <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>{r}
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-secondary/10 border border-secondary/20">
                  <p className="font-headline italic text-sm text-on-primary">
                    {ko ? '프로그램 → 리포트 → 상담 → 다음 단계. 부모님은 항상 "결과"를 받습니다.' : 'Program → Report → Consultation → Next step. Parents always receive "results."'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === UPGRADE PATH VISUAL === */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="bg-surface-container-lowest shadow-sm p-8 md:p-16">
          <h3 className="font-headline text-2xl md:text-3xl text-primary mb-3 text-center">
            {ko ? '자연스러운 업그레이드 흐름' : 'Natural Upgrade Path'}
          </h3>
          <p className="font-body text-sm text-on-surface-variant text-center mb-10 max-w-lg mx-auto">
            {ko ? '체험 → 확신 → 투자. 부담 없이 시작해서, 확신이 생기면 다음 단계로.' : 'Trial → Conviction → Investment. Start light, upgrade when convinced.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {(ko
              ? [
                  { tier: 'Entry', period: '주말', goal: '체험', desc: '부담 없이 맛보기. 신뢰 확보.', arrow: true },
                  { tier: 'Core', period: '1~2주', goal: '확신', desc: '"이거 진짜 도움 된다." 방향이 보임.', arrow: true },
                  { tier: 'Premium', period: '1~3개월', goal: '투자', desc: '"진짜 입시 준비 시작." 장기 고객.', arrow: false },
                ]
              : [
                  { tier: 'Entry', period: 'Weekend', goal: 'Trial', desc: 'Low-commitment trial. Build trust.', arrow: true },
                  { tier: 'Core', period: '1-2 Weeks', goal: 'Conviction', desc: '"This actually works." Direction emerges.', arrow: true },
                  { tier: 'Premium', period: '1-3 Months', goal: 'Investment', desc: '"Real admissions prep." Long-term client.', arrow: false },
                ]
            ).map((item, i) => (
              <div key={item.tier} className="relative flex flex-col items-center text-center p-8">
                {item.arrow && <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-secondary text-2xl font-bold">{'>'}</div>}
                <div className={`font-label text-[10px] uppercase tracking-widest px-4 py-1 mb-4 ${
                  i === 0 ? 'bg-outline-variant/10 text-on-surface-variant' :
                  i === 1 ? 'bg-secondary/10 text-secondary' :
                  'bg-secondary text-white'
                }`}>{item.tier}</div>
                <div className="font-headline text-3xl text-primary mb-1">{item.period}</div>
                <div className="font-headline italic text-lg text-secondary mb-3">{item.goal}</div>
                <p className="font-body text-sm text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === AGE-BASED CURRICULUM === */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <h2 className="font-headline text-3xl md:text-4xl text-primary text-center mb-3">
          {ko ? '연령별 커리큘럼' : 'Curriculum by Age'}
        </h2>
        <p className="font-body text-sm text-on-surface-variant text-center max-w-xl mx-auto mb-12">
          {ko ? '주말 기준 구성입니다. 1~2주 / 1~3개월은 이 구조를 반복, 심화, 확장합니다.' : 'Weekend format shown. 1-2 week / 1-3 month programs repeat, deepen, and expand this structure.'}
        </p>

        <div className="space-y-8">
          {(ko
            ? [
                {
                  age: '초등 저학년 (1~3학년)', icon: 'child_care', color: 'border-blue-300',
                  goal: '영어 "재밌다" 경험 + 다양한 활동 노출',
                  keyword: '재미 + 자신감',
                  day1: ['Ice Breaking (영어 게임)', 'Storytelling 활동', '아트 활동 (파슨스 졸업생)'],
                  day2: ['영어 발표 (간단)', '스포츠 체험 (테니스/골프)', '결과 공유 + 부모님 리포트'],
                  extend: ['다양한 체험 반복', '영어 노출 증가', '흥미 관찰 데이터 축적'],
                },
                {
                  age: '초등 고학년 (4~6학년)', icon: 'explore', color: 'border-secondary/50',
                  goal: '발표 경험 + 관심 분야 탐색',
                  keyword: '"나 이런 거 좋아하네?" 발견',
                  day1: ['영어 토론 (간단 주제)', '아트 or 스포츠 선택 체험', '미니 프로젝트 시작'],
                  day2: ['영어 발표', '피드백 세션', '리포트 기반 부모님 상담'],
                  extend: ['프로젝트 강화', '발표 + 결과물 축적', '관심 분야 깊이 탐색'],
                },
                {
                  age: '중등 (중1~중3)', icon: 'rocket_launch', color: 'border-secondary',
                  goal: '입시 방향 인식 + 포트폴리오 시작',
                  keyword: '"입시 준비 시작 느낌"',
                  day1: ['영어 토론 / 발표 (심화)', '진로 탐색 워크숍', '프로젝트 시작'],
                  day2: ['프로젝트 발표', '피드백 + 방향 진단', '전략 상담 (부모님 포함)'],
                  extend: ['에세이 / 활동 설계', '포트폴리오 시작', '입시 관점 활동 큐레이션'],
                },
              ]
            : [
                {
                  age: 'Lower Elementary (Grades 1-3)', icon: 'child_care', color: 'border-blue-300',
                  goal: '"English is fun" experience + diverse activity exposure',
                  keyword: 'Fun + Confidence',
                  day1: ['Ice Breaking (English games)', 'Storytelling activity', 'Art activity (Parsons graduate)'],
                  day2: ['Simple English presentation', 'Sports experience (tennis/golf)', 'Results sharing + parent report'],
                  extend: ['Repeat diverse experiences', 'Increase English exposure', 'Accumulate interest observation data'],
                },
                {
                  age: 'Upper Elementary (Grades 4-6)', icon: 'explore', color: 'border-secondary/50',
                  goal: 'Presentation experience + interest discovery',
                  keyword: '"Oh, I like this!" discovery',
                  day1: ['English discussion (simple topics)', 'Choose: art or sports experience', 'Mini project start'],
                  day2: ['English presentation', 'Feedback session', 'Report-based parent consultation'],
                  extend: ['Strengthen projects', 'Accumulate presentations + deliverables', 'Deepen interest exploration'],
                },
                {
                  age: 'Middle School (Grades 7-9)', icon: 'rocket_launch', color: 'border-secondary',
                  goal: 'Admissions direction awareness + portfolio start',
                  keyword: '"Admissions prep has started"',
                  day1: ['English discussion / presentation (advanced)', 'Career exploration workshop', 'Project start'],
                  day2: ['Project presentation', 'Feedback + direction diagnosis', 'Strategy consultation (with parents)'],
                  extend: ['Essay / activity design', 'Portfolio start', 'Activity curation with admissions lens'],
                },
              ]
          ).map((item) => (
            <div key={item.icon} className={`bg-surface-container-lowest shadow-sm border-l-4 ${item.color} p-8 md:p-12`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
                {/* Left: Info */}
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-secondary text-2xl">{item.icon}</span>
                    <h3 className="font-headline text-xl md:text-2xl text-primary">{item.age}</h3>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant mb-2">{ko ? '목표' : 'Goal'}: {item.goal}</p>
                  <p className="font-headline italic text-base text-secondary mb-6">{item.keyword}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="border border-outline-variant/15 p-5 bg-surface">
                      <h4 className="font-headline text-sm text-primary mb-3">DAY 1</h4>
                      <ul className="space-y-2">
                        {item.day1.map((b) => (
                          <li key={b} className="flex items-start gap-2 font-body text-sm text-on-surface-variant">
                            <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">play_arrow</span>{b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border border-outline-variant/15 p-5 bg-surface">
                      <h4 className="font-headline text-sm text-primary mb-3">DAY 2</h4>
                      <ul className="space-y-2">
                        {item.day2.map((b) => (
                          <li key={b} className="flex items-start gap-2 font-body text-sm text-on-surface-variant">
                            <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">play_arrow</span>{b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right: Extension */}
                <div className="lg:col-span-4">
                  <div className="bg-surface-container-low p-6 h-full">
                    <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-4">
                      {ko ? '1~2주 / 1~3개월 확장 시' : 'When Extended to 1-2w / 1-3m'}
                    </h4>
                    <ul className="space-y-3">
                      {item.extend.map((b) => (
                        <li key={b} className="flex items-start gap-2 font-body text-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">arrow_upward</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === DOMESTIC vs OVERSEAS === */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <h3 className="font-headline text-2xl md:text-3xl text-primary mb-8 text-center">
          {ko ? '국내형 & 해외형' : 'Domestic & Overseas'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Domestic */}
          <div className="bg-surface-container-lowest shadow-sm p-8 border-t-4 border-secondary/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">location_city</span>
              <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 font-label uppercase tracking-widest">{ko ? '지금 바로 가능' : 'Available Now'}</span>
            </div>
            <h4 className="font-headline text-xl text-primary mb-2">{ko ? '국내형 캠프' : 'Domestic Camp'}</h4>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{ko ? '미국 입시 준비 시작 프로그램 (국내 버전)' : 'US Admissions Prep Starter (Domestic)'}</p>
            <ul className="space-y-2 mb-4">
              {(ko
                ? ['주말/단기: 2일~1주 (스터디 공간, 학원, 공유공간)', '방학 집중: 1~2주', '영어(회화/발표/토론) + 탐색(스포츠/아트/프로젝트)', '결과 리포트 + 후속 상담']
                : ['Weekend/short: 2 days - 1 week', 'Vacation intensive: 1-2 weeks', 'English + exploration (sports/art/projects)', 'Results report + follow-up consultation']
              ).map((b) => (
                <li key={b} className="flex items-start gap-2 font-body text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">check</span>{b}
                </li>
              ))}
            </ul>
            <p className="font-headline italic text-sm text-primary/60">{ko ? '"캠프가 아니라 진로 방향 진단 프로그램"' : '"Not a camp — a direction diagnosis program"'}</p>
          </div>

          {/* Overseas */}
          <div className="bg-surface-container-low p-8 border-t-4 border-secondary">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">flight_takeoff</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 font-label uppercase tracking-widest">{ko ? '확장 프로그램' : 'Premium'}</span>
            </div>
            <h4 className="font-headline text-xl text-primary mb-2">{ko ? '해외형 캠프' : 'Overseas Camp'}</h4>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{ko ? '미국 대학 미리 경험 프로그램' : 'US University Preview Program'}</p>
            <ul className="space-y-2 mb-4">
              {(ko
                ? ['현지 어학원/학교 협력 수업 + 액티비티', '대학 캠퍼스 탐방 + 간단한 수업 체험', '미니 프로젝트: 발표, 에세이', '입학사정관 출신 전문가 특강 + 1:1 상담']
                : ['Local school partnership + activities', 'University campus tours + sample classes', 'Mini projects: presentations, essays', 'Former admissions officer lecture + 1:1 consulting']
              ).map((b) => (
                <li key={b} className="flex items-start gap-2 font-body text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">check</span>{b}
                </li>
              ))}
            </ul>
            <p className="font-headline italic text-sm text-primary/60">{ko ? '"어학연수가 아니라 미국 입시 체험 프로그램"' : '"Not language study — a US admissions experience"'}</p>
          </div>
        </div>
      </section>

      {/* === About Link === */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-container-low p-8 md:p-12">
          <p className="font-headline italic text-xl md:text-2xl text-primary leading-snug text-center md:text-left">
            {ko ? '누가 이 전략을 설계하나요?' : 'Who designs this strategy?'}
          </p>
          <Link to="/about" className="shrink-0 inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest border border-primary text-primary px-8 py-4 hover:bg-primary hover:text-on-primary transition-all group">
            {ko ? '전략 설계팀 소개' : 'Meet the Strategy Team'}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* === Final CTA === */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <p className="font-headline italic text-xl md:text-2xl text-on-primary/70 mb-4">
            {ko ? '주말 캠프 한 번이면 충분합니다.' : 'One weekend camp is enough to start.'}
          </p>
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-12">
            {ko
              ? '부담 없이 시작하세요. 아이의 방향이 보이기 시작합니다.'
              : 'Start with no pressure. Your child\'s direction will begin to emerge.'
            }
          </p>
          <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
            {ko ? '무료 상담 신청' : 'Free Consultation'}
          </Link>
        </div>
      </section>
    </>
  )
}

export function PartnersPage() {
  usePageTitle('Future Path Camp - 미국 입시 시작 프로그램')
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
