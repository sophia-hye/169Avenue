import { useEffect, useState, useMemo, useRef } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'

interface GeoFeature {
  type: 'Feature'
  id: string
  properties: { name: string }
  geometry: GeoJSON.Geometry
}

interface University {
  readonly name: string
  readonly city: string
  readonly country: string
  readonly countryId: string
  readonly lon: number
  readonly lat: number
}

// Numeric world-atlas country IDs → display names (countries with universities)
const AP_COUNTRY_NAMES: Record<string, string> = {
  '702': 'Singapore',
  '410': 'South Korea',
  '392': 'Japan',
  '156': 'China',
  '036': 'Australia',
  '554': 'New Zealand',
  '356': 'India',
}

const AP_UNIVERSITIES: readonly University[] = [
  { name: 'National University of Singapore',   city: 'Singapore',  country: 'Singapore',   countryId: '702', lon: 103.776, lat: 1.296  },
  { name: 'Nanyang Technological University',    city: 'Singapore',  country: 'Singapore',   countryId: '702', lon: 103.683, lat: 1.348  },
  { name: 'Seoul National University',           city: 'Seoul',      country: 'South Korea', countryId: '410', lon: 126.952, lat: 37.460 },
  { name: 'KAIST',                               city: 'Daejeon',    country: 'South Korea', countryId: '410', lon: 127.360, lat: 36.374 },
  { name: 'Yonsei University',                   city: 'Seoul',      country: 'South Korea', countryId: '410', lon: 126.938, lat: 37.564 },
  { name: 'Korea University',                    city: 'Seoul',      country: 'South Korea', countryId: '410', lon: 127.032, lat: 37.589 },
  { name: 'University of Tokyo',                 city: 'Tokyo',      country: 'Japan',       countryId: '392', lon: 139.762, lat: 35.713 },
  { name: 'Kyoto University',                    city: 'Kyoto',      country: 'Japan',       countryId: '392', lon: 135.781, lat: 35.026 },
  { name: 'Osaka University',                    city: 'Osaka',      country: 'Japan',       countryId: '392', lon: 135.521, lat: 34.822 },
  { name: 'Tokyo Institute of Technology',       city: 'Tokyo',      country: 'Japan',       countryId: '392', lon: 139.683, lat: 35.604 },
  { name: 'University of Hong Kong',             city: 'Hong Kong',  country: 'China',       countryId: '156', lon: 114.138, lat: 22.283 },
  { name: 'Chinese University of Hong Kong',     city: 'Hong Kong',  country: 'China',       countryId: '156', lon: 114.206, lat: 22.419 },
  { name: 'Tsinghua University',                 city: 'Beijing',    country: 'China',       countryId: '156', lon: 116.326, lat: 40.000 },
  { name: 'Peking University',                   city: 'Beijing',    country: 'China',       countryId: '156', lon: 116.310, lat: 39.993 },
  { name: 'Fudan University',                    city: 'Shanghai',   country: 'China',       countryId: '156', lon: 121.505, lat: 31.298 },
  { name: 'Zhejiang University',                 city: 'Hangzhou',   country: 'China',       countryId: '156', lon: 120.086, lat: 30.264 },
  { name: 'University of Melbourne',             city: 'Melbourne',  country: 'Australia',   countryId: '036', lon: 144.961, lat: -37.798 },
  { name: 'University of Sydney',                city: 'Sydney',     country: 'Australia',   countryId: '036', lon: 151.187, lat: -33.889 },
  { name: 'Australian National University',      city: 'Canberra',   country: 'Australia',   countryId: '036', lon: 149.119, lat: -35.278 },
  { name: 'University of Queensland',            city: 'Brisbane',   country: 'Australia',   countryId: '036', lon: 153.013, lat: -27.497 },
  { name: 'University of Auckland',              city: 'Auckland',   country: 'New Zealand', countryId: '554', lon: 174.769, lat: -36.852 },
  { name: 'Indian Institute of Technology Bombay', city: 'Mumbai',   country: 'India',       countryId: '356', lon: 72.916,  lat: 19.132  },
  { name: 'Indian Institute of Science',         city: 'Bangalore',  country: 'India',       countryId: '356', lon: 77.569,  lat: 13.021  },
]

// All AP countries to render on map
const AP_COUNTRY_IDS = [
  '156', '392', '410', '408', '158', '702', '458', '360', '764',
  '704', '608', '036', '554', '356', '144', '050', '104', '418',
  '116', '496', '586', '524',
]

// Context countries (muted background)
const CONTEXT_IDS = ['643', '398', '860']

interface AsiaPacificMapProps {
  selectedCountry?: string | null
  onSelectCountry?: (id: string) => void
  onNavigateCountry?: (id: string) => void
}

export function AsiaPacificMap({ selectedCountry = null, onSelectCountry, onNavigateCountry }: AsiaPacificMapProps) {
  const [apFeatures, setApFeatures] = useState<GeoFeature[]>([])
  const [contextFeatures, setContextFeatures] = useState<GeoFeature[]>([])
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [hoveredUni, setHoveredUni] = useState<University | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const projection = useMemo(() =>
    geoMercator().center([115, 15]).scale(420).translate([400, 350]),
    []
  )
  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection])

  useEffect(() => {
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((topology: Topology) => {
        const geom = topology.objects.countries as GeometryCollection
        const allFeatures = feature(topology, geom).features as unknown as GeoFeature[]
        setApFeatures(allFeatures.filter((f) => AP_COUNTRY_IDS.includes(f.id)))
        setContextFeatures(allFeatures.filter((f) => CONTEXT_IDS.includes(f.id)))
      })
  }, [])

  const projectedUnis = useMemo(() =>
    AP_UNIVERSITIES.map((uni) => {
      const coords = projection([uni.lon, uni.lat])
      return coords ? { ...uni, x: coords[0], y: coords[1] } : null
    }).filter(Boolean) as (University & { x: number; y: number })[],
    [projection]
  )

  const hasUnis = (countryId: string) => AP_UNIVERSITIES.some((u) => u.countryId === countryId)

  const getCountryStyle = (countryId: string): React.CSSProperties => {
    const isSelected = selectedCountry === countryId
    const isHovered = hoveredCountry === countryId && !isSelected
    const hasUniversities = hasUnis(countryId)
    const anyActive = selectedCountry || hoveredCountry
    const dimmed = anyActive && !isSelected && !isHovered

    return {
      fill: isSelected ? '#775a19' : isHovered ? '#b8963e' : hasUniversities ? '#e3e2e0' : '#efeeec',
      stroke: isSelected ? '#5d4201' : isHovered ? '#775a19' : '#a8a9ac',
      strokeWidth: isSelected ? 1.8 : isHovered ? 1.2 : 0.8,
      cursor: hasUniversities ? 'pointer' : 'default',
      opacity: dimmed ? 0.3 : 1,
      transition: 'fill 0.25s ease, stroke 0.25s ease, opacity 0.3s ease',
      filter: isHovered ? 'drop-shadow(0 3px 6px rgba(0,0,0,0.12)) brightness(1.02)' : 'none',
    }
  }

  if (apFeatures.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <span className="font-label text-sm text-on-surface-variant tracking-widest uppercase animate-pulse">
          Loading Map...
        </span>
      </div>
    )
  }

  const activeCountryId = hoveredCountry || selectedCountry

  return (
    <svg ref={svgRef} viewBox="0 0 800 700" className="w-full h-auto" style={{ overflow: 'hidden' }}>
      <defs>
        <radialGradient id="ap-uni-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#775a19" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#775a19" stopOpacity="0" />
        </radialGradient>
        <clipPath id="ap-clip">
          <rect x="0" y="0" width="800" height="700" />
        </clipPath>
      </defs>

      <rect x="0" y="0" width="800" height="700" fill="#f8f7f5" />

      {/* Context countries */}
      <g clipPath="url(#ap-clip)">
        {contextFeatures.map((f) => {
          const d = pathGenerator(f.geometry)
          if (!d) return null
          return <path key={f.id} d={d} fill="#f0efed" stroke="#e3e2e0" strokeWidth="0.5" style={{ pointerEvents: 'none' }} />
        })}
      </g>

      {/* AP countries */}
      <g clipPath="url(#ap-clip)">
        {apFeatures.map((f) => {
          const d = pathGenerator(f.geometry)
          if (!d) return null
          return (
            <path
              key={f.id}
              d={d}
              style={getCountryStyle(f.id)}
              onClick={() => {
                if (hasUnis(f.id)) {
                  if (onNavigateCountry) {
                    onNavigateCountry(f.id)
                  } else if (onSelectCountry) {
                    onSelectCountry(f.id)
                  }
                }
              }}
              onMouseEnter={() => setHoveredCountry(f.id)}
              onMouseLeave={() => setHoveredCountry(null)}
            />
          )
        })}
      </g>

      {/* Country labels on hover/select */}
      {apFeatures.map((f) => {
        const isActive = selectedCountry === f.id || hoveredCountry === f.id
        if (!isActive || !AP_COUNTRY_NAMES[f.id]) return null
        const centroid = pathGenerator.centroid(f.geometry)
        if (!centroid || isNaN(centroid[0])) return null
        return (
          <text
            key={`label-${f.id}`}
            x={centroid[0]}
            y={centroid[1]}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="10"
            fontWeight="700"
            fill={selectedCountry === f.id ? '#fff' : '#000101'}
            className="font-label"
            style={{ pointerEvents: 'none', letterSpacing: '0.15em', transition: 'fill 0.3s ease' }}
          >
            {AP_COUNTRY_NAMES[f.id]}
          </text>
        )
      })}

      {/* University dots */}
      {projectedUnis.map((uni) => {
        const isInCountry = selectedCountry === uni.countryId
        const countryHovered = hoveredCountry === uni.countryId
        const visible = !selectedCountry || isInCountry
        const highlight = isInCountry || countryHovered
        const isUniHovered = hoveredUni?.name === uni.name

        return (
          <g
            key={uni.name}
            style={{
              cursor: 'pointer',
              opacity: visible ? 1 : 0.1,
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={() => setHoveredUni(uni)}
            onMouseLeave={() => setHoveredUni(null)}
          >
            <circle cx={uni.x} cy={uni.y} r={isUniHovered ? 14 : highlight ? 10 : 8} fill="url(#ap-uni-glow)" />
            <circle
              cx={uni.x}
              cy={uni.y}
              r={isUniHovered ? 5 : highlight ? 4 : 3}
              fill={isUniHovered || isInCountry ? '#faf9f7' : '#775a19'}
              stroke={isUniHovered || isInCountry ? '#5d4201' : 'none'}
              strokeWidth={isUniHovered ? 2 : isInCountry ? 1.2 : 0}
              style={{ transition: 'all 0.2s ease' }}
            />
          </g>
        )
      })}

      {/* University tooltip */}
      {hoveredUni && (() => {
        const uni = projectedUnis.find((u) => u.name === hoveredUni.name)
        if (!uni) return null
        const tooltipW = 250
        const isRight = uni.x > 480
        let rectX = isRight ? uni.x - tooltipW - 18 : uni.x + 18
        if (rectX < 4) rectX = 4
        if (rectX + tooltipW > 796) rectX = 796 - tooltipW
        const anchor = isRight ? 'end' : 'start'
        const textX = isRight ? rectX + tooltipW - 8 : rectX + 8
        const rectY = Math.max(4, uni.y - 30)

        return (
          <g style={{ pointerEvents: 'none' }}>
            <rect x={rectX} y={rectY} width={tooltipW} height="38" fill="#000101" opacity="0.92" />
            <text x={textX} y={rectY + 16} textAnchor={anchor} fontSize="10" fontWeight="700" fill="#faf9f7" className="font-label" style={{ letterSpacing: '0.05em' }}>{uni.name}</text>
            <text x={textX} y={rectY + 29} textAnchor={anchor} fontSize="8" fill="#c5c6ca" className="font-label" style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}>{uni.city}, {uni.country}</text>
          </g>
        )
      })()}

      {/* Country info tooltip */}
      {activeCountryId && !hoveredUni && (() => {
        const f = apFeatures.find((feat) => feat.id === activeCountryId)
        if (!f) return null
        const centroid = pathGenerator.centroid(f.geometry)
        if (!centroid || isNaN(centroid[0])) return null
        const uniCount = AP_UNIVERSITIES.filter((u) => u.countryId === activeCountryId).length
        if (uniCount === 0) return null
        const tooltipW = 180
        let rectX = centroid[0] - tooltipW / 2
        if (rectX < 4) rectX = 4
        if (rectX + tooltipW > 796) rectX = 796 - tooltipW
        const rectY = Math.max(4, centroid[1] + 18)

        return (
          <g style={{ pointerEvents: 'none' }}>
            <rect x={rectX} y={rectY} width={tooltipW} height="30" fill="#000101" opacity="0.85" />
            <text x={rectX + tooltipW / 2} y={rectY + 19} textAnchor="middle" fontSize="9" fill="#faf9f7" className="font-label" style={{ letterSpacing: '0.1em' }}>
              {uniCount} {uniCount === 1 ? 'university' : 'universities'}
            </text>
          </g>
        )
      })()}
    </svg>
  )
}

export { AP_UNIVERSITIES, AP_COUNTRY_NAMES }
export type { University as APUniversity }
