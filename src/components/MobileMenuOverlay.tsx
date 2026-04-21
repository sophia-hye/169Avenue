import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

interface Props {
  onClose: () => void
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

  const handleClick = () => onClose()

  const programsItems = [
    { label: t.nav_discovery_program, to: '/programs/discovery' },
    { label: t.nav_decision_program, to: '/programs/decision' },
    { label: t.nav_direction_track, to: '/programs/direction' },
    { label: t.nav_academic_track, to: '/programs/academic' },
    { label: t.nav_elite_track, to: '/programs/elite' },
  ]

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
        {/* About */}
        <Link
          to="/about"
          onClick={handleClick}
          className="block font-headline text-2xl text-primary tracking-tight"
        >
          {t.nav_about}
        </Link>

        {/* The 169 Method */}
        <Link
          to="/how-it-works"
          onClick={handleClick}
          className="block font-headline text-2xl text-primary tracking-tight"
        >
          {t.nav_how_it_works}
        </Link>

        {/* Programs group */}
        <div>
          <h3 className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">
            {t.nav_programs}
          </h3>
          <ul className="space-y-3">
            {programsItems.map((item) => (
              <li key={item.label}>
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

        {/* Contact */}
        <Link
          to="/consultation"
          onClick={handleClick}
          className="block font-headline text-2xl text-primary tracking-tight"
        >
          {t.nav_contact}
        </Link>

        {/* Admin */}
        {isAdmin && (
          <>
            <div className="h-px bg-outline-variant/20" />
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
