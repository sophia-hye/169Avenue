import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { WorldMap } from './WorldMap'

const REGIONS = [
  { id: 'us', title: 'United States', tag: 'Primary Hub' },
  { id: 'uk', title: 'United Kingdom', tag: 'Heritage Focus' },
  { id: 'eu', title: 'Europe', tag: 'Modern Classics' },
  { id: 'ap', title: 'Asia-Pacific', tag: 'Emerging Frontiers' },
]

export function DestinationsPage() {
  const [hovered, setHovered] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleSelect = (id: string) => {
    navigate(`/destinations/${id}`)
  }

  return (
    <div className="bg-surface selection:bg-secondary/30">
      <Navbar />

      <main className="pt-32">
        {/* Header */}
        <header className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-7">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
                The Global Reach
              </span>
              <h1 className="font-headline text-6xl md:text-8xl text-primary tracking-tighter leading-none">
                Curated <br />
                <span className="italic">Destinations</span>
              </h1>
            </div>
            <div className="md:col-span-5">
              <p className="font-body text-on-surface-variant text-lg leading-relaxed border-l border-outline-variant/30 pl-8">
                Click a region on the map to explore our institutional partnerships
                and discover the academic landscape that awaits you.
              </p>
            </div>
          </div>
        </header>

        {/* Map Section */}
        <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-16">
          <div className="bg-surface-container-lowest p-8 md:p-16 shadow-sm">
            <WorldMap
              selected={null}
              hovered={hovered}
              onSelect={handleSelect}
              onHover={setHovered}
            />

            {/* Region Selector Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {REGIONS.map((r) => (
                <Link
                  key={r.id}
                  to={`/destinations/${r.id}`}
                  onMouseEnter={() => setHovered(r.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`px-8 py-3 font-label text-[11px] uppercase tracking-widest transition-all duration-300 ${
                    hovered === r.id
                      ? 'bg-primary text-on-primary'
                      : 'border border-outline-variant/30 text-primary hover:bg-surface-container-low'
                  }`}
                >
                  {r.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Region Cards Preview */}
        <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {REGIONS.map((r) => (
              <Link
                key={r.id}
                to={`/destinations/${r.id}`}
                className="group block bg-surface-container-low p-8 hover:bg-surface-container-high transition-colors duration-300"
                onMouseEnter={() => setHovered(r.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-4 block">
                  {r.tag}
                </span>
                <h3 className="font-headline text-2xl text-primary mb-4 group-hover:text-secondary transition-colors">
                  {r.title}
                </h3>
                <div className="flex items-center space-x-2 mt-6">
                  <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
                    Explore
                  </span>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
