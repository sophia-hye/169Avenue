import { useLanguage } from '../context/LanguageContext'

export function SolutionSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-primary text-on-primary py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-40">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h2 className="font-headline text-2xl md:text-4xl tracking-tight leading-snug mb-10 md:mb-12 max-w-3xl">
          {t.solution_title}
        </h2>

        {/* Body */}
        <p className="font-body text-base md:text-lg text-on-primary/80 leading-relaxed mb-8 max-w-3xl">
          {t.solution_body}
        </p>

        {/* Sub body */}
        <p className="font-headline italic text-lg md:text-xl text-on-primary/90 leading-snug mb-14 md:mb-20 max-w-3xl">
          {t.solution_subbody}
        </p>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {t.solution_pillars.map((p) => (
            <div
              key={p.name}
              className="bg-on-primary/5 border border-on-primary/10 p-8 md:p-10"
            >
              <span className="material-symbols-outlined text-secondary text-3xl mb-6 block">
                {p.icon}
              </span>
              <h3 className="font-headline text-xl md:text-2xl tracking-tight mb-3">
                {p.name}
              </h3>
              <p className="font-body text-sm md:text-base text-on-primary/70 leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
