import { useEffect, useState, useMemo, useRef } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'

// UK TopoJSON from world-atlas, filtered to UK countries
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
  readonly lon: number
  readonly lat: number
}

const UK_UNIVERSITIES: readonly University[] = [
  { name: 'University of Oxford', city: 'Oxford', lon: -1.254, lat: 51.754 },
  { name: 'University of Cambridge', city: 'Cambridge', lon: 0.117, lat: 52.204 },
  { name: 'Imperial College London', city: 'London', lon: -0.175, lat: 51.499 },
  { name: 'UCL', city: 'London', lon: -0.134, lat: 51.525 },
  { name: 'London School of Economics', city: 'London', lon: -0.116, lat: 51.514 },
  { name: 'University of Edinburgh', city: 'Edinburgh', lon: -3.189, lat: 55.944 },
  { name: "King's College London", city: 'London', lon: -0.116, lat: 51.511 },
  { name: 'University of Manchester', city: 'Manchester', lon: -2.234, lat: 53.467 },
  { name: 'University of Bristol', city: 'Bristol', lon: -2.602, lat: 51.459 },
  { name: 'University of Warwick', city: 'Coventry', lon: -1.561, lat: 52.379 },
  { name: 'University of Glasgow', city: 'Glasgow', lon: -4.288, lat: 55.872 },
  { name: 'University of Leeds', city: 'Leeds', lon: -1.553, lat: 53.807 },
  { name: 'Durham University', city: 'Durham', lon: -1.576, lat: 54.768 },
  { name: 'University of Birmingham', city: 'Birmingham', lon: -1.930, lat: 52.450 },
  { name: 'University of St Andrews', city: 'St Andrews', lon: -2.799, lat: 56.340 },
  { name: 'University of Sheffield', city: 'Sheffield', lon: -1.488, lat: 53.381 },
  { name: 'University of Nottingham', city: 'Nottingham', lon: -1.188, lat: 52.940 },
  { name: 'University of Southampton', city: 'Southampton', lon: -1.397, lat: 50.935 },
  { name: 'University of York', city: 'York', lon: -1.052, lat: 53.947 },
  { name: 'University of Exeter', city: 'Exeter', lon: -3.534, lat: 50.736 },
]

// Countries near UK to show as context
const NEIGHBOR_IDS = ['372', '250', '056', '528', '578', '752'] // Ireland, France, Belgium, Netherlands, Norway, Sweden

export function UKMap() {
  const [ukFeatures, setUkFeatures] = useState<GeoFeature[]>([])
  const [neighborFeatures, setNeighborFeatures] = useState<GeoFeature[]>([])
  const [hoveredUni, setHoveredUni] = useState<University | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const projection = useMemo(() =>
    geoMercator()
      .center([-3, 54.5])
      .scale(1800)
      .translate([300, 340]),
    []
  )
  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection])

  useEffect(() => {
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((topology: Topology) => {
        const geom = topology.objects.countries as GeometryCollection
        const allFeatures = feature(topology, geom).features as unknown as GeoFeature[]
        // UK = 826
        setUkFeatures(allFeatures.filter((f) => f.id === '826'))
        setNeighborFeatures(allFeatures.filter((f) => NEIGHBOR_IDS.includes(f.id)))
      })
  }, [])

  const projectedUnis = useMemo(() =>
    UK_UNIVERSITIES.map((uni) => {
      const coords = projection([uni.lon, uni.lat])
      return coords ? { ...uni, x: coords[0], y: coords[1] } : null
    }).filter(Boolean) as (University & { x: number; y: number })[],
    [projection]
  )

  if (ukFeatures.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <span className="font-label text-sm text-on-surface-variant tracking-widest uppercase animate-pulse">
          Loading Map...
        </span>
      </div>
    )
  }

  return (
    <svg ref={svgRef} viewBox="0 0 600 700" className="w-full h-auto" style={{ overflow: 'hidden' }}>
      <defs>
        <radialGradient id="uk-uni-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#775a19" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#775a19" stopOpacity="0" />
        </radialGradient>
        <clipPath id="uk-clip">
          <rect x="0" y="0" width="600" height="700" />
        </clipPath>
      </defs>

      {/* Ocean background */}
      <rect x="0" y="0" width="600" height="700" fill="#f8f7f5" />

      {/* Neighbor countries (context, clipped to viewBox) */}
      <g clipPath="url(#uk-clip)">
        {neighborFeatures.map((f) => {
          const d = pathGenerator(f.geometry)
          if (!d) return null
          return (
            <path
              key={f.id}
              d={d}
              fill="#f0efed"
              stroke="#e3e2e0"
              strokeWidth="0.5"
            />
          )
        })}
      </g>

      {/* UK */}
      {ukFeatures.map((f) => {
        const d = pathGenerator(f.geometry)
        if (!d) return null
        return (
          <path
            key={f.id}
            d={d}
            fill="#e3e2e0"
            stroke="#a8a9ac"
            strokeWidth="1"
          />
        )
      })}

      {/* University dots */}
      {projectedUnis.map((uni) => {
        const isHovered = hoveredUni?.name === uni.name
        return (
          <g
            key={uni.name}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredUni(uni)}
            onMouseLeave={() => setHoveredUni(null)}
          >
            <circle cx={uni.x} cy={uni.y} r={isHovered ? 14 : 8} fill="url(#uk-uni-glow)" />
            <circle
              cx={uni.x}
              cy={uni.y}
              r={isHovered ? 5 : 3}
              fill={isHovered ? '#faf9f7' : '#775a19'}
              stroke={isHovered ? '#5d4201' : 'none'}
              strokeWidth={isHovered ? 2 : 0}
              style={{ transition: 'all 0.2s ease' }}
            />
          </g>
        )
      })}

      {/* Tooltip */}
      {hoveredUni && (() => {
        const uni = projectedUnis.find((u) => u.name === hoveredUni.name)
        if (!uni) return null
        const tooltipW = 218
        const isRight = uni.x > 340
        const tx = isRight ? uni.x - 14 : uni.x + 14
        const anchor = isRight ? 'end' : 'start'
        let rectX = isRight ? tx - tooltipW - 4 : tx - 4
        // Clamp inside viewBox
        if (rectX < 4) rectX = 4
        if (rectX + tooltipW > 596) rectX = 596 - tooltipW
        const textX = isRight ? rectX + tooltipW - 8 : rectX + 8
        const rectY = Math.max(4, uni.y - 30)

        return (
          <g style={{ pointerEvents: 'none' }}>
            <rect
              x={rectX}
              y={rectY}
              width={tooltipW}
              height="38"
              fill="#000101"
              opacity="0.92"
            />
            <text
              x={textX}
              y={rectY + 16}
              textAnchor={anchor}
              fontSize="10"
              fontWeight="700"
              fill="#faf9f7"
              className="font-label"
              style={{ letterSpacing: '0.05em' }}
            >
              {uni.name}
            </text>
            <text
              x={textX}
              y={rectY + 29}
              textAnchor={anchor}
              fontSize="8"
              fill="#c5c6ca"
              className="font-label"
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {uni.city}
            </text>
          </g>
        )
      })()}
    </svg>
  )
}
