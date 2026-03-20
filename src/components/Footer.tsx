import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  const FOOTER_SECTIONS = [
    { title: t.footer_directory, links: t.footer_links_directory },
    { title: t.footer_offices,   links: t.footer_links_offices },
    { title: t.footer_connect,   links: t.footer_links_connect },
  ]

  return (
    <footer className="bg-surface-container-low w-full py-20 px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-screen-2xl mx-auto">
        <div className="md:col-span-1">
          <div className="font-headline text-xl italic text-primary mb-8">
            169 Avenue
          </div>
          <p className="font-body text-xs text-on-surface-variant leading-relaxed opacity-60">
            {t.footer_tagline}
          </p>
        </div>

        {FOOTER_SECTIONS.map((section) => (
          <div key={section.title} className="space-y-4">
            <h5 className="font-body text-sm tracking-wide uppercase font-bold text-primary mb-6">
              {section.title}
            </h5>
            <ul className="space-y-3">
              {section.links.map((link) => {
                const item = typeof link === 'string' ? { label: link } : link
                const cls = "font-body text-sm tracking-wide uppercase text-primary/60 hover:text-primary transition-all opacity-80 hover:opacity-100"
                return (
                  <li key={item.label}>
                    {'to' in item && item.to
                      ? <Link to={item.to} className={cls}>{item.label}</Link>
                      : <a className={cls} href="#">{item.label}</a>
                    }
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-12 border-t border-primary/5 max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center text-primary/60 font-body text-xs tracking-widest uppercase">
        <span>{t.footer_all_rights}</span>
        <span className="mt-4 md:mt-0">{t.footer_crafted}</span>
      </div>
    </footer>
  )
}
