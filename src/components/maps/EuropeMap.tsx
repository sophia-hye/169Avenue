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

// FIPS to country name
const COUNTRY_NAMES: Record<string, string> = {
  '250': 'France', '276': 'Germany', '380': 'Italy', '724': 'Spain',
  '620': 'Portugal', '756': 'Switzerland', '040': 'Austria', '056': 'Belgium',
  '528': 'Netherlands', '442': 'Luxembourg', '208': 'Denmark', '578': 'Norway',
  '752': 'Sweden', '246': 'Finland', '616': 'Poland', '203': 'Czech Republic',
  '348': 'Hungary', '300': 'Greece', '372': 'Ireland', '826': 'United Kingdom',
  '642': 'Romania', '100': 'Bulgaria', '191': 'Croatia', '705': 'Slovenia',
  '703': 'Slovakia', '440': 'Lithuania', '428': 'Latvia', '233': 'Estonia',
}

const EU_UNIVERSITIES: readonly University[] = [
  { name: 'INSEAD', city: 'Fontainebleau', country: 'France', countryId: '250', lon: 2.700, lat: 48.408 },
  { name: 'HEC Paris', city: 'Jouy-en-Josas', country: 'France', countryId: '250', lon: 2.163, lat: 48.755 },
  { name: 'Sciences Po', city: 'Paris', country: 'France', countryId: '250', lon: 2.329, lat: 48.854 },
  { name: 'Sorbonne University', city: 'Paris', country: 'France', countryId: '250', lon: 2.344, lat: 48.848 },
  { name: 'PSL University', city: 'Paris', country: 'France', countryId: '250', lon: 2.340, lat: 48.852 },
  { name: 'ETH Zurich', city: 'Zurich', country: 'Switzerland', countryId: '756', lon: 8.548, lat: 47.376 },
  { name: 'EPFL', city: 'Lausanne', country: 'Switzerland', countryId: '756', lon: 6.566, lat: 46.519 },
  { name: 'University of Zurich', city: 'Zurich', country: 'Switzerland', countryId: '756', lon: 8.542, lat: 47.374 },
  { name: 'Bocconi University', city: 'Milan', country: 'Italy', countryId: '380', lon: 9.189, lat: 45.451 },
  { name: 'Politecnico di Milano', city: 'Milan', country: 'Italy', countryId: '380', lon: 9.228, lat: 45.479 },
  { name: 'University of Bologna', city: 'Bologna', country: 'Italy', countryId: '380', lon: 11.354, lat: 44.496 },
  { name: 'TU Munich', city: 'Munich', country: 'Germany', countryId: '276', lon: 11.568, lat: 48.149 },
  { name: 'LMU Munich', city: 'Munich', country: 'Germany', countryId: '276', lon: 11.580, lat: 48.151 },
  { name: 'Heidelberg University', city: 'Heidelberg', country: 'Germany', countryId: '276', lon: 8.706, lat: 49.410 },
  { name: 'Humboldt University', city: 'Berlin', country: 'Germany', countryId: '276', lon: 13.394, lat: 52.518 },
  { name: 'Freie Universitat Berlin', city: 'Berlin', country: 'Germany', countryId: '276', lon: 13.290, lat: 52.453 },
  { name: 'KU Leuven', city: 'Leuven', country: 'Belgium', countryId: '056', lon: 4.700, lat: 50.878 },
  { name: 'University of Amsterdam', city: 'Amsterdam', country: 'Netherlands', countryId: '528', lon: 4.895, lat: 52.356 },
  { name: 'Delft University of Technology', city: 'Delft', country: 'Netherlands', countryId: '528', lon: 4.374, lat: 52.002 },
  { name: 'Karolinska Institute', city: 'Stockholm', country: 'Sweden', countryId: '752', lon: 18.035, lat: 59.348 },
  { name: 'University of Copenhagen', city: 'Copenhagen', country: 'Denmark', countryId: '208', lon: 12.560, lat: 55.680 },
  { name: 'IE Business School', city: 'Madrid', country: 'Spain', countryId: '724', lon: -3.688, lat: 40.436 },
  { name: 'University of Barcelona', city: 'Barcelona', country: 'Spain', countryId: '724', lon: 2.164, lat: 41.387 },
  { name: 'University of Vienna', city: 'Vienna', country: 'Austria', countryId: '040', lon: 16.360, lat: 48.213 },
]

const EU_COUNTRY_IDS = Object.keys(COUNTRY_NAMES)

const CONTEXT_IDS = ['012', '504', '788', '792', '804', '112', '643']

interface EuropeMapProps {
  selectedCountry?: string | null
  onSelectCountry?: (id: string) => void
  onNavigateCountry?: (id: string) => void
}

export function EuropeMap({ selectedCountry = null, onSelectCountry, onNavigateCountry }: EuropeMapProps) {
  const [euFeatures, setEuFeatures] = useState<GeoFeature[]>([])
  const [contextFeatures, setContextFeatures] = useState<GeoFeature[]>([])
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)
  const [hoveredUni, setHoveredUni] = useState<University | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const projection = useMemo(() =>
    geoMercator().center([10, 50]).scale(700).translate([400, 400]),
    []
  )
  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection])

  useEffect(() => {
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((topology: Topology) => {
        const geom = topology.objects.countries as GeometryCollection
        const allFeatures = feature(topology, geom).features as unknown as GeoFeature[]
        setEuFeatures(allFeatures.filter((f) => EU_COUNTRY_IDS.includes(f.id)))
        setContextFeatures(allFeatures.filter((f) => CONTEXT_IDS.includes(f.id)))
      })
  }, [])

  const projectedUnis = useMemo(() =>
    EU_UNIVERSITIES.map((uni) => {
      const coords = projection([uni.lon, uni.lat])
      return coords ? { ...uni, x: coords[0], y: coords[1] } : null
    }).filter(Boolean) as (University & { x: number; y: number })[],
    [projection]
  )

  const hasUnis = (countryId: string) => EU_UNIVERSITIES.some((u) => u.countryId === countryId)

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

  if (euFeatures.length === 0) {
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
        <radialGradient id="eu-uni-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#775a19" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#775a19" stopOpacity="0" />
        </radialGradient>
        <clipPath id="eu-clip">
          <rect x="0" y="0" width="800" height="700" />
        </clipPath>
      </defs>

      <rect x="0" y="0" width="800" height="700" fill="#f8f7f5" />

      {/* Context countries */}
      <g clipPath="url(#eu-clip)">
        {contextFeatures.map((f) => {
          const d = pathGenerator(f.geometry)
          if (!d) return null
          return <path key={f.id} d={d} fill="#f0efed" stroke="#e3e2e0" strokeWidth="0.5" />
        })}
      </g>

      {/* European countries */}
      <g clipPath="url(#eu-clip)">
        {euFeatures.map((f) => {
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
      {euFeatures.map((f) => {
        const isActive = selectedCountry === f.id || hoveredCountry === f.id
        if (!isActive) return null
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
            {COUNTRY_NAMES[f.id] || ''}
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
            <circle cx={uni.x} cy={uni.y} r={isUniHovered ? 14 : highlight ? 10 : 8} fill="url(#eu-uni-glow)" />
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
        const tooltipW = 230
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
        const f = euFeatures.find((feat) => feat.id === activeCountryId)
        if (!f) return null
        const centroid = pathGenerator.centroid(f.geometry)
        if (!centroid || isNaN(centroid[0])) return null
        const name = COUNTRY_NAMES[activeCountryId] || ''
        const uniCount = EU_UNIVERSITIES.filter((u) => u.countryId === activeCountryId).length
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

export { EU_UNIVERSITIES, COUNTRY_NAMES }
export type { University as EUUniversity }
