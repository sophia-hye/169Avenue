import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { FIELDS, type Field, type FieldUniversity } from '../data/fields'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

interface GeoFeature {
  type: 'Feature'
  id: string
  properties: { name: string }
  geometry: GeoJSON.Geometry
}

function FieldMap({ universities }: { universities: readonly FieldUniversity[] }) {
  const [countries, setCountries] = useState<GeoFeature[]>([])
  const [hoveredUni, setHoveredUni] = useState<FieldUniversity | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const projection = useMemo(() => geoNaturalEarth1().scale(170).translate([480, 300]), [])
  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection])

  useEffect(() => {
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((topology: Topology) => {
        const geom = topology.objects.countries as GeometryCollection
        setCountries(feature(topology, geom).features as unknown as GeoFeature[])
      })
  }, [])

  const projected = useMemo(() =>
    universities.map((uni) => {
      const coords = projection([uni.lon, uni.lat])
      return coords ? { ...uni, x: coords[0], y: coords[1] } : null
    }).filter(Boolean) as (FieldUniversity & { x: number; y: number })[],
    [universities, projection]
  )

  if (countries.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 md:py-32">
        <span className="font-label text-sm text-on-surface-variant tracking-widest uppercase animate-pulse">Loading Map...</span>
      </div>
    )
  }

  return (
    <svg ref={svgRef} viewBox="0 0 960 500" className="w-full h-auto" style={{ overflow: 'hidden' }}>
      <defs>
        <radialGradient id="field-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#775a19" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#775a19" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="960" height="500" fill="#f8f7f5" />
      {countries.map((c) => {
        const d = pathGenerator(c.geometry)
        return d ? <path key={c.id} d={d} fill="#e9e8e6" stroke="#d4d3d1" strokeWidth="0.4" /> : null
      })}
      {projected.map((uni) => {
        const isHovered = hoveredUni?.rank === uni.rank
        return (
          <g key={uni.rank} style={{ cursor: 'pointer' }} onMouseEnter={() => setHoveredUni(uni)} onMouseLeave={() => setHoveredUni(null)}>
            <circle cx={uni.x} cy={uni.y} r={isHovered ? 16 : 10} fill="url(#field-glow)" />
            <circle cx={uni.x} cy={uni.y} r={isHovered ? 6 : 4} fill={isHovered ? '#faf9f7' : '#775a19'} stroke={isHovered ? '#5d4201' : 'none'} strokeWidth={isHovered ? 2 : 0} style={{ transition: 'all 0.2s ease' }} />
            {!isHovered && <text x={uni.x} y={uni.y - 10} textAnchor="middle" fontSize="7" fontWeight="700" fill="#775a19" className="font-label" style={{ pointerEvents: 'none' }}>#{uni.rank}</text>}
          </g>
        )
      })}
      {hoveredUni && (() => {
        const uni = projected.find((u) => u.rank === hoveredUni.rank)
        if (!uni) return null
        const tooltipW = 240
        const isRight = uni.x > 580
        let rectX = isRight ? uni.x - tooltipW - 16 : uni.x + 16
        if (rectX < 4) rectX = 4
        if (rectX + tooltipW > 956) rectX = 956 - tooltipW
        const anchor = isRight ? 'end' : 'start'
        const textX = isRight ? rectX + tooltipW - 8 : rectX + 8
        const rectY = Math.max(4, uni.y - 32)
        return (
          <g style={{ pointerEvents: 'none' }}>
            <rect x={rectX} y={rectY} width={tooltipW} height="42" fill="#000101" opacity="0.92" />
            <text x={textX} y={rectY + 16} textAnchor={anchor} fontSize="10" fontWeight="700" fill="#faf9f7" className="font-label" style={{ letterSpacing: '0.05em' }}>#{uni.rank} {uni.name}</text>
            <text x={textX} y={rectY + 31} textAnchor={anchor} fontSize="8" fill="#c5c6ca" className="font-label" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>{uni.city}, {uni.country}</text>
          </g>
        )
      })()}
    </svg>
  )
}

function FieldContent({ selectedField, setSelectedField }: { selectedField: Field; setSelectedField: (f: Field) => void }) {
  return (
    <>
      {/* Header */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="md:col-span-7">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">Academic Excellence by Discipline</span>
            <h1 className="font-headline text-4xl md:text-6xl lg:text-8xl text-primary tracking-tighter leading-none">
              Fields of <br /><span className="italic">Study</span>
            </h1>
          </div>
          <div className="md:col-span-5">
            <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed md:border-l md:border-outline-variant/30 md:pl-8">
              Explore the world's top-ranked universities by academic discipline.
            </p>
          </div>
        </div>
      </header>

      {/* Field Selector */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-8 md:mb-12">
        <div className="flex flex-wrap gap-2 md:gap-3">
          {FIELDS.map((field) => (
            <button
              key={field.id}
              onClick={() => setSelectedField(field)}
              className={`flex items-center space-x-2 md:space-x-3 px-4 md:px-6 py-2 md:py-3 font-label text-[10px] md:text-[11px] uppercase tracking-widest transition-all duration-300 ${
                selectedField.id === field.id
                  ? 'bg-primary text-on-primary'
                  : 'border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-sm md:text-base" style={selectedField.id === field.id ? {} : { fontVariationSettings: "'wght' 200" }}>{field.icon}</span>
              <span className="hidden sm:inline">{field.name}</span>
              <span className="sm:hidden">{field.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Field Info */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-6 md:mb-8">
        <div key={selectedField.id} style={{ animation: 'fadeIn 0.4s ease' }}>
          <div className="flex items-center space-x-4 mb-4">
            <span className="material-symbols-outlined text-secondary text-2xl md:text-3xl">{selectedField.icon}</span>
            <h2 className="font-headline text-2xl md:text-3xl lg:text-4xl text-primary">{selectedField.name}</h2>
          </div>
          <p className="font-body text-on-surface-variant text-sm md:text-lg max-w-3xl mb-6 md:mb-8">{selectedField.description}</p>
        </div>
      </section>

      {/* Map */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
        <div className="bg-surface-container-lowest p-4 md:p-12 shadow-sm">
          <div key={selectedField.id} style={{ animation: 'fadeIn 0.5s ease' }}>
            <FieldMap universities={selectedField.universities} />
          </div>
          <div className="mt-4 md:mt-6 text-center">
            <span className="font-label text-[9px] uppercase tracking-widest text-on-surface-variant/60">
              Top {selectedField.universities.length} in {selectedField.name}
            </span>
          </div>
        </div>
      </section>

      {/* Rankings */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-40">
        <div key={selectedField.id} style={{ animation: 'fadeIn 0.4s ease' }}>
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
        </div>
      </section>
    </>
  )
}

export function FieldPage() {
  const [selectedField, setSelectedField] = useState<Field>(FIELDS[0])

  return (
    <div className="bg-surface selection:bg-secondary/30">
      {/* Desktop */}
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32">
          <FieldContent selectedField={selectedField} setSelectedField={setSelectedField} />
        </main>
        <Footer />
      </div>

      {/* Mobile */}
      <MobileShell activeTab="field">
        <FieldContent selectedField={selectedField} setSelectedField={setSelectedField} />
      </MobileShell>
      <MobileFooter />
    </div>
  )
}
