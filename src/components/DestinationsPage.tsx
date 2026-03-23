import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { WorldMap } from './WorldMap'
import { usePageTitle } from '../hooks/usePageTitle'
import { FIELDS, type Field } from '../data/fields'

const REGIONS = [
  { id: 'us', title: 'United States', tag: 'Primary Hub' },
  { id: 'uk', title: 'United Kingdom', tag: 'Heritage Focus' },
  { id: 'eu', title: 'Europe', tag: 'Modern Classics' },
  { id: 'ap', title: 'Asia-Pacific', tag: 'Emerging Frontiers' },
]

function DestinationsContent() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [selectedField, setSelectedField] = useState<Field | null>(null)
  const navigate = useNavigate()

  return (
    <>
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">International Admissions Strategy</span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-none mb-4">
          Global University <br /><span className="italic">Application Strategy</span>
        </h1>
        <p className="font-body text-on-surface-variant text-sm md:text-lg leading-relaxed max-w-lg mt-4">
          Select a region to see our application strategy, or filter by academic field to find the right universities for your profile.
        </p>
      </header>

      {/* Field Selector */}
      <section className="px-4 md:px-16 max-w-screen-2xl mx-auto mb-6 md:mb-8">
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={() => setSelectedField(null)}
            className={`px-4 md:px-6 py-2 md:py-3 font-label text-[10px] md:text-[11px] uppercase tracking-widest transition-all duration-300 ${
              !selectedField
                ? 'bg-primary text-on-primary'
                : 'border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
            }`}
          >
            All Regions
          </button>
          {FIELDS.map((field) => (
            <button
              key={field.id}
              onClick={() => setSelectedField(field)}
              className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-5 py-2 md:py-3 font-label text-[10px] md:text-[11px] uppercase tracking-widest transition-all duration-300 ${
                selectedField?.id === field.id
                  ? 'bg-primary text-on-primary'
                  : 'border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-sm" style={selectedField?.id === field.id ? {} : { fontVariationSettings: "'wght' 200" }}>{field.icon}</span>
              <span className="hidden sm:inline">{field.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Selected Field Info */}
      {selectedField && (
        <section className="px-4 md:px-16 max-w-screen-2xl mx-auto mb-6" style={{ animation: 'fadeIn 0.3s ease' }}>
          <div className="bg-surface-container-low p-6 md:p-8">
            <div className="flex items-center space-x-3 mb-3">
              <span className="material-symbols-outlined text-secondary text-2xl">{selectedField.icon}</span>
              <h3 className="font-headline text-xl md:text-2xl text-primary">{selectedField.name}</h3>
            </div>
            <p className="font-body text-on-surface-variant text-sm md:text-base max-w-3xl">{selectedField.description}</p>
          </div>
        </section>
      )}

      {/* Map */}
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

      {/* Field Rankings or Region Cards */}
      {selectedField ? (
        <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-40" style={{ animation: 'fadeIn 0.4s ease' }}>
          <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-6 md:mb-8 block">
            Global Rankings — {selectedField.name}
          </span>
          <div className="border-t border-outline-variant/20">
            {selectedField.universities.map((uni, i) => (
              <div
                key={uni.rank}
                className="flex items-center gap-4 py-5 md:py-7 border-b border-outline-variant/15 group hover:bg-surface-container-low/50 transition-colors px-2 md:px-6 -mx-2 md:-mx-6"
                style={{ animation: `fadeIn 0.4s ease ${i * 0.04}s both` }}
              >
                <span className="font-headline italic text-2xl md:text-4xl text-outline-variant/30 group-hover:text-secondary transition-colors w-10 md:w-14 shrink-0">
                  {String(uni.rank).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-headline text-base md:text-2xl text-primary truncate">{uni.name}</h3>
                  <span className="font-body text-xs md:text-sm text-on-surface-variant">{uni.city}, {uni.country}</span>
                </div>
                <Link to="/consultation" className="shrink-0 font-label text-[10px] uppercase tracking-widest text-secondary hover:text-primary transition-colors hidden sm:block">
                  Inquire
                </Link>
                <Link to="/consultation" className="shrink-0 sm:hidden">
                  <span className="material-symbols-outlined text-secondary text-sm">arrow_forward</span>
                </Link>
              </div>
            ))}
          </div>
        </section>
      ) : (
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
      )}
    </>
  )
}

export function DestinationsPage() {
  usePageTitle('International - 해외 대학 진학')
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
