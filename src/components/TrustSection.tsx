import { useLanguage } from '../context/LanguageContext'

const TRUST_ICONS = ['school', 'analytics', 'description']

export function TrustSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-surface-container-low py-20 md:py-32 px-8 md:px-16 lg:px-24 mb-32 md:mb-40">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16 md:mb-20">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">{t.trust_tag}</span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary mt-4">{t.trust_title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {t.trust_items.map((item, i) => (
            <div key={item.title} className="bg-surface-container-lowest p-8 md:p-10 shadow-sm">
              <span className="material-symbols-outlined text-secondary text-3xl mb-6 block">{TRUST_ICONS[i]}</span>
              <h3 className="font-headline text-xl text-primary mb-6">{item.title}</h3>
              <ul className="space-y-4">
                {item.items.map((li) => (
                  <li key={li} className="flex items-start gap-3 text-sm font-body text-on-surface-variant leading-relaxed">
                    <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
