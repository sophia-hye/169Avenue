import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

interface Props {
  onClose: () => void
}

interface Section {
  title: string
  items: { label: string; to: string }[]
}

export function MobileMenuOverlay({ onClose }: Props) {
  const { t } = useLanguage()
  const { isAdmin } = useAuth()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const publicSections: Section[] = [
    {
      title: t.nav_partners,
      items: [
        { label: 'Future Pathway Program', to: '/services' },
        { label: t.nav_us_experience, to: '/services/us-experience' },
      ],
    },
    {
      title: t.nav_blog,
      items: [
        { label: t.nav_blog, to: '/blog' },
        { label: t.nav_case_studies, to: '/stories' },
      ],
    },
  ]

  const adminSections: Section[] = [
    {
      title: t.nav_admissions,
      items: [
        { label: t.nav_domestic_overview, to: '/domestic' },
        { label: t.nav_foreign_to_korean, to: '/domestic/freshman' },
        { label: t.nav_foreign_uni_transfer, to: '/domestic/transfer' },
        { label: t.nav_international, to: '/destinations' },
      ],
    },
  ]

  const handleClick = () => onClose()

  return (
    <div className="md:hidden fixed inset-0 z-[100] bg-surface flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/15">
        <Link to="/" onClick={handleClick} className="font-headline text-2xl font-bold tracking-tighter text-primary">
          169 Avenue
        </Link>
        <button onClick={onClose} aria-label="Close menu" className="p-2 text-primary">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-6 py-8 space-y-10">
        {/* About — single link */}
        <Link
          to="/about"
          onClick={handleClick}
          className="block font-headline text-2xl text-primary tracking-tight"
        >
          {t.nav_about}
        </Link>

        {/* Public dropdown sections */}
        {publicSections.map((section) => (
          <div key={section.title}>
            <h3 className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">
              {section.title}
            </h3>
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={handleClick}
                    className="block font-body text-lg text-primary/80 hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Admin sections */}
        {isAdmin && (
          <>
            <div className="h-px bg-outline-variant/20" />
            {adminSections.map((section) => (
              <div key={section.title}>
                <h3 className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={handleClick}
                        className="block font-body text-lg text-primary/80 hover:text-secondary transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="space-y-3">
              <Link
                to="/admin/diagnosis"
                onClick={handleClick}
                className="block font-headline text-xl text-secondary tracking-tight"
              >
                {t.nav_diagnosis}
              </Link>
              <Link
                to="/admin/report"
                onClick={handleClick}
                className="block font-headline text-xl text-secondary tracking-tight"
              >
                {t.nav_student_report}
              </Link>
            </div>
          </>
        )}
      </nav>

      {/* Footer CTA */}
      <div className="px-6 py-5 border-t border-outline-variant/15">
        <Link
          to="/consultation"
          onClick={handleClick}
          className="block w-full bg-primary text-on-primary text-center px-6 py-4 font-label text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-colors"
        >
          {t.nav_consult}
        </Link>
      </div>
    </div>
  )
}
