import { Link } from 'react-router-dom'
import { HERO_IMAGE } from '../data/home'
import { useLanguage } from '../context/LanguageContext'

export function Hero() {
  const { t } = useLanguage()
  return (
    <section className="relative min-h-[90vh] flex items-center px-8 md:px-16 lg:px-24 mb-32">
      <div className="grid grid-cols-12 w-full max-w-screen-2xl mx-auto gap-8 items-center">
        <div className="col-span-12 lg:col-span-7 z-10">
          <span className="font-label text-xs tracking-[0.3em] uppercase text-secondary mb-6 block">
            {t.hero_tag}
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-headline leading-[0.9] tracking-tighter text-primary mb-8 -ml-1 md:-ml-2">
            {t.hero_title_1} <br />
            <span className="italic font-normal">{t.hero_title_2}</span>
          </h1>
          <p className="max-w-md font-body text-on-surface-variant text-lg leading-relaxed mb-10">
            {t.hero_body}
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Link
              to="/domestic"
              className="border-2 border-primary text-primary px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:text-on-primary"
            >
              Domestic Admissions
            </Link>
            <Link
              to="/destinations"
              className="border-2 border-primary text-primary px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:text-on-primary"
            >
              International Admissions
            </Link>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0 group">
          <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden">
            <img
              alt="Classical University Campus Architecture"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:grayscale"
              src={HERO_IMAGE}
            />
          </div>
          <div className="absolute -bottom-12 -left-12 hidden md:block bg-surface-container-lowest group-hover:bg-secondary p-8 shadow-sm max-w-[280px] transition-colors duration-500">
            <p className="font-serif italic text-xl text-primary group-hover:text-on-primary leading-snug transition-colors duration-500">
              {t.hero_quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
