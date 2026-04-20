import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { TargetCards } from './TargetCards'
import { ProblemSection } from './ProblemSection'
import { ProcessSection } from './ProcessSection'
import { Destinations } from './Destinations'
import { CaseStudies } from './CaseStudies'
import { FAQ } from './FAQ'
import { TrustSection } from './TrustSection'
import { MiniCTA } from './MiniCTA'
import { CallToAction } from './CallToAction'
import { Footer } from './Footer'
import { MobileHome } from './MobileHome'
import { SearchOverlay } from './SearchOverlay'
import { MobileMenuOverlay } from './MobileMenuOverlay'
import { AdminToggle } from './AdminToggle'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

export function HomePage() {
  const { language, setLanguage, t } = useLanguage()
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  usePageTitle()

  return (
    <div className="bg-surface selection:bg-secondary/30">
      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center w-full px-4 py-3">
        <Link to="/" className="font-headline text-2xl font-bold tracking-tighter text-primary">
          169 Avenue
        </Link>
        <div className="flex items-center gap-2">
          <AdminToggle />
          <button onClick={() => setSearchOpen(true)} className="text-primary/70 p-1" aria-label="Search">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <div className="flex items-center border border-outline-variant/30 overflow-hidden">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 font-label text-[10px] uppercase tracking-widest transition-colors duration-200 ${language === 'en' ? 'bg-outline-variant/30 text-primary' : 'text-primary/40'}`}
            >EN</button>
            <span className="w-px h-3 bg-outline-variant/30" />
            <button
              onClick={() => setLanguage('ko')}
              className={`px-2 py-1 font-label text-[10px] uppercase tracking-widest transition-colors duration-200 ${language === 'ko' ? 'bg-outline-variant/30 text-primary' : 'text-primary/40'}`}
            >한</button>
          </div>
          <Link
            to="/consultation"
            className="bg-primary text-on-primary px-3 py-1.5 font-body text-[10px] uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95"
          >
            {t.nav_consult}
          </Link>
          <button onClick={() => setMenuOpen(true)} className="text-primary/70 p-1" aria-label="Menu">
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        </div>
      </header>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      {menuOpen && <MobileMenuOverlay onClose={() => setMenuOpen(false)} />}

      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Desktop Content */}
      <main className="hidden md:block pt-24 overflow-x-hidden">
        <Hero />
        <TargetCards />
        <ProblemSection />
        <ProcessSection />
        <MiniCTA />
        <Destinations />
        <CaseStudies />
        <MiniCTA text={t.mini_cta_case} linkText={t.mini_cta_case_btn} />
        <FAQ />
        <TrustSection />
        <CallToAction />
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Content */}
      <div className="pt-16">
        <MobileHome />
      </div>
    </div>
  )
}
