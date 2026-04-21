import { useLanguage } from '../context/LanguageContext'

export function OutcomesSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-primary text-on-primary py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-40">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-headline text-3xl md:text-5xl tracking-tight mb-14 md:mb-20 max-w-3xl">
          {t.outcomes_title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-20">
          {t.outcomes_items.map((item) => (
            <div
              key={item.step}
              className="bg-on-primary/5 border border-on-primary/10 p-8 md:p-10 h-full"
            >
              <span className="font-headline italic text-4xl text-secondary/60 block mb-6">
                {item.step}
              </span>
              <h3 className="font-headline text-xl md:text-2xl tracking-tight mb-4">
                {item.title}
              </h3>
              <p className="font-body text-sm md:text-base text-on-primary/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl">
          <div className="w-12 h-px bg-secondary mb-6" />
          <p className="font-headline italic text-lg md:text-2xl text-on-primary/90 leading-snug">
            {t.outcomes_body}
          </p>
        </div>
      </div>
    </section>
  )
}
