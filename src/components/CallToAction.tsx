import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function CallToAction() {
  const { t } = useLanguage()
  return (
    <section className="mb-40 px-8 md:px-16 lg:px-24 text-center max-w-4xl mx-auto">
      <h2 className="text-5xl md:text-7xl font-headline mb-8">{t.cta_title}</h2>
      <p className="font-body text-on-surface-variant text-lg mb-12 leading-relaxed">
        {t.cta_body}
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <Link
          to="/consultation"
          className="w-full md:w-auto bg-primary text-on-primary px-12 py-5 text-sm tracking-widest uppercase hover:bg-secondary transition-all"
        >
          {t.cta_inquire}
        </Link>
        <button className="w-full md:w-auto bg-transparent border border-primary text-primary px-12 py-5 text-sm tracking-widest uppercase hover:bg-primary-fixed-dim transition-all">
          {t.cta_portfolio}
        </button>
      </div>
    </section>
  )
}
