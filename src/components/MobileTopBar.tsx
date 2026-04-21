import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchOverlay } from './SearchOverlay'
import { AdminToggle } from './AdminToggle'
import { MobileMenuOverlay } from './MobileMenuOverlay'
import { useLanguage } from '../context/LanguageContext'

/**
 * Standalone mobile top chrome (header + search/menu overlays).
 * Used by MobileShell and any page that wants mobile chrome without
 * being a MobileShell-wrapped content (e.g. admin workspace).
 */
export function MobileTopBar() {
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguage()
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="md:hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center w-full px-4 py-3">
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}>
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <Link to="/" className="font-headline text-2xl font-bold tracking-tighter text-primary">
            169 Avenue
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <AdminToggle />
          <button
            onClick={() => setSearchOpen(true)}
            className="text-primary/70 p-1"
            aria-label="Search"
          >
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <div className="flex items-center border border-outline-variant/30 overflow-hidden">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 font-label text-[10px] uppercase tracking-widest transition-colors duration-200 ${
                language === 'en' ? 'bg-outline-variant/30 text-primary' : 'text-primary/40'
              }`}
            >
              EN
            </button>
            <span className="w-px h-3 bg-outline-variant/30" />
            <button
              onClick={() => setLanguage('ko')}
              className={`px-2 py-1 font-label text-[10px] uppercase tracking-widest transition-colors duration-200 ${
                language === 'ko' ? 'bg-outline-variant/30 text-primary' : 'text-primary/40'
              }`}
            >
              한
            </button>
          </div>
          <Link
            to="/consultation"
            className="bg-primary text-on-primary px-3 py-1.5 font-body text-[10px] uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95"
          >
            {t.nav_consult}
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="text-primary/70 p-1"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        </div>
      </header>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {menuOpen && <MobileMenuOverlay onClose={() => setMenuOpen(false)} />}
    </div>
  )
}
