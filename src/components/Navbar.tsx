import { useState } from 'react'
import { Link } from 'react-router-dom'

const ROUTE_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Partners', to: '/partners' },
  { label: 'Field', to: '/field' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Success Stories', to: '/stories' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md">
      <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
        <Link to="/" className="font-headline text-2xl font-bold tracking-tighter text-primary">
          169 Avenue
        </Link>

        <div className="hidden md:flex items-center space-x-10">
          {ROUTE_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-headline tracking-tight text-lg text-primary/70 hover:text-secondary transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          to="/consultation"
          className="hidden md:block bg-primary text-on-primary px-8 py-3 font-body text-sm uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95"
        >
          Consultation
        </Link>

        <button
          className="md:hidden text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {mobileOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-md px-8 pb-8 space-y-4">
          {ROUTE_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="block font-headline text-lg text-primary/70 hover:text-secondary py-2"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/consultation"
            className="block w-full text-center bg-primary text-on-primary px-8 py-3 font-body text-sm uppercase tracking-widest"
            onClick={() => setMobileOpen(false)}
          >
            Consultation
          </Link>
        </div>
      )}
    </nav>
  )
}
