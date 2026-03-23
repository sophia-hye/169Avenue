import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const CASE_STYLES = [
  { color: 'bg-primary', textColor: 'text-on-primary' },
  { color: 'bg-surface-container-low', textColor: 'text-primary' },
  { color: 'bg-surface-container-low', textColor: 'text-primary' },
  { color: 'bg-primary', textColor: 'text-on-primary' },
]

export function CaseStudies() {
  const { t } = useLanguage()

  return (
    <section className="px-8 md:px-16 lg:px-24 mb-32 md:mb-40 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
        <div>
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">{t.case_tag}</span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary mt-4">{t.case_title}</h2>
        </div>
        <p className="font-body text-sm text-on-surface-variant max-w-sm leading-relaxed">
          {t.case_sub}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {t.cases.map((c, i) => {
          const style = CASE_STYLES[i]
          return (
            <div
              key={i}
              className={`${style.color} p-8 md:p-12 flex flex-col`}
            >
              <span className={`font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-6 block`}>
                {c.tag}
              </span>
              <h3 className={`font-headline text-xl md:text-2xl ${style.textColor} mb-6 leading-snug`}>
                {c.title}
              </h3>
              <p className={`font-body text-sm ${style.color === 'bg-primary' ? 'text-on-primary/70' : 'text-on-surface-variant'} leading-relaxed mb-6 flex-1`}>
                {c.strategy}
              </p>
              <div className={`border-t ${style.color === 'bg-primary' ? 'border-on-primary/20' : 'border-outline-variant/20'} pt-6`}>
                <span className={`font-label text-[10px] uppercase tracking-widest ${style.color === 'bg-primary' ? 'text-on-primary/50' : 'text-on-surface-variant/60'} block mb-2`}>
                  Outcome
                </span>
                <p className={`font-body text-sm ${style.textColor} leading-relaxed`}>
                  {c.result}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/consultation"
          className="inline-flex items-center space-x-3 group"
        >
          <span className="font-label text-xs uppercase tracking-widest border-b border-primary pb-1 group-hover:text-secondary group-hover:border-secondary transition-all">
            {t.case_cta}
          </span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
        </Link>
      </div>
    </section>
  )
}
