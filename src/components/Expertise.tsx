import { useLanguage } from '../context/LanguageContext'

const ICONS = ['history_edu', 'architecture', 'diversity_3', 'gavel']

export function Expertise() {
  const { t } = useLanguage()
  return (
    <section id="services" className="bg-surface-container-low py-32 mb-40">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-12 gap-12 items-start">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="text-5xl font-headline tracking-tight mb-8">
              {t.expertise_title}
            </h2>
            <p className="font-body text-on-surface-variant leading-relaxed mb-10">
              {t.expertise_body}
            </p>
            <button className="flex items-center space-x-4 group">
              <span className="font-label text-xs tracking-widest uppercase border-b border-primary pb-1 group-hover:pr-4 transition-all">
                {t.expertise_download}
              </span>
              <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </button>
          </div>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            {t.expertise_items.map((item, i) => (
              <div key={i} className="space-y-6">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest">
                  <span className="material-symbols-outlined text-primary">{ICONS[i]}</span>
                </div>
                <h4 className="text-xl font-headline italic">{item.title}</h4>
                <p className="text-sm font-body text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
