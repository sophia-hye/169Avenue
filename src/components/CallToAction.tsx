import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function CallToAction() {
  const { t } = useLanguage()

  return (
    <section className="mb-24 md:mb-40 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight leading-tight mb-8 md:mb-10">
          {t.cta_title}
        </h2>
        <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-12 md:mb-16 max-w-2xl mx-auto">
          {t.cta_body}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
          <Link
            to="/consultation"
            className="w-full sm:w-auto bg-primary text-on-primary px-12 py-5 text-sm tracking-widest uppercase hover:bg-secondary transition-all"
          >
            {t.cta_btn_primary}
          </Link>
          <Link
            to="/consultation"
            className="w-full sm:w-auto border border-primary text-primary px-12 py-5 text-sm tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all"
          >
            {t.cta_btn_secondary}
          </Link>
        </div>
      </div>
    </section>
  )
}
