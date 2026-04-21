import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const ACCENT: Record<string, { dot: string; border: string; tag: string }> = {
  amber: { dot: 'bg-amber-500', border: 'border-amber-400/70', tag: 'bg-amber-50 text-amber-700' },
  sky:   { dot: 'bg-sky-600',   border: 'border-sky-400/70',   tag: 'bg-sky-50 text-sky-700' },
}

export function ProgramsSection() {
  const { t } = useLanguage()

  return (
    <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-40 max-w-screen-2xl mx-auto">
      <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight mb-12 md:mb-16 max-w-3xl">
        {t.programs_title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {t.programs.map((p) => {
          const accent = ACCENT[p.accent] ?? ACCENT.amber
          return (
            <div
              key={p.name}
              className={`bg-surface-container-lowest border-t-4 ${accent.border} p-8 md:p-12 flex flex-col`}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
                <span className={`font-label text-[10px] uppercase tracking-[0.2em] font-semibold px-2 py-0.5 ${accent.tag}`}>
                  {p.name}
                </span>
              </div>

              <p className="font-body text-base md:text-lg text-primary/80 leading-relaxed mb-10">
                {p.description}
              </p>

              <dl className="space-y-3 mb-10 border-t border-outline-variant/15 pt-6">
                {p.meta.map((m) => (
                  <div key={m.label} className="flex items-baseline gap-5">
                    <dt className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60 w-14 shrink-0">
                      {m.label}
                    </dt>
                    <dd className="font-body text-sm md:text-base text-primary">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                to={p.href}
                className="mt-auto self-start inline-block bg-primary text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors"
              >
                {p.cta}
              </Link>
            </div>
          )
        })}
      </div>
    </section>
  )
}
