import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SearchOverlay } from './SearchOverlay'
import { AdminToggle } from './AdminToggle'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

function DropdownMenu({ label, items, isOpen, onToggle }: {
  label: string
  items: { label: string; to: string }[]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="relative"
      onMouseEnter={onToggle}
      onMouseLeave={onToggle}
    >
      <button className="font-headline tracking-tight text-lg text-primary/70 hover:text-secondary transition-colors duration-300 flex items-center gap-1">
        {label}
        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'wght' 300" }}>
          expand_more
        </span>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-surface/95 backdrop-blur-md shadow-lg border border-outline-variant/10 min-w-[240px] py-2 z-50">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block px-6 py-3 font-body text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [blogOpen, setBlogOpen] = useState(false)
  const [admissionsOpen, setAdmissionsOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const { isAdmin } = useAuth()

  const SERVICES_ITEMS = [
    { label: 'Future Pathway Program', to: '/services' },
    { label: t.nav_us_experience, to: '/services/us-experience' },
  ]

  const BLOG_ITEMS = [
    { label: t.nav_blog, to: '/blog' },
    { label: t.nav_case_studies, to: '/stories' },
  ]

  const ADMISSIONS_ITEMS = [
    { label: t.nav_domestic_overview, to: '/domestic' },
    { label: t.nav_foreign_to_korean, to: '/domestic/freshman' },
    { label: t.nav_foreign_uni_transfer, to: '/domestic/transfer' },
    { label: t.nav_international, to: '/destinations' },
  ]

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
          <Link to="/" className="font-headline text-2xl font-bold tracking-tighter text-primary">
            169 Avenue
          </Link>

          <div className="hidden md:flex items-center space-x-10">
            <Link to="/about" className="font-headline tracking-tight text-lg text-primary/70 hover:text-secondary transition-colors duration-300">
              {t.nav_about}
            </Link>
            <DropdownMenu
              label={t.nav_partners}
              items={SERVICES_ITEMS}
              isOpen={servicesOpen}
              onToggle={() => setServicesOpen(!servicesOpen)}
            />
            <DropdownMenu
              label={t.nav_blog}
              items={BLOG_ITEMS}
              isOpen={blogOpen}
              onToggle={() => setBlogOpen(!blogOpen)}
            />
            {isAdmin && (
              <>
                <DropdownMenu
                  label={t.nav_admissions}
                  items={ADMISSIONS_ITEMS}
                  isOpen={admissionsOpen}
                  onToggle={() => setAdmissionsOpen(!admissionsOpen)}
                />
                <Link to="/admin/diagnosis" className="font-headline tracking-tight text-lg text-secondary hover:text-primary transition-colors duration-300">
                  {t.nav_diagnosis}
                </Link>
                <Link to="/admin/report" className="font-headline tracking-tight text-lg text-secondary hover:text-primary transition-colors duration-300">
                  {t.nav_student_report}
                </Link>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <AdminToggle />
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
