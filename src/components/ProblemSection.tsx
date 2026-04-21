import { useLanguage } from '../context/LanguageContext'

export function ProblemSection() {
  const { t } = useLanguage()

  return (
    <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-40 max-w-screen-2xl mx-auto">
      <h2 className="font-headline text-2xl md:text-4xl text-primary tracking-tight leading-snug max-w-3xl mb-12 md:mb-16">
        {t.problem_title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14 md:mb-20">
        {t.problem_items.map((q, i) => (
          <div
            key={q}
            className="bg-surface-container-lowest border-l-2 border-secondary/60 p-8 md:p-10"
          >
            <span className="font-headline italic text-3xl text-secondary/40 block mb-5">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="font-headline text-lg md:text-xl text-primary/80 leading-snug">
              {q}
            </p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl">
        <div className="w-12 h-px bg-secondary mb-6" />
        <p className="font-headline text-lg md:text-2xl text-primary tracking-tight leading-relaxed">
          {t.problem_conclusion}
        </p>
      </div>
    </section>
  )
}
