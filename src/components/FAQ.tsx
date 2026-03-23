import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="px-8 md:px-16 lg:px-24 mb-32 md:mb-40 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-4">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">{t.faq_tag}</span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary mt-4 mb-6">
            {t.faq_title}
          </h2>
          <p className="font-body text-on-surface-variant leading-relaxed text-sm">
            {t.faq_sub}
          </p>
        </div>

        <div className="lg:col-span-8">
          {t.faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="border-b border-outline-variant/20">
                <button
                  className="w-full flex items-start justify-between py-6 md:py-8 text-left group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-headline text-base md:text-lg text-primary leading-snug pr-8 group-hover:text-secondary transition-colors">
                    {faq.q}
                  </span>
                  <span className={`material-symbols-outlined text-on-surface-variant shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-8' : 'max-h-0'}`}
                >
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed pl-0 md:pl-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
