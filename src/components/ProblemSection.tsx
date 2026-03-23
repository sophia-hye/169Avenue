import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function ProblemSection() {
  const { t } = useLanguage()

  return (
    <section className="px-8 md:px-16 lg:px-24 mb-32 md:mb-40 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">{t.problem_tag}</span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary mt-4 mb-6">
            {t.problem_title}
          </h2>
        </div>

        <div className="lg:col-span-7">
          <ul className="space-y-0">
            {t.problem_items.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-4 py-5 md:py-6 border-b border-outline-variant/20"
              >
                <span className="font-headline italic text-2xl text-outline-variant/30 shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
                  {p}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 bg-surface-container-lowest p-8 shadow-sm">
            <p className="font-headline italic text-xl text-primary leading-snug mb-6">
              {t.problem_answer}
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center space-x-3 group"
            >
              <span className="font-label text-xs uppercase tracking-widest bg-primary text-on-primary px-6 py-3 group-hover:bg-secondary transition-colors">
                {t.problem_cta}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
