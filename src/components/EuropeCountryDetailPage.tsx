import { useParams, Link, Navigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { MidPageCTA } from './PageCTA'
import { EU_UNIVERSITIES, COUNTRY_NAMES } from './maps/EuropeMap'
import { getCountryDetail } from '../data/eu-countries-detail'
import { toSlug } from '../data/university-utils'

function GalleryImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden group ${className || ''}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover group-hover:grayscale transition-all duration-700 group-hover:scale-105"
      />
    </div>
  )
}

function ImageGallery({ images, name }: { images: readonly string[]; name: string }) {
  const count = images.length

  if (count <= 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16">
        {images.map((src, i) => (
          <GalleryImage key={i} src={src} alt={`${name} ${i + 1}`} className="aspect-[16/10]" />
        ))}
      </div>
    )
  }

  if (count === 3) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-16">
        <GalleryImage src={images[0]} alt={`${name} 1`} className="md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:h-full" />
        <GalleryImage src={images[1]} alt={`${name} 2`} className="aspect-[16/10]" />
        <GalleryImage src={images[2]} alt={`${name} 3`} className="aspect-[16/10]" />
      </div>
    )
  }

  if (count === 4) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-16">
        <GalleryImage src={images[0]} alt={`${name} 1`} className="md:col-span-3 aspect-[21/9]" />
        <GalleryImage src={images[1]} alt={`${name} 2`} className="aspect-[4/3]" />
        <GalleryImage src={images[2]} alt={`${name} 3`} className="aspect-[4/3]" />
        <GalleryImage src={images[3]} alt={`${name} 4`} className="aspect-[4/3]" />
      </div>
    )
  }

  // 5+
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-16">
      <GalleryImage src={images[0]} alt={`${name} 1`} className="col-span-2 md:col-span-4 aspect-[16/9]" />
      <GalleryImage src={images[1]} alt={`${name} 2`} className="col-span-2 md:col-span-2 aspect-[16/9] md:aspect-auto md:h-full" />
      {images.slice(2).map((src, i) => (
        <GalleryImage key={i + 2} src={src} alt={`${name} ${i + 3}`} className="col-span-1 md:col-span-2 aspect-[4/3]" />
      ))}
    </div>
  )
}

// Country IDs that have universities, in display order
const COUNTRY_ORDER = ['250', '276', '756', '380', '528', '056', '724', '752', '208', '040']

export function EuropeCountryDetailPage() {
  const { countryId } = useParams<{ countryId: string }>()
  const id = countryId || ''
  const countryName = COUNTRY_NAMES[id]
  const universities = EU_UNIVERSITIES.filter((u) => u.countryId === id)
  const detail = getCountryDetail(id)

  if (!countryName || universities.length === 0) {
    return <Navigate to="/destinations/eu" replace />
  }

  const currentIdx = COUNTRY_ORDER.indexOf(id)
  const prevId = currentIdx > 0 ? COUNTRY_ORDER[currentIdx - 1] : undefined
  const nextId = currentIdx < COUNTRY_ORDER.length - 1 ? COUNTRY_ORDER[currentIdx + 1] : undefined

  const pageContent = (
    <>
        {/* Back */}
        <div className="hidden md:block px-6 md:px-16 max-w-screen-2xl mx-auto mb-8 md:mb-12">
          <Link to="/destinations/eu" className="inline-flex items-center space-x-3 group">
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
              Europe Map
            </span>
          </Link>
        </div>

        {/* Header */}
        <header className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4 block">
                Europe &middot; {universities.length} {universities.length === 1 ? 'Institution' : 'Institutions'}
              </span>
              <h1 className="font-headline text-6xl md:text-8xl text-primary tracking-tighter leading-none">
                {countryName}
              </h1>
            </div>
            <div className="flex items-center space-x-4 pb-2">
              <span className="material-symbols-outlined text-secondary">school</span>
              <span className="font-body text-on-surface-variant text-lg">
                {universities.length} featured universities
              </span>
            </div>
          </div>
        </header>

        {/* Image Gallery + Description */}
        <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-20">
          <ImageGallery images={detail.images} name={countryName} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-6 block">
                About {countryName}
              </span>
              <p className="font-body text-on-surface-variant text-lg leading-[1.9]">
                {detail.description}
              </p>
            </div>
            <div className="lg:col-span-5">
              <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-8 block">
                Key Highlights
              </span>
              <div className="space-y-6">
                {detail.highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <span className="font-headline italic text-2xl text-secondary/40 leading-none mt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="border-b border-outline-variant/15 pb-6 flex-1">
                      <span className="font-headline text-lg text-primary">{h}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* University List */}
        <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-32">
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-2">Universities</h2>
          <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-10 block">
            Ranked by institutional prestige
          </span>
          <div className="border-t border-outline-variant/20">
            {universities.map((uni, i) => (
              <Link
                key={uni.name}
                to={`/university/${toSlug(uni.name)}`}
                className="grid grid-cols-12 gap-4 py-8 border-b border-outline-variant/15 group hover:bg-surface-container-low/50 transition-colors px-6 -mx-6"
                style={{ animation: `fadeIn 0.4s ease ${i * 0.05}s both` }}
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="font-headline italic text-3xl md:text-4xl text-outline-variant/30 group-hover:text-secondary transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-6">
                  <h3 className="font-headline text-xl md:text-2xl text-primary group-hover:text-secondary transition-colors mb-1">{uni.name}</h3>
                  <span className="font-body text-sm text-on-surface-variant">{uni.city}, {uni.country}</span>
                </div>
                <div className="col-span-12 md:col-span-3 flex items-center">
                  <div className="w-full bg-surface-container-high h-1">
                    <div
                      className="bg-secondary h-1 transition-all duration-700"
                      style={{ width: `${Math.max(20, 100 - i * 12)}%` }}
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2 flex items-center justify-end">
                  <span className="inline-flex items-center space-x-2 font-label text-[10px] uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">
                    <span>View</span>
                    <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <MidPageCTA />

        {/* Other Countries Quick Links */}
        <section className="px-8 md:px-16 max-w-screen-2xl mx-auto mb-20">
          <h3 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-8">
            Explore Other Countries
          </h3>
          <div className="flex flex-wrap gap-3">
            {COUNTRY_ORDER.map((cId) => (
              <Link
                key={cId}
                to={`/destinations/eu/${cId}`}
                className={`px-4 py-2 font-label text-[10px] uppercase tracking-widest transition-all duration-200 ${
                  cId === id
                    ? 'bg-primary text-on-primary'
                    : 'border border-outline-variant/30 text-on-surface-variant hover:bg-primary hover:text-on-primary'
                }`}
              >
                {COUNTRY_NAMES[cId]} ({EU_UNIVERSITIES.filter((u) => u.countryId === cId).length})
              </Link>
            ))}
          </div>
        </section>

        {/* Prev / Next */}
        <section className="border-t border-outline-variant/20 px-8 md:px-16 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {prevId ? (
              <Link to={`/destinations/eu/${prevId}`} className="group py-16 pr-12 border-b md:border-b-0 md:border-r border-outline-variant/20">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 block">Previous</span>
                <div className="flex items-center space-x-4">
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-2 transition-transform">arrow_back</span>
                  <div>
                    <h4 className="font-headline text-2xl group-hover:text-secondary transition-colors">{COUNTRY_NAMES[prevId]}</h4>
                    <span className="font-label text-[10px] text-secondary">{EU_UNIVERSITIES.filter((u) => u.countryId === prevId).length} universities</span>
                  </div>
                </div>
              </Link>
            ) : <div className="py-16 border-b md:border-b-0 md:border-r border-outline-variant/20" />}
            {nextId ? (
              <Link to={`/destinations/eu/${nextId}`} className="group py-16 pl-0 md:pl-12 text-right">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 block">Next</span>
                <div className="flex items-center justify-end space-x-4">
                  <div>
                    <h4 className="font-headline text-2xl group-hover:text-secondary transition-colors">{COUNTRY_NAMES[nextId]}</h4>
                    <span className="font-label text-[10px] text-secondary">{EU_UNIVERSITIES.filter((u) => u.countryId === nextId).length} universities</span>
                  </div>
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
              Study in {countryName}
            </h2>
            <p className="font-body text-zinc-400 text-lg mb-16 max-w-xl mx-auto">
              Our curators will guide you through the admissions process for {countryName}'s top institutions.
            </p>
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
      <MobileShell>{pageContent}</MobileShell>
      <MobileFooter />
    </div>
  )
}
