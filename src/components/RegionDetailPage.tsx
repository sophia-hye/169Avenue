import { useState } from 'react'
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { USMap } from './maps/USMap'
import { UKMap } from './maps/UKMap'
import { EuropeMap, EU_UNIVERSITIES as EU_UNIVERSITIES_DATA, COUNTRY_NAMES as EU_COUNTRY_NAMES } from './maps/EuropeMap'
import { AsiaPacificMap } from './maps/AsiaPacificMap'
import { US_UNIVERSITIES, STATE_NAMES, getUniversitiesByState, getStatesWithUniversities } from '../data/us-universities'

interface SimpleUniversity {
  readonly name: string
  readonly city: string
  readonly program: string
}

interface RegionData {
  readonly id: string
  readonly title: string
  readonly tag: string
  readonly description: string
  readonly longDescription: string
  readonly universities: readonly SimpleUniversity[]
  readonly image: string
}

const REGION_DATA: Record<string, RegionData> = {
  us: {
    id: 'us',
    title: 'United States',
    tag: 'Primary Hub',
    description: 'Home to the Ivy League and the world\'s most powerful STEM research institutions.',
    longDescription: 'The United States remains the gold standard for higher education, housing eight Ivy League universities and the world\'s top research institutions. Our curators maintain deep, personal relationships with admissions committees across the eastern seaboard, the West Coast innovation corridor, and the Southern academic powerhouses.',
    universities: [],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8BTKGGTi199y84Gzvt901dLx39ljnKyg6PY7jzznynDiLnFDG7cgdjRLnFRokXc9rBmOW-wKWjG5-FwxYRrsGkDQvDcbn9I4rHW2JvyBr7y-uN1_-4XX0S-mc1OOXc7KGO0Bu90_Wfi5KODz57Im4UgSkuL3AECJ2aVOtnJbBTw5OST-g9DYStsRdDAkDYlM89QxOuilKPDmiZ4eWyXW8hzdc2HdJ1CnQ-UZAxROFqjihB7sYrqh4jPG1UxwoKUZPXhKRFhtWbcA',
  },
  uk: {
    id: 'uk',
    title: 'United Kingdom',
    tag: 'Heritage Focus',
    description: 'The birthplace of academic tradition with centuries of scholarly excellence.',
    longDescription: 'The United Kingdom offers an unparalleled depth of academic heritage. Oxford and Cambridge remain the pinnacle of intellectual rigour. The Russell Group universities provide world-class research environments, while London\'s institutions offer global connectivity.',
    universities: [
      { name: 'University of Oxford', city: 'Oxford', program: 'PPE & Humanities' },
      { name: 'University of Cambridge', city: 'Cambridge', program: 'Natural Sciences' },
      { name: 'Imperial College London', city: 'London', program: 'Engineering & Medicine' },
      { name: 'UCL', city: 'London', program: 'Architecture & Social Sciences' },
      { name: 'London School of Economics', city: 'London', program: 'Economics & Political Science' },
      { name: 'University of Edinburgh', city: 'Edinburgh', program: 'Medicine & Informatics' },
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRD4s8WiP-S4rsAhbmkoJPF2lOSWSNI3Izr8dMO-hmviyQ_RRu5tkAcwHDQcUw2U4IFX21J1Z61FoKHPUyyFUSw5gWq1F1OHxQ053x8Z6l6hmSxSDJYTWrQ2GMDIjr1eER_rdf0kLk67gEuBz36NFl4oN40XtbRcfJO_SnBZnLfEDZ8ohq3dUnel-9rKOaynFCaCSpQTeGyhy0jpdA15WJzPnK6EXcAIxvrGOg8LOTW9kG8OgsRiF_Xj4LSsjibBZ6wJUuq33I-HA',
  },
  eu: {
    id: 'eu',
    title: 'Europe',
    tag: 'Modern Classics',
    description: 'A unique blend of avant-garde innovation and classical tradition across the continent.',
    longDescription: 'Continental Europe represents the convergence of centuries-old academic tradition with cutting-edge innovation. France\'s grandes ecoles, Switzerland\'s world-leading polytechnics, Germany\'s research universities, and Italy\'s design powerhouses each offer distinct pathways to excellence.',
    universities: [
      { name: 'INSEAD', city: 'Fontainebleau, France', program: 'MBA & Executive Education' },
      { name: 'HEC Paris', city: 'Paris, France', program: 'Business & Management' },
      { name: 'ETH Zurich', city: 'Zurich, Switzerland', program: 'Engineering & Technology' },
      { name: 'Bocconi University', city: 'Milan, Italy', program: 'Economics & Finance' },
      { name: 'TU Munich', city: 'Munich, Germany', program: 'Engineering & Applied Sciences' },
      { name: 'Sciences Po', city: 'Paris, France', program: 'Political Science' },
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6_vniE_nYT2P5vU-0L1Yy-RDdLTj_Jr5aFQOt9Hb9LD3L3mXQRMPC4FCICYlyn6nixlWkU9vUr6ibEigJM1y4ZZbfDaK9Nsp51nv5CCaE2x7ImWFGxqaTYaLrIVtMXQokCXfMPFEgL5yZXnWOl3nLay7fR5izTjkFs9cSKz1OjNkoqz5zVujo4Lyf3DYoPVcxXDKF2oyYIcM9-qccFouwIXCedVFP_9fAUU4XRyeVx7BcZvSdFF8dIRCPFMPZ9PZgAyApC4Wodrg',
  },
  ap: {
    id: 'ap',
    title: 'Asia-Pacific',
    tag: 'Emerging Frontiers',
    description: 'The new epicenter of global innovation redefining academic excellence.',
    longDescription: 'Asia-Pacific is a dominant force in higher education. Singapore, Hong Kong, Seoul, and Tokyo host institutions that rival their Western counterparts. China\'s rapid investment has created world-class facilities. Australia and New Zealand offer outstanding quality of life alongside rigorous academic programs.',
    universities: [
      { name: 'National University of Singapore', city: 'Singapore', program: 'Computing & Business' },
      { name: 'Seoul National University', city: 'Seoul, Korea', program: 'Engineering & Medicine' },
      { name: 'University of Tokyo', city: 'Tokyo, Japan', program: 'Science & Technology' },
      { name: 'University of Hong Kong', city: 'Hong Kong', program: 'Law & Business' },
      { name: 'Tsinghua University', city: 'Beijing, China', program: 'Engineering & CS' },
      { name: 'KAIST', city: 'Daejeon, Korea', program: 'Advanced Technology' },
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI3FMV-mLdpNBSKQATtIojxXzBzXT6-6sCkmahz74S324Bv6OLOZd1eq0HGNQeDUzbna8mopESYDNS-ikA8vZdIEdBk8dRXDpBO9oUaFCCgEooqF8gm5B2iZdQckJ4oJjS1hGKaGO7Dt4bwWCRjQn1knytQTriJl5sMhZl8iVpdKVvm8EP5oSOKk5D8_zs3X32BOnNabDomEES3uQA-_E7WLCR6F1D8cRbZihCTmE5leSTn6jR4XdMX3uhHphrRMQXBYi4U-0n_IM',
  },
}

const REGION_ORDER = ['us', 'uk', 'eu', 'ap'] as const

function USDetailSection() {
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const navigate = useNavigate()

  return (
    <>
      {/* Map */}
      <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-8">
        <div className="bg-surface-container-lowest p-8 md:p-12 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary block mb-1">
                Interactive Map
              </span>
              <p className="font-body text-sm text-on-surface-variant">
                {hoveredState
                  ? `${STATE_NAMES[hoveredState] || hoveredState} — ${getUniversitiesByState(hoveredState).length} universities — Click to explore`
                  : 'Click a state to view its top universities'
                }
              </p>
            </div>
          </div>
          <USMap
            selectedState={null}
            hoveredState={hoveredState}
            onSelectState={() => {}}
            onHoverState={setHoveredState}
            onNavigateState={(code) => navigate(`/destinations/us/${code.toLowerCase()}`)}
          />
          <div className="mt-6 text-center">
            <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant/60">
              {US_UNIVERSITIES.length} Top Universities Across {new Set(US_UNIVERSITIES.map((u) => u.state)).size} States
            </span>
          </div>
        </div>
      </section>

      {/* Overview & Top Universities */}
      <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-6 block">
              Regional Overview
            </span>
            <p className="font-body text-on-surface-variant text-lg leading-[1.9]">
              The United States remains the gold standard for higher education, housing eight Ivy League
              universities and the world's top research institutions. Our curators maintain deep, personal
              relationships with admissions committees across the eastern seaboard, the West Coast innovation
              corridor, and the Southern academic powerhouses.
            </p>
          </div>
          <div className="lg:col-span-7">
            <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-8 block">
              Top 10 Institutions
            </span>
            <div className="space-y-0">
              {US_UNIVERSITIES.slice(0, 10).map((uni) => (
                <div
                  key={uni.rank}
                  className="grid grid-cols-12 gap-4 py-5 border-b border-outline-variant/15 group hover:bg-surface-container-low/50 transition-colors px-4 -mx-4"
                >
                  <div className="col-span-1">
                    <span className="font-headline italic text-2xl text-outline-variant/40 group-hover:text-secondary transition-colors">
                      {String(uni.rank).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="col-span-6">
                    <h4 className="font-headline text-xl text-primary">{uni.name}</h4>
                  </div>
                  <div className="col-span-5 text-right">
                    <span className="font-body text-sm text-on-surface-variant">{uni.city}, {uni.state}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* States Quick Links */}
      <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-32">
        <h3 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-8">
          Browse by State
        </h3>
        <div className="flex flex-wrap gap-3">
          {getStatesWithUniversities().map((s) => (
            <Link
              key={s}
              to={`/destinations/us/${s.toLowerCase()}`}
              className="px-4 py-2 font-label text-[10px] uppercase tracking-widest border border-outline-variant/30 text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all duration-200"
            >
              {s} ({getUniversitiesByState(s).length})
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

function EuropeDetailSection({ region }: { region: RegionData }) {
  const [hoveredCountry] = useState<string | null>(null)
  const navigate = useNavigate()

  return (
    <>
      {/* Map */}
      <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-8">
        <div className="bg-surface-container-lowest p-8 md:p-12 shadow-sm">
          <div className="mb-8">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary block mb-1">
              Interactive Map
            </span>
            <p className="font-body text-sm text-on-surface-variant">
              Click a country to explore its universities
            </p>
          </div>
          <EuropeMap
            selectedCountry={hoveredCountry}
            onNavigateCountry={(id) => navigate(`/destinations/eu/${id}`)}
          />
        </div>
      </section>

      {/* Overview + Universities */}
      <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-6 block">
              Regional Overview
            </span>
            <p className="font-body text-on-surface-variant text-lg leading-[1.9]">
              {region.longDescription}
            </p>
          </div>
          <div className="lg:col-span-7">
            <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-8 block">
              Featured Institutions
            </span>
            <div className="space-y-0">
              {region.universities.map((uni, i) => (
                <div
                  key={uni.name}
                  className="grid grid-cols-12 gap-4 py-6 border-b border-outline-variant/15 group hover:bg-surface-container-low/50 transition-colors px-4 -mx-4"
                >
                  <div className="col-span-1">
                    <span className="font-headline italic text-2xl text-outline-variant/40 group-hover:text-secondary transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="col-span-5">
                    <h4 className="font-headline text-xl text-primary">{uni.name}</h4>
                  </div>
                  <div className="col-span-3">
                    <span className="font-body text-sm text-on-surface-variant">{uni.city}</span>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                      {uni.program}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Country */}
      <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-32">
        <h3 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-8">
          Browse by Country
        </h3>
        <div className="flex flex-wrap gap-3">
          {['250', '276', '756', '380', '528', '056', '724', '752', '208', '040'].map((cId) => (
            <Link
              key={cId}
              to={`/destinations/eu/${cId}`}
              className="px-4 py-2 font-label text-[10px] uppercase tracking-widest border border-outline-variant/30 text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all duration-200"
            >
              {EU_COUNTRY_NAMES[cId]} ({EU_UNIVERSITIES_DATA.filter((u) => u.countryId === cId).length})
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

function GenericDetailSection({ region }: { region: RegionData }) {
  const MapComponent = region.id === 'uk' ? UKMap : AsiaPacificMap

  return (
    <>
      <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-32">
        <div className="bg-surface-container-lowest p-8 md:p-16 shadow-sm">
          <div className="max-w-4xl mx-auto">
            <MapComponent />
          </div>
        </div>
      </section>

      <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-6 block">
              Regional Overview
            </span>
            <p className="font-body text-on-surface-variant text-lg leading-[1.9]">
              {region.longDescription}
            </p>
          </div>
          <div className="lg:col-span-7">
            <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-8 block">
              Featured Institutions
            </span>
            <div className="space-y-0">
              {region.universities.map((uni, i) => (
                <div
                  key={uni.name}
                  className="grid grid-cols-12 gap-4 py-6 border-b border-outline-variant/15 group hover:bg-surface-container-low/50 transition-colors px-4 -mx-4"
                >
                  <div className="col-span-1">
                    <span className="font-headline italic text-2xl text-outline-variant/40 group-hover:text-secondary transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="col-span-5">
                    <h4 className="font-headline text-xl text-primary">{uni.name}</h4>
                  </div>
                  <div className="col-span-3">
                    <span className="font-body text-sm text-on-surface-variant">{uni.city}</span>
                  </div>
                  <div className="col-span-3 text-right">
                    <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                      {uni.program}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function RegionDetailPage() {
  const { id } = useParams<{ id: string }>()
  const region = id ? REGION_DATA[id] : undefined

  if (!region) {
    return <Navigate to="/destinations" replace />
  }

  const currentIndex = REGION_ORDER.indexOf(region.id as typeof REGION_ORDER[number])
  const prevId = currentIndex > 0 ? REGION_ORDER[currentIndex - 1] : undefined
  const nextId = currentIndex < REGION_ORDER.length - 1 ? REGION_ORDER[currentIndex + 1] : undefined

  const pageContent = (
    <>
        {/* Back */}
        <div className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-8 md:mb-12">
          <Link to="/destinations" className="inline-flex items-center space-x-3 group">
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">All Destinations</span>
          </Link>
        </div>

        {/* Hero */}
        <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-12 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
            <div className="lg:col-span-7">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4 block">
                {region.tag}
              </span>
              <h1 className="font-headline text-4xl md:text-6xl lg:text-8xl text-primary tracking-tighter leading-none mb-6 md:mb-8">
                {region.title}
              </h1>
              <p className="font-body text-on-surface-variant text-lg leading-relaxed max-w-2xl">
                {region.description}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  alt={region.title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  src={region.image}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Region-specific content */}
        {region.id === 'us' ? <USDetailSection /> : region.id === 'eu' ? <EuropeDetailSection region={region} /> : <GenericDetailSection region={region} />}

        {/* Prev / Next */}
        <section className="border-t border-outline-variant/20 px-8 md:px-16 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {prevId ? (
              <Link to={`/destinations/${prevId}`} className="group py-16 pr-12 border-b md:border-b-0 md:border-r border-outline-variant/20">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 block">Previous</span>
                <div className="flex items-center space-x-4">
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-2 transition-transform">arrow_back</span>
                  <h4 className="font-headline text-2xl group-hover:text-secondary transition-colors">{REGION_DATA[prevId].title}</h4>
                </div>
              </Link>
            ) : <div className="py-16 border-b md:border-b-0 md:border-r border-outline-variant/20" />}
            {nextId ? (
              <Link to={`/destinations/${nextId}`} className="group py-16 pl-0 md:pl-12 text-right">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 block">Next</span>
                <div className="flex items-center justify-end space-x-4">
                  <h4 className="font-headline text-2xl group-hover:text-secondary transition-colors">{REGION_DATA[nextId].title}</h4>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </div>
              </Link>
            ) : <div className="py-16" />}
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 md:px-16 py-32 text-center bg-primary text-on-primary">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-5xl md:text-6xl italic mb-12 leading-tight">
              Begin Your Journey to {region.title}
            </h2>
            <Link
              to="/consultation"
              className="bg-surface text-primary px-16 py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500"
            >
              Book a Private Consultation
            </Link>
          </div>
        </section>
    </>
  )

  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32">{pageContent}</main>
        <Footer />
      </div>
      <MobileShell activeTab="destinations">{pageContent}</MobileShell>
      <MobileFooter />
    </div>
  )
}
