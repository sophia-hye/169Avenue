import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { WorldMap } from './WorldMap'

const REGIONS = [
  { id: 'us', title: 'United States', tag: 'Primary Hub' },
  { id: 'uk', title: 'United Kingdom', tag: 'Heritage Focus' },
  { id: 'eu', title: 'Europe', tag: 'Modern Classics' },
  { id: 'ap', title: 'Asia-Pacific', tag: 'Emerging Frontiers' },
]

function DestinationsContent() {
  const [hovered, setHovered] = useState<string | null>(null)
  const navigate = useNavigate()

  return (
    <>
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">The Global Reach</span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-8xl text-primary tracking-tighter leading-none mb-4">
          Curated <br /><span className="italic">Destinations</span>
        </h1>
        <p className="font-body text-on-surface-variant text-sm md:text-lg leading-relaxed max-w-md md:max-w-none md:border-l md:border-outline-variant/30 md:pl-8 mt-4">
          Click a region to explore our institutional partnerships.
        </p>
      </header>

      <section className="px-4 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
        <div className="bg-surface-container-lowest p-4 md:p-16 shadow-sm">
          <WorldMap selected={null} hovered={hovered} onSelect={(id) => navigate(`/destinations/${id}`)} onHover={setHovered} />
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mt-8 md:mt-12">
            {REGIONS.map((r) => (
              <Link
                key={r.id}
                to={`/destinations/${r.id}`}
                onMouseEnter={() => setHovered(r.id)}
                onMouseLeave={() => setHovered(null)}
                className={`px-4 md:px-8 py-2 md:py-3 font-label text-[10px] md:text-[11px] uppercase tracking-widest transition-all duration-300 ${
                  hovered === r.id ? 'bg-primary text-on-primary' : 'border border-outline-variant/30 text-primary'
                }`}
              >
                {r.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-40">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {REGIONS.map((r) => (
            <Link key={r.id} to={`/destinations/${r.id}`} className="group block bg-surface-container-low p-5 md:p-8 hover:bg-surface-container-high transition-colors duration-300">
              <span className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-secondary mb-2 md:mb-4 block">{r.tag}</span>
              <h3 className="font-headline text-lg md:text-2xl text-primary mb-2 md:mb-4 group-hover:text-secondary transition-colors">{r.title}</h3>
              <div className="flex items-center space-x-1 md:space-x-2 mt-2 md:mt-6">
                <span className="font-label text-[9px] md:text-[10px] uppercase tracking-widest text-on-surface-variant">Explore</span>
                <span className="material-symbols-outlined text-xs md:text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export function DestinationsPage() {
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><DestinationsContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="destinations"><DestinationsContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
