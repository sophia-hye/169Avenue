import { Link } from 'react-router-dom'
import { HERO_IMAGE } from '../data/home'
import { useLanguage } from '../context/LanguageContext'

export function Hero() {
  const { t } = useLanguage()
  return (
    <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center px-6 md:px-16 lg:px-24 mb-20 md:mb-32 pt-20 md:pt-0">
      <div className="grid grid-cols-12 w-full max-w-screen-2xl mx-auto gap-8 lg:gap-12 items-center">
        <div className="col-span-12 lg:col-span-7 z-10">
          {/* Eyebrow */}
          <span className="font-label text-[11px] uppercase tracking-[0.3em] text-secondary font-semibold block mb-8">
            {t.hero_eyebrow}
          </span>

          {/* Headline */}
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl tracking-tighter text-primary leading-[1.05] mb-10">
            {t.hero_h1_1}<br /><span className="italic text-secondary">{t.hero_h1_2}</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-xl font-headline italic text-lg md:text-xl text-primary/70 leading-snug mb-4">
            {t.hero_subheadline}
          </p>

          {/* Description */}
          <p className="max-w-xl font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-10">
            {t.hero_description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Link
              to="/consultation"
              className="bg-primary text-on-primary px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-secondary"
            >
              {t.hero_cta1}
            </Link>
            <Link
              to="/services"
              className="border-2 border-primary text-primary px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:text-on-primary"
            >
              {t.hero_cta2}
            </Link>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 relative mt-8 lg:mt-0 group">
          <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden">
            <img
              alt="University Campus"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:grayscale"
              src={HERO_IMAGE}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
