import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const TARGET_META = [
  { link: '/domestic/freshman', icon: 'flight_land' },
  { link: '/consultation', icon: 'school' },
  { link: '/domestic/transfer', icon: 'swap_horiz' },
]

export function TargetCards() {
  const { t } = useLanguage()

  const targets = [
    { title: t.target1_title, bullets: [t.target1_b1, t.target1_b2], cta: t.target1_cta },
    { title: t.target2_title, bullets: [t.target2_b1, t.target2_b2], cta: t.target2_cta },
    { title: t.target3_title, bullets: [t.target3_b1, t.target3_b2], cta: t.target3_cta },
  ]

  return (
    <section className="px-8 md:px-16 lg:px-24 mb-32 md:mb-40 max-w-screen-2xl mx-auto">
      <div className="mb-12 md:mb-16">
        <h2 className="font-headline text-3xl md:text-4xl text-primary">
          {t.target_title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {targets.map((card, i) => (
          <Link
            key={card.title}
            to={TARGET_META[i].link}
            className="group bg-surface-container-low p-8 md:p-10 hover:bg-primary transition-colors duration-500 flex flex-col"
          >
            <span className="material-symbols-outlined text-secondary group-hover:text-on-primary/60 text-3xl mb-6 transition-colors duration-500">
              {TARGET_META[i].icon}
            </span>
            <h3 className="font-headline text-xl md:text-2xl text-primary group-hover:text-on-primary mb-4 transition-colors duration-500">
              {card.title}
            </h3>
            <ul className="space-y-2 mb-8 flex-1">
              {card.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm font-body text-on-surface-variant group-hover:text-on-primary/70 leading-relaxed transition-colors duration-500">
                  <span className="material-symbols-outlined text-secondary group-hover:text-on-primary/50 text-xs mt-1 shrink-0 transition-colors duration-500">check</span>
                  {b}
                </li>
              ))}
            </ul>
            <span className="font-label text-xs uppercase tracking-widest text-primary group-hover:text-on-primary border-b border-primary/20 group-hover:border-on-primary/30 pb-1 self-start transition-colors duration-500">
              {card.cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
