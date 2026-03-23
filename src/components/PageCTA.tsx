import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function PageCTA({ variant = 'default' }: { variant?: 'default' | 'university' | 'region' }) {
  const { language } = useLanguage()
  const ko = language === 'ko'

  const configs = {
    default: {
      title: ko ? '지금, 내 위치를 정확히 확인하세요.' : 'Find out exactly where you stand.',
      sub: ko ? '1분 입력으로 지원 가능 대학과 전략을 안내받으세요.' : '1-minute form → receive your target universities and strategy.',
      cta1: ko ? '무료 진단' : 'Free Diagnosis',
      cta2: ko ? '전략 상담 신청' : 'Book Strategy Consultation',
    },
    university: {
      title: ko ? '이 대학, 내 프로필로 가능할까?' : 'Can your profile get into this university?',
      sub: ko ? '현재 성적과 활동을 기반으로 가능성을 진단합니다.' : 'We diagnose feasibility based on your current grades and activities.',
      cta1: ko ? '가능성 진단 받기' : 'Get Feasibility Diagnosis',
      cta2: ko ? '전략 상담 신청' : 'Book Strategy Consultation',
    },
    region: {
      title: ko ? '이 지역 대학 지원 전략이 필요하신가요?' : 'Need a strategy for universities in this region?',
      sub: ko ? '지원 가능 대학과 현실적인 전략을 설계합니다.' : 'We design target universities and realistic strategy for you.',
      cta1: ko ? '무료 진단' : 'Free Diagnosis',
      cta2: ko ? '지원 전략 보기' : 'See Application Strategy',
    },
  }

  const c = configs[variant]

  return (
    <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
      <div className="max-w-3xl mx-auto">
        <p className="font-headline italic text-xl md:text-2xl text-on-primary/70 mb-4">{c.title}</p>
        <p className="font-body text-sm md:text-base text-on-primary/50 mb-12 max-w-xl mx-auto">{c.sub}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/consultation" className="bg-surface text-primary px-10 md:px-14 py-4 md:py-5 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
            {c.cta1}
          </Link>
          <Link to="/consultation" className="border border-on-primary/30 text-on-primary px-10 md:px-14 py-4 md:py-5 font-label uppercase text-xs tracking-[0.2em] hover:bg-surface hover:text-primary transition-all duration-500">
            {c.cta2}
          </Link>
        </div>
      </div>
    </section>
  )
}

export function MidPageCTA({ text, buttonText }: { text?: string; buttonText?: string }) {
  const { language } = useLanguage()
  const ko = language === 'ko'

  return (
    <div className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
      <div className="bg-surface-container-lowest p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-headline italic text-lg md:text-xl text-primary leading-snug text-center md:text-left">
          {text || (ko ? '내 상황에 맞는 전략이 궁금하다면?' : 'Curious about the right strategy for your case?')}
        </p>
        <Link to="/consultation" className="shrink-0 bg-primary text-on-primary px-8 py-3 md:py-4 text-xs md:text-sm tracking-widest uppercase hover:bg-secondary transition-all duration-300">
          {buttonText || (ko ? '무료 진단' : 'Free Diagnosis')}
        </Link>
      </div>
    </div>
  )
}
