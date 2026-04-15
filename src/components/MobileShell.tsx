import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SearchOverlay } from './SearchOverlay'
import { AdminToggle } from './AdminToggle'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

interface MobileShellProps {
  children: ReactNode
  activeTab?: 'about' | 'partners' | 'field' | 'destinations' | 'stories' | 'report'
}

export function MobileShell({ children, activeTab }: MobileShellProps) {
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguage()
  const { isAdmin } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)

  const baseTabs = [
    { id: 'about',        label: t.bottom_about,        to: '/about',        icon: 'info' },
    { id: 'partners',     label: t.bottom_partners,     to: '/services',     icon: 'handshake' },
    { id: 'field',        label: t.bottom_field,        to: '/field',        icon: 'school' },
    { id: 'destinations', label: t.bottom_destinations, to: '/destinations', icon: 'public' },
    { id: 'stories',      label: t.bottom_stories,      to: '/stories',      icon: 'auto_stories' },
  ] as const

  const TABS = isAdmin
    ? [...baseTabs, { id: 'report' as const, label: 'Report', to: '/admin/report', icon: 'description' }]
    : baseTabs

  return (
    <div className="md:hidden">
      {/* Mobile Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center w-full px-4 py-3">
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}>
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <Link to="/" className="flex items-center gap-0">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="169 Avenue" className="h-14 brightness-0 -my-2" />
            <span className="font-headline text-2xl font-bold tracking-tighter text-primary">169 Avenue</span>
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
        </div>
      </header>

      {/* Content */}
      <main className="pt-20 pb-24">
        {children}
      </main>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      {/* Bottom Nav - matching desktop menu */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl flex justify-around items-center px-2 py-3 z-50 border-t border-outline-variant/10">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <Link
              key={tab.id}
              to={tab.to}
              className={`flex flex-col items-center gap-1 ${isActive ? 'text-secondary font-bold' : 'text-on-surface-variant/40'}`}
            >
              <span
                className="material-symbols-outlined text-lg"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {tab.icon}
              </span>
              <span className="text-[8px] font-label uppercase tracking-widest">{tab.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export function MobileFooter() {
  const { t } = useLanguage()
  return (
    <footer className="md:hidden bg-surface-container-low py-12 px-6 flex flex-col items-center text-center gap-6 mb-16">
      <div className="font-headline italic text-lg text-primary">169 Avenue</div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <Link to="/" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">{t.home}</Link>
        <Link to="/services" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">{t.nav_partners}</Link>
        <Link to="/consultation" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">{t.nav_consult}</Link>
      </div>
      <div className="text-[10px] font-body text-on-surface-variant/30">{t.copyright_short}</div>
    </footer>
  )
}
