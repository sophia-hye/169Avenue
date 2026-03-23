import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function MiniCTA({ text, linkText }: { text?: string; linkText?: string }) {
  const { t } = useLanguage()

  return (
    <div className="px-8 md:px-16 lg:px-24 mb-20 md:mb-32 max-w-screen-2xl mx-auto">
      <div className="bg-surface-container-lowest p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-headline italic text-xl md:text-2xl text-primary leading-snug text-center md:text-left">
          {text || t.mini_cta_default}
        </p>
        <Link
          to="/consultation"
          className="shrink-0 bg-primary text-on-primary px-8 py-4 text-sm tracking-widest uppercase hover:bg-secondary transition-all duration-300"
        >
          {linkText || t.mini_cta_default_btn}
        </Link>
      </div>
    </div>
  )
}
