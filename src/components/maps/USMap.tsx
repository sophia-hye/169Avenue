import { useEffect, useState, useMemo, useRef } from 'react'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import { US_UNIVERSITIES } from '../../data/us-universities'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// FIPS code to state abbreviation
const FIPS_TO_STATE: Record<string, string> = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA',
  '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC', '12': 'FL',
  '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN',
  '19': 'IA', '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME',
  '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS',
  '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH',
  '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND',
  '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
  '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT',
  '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI',
  '56': 'WY', '72': 'PR',
}

interface StateFeature {
  type: 'Feature'
  id: string
  geometry: GeoJSON.Geometry
  properties: Record<string, unknown>
}

interface USMapProps {
  selectedState: string | null
  hoveredState: string | null
  onSelectState: (code: string) => void
  onHoverState: (code: string | null) => void
  onNavigateState?: (code: string) => void
}

interface HoveredUni {
  rank: number
  name: string
  city: string
  state: string
  mouseX: number
  mouseY: number
}

export function USMap({ selectedState, hoveredState, onSelectState, onHoverState, onNavigateState }: USMapProps) {
  const [states, setStates] = useState<StateFeature[]>([])
  const [hoveredUni, setHoveredUni] = useState<HoveredUni | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const projection = useMemo(() =>
    geoAlbersUsa().scale(1100).translate([480, 300]),
    []
  )
  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection])

  useEffect(() => {
    fetch(GEO_URL)
      .then((res) => res.json())
      .then((topology: Topology) => {
        const geom = topology.objects.states as GeometryCollection
        const geoFeatures = feature(topology, geom)
        setStates(geoFeatures.features as unknown as StateFeature[])
      })
  }, [])

  const getStateCode = (fips: string) => FIPS_TO_STATE[fips] || ''

  const getStyle = (code: string): React.CSSProperties => {
    const isSelected = selectedState === code
    const isHovered = hoveredState === code && !isSelected
    const hasUnis = US_UNIVERSITIES.some((u) => u.state === code)
    const dimmed = (selectedState || hoveredState) && !isSelected && !isHovered

    return {
      fill: isSelected ? '#775a19' : isHovered ? '#b8963e' : hasUnis ? '#e3e2e0' : '#f0efed',
      stroke: isSelected ? '#5d4201' : isHovered ? '#775a19' : '#c5c6ca',
      strokeWidth: isSelected ? 1.8 : isHovered ? 1.2 : 0.5,
      cursor: hasUnis ? 'pointer' : 'default',
      opacity: dimmed ? 0.35 : 1,
      transition: 'fill 0.25s ease, stroke 0.25s ease, opacity 0.3s ease, filter 0.3s ease',
      filter: isHovered ? 'drop-shadow(0 3px 6px rgba(0,0,0,0.15)) brightness(1.02)' : 'none',
    }
  }

  // Project university positions
  const projectedUnis = useMemo(() =>
    US_UNIVERSITIES.map((uni) => {
      // Use approximate lon/lat for each university to project onto the map
      return { ...uni }
    }),
    []
  )

  // Approximate state centroids for university dots via projection
  const uniPositions = useMemo(() => {
    if (states.length === 0) return new Map<number, [number, number]>()
    const result = new Map<number, [number, number]>()

    // Group universities by state, then find state centroid
    const stateCentroids = new Map<string, [number, number]>()
    for (const s of states) {
      const code = getStateCode(s.id)
      if (!code) continue
      const centroid = pathGenerator.centroid(s.geometry as GeoJSON.Geometry)
      if (centroid && !isNaN(centroid[0])) {
        stateCentroids.set(code, centroid as [number, number])
      }
    }

    // For each university, offset slightly from state centroid to avoid overlap
    const stateCounters = new Map<string, number>()
    for (const uni of projectedUnis) {
      const centroid = stateCentroids.get(uni.state)
      if (!centroid) continue
      const count = stateCounters.get(uni.state) || 0
      stateCounters.set(uni.state, count + 1)

      // Spiral offset for multiple universities in same state
      const angle = (count * 137.5 * Math.PI) / 180
      const radius = Math.min(count * 4, 20)
      const x = centroid[0] + Math.cos(angle) * radius
      const y = centroid[1] + Math.sin(angle) * radius
      result.set(uni.rank, [x, y])
    }

    return result
  }, [states, pathGenerator, projectedUnis])

  if (states.length === 0) {
    return (
      <div className="flex items-center justify-center py-32">
        <span className="font-label text-sm text-on-surface-variant tracking-widest uppercase animate-pulse">
          Loading Map...
        </span>
      </div>
    )
  }

  return (
    <svg ref={svgRef} viewBox="0 0 960 600" className="w-full h-auto" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="uni-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#775a19" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#775a19" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* State paths */}
      {states.map((s) => {
        const code = getStateCode(s.id)
        if (!code || code === 'PR') return null
        const d = pathGenerator(s.geometry as GeoJSON.Geometry)
        if (!d) return null

        return (
          <path
            key={s.id}
            d={d}
            style={getStyle(code)}
            onClick={() => {
              if (US_UNIVERSITIES.some((u) => u.state === code)) {
                if (onNavigateState) {
                  onNavigateState(code)
                } else {
                  onSelectState(code)
                }
              }
            }}
            onMouseEnter={() => onHoverState(code)}
            onMouseLeave={() => onHoverState(null)}
          />
        )
      })}

      {/* University dots */}
      {projectedUnis.map((uni) => {
        const pos = uniPositions.get(uni.rank)
        if (!pos) return null

        const isInState = selectedState === uni.state
        const stateHovered = hoveredState === uni.state
        const visible = !selectedState || isInState
        const highlight = isInState || stateHovered
        const isUniHovered = hoveredUni?.rank === uni.rank

        return (
          <g
            key={uni.rank}
            style={{
              opacity: visible ? 1 : 0.1,
              transition: 'opacity 0.3s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={() => {
              if (!svgRef.current) return
              const rect = svgRef.current.getBoundingClientRect()
              const svgWidth = rect.width
              const scaleX = svgWidth / 960
              const px = pos[0] * scaleX
              setHoveredUni({
                rank: uni.rank,
                name: uni.name,
                city: uni.city,
                state: uni.state,
                mouseX: px > svgWidth * 0.65 ? pos[0] - 10 : pos[0] + 10,
                mouseY: pos[1] - 10,
              })
            }}
            onMouseLeave={() => setHoveredUni(null)}
          >
            <circle cx={pos[0]} cy={pos[1]} r={isUniHovered ? 14 : highlight ? 10 : 6} fill="url(#uni-glow)" />
            <circle
              cx={pos[0]}
              cy={pos[1]}
              r={isUniHovered ? 4.5 : highlight ? 3.5 : 2}
              fill={isUniHovered ? '#faf9f7' : isInState ? '#faf9f7' : '#775a19'}
              stroke={isUniHovered || isInState ? '#5d4201' : 'none'}
              strokeWidth={isUniHovered ? 2 : isInState ? 1.2 : 0}
              style={{ transition: 'all 0.2s ease' }}
            />
          </g>
        )
      })}

      {/* University tooltip */}
      {hoveredUni && (() => {
        const pos = uniPositions.get(hoveredUni.rank)
        if (!pos) return null
        const svgEl = svgRef.current
        if (!svgEl) return null
        const rect = svgEl.getBoundingClientRect()
        const svgWidth = rect.width
        const scaleX = svgWidth / 960
        const isRight = pos[0] * scaleX > svgWidth * 0.65
        const tx = isRight ? hoveredUni.mouseX - 4 : hoveredUni.mouseX + 4
        const anchor = isRight ? 'end' : 'start'

        return (
          <g style={{ pointerEvents: 'none' }}>
            <rect
              x={isRight ? tx - 200 : tx - 4}
              y={hoveredUni.mouseY - 32}
              width="208"
              height="42"
              fill="#000101"
              opacity="0.92"
              rx="0"
            />
            <text
              x={isRight ? tx - 8 : tx + 8}
              y={hoveredUni.mouseY - 16}
              textAnchor={anchor}
              fontSize="10"
              fontWeight="700"
              fill="#faf9f7"
              className="font-label"
              style={{ letterSpacing: '0.05em' }}
            >
              #{hoveredUni.rank} {hoveredUni.name}
            </text>
            <text
              x={isRight ? tx - 8 : tx + 8}
              y={hoveredUni.mouseY - 2}
              textAnchor={anchor}
              fontSize="8"
              fill="#c5c6ca"
              className="font-label"
              style={{ letterSpacing: '0.1em', textTransform: 'uppercase' }}
            >
              {hoveredUni.city}, {hoveredUni.state}
            </text>
          </g>
        )
      })()}

      {/* State labels for hovered/selected */}
      {states.map((s) => {
        const code = getStateCode(s.id)
        if (!code || code === 'PR') return null
        const isActive = selectedState === code || hoveredState === code
        if (!isActive) return null
        const centroid = pathGenerator.centroid(s.geometry as GeoJSON.Geometry)
        if (!centroid || isNaN(centroid[0])) return null

        return (
          <text
            key={`label-${s.id}`}
            x={centroid[0]}
            y={centroid[1]}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="10"
            fontWeight="700"
            fill={selectedState === code ? '#fff' : '#000101'}
            style={{ pointerEvents: 'none', letterSpacing: '0.15em', transition: 'fill 0.3s ease' }}
            className="font-label"
          >
            {code}
          </text>
        )
      })}
    </svg>
  )
}
