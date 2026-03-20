import { Link } from 'react-router-dom'
import { DESTINATIONS_LAYOUT } from '../data/home'
import { useLanguage } from '../context/LanguageContext'

export function Destinations() {
  const { t } = useLanguage()
  return (
    <section id="destinations" className="px-8 md:px-16 lg:px-24 mb-40 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20">
        <div className="max-w-xl">
          <span className="font-label text-xs tracking-[0.2em] uppercase text-secondary mb-4 block">
            {t.destinations_section_tag}
          </span>
          <h2 className="text-4xl md:text-6xl font-headline tracking-tight">
            {t.destinations_section_title}
          </h2>
        </div>
        <p className="md:max-w-xs font-body text-sm text-on-surface-variant leading-relaxed mt-6 md:mt-0">
          {t.destinations_section_body}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:h-[800px]">
        {DESTINATIONS_LAYOUT.map((layout, i) => {
          const item = t.destinations_items[i]
          return (
            <Link
              key={item.title}
              to="/destinations"
              className={`${layout.colSpan} group relative overflow-hidden ${layout.bgClass} cursor-pointer`}
            >
              <img
                alt={item.title}
                className={`w-full h-full object-cover ${layout.imgOpacity} group-hover:scale-105 group-hover:grayscale transition-all duration-700`}
                src={layout.image}
              />
              <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                <span className={`font-label text-xs tracking-widest ${layout.textClass} uppercase`}>
                  {item.tag}
                </span>
                <div>
                  <h3 className={`text-4xl ${layout.textClass} font-headline mb-2`}>{item.title}</h3>
                  <p className={`${layout.descClass} font-body text-sm max-w-xs`}>{item.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
