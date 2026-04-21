import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

/**
 * AudienceSplit: 2-card split routing parents to the right program.
 * File name kept as TargetCards.tsx to preserve existing import paths.
 */
export function TargetCards() {
  const { t } = useLanguage()

  return (
    <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-40 max-w-screen-2xl mx-auto">
      <h2 className="font-headline text-2xl md:text-4xl text-primary tracking-tight mb-12 md:mb-16 max-w-3xl">
        {t.target_split_title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {t.target_split.map((card) => (
          <div
            key={card.tier}
            className="group bg-surface-container-lowest shadow-sm p-8 md:p-12 flex flex-col"
          >
            <div className={`inline-flex items-center gap-2 self-start px-3 py-1 mb-8 ${card.accent}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${card.dot}`} />
              <span className="font-label text-[10px] uppercase tracking-[0.2em] font-semibold">
                {card.tier}
              </span>
            </div>

            <div className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
              {card.age}
            </div>

            <p className="font-body text-base md:text-lg text-primary/80 leading-relaxed mb-8">
              {card.description}
            </p>

            <ul className="space-y-2 mb-10">
              {card.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 font-body text-sm text-on-surface-variant leading-relaxed"
                >
                  <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>
                  {b}
                </li>
              ))}
            </ul>

            <Link
              to={card.href}
              className="mt-auto inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest text-primary border-b border-primary/20 group-hover:border-primary pb-1 self-start transition-colors"
            >
              {card.cta}
              <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
