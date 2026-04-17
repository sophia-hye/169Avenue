import { Link } from 'react-router-dom'
import { HERO_IMAGE } from '../data/home'
import { useLanguage } from '../context/LanguageContext'

export function Hero() {
  const { t } = useLanguage()
  return (
    <section className="relative min-h-[90vh] flex items-center px-8 md:px-16 lg:px-24 mb-32">
      <div className="grid grid-cols-12 w-full max-w-screen-2xl mx-auto gap-8 items-center">
        <div className="col-span-12 lg:col-span-7 z-10">
          <div className="flex items-center gap-5 mb-10">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-24 md:h-32 brightness-0 opacity-80" />
            <div>
              <h1 className="font-headline text-3xl md:text-5xl tracking-tighter text-secondary leading-[1.1]">
                Future Path Camp
              </h1>
              <p className="font-headline text-xl md:text-2xl text-primary/70 mt-3 tracking-tight">
                {t.hero_h1_1} <span className="italic">{t.hero_h1_2}</span>
              </p>
            </div>
          </div>
          <p className="max-w-lg font-body text-on-surface-variant text-lg leading-relaxed mb-4">
            {t.hero_sub}
          </p>
          <ul className="max-w-lg font-body text-on-surface-variant text-sm leading-relaxed mb-10 space-y-1">
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm">check</span> {t.hero_bullet1}</li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm">check</span> {t.hero_bullet2}</li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm">check</span> {t.hero_bullet3}</li>
          </ul>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Link
              to="/consultation"
              className="bg-primary text-on-primary px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-secondary"
            >
              {t.hero_cta1}
            </Link>
            <Link
              to="/consultation"
              className="border-2 border-primary text-primary px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:text-on-primary"
            >
              {t.hero_cta2}
            </Link>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0 group">
          <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden">
            <img
              alt="University Campus"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:grayscale"
              src={HERO_IMAGE}
            />
          </div>
          <div className="absolute -bottom-12 -left-12 hidden md:block bg-surface-container-lowest group-hover:bg-secondary p-8 shadow-sm max-w-[280px] transition-colors duration-500">
            <p className="font-serif italic text-xl text-primary group-hover:text-on-primary leading-snug transition-colors duration-500">
              {t.hero_quote2}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
