import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { Destinations } from './Destinations'
import { Expertise } from './Expertise'
import { SuccessStory } from './SuccessStory'
import { CallToAction } from './CallToAction'
import { Footer } from './Footer'
import { MobileHome } from './MobileHome'

export function HomePage() {
  return (
    <div className="bg-surface selection:bg-secondary/30">
      {/* Mobile Top Bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center w-full px-6 py-4">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-headline text-xl font-bold tracking-tighter text-primary"
        >
          169 Avenue
        </button>
        <Link
          to="/consultation"
          className="bg-primary text-on-primary px-4 py-2 font-body text-xs uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95"
        >
          Consult
        </Link>
      </header>

      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Desktop Content */}
      <main className="hidden md:block pt-24 overflow-x-hidden">
        <Hero />
        <Destinations />
        <Expertise />
        <SuccessStory />
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
