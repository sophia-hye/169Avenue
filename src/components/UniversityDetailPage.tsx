import { useParams, Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { getUniversityBySlug } from '../data/university-utils'
import { getUniversityStats } from '../data/university-data'

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-surface-container-low p-5 md:p-7 flex flex-col gap-2">
      <span
        className="material-symbols-outlined text-secondary text-xl"
        style={{ fontVariationSettings: "'wght' 200" }}
      >
        {icon}
      </span>
      <p className="font-label text-[9px] md:text-[10px] uppercase tracking-widest text-on-surface-variant">{label}</p>
      <p className="font-headline text-base md:text-xl text-primary leading-tight">{value}</p>
    </div>
  )
}

function PhotoGallery({ images, name }: { images: readonly string[]; name: string }) {
  if (images.length === 0) return null
  const [main, ...rest] = images

  return (
    <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
      <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-4 md:mb-6 block">
        Campus Gallery
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="md:col-span-2 overflow-hidden group aspect-[16/10] bg-surface-container">
          <img
            src={main}
            alt={`${name} campus`}
            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105"
          />
        </div>
        <div className="grid grid-rows-2 gap-3">
          {rest.map((img, i) => (
            <div key={i} className="overflow-hidden group aspect-[4/3] bg-surface-container">
              <img
                src={img}
                alt={`${name} ${i + 2}`}
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function UniversityContent({ slug }: { slug: string }) {
  const uni = getUniversityBySlug(slug)

  if (!uni) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 gap-6">
        <span className="material-symbols-outlined text-5xl text-outline-variant">search_off</span>
        <h1 className="font-headline text-3xl text-primary">University not found</h1>
        <Link to="/field" className="font-label text-xs uppercase tracking-widest text-secondary hover:underline">
          Back to Fields
        </Link>
      </div>
    )
  }

  const stats = getUniversityStats(slug, uni.country)
  const topRank = Math.min(...uni.fields.map((f) => f.rank))

  return (
    <>
      {/* Back */}
      <div className="hidden md:block px-6 md:px-16 max-w-screen-2xl mx-auto pt-6 md:pt-10 mb-6 md:mb-10">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 group font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60 hover:text-secondary transition-colors"
        >
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          Back
        </button>
      </div>

      {/* Hero */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-8 md:mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="md:col-span-8">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-3 block">
              {uni.city}, {uni.country} · Est. {stats.founded}
            </span>
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-none mb-6">
              {uni.name}
            </h1>
            <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
              {stats.description}
            </p>
          </div>
          <div className="md:col-span-4 flex md:flex-col md:items-end gap-4">
            <div className="flex items-baseline gap-2">
              <span className="font-headline italic text-5xl md:text-7xl text-secondary/30">#{topRank}</span>
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Top Rank</span>
            </div>
            <Link
              to="/consultation"
              className="inline-block bg-primary text-on-primary px-6 md:px-8 py-3 md:py-4 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95"
            >
              Inquire
            </Link>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
        <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-4 md:mb-6 block">
          Key Facts
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon="groups" label="Total Students" value={stats.students} />
          <StatCard icon="school" label="Annual Tuition" value={stats.tuition} />
          <StatCard icon="apartment" label="Room & Board" value={stats.roomBoard} />
          <StatCard icon="how_to_reg" label="Acceptance Rate" value={stats.acceptance} />
        </div>
      </section>

      {/* Photo Gallery */}
      <PhotoGallery images={stats.images} name={uni.name} />

      {/* Divider */}
      <div className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-14">
        <div className="h-px bg-outline-variant/20" />
      </div>

      {/* Field Rankings */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
        <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold mb-6 md:mb-8 block">
          Global Rankings by Discipline
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {uni.fields.map(({ field, rank }) => (
            <Link
              key={field.id}
              to="/field"
              className="group flex items-center gap-4 p-5 md:p-6 border border-outline-variant/20 hover:border-secondary/40 hover:bg-surface-container-low/50 transition-all duration-300"
            >
              <span
                className="material-symbols-outlined text-2xl text-secondary/60 group-hover:text-secondary transition-colors"
                style={{ fontVariationSettings: "'wght' 200" }}
              >
                {field.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-headline text-base md:text-lg text-primary truncate">{field.name}</p>
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Rank #{rank}</p>
              </div>
              <span className="font-headline italic text-3xl text-outline-variant/30 group-hover:text-secondary/40 transition-colors shrink-0">
                {String(rank).padStart(2, '0')}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Location */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
        <div className="bg-surface-container-low p-6 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10">
          <span className="material-symbols-outlined text-3xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            location_on
          </span>
          <div>
            <p className="font-headline text-xl md:text-2xl text-primary">{uni.city}</p>
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">{uni.country}</p>
          </div>
          <div className="md:ml-auto font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50">
            {uni.lat.toFixed(3)}°{uni.lat >= 0 ? 'N' : 'S'}, {Math.abs(uni.lon).toFixed(3)}°{uni.lon < 0 ? 'W' : 'E'}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto pb-20 md:pb-40">
        <div className="bg-primary text-on-primary p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-1">
            <h2 className="font-headline text-2xl md:text-3xl italic mb-3">
              Pursue {uni.name}
            </h2>
            <p className="font-body text-on-primary/70 text-sm md:text-base max-w-xl leading-relaxed">
              Our curators have deep expertise navigating the admissions process for this institution. Begin your private consultation today.
            </p>
          </div>
          <Link
            to="/consultation"
            className="shrink-0 bg-surface text-primary px-8 py-4 font-label text-xs uppercase tracking-widest hover:bg-secondary hover:text-surface transition-all duration-300 active:scale-95"
          >
            Begin Consultation
          </Link>
        </div>
      </section>
    </>
  )
}

export function UniversityDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()

  return (
    <div className="bg-surface selection:bg-secondary/30">
      {/* Desktop */}
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32">
          <UniversityContent slug={slug} />
        </main>
        <Footer />
      </div>

      {/* Mobile */}
      <MobileShell>
        <UniversityContent slug={slug} />
      </MobileShell>
      <MobileFooter />
    </div>
  )
}
