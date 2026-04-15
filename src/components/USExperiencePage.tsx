import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function USExperienceContent() {
  const { language } = useLanguage()
  const ko = language === 'ko'

  return (
    <>
      {/* Header */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
          {ko ? '미국 진로 체험 프로그램' : 'US Career Experience Program'}
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1] mb-6">
          {ko ? (
            <>스펙이 아니라,<br /><span className="italic">진짜를 경험합니다.</span></>
          ) : (
            <>Not specs on paper.<br /><span className="italic">Real experience.</span></>
          )}
        </h1>
        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
          {ko
            ? '미국 대학 캠퍼스를 직접 걸어보고, 수업을 경험하고, 입학사정관 출신 전문가에게 직접 듣습니다. 어학연수가 아니라, 미래를 미리 경험하는 프로그램입니다.'
            : 'Walk through real US university campuses, experience classes, and hear directly from former admissions officers. Not language study — a program to experience the future firsthand.'}
        </p>
      </header>

      {/* Philosophy */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="bg-surface-container-low p-8 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline italic text-2xl md:text-3xl text-primary leading-snug mb-6">
                {ko
                  ? '"브로셔로 보는 대학과\n직접 걸어본 대학은 다릅니다."'
                  : '"A university in a brochure and\na university you\'ve walked through\nare completely different."'}
              </h2>
              <p className="font-body text-on-surface-variant text-base leading-relaxed">
                {ko
                  ? '국내에서 방향을 잡았다면, 이제 그 방향이 맞는지 직접 확인할 차례입니다. 미국 현지에서 대학을 보고, 수업을 듣고, 전문가에게 피드백을 받으면 — 막연한 목표가 구체적인 동기로 바뀝니다.'
                  : 'If you\'ve found your direction domestically, it\'s time to confirm it firsthand. See universities, attend classes, get expert feedback in the US — and vague goals become concrete motivation.'}
              </p>
            </div>
            <div className="bg-surface p-8 border border-outline-variant/15">
              <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">
                {ko ? '이 프로그램의 위치' : 'Where This Fits'}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-headline text-sm text-on-surface-variant/30">01</span>
                  <div>
                    <span className="font-body text-sm text-on-surface-variant">Future Path Camp</span>
                    <span className="font-body text-xs text-on-surface-variant/50 ml-2">{ko ? '국내형 — 방향 잡기 + 활동 연결' : 'Domestic — direction + activity design'}</span>
                  </div>
                </div>
                <div className="h-px bg-outline-variant/15" />
                <div className="flex items-center gap-4">
                  <span className="font-headline text-sm text-secondary">02</span>
                  <div>
                    <span className="font-body text-sm text-primary font-medium">{ko ? '미국 진로 체험 프로그램' : 'US Career Experience'}</span>
                    <span className="font-body text-xs text-secondary ml-2">{ko ? '해외형 — 경험 + 동기 강화' : 'Overseas — experience + motivation'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="mb-14">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
            {ko ? '프로그램 구성' : 'Program Structure'}
          </span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary tracking-tight">
            {ko ? '네 가지 핵심 경험' : 'Four Core Experiences'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1. Campus Experience */}
          <div className="bg-surface-container-lowest shadow-sm p-8 md:p-10 border-l-4 border-secondary">
            <span className="font-headline italic text-4xl text-secondary/40 block mb-6">01</span>
            <h3 className="font-headline text-xl text-primary mb-2">{ko ? '캠퍼스 경험' : 'Campus Experience'}</h3>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-6">{ko ? '핵심 프로그램' : 'Core Program'}</p>
            <ul className="space-y-3">
              {(ko
                ? ['미국 대학 캠퍼스 투어 — 직접 걸어보는 경험', '실제 수업 체험 (가능한 경우)', '캠퍼스 문화와 학생 생활 직접 관찰', '목표 대학을 눈으로 확인하고 동기 형성']
                : ['US university campus tours — walk through it yourself', 'Attend real classes (when available)', 'Observe campus culture and student life firsthand', 'See your target university and build real motivation']
              ).map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-on-surface-variant leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-xs mt-1 shrink-0">check</span>{item}
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Mini Project */}
          <div className="bg-surface-container-lowest shadow-sm p-8 md:p-10">
            <span className="font-headline italic text-4xl text-secondary/40 block mb-6">02</span>
            <h3 className="font-headline text-xl text-primary mb-2">{ko ? '미니 프로젝트' : 'Mini Project'}</h3>
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40 mb-6">{ko ? '결과물 중심' : 'Deliverable-focused'}</p>
            <ul className="space-y-3">
              {(ko
                ? ['영어 발표 — 현지에서 직접 프레젠테이션', '간단 에세이 작성 — 경험을 글로 정리', '현지에서 만드는 포트폴리오 기록', '단순 체험이 아닌, 남는 결과물']
                : ['English presentation — present on-site in the US', 'Simple essay writing — document the experience', 'Portfolio entries created in the field', 'Not just an experience — tangible deliverables']
              ).map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-on-surface-variant leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-xs mt-1 shrink-0">check</span>{item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Admissions Officer Session */}
          <div className="bg-surface-container-low p-8 md:p-10 border-l-4 border-secondary">
            <span className="font-headline italic text-4xl text-secondary/40 block mb-6">03</span>
            <h3 className="font-headline text-xl text-primary mb-2">{ko ? '입학사정관 출신 전문가 세션' : 'Former Admissions Officer Session'}</h3>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-6">{ko ? '킬러 차별화' : 'Key Differentiator'}</p>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">
              {ko
                ? '다른 유학원에서는 절대 제공할 수 없는 경험입니다. 실제 입학사정관 출신 전문가가 직접 입시를 설명하고, 학생에게 1:1 피드백을 제공합니다.'
                : 'An experience no other agency can offer. Former admissions officers explain the admissions process directly and provide 1:1 feedback to each student.'}
            </p>
            <ul className="space-y-3">
              {(ko
                ? ['입시 특강 — 실제 심사 기준과 과정 설명', 'Q&A — 궁금한 점 직접 질문', '간단 피드백 — 학생 프로필에 대한 초기 의견']
                : ['Admissions lecture — real criteria and process explained', 'Q&A — ask questions directly', 'Brief feedback — initial assessment of student profile']
              ).map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-on-surface-variant leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-xs mt-1 shrink-0">check</span>{item}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Cultural Experience */}
          <div className="bg-surface-container-low p-8 md:p-10">
            <span className="font-headline italic text-4xl text-secondary/40 block mb-6">04</span>
            <h3 className="font-headline text-xl text-primary mb-2">{ko ? '문화 경험' : 'Cultural Experience'}</h3>
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40 mb-6">{ko ? '현지 생활 체험' : 'Real-life Immersion'}</p>
            <ul className="space-y-3">
              {(ko
                ? ['팀 활동 — 현지 환경에서의 협업 경험', '현지 생활 체험 — 실제로 살아보는 느낌', '문화적 감각과 글로벌 마인드셋 형성', '해외 생활 적응력 사전 테스트']
                : ['Team activities — collaboration in a US environment', 'Local life experience — feel what living here is like', 'Cultural awareness and global mindset development', 'Pre-test for overseas life adaptability']
              ).map((item) => (
                <li key={item} className="flex items-start gap-2 font-body text-sm text-on-surface-variant leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-xs mt-1 shrink-0">check</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Differentiator */}
      <section className="bg-surface-container-low py-16 md:py-24 px-6 md:px-16 mb-16 md:mb-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-headline italic text-2xl md:text-3xl text-primary leading-snug">
            {ko ? (
              <>어학연수는 영어를 배우러 갑니다.<br /><br /><span className="text-secondary">우리는 미래를 경험하러 갑니다.</span><br /><br />직접 보고, 직접 듣고, 직접 느낀 경험이<br />가장 강력한 동기가 됩니다.</>
            ) : (
              <>Language programs teach English.<br /><br /><span className="text-secondary">We go to experience the future.</span><br /><br />What you see, hear, and feel firsthand<br />becomes the most powerful motivation.</>
            )}
          </p>
        </div>
      </section>

      {/* What Parents Get */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
              {ko ? '부모님이 받는 것' : 'What Parents Receive'}
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-primary tracking-tight mb-8">
              {ko ? '경험으로 끝나지 않습니다.' : 'It doesn\'t end with the experience.'}
            </h2>
            <ul className="space-y-4">
              {(ko
                ? ['캠퍼스 체험 리포트 — 아이의 반응과 관찰 기록', '입학사정관 피드백 요약', '프로젝트 결과물 (발표 자료, 에세이)', '후속 상담: 경험을 전략으로 연결하는 다음 단계']
                : ['Campus experience report — child\'s reactions and observations', 'Admissions officer feedback summary', 'Project deliverables (presentation, essay)', 'Follow-up consultation: connecting experience to strategy']
              ).map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-base text-primary leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1 shrink-0">check</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <div className="bg-surface-container-lowest shadow-sm p-8 md:p-10 w-full">
              <p className="font-headline italic text-lg text-primary leading-relaxed mb-6">
                {ko
                  ? '"국내에서 방향을 잡고, 미국에서 확인한다."'
                  : '"Find direction domestically. Confirm it in the US."'}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg">arrow_forward</span>
                  <span className="font-body text-sm text-on-surface-variant">
                    Future Path Camp {ko ? '(국내)' : '(Domestic)'} — {ko ? '방향 잡기 + 활동 연결' : 'Direction + Activity Design'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg">arrow_forward</span>
                  <span className="font-body text-sm text-primary font-medium">
                    {ko ? '미국 진로 체험 (해외)' : 'US Experience (Overseas)'} — {ko ? '경험 + 동기 강화' : 'Experience + Motivation'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <p className="font-headline italic text-xl md:text-2xl text-on-primary/70 mb-4">
            {ko ? '브로셔가 아닌, 직접 경험하세요.' : 'Don\'t read about it. Experience it.'}
          </p>
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-12">
            {ko
              ? '미국 대학을 직접 걸어본 아이는, 목표가 달라집니다.'
              : 'A child who has walked through a US campus sets different goals.'}
          </p>
          <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
            {ko ? '무료 상담 신청' : 'Free Consultation'}
          </Link>
        </div>
      </section>
    </>
  )
}

export function USExperiencePage() {
  usePageTitle('US Career Experience Program - 미국 진로 체험 프로그램')
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><USExperienceContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="partners"><USExperienceContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
