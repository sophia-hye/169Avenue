import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SearchOverlay } from './SearchOverlay'

const ROUTE_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Partners', to: '/partners' },
  { label: 'Field', to: '/field' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Success Stories', to: '/stories' },
]

export function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md">
        <div className="flex justify-between items-center w-full px-8 py-6 max-w-screen-2xl mx-auto">
          {isHome ? (
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-headline text-2xl font-bold tracking-tighter text-primary"
            >
              169 Avenue
            </button>
          ) : (
            <Link to="/" className="font-headline text-2xl font-bold tracking-tighter text-primary">
              169 Avenue
            </Link>
          )}

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

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-primary/70 hover:text-secondary transition-colors duration-300 p-2"
              aria-label="Search"
            >
              <span className="material-symbols-outlined text-2xl">search</span>
            </button>
            <Link
              to="/consultation"
              className="bg-primary text-on-primary px-8 py-3 font-body text-sm uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95"
            >
              Consult
            </Link>
          </div>
        </div>
      </nav>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  )
}
