import { useEffect, useState, useMemo } from 'react'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

interface GeoFeature {
  type: 'Feature'
  id: string
  properties: { name: string }
  geometry: GeoJSON.Geometry
}

interface WorldMapProps {
  selected: string | null
  hovered: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

type RegionId = 'us' | 'uk' | 'eu' | 'ap'

const REGION_COUNTRIES: Record<RegionId, string[]> = {
  us: ['840'],
  uk: ['826'],
  eu: [
    '250', '276', '380', '724', '620', '756', '040', '056', '528', '442',
    '208', '578', '752', '246', '616', '203', '348', '300', '642', '100',
    '191', '705', '703', '440', '428', '233', '372',
  ],
  ap: [
    '156', '392', '410', '408', '158', '702', '458', '360', '764', '704',
    '608', '036', '554', '356', '144', '050', '104', '418', '116', '496',
    '586', '524',
  ],
}

// Build reverse lookup: country id -> region
function buildCountryToRegion(): Record<string, RegionId> {
  const map: Record<string, RegionId> = {}
  for (const [region, ids] of Object.entries(REGION_COUNTRIES)) {
    for (const id of ids) {
      map[id] = region as RegionId
    }
  }
  return map
}

const COUNTRY_TO_REGION = buildCountryToRegion()

const REGION_LABELS: { id: RegionId; label: string; lon: number; lat: number }[] = [
  { id: 'us', label: 'United States', lon: -100, lat: 40 },
  { id: 'uk', label: 'UK', lon: -2, lat: 55 },
  { id: 'eu', label: 'Europe', lon: 15, lat: 50 },
  { id: 'ap', label: 'Asia-Pacific', lon: 105, lat: 20 },
]

export function WorldMap({ selected, hovered, onSelect, onHover }: WorldMapProps) {
  const [countries, setCountries] = useState<GeoFeature[]>([])

  const projection = useMemo(() =>
    geoNaturalEarth1()
      .scale(170)
      .translate([480, 300]),
    []
  )
  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection])

  useEffect(() => {
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((topology: Topology) => {
        const geom = topology.objects.countries as GeometryCollection
        const allFeatures = feature(topology, geom).features as unknown as GeoFeature[]
        setCountries(allFeatures)
      })
  }, [])

  const getStyle = (regionId: RegionId | undefined): React.CSSProperties => {
    if (!regionId) {
      return {
        fill: '#efeeec',
        stroke: '#e3e2e0',
        strokeWidth: 0.3,
        opacity: (selected || hovered) ? 0.2 : 0.5,
        transition: 'all 0.4s ease',
      }
    }

    const isSelected = selected === regionId
    const isHovered = hovered === regionId
    const isActive = isSelected || isHovered
    const dimmed = (selected !== null || hovered !== null) && !isActive

    return {
      fill: isSelected ? '#775a19' : isHovered ? '#b8963e' : '#d4d3d1',
      stroke: isSelected ? '#5d4201' : isHovered ? '#775a19' : '#a8a9ac',
      strokeWidth: isActive ? 1.2 : 0.5,
      opacity: dimmed ? 0.2 : 1,
      cursor: 'pointer',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      filter: isHovered && !isSelected ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.12)) brightness(1.02)' : 'none',
    }
  }

  if (countries.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <span className="font-label text-sm text-on-surface-variant tracking-widest uppercase animate-pulse">
          Loading Map...
        </span>
      </div>
    )
  }

  return (
    <svg viewBox="0 0 960 500" className="w-full h-auto" style={{ overflow: 'hidden' }}>
      {/* Ocean */}
      <rect x="0" y="0" width="960" height="500" fill="#f8f7f5" />

      {/* Graticule-like subtle lines */}
      {[0, 100, 200, 300, 400, 500].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="960" y2={y} stroke="#eeedeb" strokeWidth="0.5" />
      ))}

      {/* Countries */}
      {countries.map((c) => {
        const d = pathGenerator(c.geometry)
        if (!d) return null
        const regionId = COUNTRY_TO_REGION[c.id]

        return (
          <path
            key={c.id}
            d={d}
            style={getStyle(regionId)}
            onClick={() => regionId && onSelect(regionId)}
            onMouseEnter={() => regionId && onHover(regionId)}
            onMouseLeave={() => regionId && onHover(null)}
          />
        )
      })}

      {/* Region labels */}
      {REGION_LABELS.map((r) => {
        const coords = projection([r.lon, r.lat])
        if (!coords) return null
        const isActive = selected === r.id || hovered === r.id
        const dimmed = (selected !== null || hovered !== null) && !isActive

        return (
          <text
            key={r.id}
            x={coords[0]}
            y={coords[1]}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="10"
            fontWeight="700"
            fill={selected === r.id ? '#fff' : hovered === r.id ? '#000101' : '#75777a'}
            opacity={dimmed ? 0.2 : 1}
            style={{
              pointerEvents: 'none',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              transition: 'all 0.4s ease',
            }}
            className="font-label"
          >
            {r.label}
          </text>
        )
      })}
    </svg>
  )
}
