import { useLanguage } from '../context/LanguageContext'

const ACCENT = ['border-amber-500', 'border-sky-600', 'border-rose-500']

export function NextPathSection() {
  const { t } = useLanguage()

  return (
    <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-40 max-w-screen-2xl mx-auto">
      <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight mb-12 md:mb-16 max-w-3xl">
        {t.next_path_title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-16">
        {t.next_path_cards.map((card, i) => (
          <div
            key={card.name}
            className={`bg-surface-container-lowest p-8 md:p-10 border-t-4 ${ACCENT[i] ?? 'border-secondary'} hover:shadow-md transition-shadow duration-500`}
          >
            <span className="font-headline italic text-4xl text-on-surface-variant/25 block mb-6">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-headline text-xl md:text-2xl text-primary tracking-tight mb-4">
              {card.name}
            </h3>
            <p className="font-headline italic text-sm md:text-base text-secondary leading-snug mb-4">
              {card.tagline}
            </p>
            <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
              {card.body}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl">
        <div className="w-12 h-px bg-secondary mb-6" />
        <p className="font-headline italic text-lg md:text-2xl text-primary/80 leading-snug">
          {t.next_path_body}
        </p>
      </div>
    </section>
  )
}
