import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SearchOverlay } from './SearchOverlay'
import { useLanguage } from '../context/LanguageContext'

export function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [searchOpen, setSearchOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const ROUTE_LINKS = [
    { label: t.nav_about, to: '/about' },
    { label: t.nav_partners, to: '/partners' },
    { label: t.nav_field, to: '/field' },
    { label: t.nav_destinations, to: '/destinations' },
    { label: t.nav_stories, to: '/stories' },
  ]

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
          <Link to="/" className="font-headline text-2xl font-bold tracking-tighter text-primary">
            169 Avenue
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            {ROUTE_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-headline tracking-tight text-lg text-primary/70 hover:text-secondary transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-primary/70 hover:text-secondary transition-colors duration-300 p-2"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-2xl">search</span>
            </button>
            <div className="flex items-center border border-outline-variant/30 overflow-hidden">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-2 font-label text-xs uppercase tracking-widest transition-colors duration-200 ${
                  language === 'en' ? 'bg-outline-variant/30 text-primary' : 'text-primary/40 hover:text-primary'
                }`}
              >
                EN
              </button>
              <span className="w-px h-4 bg-outline-variant/30" />
              <button
                onClick={() => setLanguage('ko')}
                className={`px-3 py-2 font-label text-xs uppercase tracking-widest transition-colors duration-200 ${
                  language === 'ko' ? 'bg-outline-variant/30 text-primary' : 'text-primary/40 hover:text-primary'
                }`}
              >
                한
              </button>
            </div>
            <Link
              to="/consultation"
              className="bg-primary text-on-primary px-8 py-3 font-body text-sm uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95"
            >
              {t.nav_consult}
            </Link>
          </div>
        </div>
      </nav>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  )
}
