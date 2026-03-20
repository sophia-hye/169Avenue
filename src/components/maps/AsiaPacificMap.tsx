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
  readonly lon: number
  readonly lat: number
}

const AP_UNIVERSITIES: readonly University[] = [
  { name: 'National University of Singapore', city: 'Singapore', country: 'Singapore', lon: 103.776, lat: 1.296 },
  { name: 'Nanyang Technological University', city: 'Singapore', country: 'Singapore', lon: 103.683, lat: 1.348 },
  { name: 'Seoul National University', city: 'Seoul', country: 'South Korea', lon: 126.952, lat: 37.460 },
  { name: 'KAIST', city: 'Daejeon', country: 'South Korea', lon: 127.360, lat: 36.374 },
  { name: 'Yonsei University', city: 'Seoul', country: 'South Korea', lon: 126.938, lat: 37.564 },
  { name: 'Korea University', city: 'Seoul', country: 'South Korea', lon: 127.032, lat: 37.589 },
  { name: 'University of Tokyo', city: 'Tokyo', country: 'Japan', lon: 139.762, lat: 35.713 },
  { name: 'Kyoto University', city: 'Kyoto', country: 'Japan', lon: 135.781, lat: 35.026 },
  { name: 'Osaka University', city: 'Osaka', country: 'Japan', lon: 135.521, lat: 34.822 },
  { name: 'Tokyo Institute of Technology', city: 'Tokyo', country: 'Japan', lon: 139.683, lat: 35.604 },
  { name: 'University of Hong Kong', city: 'Hong Kong', country: 'China', lon: 114.138, lat: 22.283 },
  { name: 'Chinese University of Hong Kong', city: 'Hong Kong', country: 'China', lon: 114.206, lat: 22.419 },
  { name: 'Tsinghua University', city: 'Beijing', country: 'China', lon: 116.326, lat: 40.000 },
  { name: 'Peking University', city: 'Beijing', country: 'China', lon: 116.310, lat: 39.993 },
  { name: 'Fudan University', city: 'Shanghai', country: 'China', lon: 121.505, lat: 31.298 },
  { name: 'Zhejiang University', city: 'Hangzhou', country: 'China', lon: 120.086, lat: 30.264 },
  { name: 'University of Melbourne', city: 'Melbourne', country: 'Australia', lon: 144.961, lat: -37.798 },
  { name: 'University of Sydney', city: 'Sydney', country: 'Australia', lon: 151.187, lat: -33.889 },
  { name: 'Australian National University', city: 'Canberra', country: 'Australia', lon: 149.119, lat: -35.278 },
  { name: 'University of Queensland', city: 'Brisbane', country: 'Australia', lon: 153.013, lat: -27.497 },
  { name: 'University of Auckland', city: 'Auckland', country: 'New Zealand', lon: 174.769, lat: -36.852 },
  { name: 'Indian Institute of Technology Bombay', city: 'Mumbai', country: 'India', lon: 72.916, lat: 19.132 },
  { name: 'Indian Institute of Science', city: 'Bangalore', country: 'India', lon: 77.569, lat: 13.021 },
]

// Asia-Pacific country IDs
const AP_COUNTRY_IDS = [
  '156', // China
  '392', // Japan
  '410', // South Korea
  '408', // North Korea
  '158', // Taiwan
  '702', // Singapore
  '458', // Malaysia
  '360', // Indonesia
  '764', // Thailand
  '704', // Vietnam
  '608', // Philippines
  '036', // Australia
  '554', // New Zealand
  '356', // India
  '144', // Sri Lanka
  '050', // Bangladesh
  '104', // Myanmar
  '418', // Laos
  '116', // Cambodia
  '496', // Mongolia
  '586', // Pakistan
  '524', // Nepal
]

// Context countries
const CONTEXT_IDS = [
  '643', // Russia
  '398', // Kazakhstan
  '860', // Uzbekistan
]

export function AsiaPacificMap() {
  const [apFeatures, setApFeatures] = useState<GeoFeature[]>([])
  const [contextFeatures, setContextFeatures] = useState<GeoFeature[]>([])
  const [hoveredUni, setHoveredUni] = useState<University | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const projection = useMemo(() =>
    geoMercator()
      .center([115, 15])
      .scale(420)
      .translate([400, 350]),
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

  if (apFeatures.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <span className="font-label text-sm text-on-surface-variant tracking-widest uppercase animate-pulse">
          Loading Map...
        </span>
      </div>
    )
  }

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

      {/* Ocean */}
      <rect x="0" y="0" width="800" height="700" fill="#f8f7f5" />

      {/* Context countries */}
      <g clipPath="url(#ap-clip)">
        {contextFeatures.map((f) => {
          const d = pathGenerator(f.geometry)
          if (!d) return null
          return <path key={f.id} d={d} fill="#f0efed" stroke="#e3e2e0" strokeWidth="0.5" />
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
              fill="#e3e2e0"
              stroke="#a8a9ac"
              strokeWidth="0.8"
            />
          )
        })}
      </g>

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
            <circle cx={uni.x} cy={uni.y} r={isHovered ? 14 : 8} fill="url(#ap-uni-glow)" />
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
            <text
              x={textX} y={rectY + 16}
              textAnchor={anchor}
              fontSize="10" fontWeight="700" fill="#faf9f7"
              className="font-label"
              style={{ letterSpacing: '0.05em' }}
            >
              {uni.name}
            </text>
            <text
              x={textX} y={rectY + 29}
              textAnchor={anchor}
              fontSize="8" fill="#c5c6ca"
              className="font-label"
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {uni.city}, {uni.country}
            </text>
          </g>
        )
      })()}
    </svg>
  )
}
