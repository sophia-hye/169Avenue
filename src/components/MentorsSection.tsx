import { useLanguage } from '../context/LanguageContext'

export function MentorsSection() {
  const { t } = useLanguage()

  return (
    <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-40 max-w-screen-2xl mx-auto">
      <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight mb-12 md:mb-16 max-w-3xl">
        {t.mentors_title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-14 md:mb-20">
        {t.mentors.map((m) => (
          <div
            key={m.name}
            className="bg-surface-container-lowest p-8 md:p-12 flex flex-col"
          >
            <div className="flex items-start gap-5 mb-8">
              <div className="text-5xl md:text-6xl leading-none shrink-0">{m.emoji}</div>
              <div>
                <h3 className="font-headline text-xl md:text-2xl text-primary tracking-tight mb-3">
                  {m.name}
                </h3>
                <p className="font-headline italic text-base md:text-lg text-secondary leading-snug">
                  {m.headline}
                </p>
              </div>
            </div>
            <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
              {m.body}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="w-12 h-px bg-secondary mx-auto mb-6" />
        <p className="font-headline italic text-lg md:text-xl text-primary/80 text-center leading-snug">
          {t.mentors_tagline}
        </p>
      </div>
    </section>
  )
}
