import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function PageCTA({ variant = 'default' }: { variant?: 'default' | 'university' | 'region' }) {
  const { t } = useLanguage()
  const c = t.page_cta[variant]

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
  const { t } = useLanguage()

  return (
    <div className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
      <div className="bg-surface-container-lowest p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-headline italic text-lg md:text-xl text-primary leading-snug text-center md:text-left">
          {text || t.mid_cta_default_text}
        </p>
        <Link to="/consultation" className="shrink-0 bg-primary text-on-primary px-8 py-3 md:py-4 text-xs md:text-sm tracking-widest uppercase hover:bg-secondary transition-all duration-300">
          {buttonText || t.mid_cta_default_btn}
        </Link>
      </div>
    </div>
  )
}
