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
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-surface flex justify-between items-center w-full px-6 py-4">
        <Link to="/about">
          <span className="material-symbols-outlined text-primary">menu</span>
        </Link>
        <h1 className="text-xl font-headline italic text-primary tracking-tight">169 Avenue</h1>
        <div className="w-6" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-surface-container-low opacity-20" />
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
