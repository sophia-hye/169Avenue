import { useParams, Link, Navigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { MidPageCTA } from './PageCTA'
import { US_UNIVERSITIES, STATE_NAMES, getUniversitiesByState, getStatesWithUniversities } from '../data/us-universities'
import { toSlug } from '../data/university-utils'
import { getStateDetail } from '../data/us-states-detail'

function GalleryImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden group ${className || ''}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
      />
    </div>
  )
}

function ImageGallery({ images, stateName }: { images: readonly string[]; stateName: string }) {
  const count = images.length

  // 2 images: side by side
  if (count === 2) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16">
        <GalleryImage src={images[0]} alt={`${stateName} 1`} className="aspect-[16/10]" />
        <GalleryImage src={images[1]} alt={`${stateName} 2`} className="aspect-[16/10]" />
      </div>
    )
  }

  // 3 images: 1 large + 2 stacked
  if (count === 3) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-16">
        <GalleryImage src={images[0]} alt={`${stateName} 1`} className="md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:h-full" />
        <GalleryImage src={images[1]} alt={`${stateName} 2`} className="aspect-[16/10]" />
        <GalleryImage src={images[2]} alt={`${stateName} 3`} className="aspect-[16/10]" />
      </div>
    )
  }

  // 4 images: 1 hero + 3 row
  if (count === 4) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-16">
        <GalleryImage src={images[0]} alt={`${stateName} 1`} className="md:col-span-3 aspect-[21/9]" />
        <GalleryImage src={images[1]} alt={`${stateName} 2`} className="aspect-[4/3]" />
        <GalleryImage src={images[2]} alt={`${stateName} 3`} className="aspect-[4/3]" />
        <GalleryImage src={images[3]} alt={`${stateName} 4`} className="aspect-[4/3]" />
      </div>
    )
  }

  // 5 images: 2 top + 3 bottom
  if (count === 5) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-16">
        <GalleryImage src={images[0]} alt={`${stateName} 1`} className="col-span-2 md:col-span-4 aspect-[16/9]" />
        <GalleryImage src={images[1]} alt={`${stateName} 2`} className="col-span-2 md:col-span-2 aspect-[16/9] md:aspect-auto md:h-full" />
        <GalleryImage src={images[2]} alt={`${stateName} 3`} className="col-span-1 md:col-span-2 aspect-[4/3]" />
        <GalleryImage src={images[3]} alt={`${stateName} 4`} className="col-span-1 md:col-span-2 aspect-[4/3]" />
        <GalleryImage src={images[4]} alt={`${stateName} 5`} className="col-span-2 md:col-span-2 aspect-[4/3]" />
      </div>
    )
  }

  // 6 images: 2 large top + 4 bottom grid
  if (count === 6) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
        <GalleryImage src={images[0]} alt={`${stateName} 1`} className="col-span-2 aspect-[16/9]" />
        <GalleryImage src={images[1]} alt={`${stateName} 2`} className="col-span-2 aspect-[16/9]" />
        <GalleryImage src={images[2]} alt={`${stateName} 3`} className="aspect-[4/3]" />
        <GalleryImage src={images[3]} alt={`${stateName} 4`} className="aspect-[4/3]" />
        <GalleryImage src={images[4]} alt={`${stateName} 5`} className="aspect-[4/3]" />
        <GalleryImage src={images[5]} alt={`${stateName} 6`} className="aspect-[4/3]" />
      </div>
    )
  }

  // 7 images: mosaic layout
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-16">
      <GalleryImage src={images[0]} alt={`${stateName} 1`} className="col-span-2 md:col-span-4 md:row-span-2 aspect-[4/3] md:aspect-auto md:h-full" />
      <GalleryImage src={images[1]} alt={`${stateName} 2`} className="md:col-span-2 aspect-[16/10]" />
      <GalleryImage src={images[2]} alt={`${stateName} 3`} className="md:col-span-2 aspect-[16/10]" />
      <GalleryImage src={images[3]} alt={`${stateName} 4`} className="md:col-span-2 aspect-[4/3]" />
      <GalleryImage src={images[4]} alt={`${stateName} 5`} className="md:col-span-2 aspect-[4/3]" />
      <GalleryImage src={images[5]} alt={`${stateName} 6`} className="md:col-span-2 aspect-[4/3]" />
      <GalleryImage src={images[6]} alt={`${stateName} 7`} className="col-span-2 md:col-span-6 aspect-[21/7]" />
    </div>
  )
}

export function StateDetailPage() {
  const { stateCode } = useParams<{ stateCode: string }>()
  const code = stateCode?.toUpperCase() || ''
  const stateName = STATE_NAMES[code]
  const universities = getUniversitiesByState(code)
  const stateDetail = getStateDetail(code)

  if (!stateName || universities.length === 0) {
    return <Navigate to="/destinations/us" replace />
  }

  // Find prev/next states that have universities
  const statesWithUnis = getStatesWithUniversities()
  const currentIdx = statesWithUnis.indexOf(code)
  const prevState = currentIdx > 0 ? statesWithUnis[currentIdx - 1] : undefined
  const nextState = currentIdx < statesWithUnis.length - 1 ? statesWithUnis[currentIdx + 1] : undefined

  const pageContent = (
    <>
        {/* Back */}
        <div className="hidden md:block px-6 md:px-16 max-w-screen-2xl mx-auto mb-8 md:mb-12">
          <Link to="/destinations/us" className="inline-flex items-center space-x-3 group">
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
              United States Map
            </span>
          </Link>
        </div>

        {/* Header */}
        <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-12 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4 block">
                {code} &middot; {universities.length} {universities.length === 1 ? 'Institution' : 'Institutions'} in Top 100
              </span>
              <h1 className="font-headline text-4xl md:text-6xl lg:text-8xl text-primary tracking-tighter leading-none">
                {stateName}
              </h1>
            </div>
            <div className="flex items-center space-x-4 pb-2">
              <span className="material-symbols-outlined text-secondary">school</span>
              <span className="font-body text-on-surface-variant text-lg">
                {universities.length} of {US_UNIVERSITIES.length} top-ranked universities
              </span>
            </div>
          </div>
        </header>

        {/* State Overview: Images + Description */}
        <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-12 md:mb-20">
          {/* Image Gallery - adaptive layout based on image count */}
          <ImageGallery images={stateDetail.images} stateName={stateName} />

          {/* Description + Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-6 block">
                About {stateName}
              </span>
              <p className="font-body text-on-surface-variant text-lg leading-[1.9]">
                {stateDetail.description}
              </p>
            </div>
            <div className="lg:col-span-5">
              <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-8 block">
                Key Highlights
              </span>
              <div className="space-y-6">
                {stateDetail.highlights.map((h, i) => (
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
        <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
          <div className="border-t border-outline-variant/20">
            {universities.map((uni, i) => (
              <Link
                key={uni.rank}
                to={`/university/${toSlug(uni.name)}`}
                className="grid grid-cols-12 gap-4 py-8 border-b border-outline-variant/15 group hover:bg-surface-container-low/50 transition-colors px-6 -mx-6"
                style={{ animation: `fadeIn 0.4s ease ${i * 0.05}s both` }}
              >
                <div className="col-span-2 md:col-span-1">
                  <span className="font-headline italic text-3xl md:text-4xl text-outline-variant/30 group-hover:text-secondary transition-colors">
                    #{uni.rank}
                  </span>
                </div>
                <div className="col-span-10 md:col-span-6">
                  <h3 className="font-headline text-xl md:text-2xl text-primary group-hover:text-secondary transition-colors mb-1">
                    {uni.name}
                  </h3>
                  <span className="font-body text-sm text-on-surface-variant">
                    {uni.city}, {uni.state}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-3 flex items-center">
                  <div className="w-full bg-surface-container-high h-1">
                    <div
                      className="bg-secondary h-1 transition-all duration-700"
                      style={{ width: `${Math.max(10, 100 - uni.rank)}%` }}
                    />
                  </div>
                </div>
                <div className="col-span-12 md:col-span-2 flex items-center justify-end">
                  <span className="inline-flex items-center space-x-2 font-label text-[10px] uppercase tracking-widest text-secondary group-hover:text-primary transition-colors">
                    <span>View</span>
                    <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <MidPageCTA />

        {/* Other States Quick Links */}
        <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-12 md:mb-20">
          <h3 className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-8">
            Explore Other States
          </h3>
          <div className="flex flex-wrap gap-3">
            {statesWithUnis.map((s) => (
              <Link
                key={s}
                to={`/destinations/us/${s.toLowerCase()}`}
                className={`px-4 py-2 font-label text-[10px] uppercase tracking-widest transition-all duration-200 ${
                  s === code
                    ? 'bg-primary text-on-primary'
                    : 'border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
                }`}
              >
                {s}
              </Link>
            ))}
          </div>
        </section>

        {/* Prev / Next */}
        <section className="border-t border-outline-variant/20 px-8 md:px-16 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {prevState ? (
              <Link
                to={`/destinations/us/${prevState.toLowerCase()}`}
                className="group py-16 pr-12 border-b md:border-b-0 md:border-r border-outline-variant/20"
              >
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 block">
                  Previous
                </span>
                <div className="flex items-center space-x-4">
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-2 transition-transform">arrow_back</span>
                  <div>
                    <h4 className="font-headline text-2xl group-hover:text-secondary transition-colors">
                      {STATE_NAMES[prevState]}
                    </h4>
                    <span className="font-label text-[10px] text-secondary">
                      {getUniversitiesByState(prevState).length} universities
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="py-16 border-b md:border-b-0 md:border-r border-outline-variant/20" />
            )}
            {nextState ? (
              <Link
                to={`/destinations/us/${nextState.toLowerCase()}`}
                className="group py-16 pl-0 md:pl-12 text-right"
              >
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 block">
                  Next
                </span>
                <div className="flex items-center justify-end space-x-4">
                  <div>
                    <h4 className="font-headline text-2xl group-hover:text-secondary transition-colors">
                      {STATE_NAMES[nextState]}
                    </h4>
                    <span className="font-label text-[10px] text-secondary">
                      {getUniversitiesByState(nextState).length} universities
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
                </div>
              </Link>
            ) : (
              <div className="py-16" />
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 md:px-16 py-32 text-center bg-primary text-on-primary">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-5xl md:text-6xl italic mb-12 leading-tight">
              Study in {stateName}
            </h2>
            <p className="font-body text-zinc-400 text-lg mb-16 max-w-xl mx-auto">
              Our curators will guide you through the admissions process for {stateName}'s top institutions.
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
