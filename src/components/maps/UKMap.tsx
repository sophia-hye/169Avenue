import { useEffect, useState, useMemo } from 'react'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import { UK_UNIVERSITIES, UK_NATION_NAMES } from '../../data/uk-universities'

// England + Wales NUTS1 regions (10 features: 9 England + 1 Wales)
const EW_URL =
  'https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/eurostat/ew/topo_nuts1.json'
// Scotland local authority districts (32 features, all = Scotland)
const SCO_URL =
  'https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/sco/topo_lad.json'
// Northern Ireland local government districts (11 features, all = NI)
const NI_URL =
  'https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/ni/topo_lgd.json'
// Background context (Ireland, France)
const WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'

const CONTEXT_IDS = new Set(['372', '250'])

const NATION_BASE_COLORS: Record<string, string> = {
  england: '#e3e2e0',
  scotland: '#dddbd8',
  wales:    '#d8d6d2',
  ni:       '#d4d2ce',
}

interface GeoFeature {
  type: 'Feature'
  id?: string | number
  geometry: GeoJSON.Geometry
  properties: Record<string, unknown> | null
}

interface UKMapProps {
  hoveredNation?: string | null
  onHoverNation?: (id: string | null) => void
  onNavigateNation?: (id: string) => void
}

function fetchTopo(url: string, objectKey: string): Promise<GeoFeature[]> {
  return fetch(url)
    .then((r) => r.json())
    .then((topo: Topology) => {
      const geom = topo.objects[objectKey] as GeometryCollection
      return (feature(topo, geom).features as unknown as GeoFeature[])
    })
}

// EW NUTS1: NUTS112CD = 'UKL' → wales, everything else → england
function nationFromEW(f: GeoFeature): string {
  const code = String(f.properties?.['NUTS112CD'] ?? f.id ?? '')
  return code === 'UKL' ? 'wales' : 'england'
}

export function UKMap({ hoveredNation: externalHovered, onHoverNation, onNavigateNation }: UKMapProps = {}) {
  const [ewFeatures,      setEwFeatures]      = useState<GeoFeature[]>([])
  const [scoFeatures,     setScoFeatures]     = useState<GeoFeature[]>([])
  const [niFeatures,      setNiFeatures]      = useState<GeoFeature[]>([])
  const [contextFeatures, setContextFeatures] = useState<GeoFeature[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)
  const [internalHovered, setInternalHovered] = useState<string | null>(null)

  const isControlled  = externalHovered !== undefined
  const hoveredNation = isControlled ? externalHovered : internalHovered

  const handleEnter = (nation: string) => {
    if (!isControlled) setInternalHovered(nation)
    onHoverNation?.(nation)
  }
  const handleLeave = () => {
    if (!isControlled) setInternalHovered(null)
    onHoverNation?.(null)
  }
  const handleClick = (nation: string) => onNavigateNation?.(nation)

  useEffect(() => {
    setLoading(true)
    setError(false)

    Promise.all([
      fetchTopo(EW_URL,    'nuts1'),
      fetchTopo(SCO_URL,   'lad'),
      fetchTopo(NI_URL,    'lgd'),
      fetch(WORLD_URL).then(r => r.json()).then((topo: Topology) => {
        const geom = topo.objects.countries as GeometryCollection
        return (feature(topo, geom).features as unknown as GeoFeature[])
          .filter(f => CONTEXT_IDS.has(String(f.id)))
      }),
    ])
      .then(([ew, sco, ni, world]) => {
        setEwFeatures(ew)
        setScoFeatures(sco)
        setNiFeatures(ni)
        setContextFeatures(world)
        setLoading(false)
      })
      .catch((err) => {
        console.error('UKMap load error:', err)
        setError(true)
        setLoading(false)
      })
  }, [])

  const projection = useMemo(
    () => geoMercator().center([-3, 54.5]).scale(1800).translate([300, 340]),
    []
  )
  const pathGen = useMemo(() => geoPath().projection(projection), [projection])

  const projectedUnis = useMemo(
    () =>
      UK_UNIVERSITIES.map((u) => {
        const c = projection([u.lon, u.lat])
        return c ? { ...u, x: c[0], y: c[1] } : null
      }).filter(Boolean) as (typeof UK_UNIVERSITIES[number] & { x: number; y: number })[],
    [projection]
  )

  // Centroid per nation for tooltip position
  const centroids = useMemo(() => {
    if (ewFeatures.length === 0) return {} as Record<string, [number, number]>
    const buckets: Record<string, GeoFeature[]> = {
      england: ewFeatures.filter(f => nationFromEW(f) === 'england'),
      wales:   ewFeatures.filter(f => nationFromEW(f) === 'wales'),
      scotland: scoFeatures,
      ni:       niFeatures,
    }
    const result: Record<string, [number, number]> = {}
    for (const [nation, feats] of Object.entries(buckets)) {
      let sx = 0, sy = 0, n = 0
      for (const f of feats) {
        const c = pathGen.centroid(f.geometry as GeoJSON.Geometry)
        if (c && !isNaN(c[0])) { sx += c[0]; sy += c[1]; n++ }
      }
      if (n > 0) result[nation] = [sx / n, sy / n]
    }
    return result
  }, [ewFeatures, scoFeatures, niFeatures, pathGen])

  const fill   = (n: string) => hoveredNation === n ? '#b8963e' : hoveredNation ? '#f0efed' : NATION_BASE_COLORS[n] ?? '#e3e2e0'
  const stroke = (n: string) => hoveredNation === n ? '#775a19' : '#c8c7c4'
  const sw     = (n: string) => hoveredNation === n ? 1.5 : 0.5

  const renderPath = (f: GeoFeature, nation: string, key: string) => {
    const d = pathGen(f.geometry as GeoJSON.Geometry)
    if (!d) return null
    return (
      <path
        key={key}
        d={d}
        fill={fill(nation)}
        stroke={stroke(nation)}
        strokeWidth={sw(nation)}
        style={{ cursor: onNavigateNation ? 'pointer' : 'default', transition: 'fill 0.2s, stroke 0.2s' }}
        onMouseEnter={() => handleEnter(nation)}
        onMouseLeave={handleLeave}
        onClick={() => handleClick(nation)}
      />
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <span className="font-label text-sm text-on-surface-variant tracking-widest uppercase animate-pulse">
          Loading Map...
        </span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-32">
        <span className="font-label text-sm text-on-surface-variant tracking-widest uppercase">
          Map unavailable
        </span>
      </div>
    )
  }

  return (
    <svg viewBox="0 0 600 700" className="w-full h-auto" style={{ overflow: 'hidden' }}>
      <defs>
        <radialGradient id="uk-uni-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#775a19" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#775a19" stopOpacity="0" />
        </radialGradient>
        <clipPath id="uk-clip">
          <rect x="0" y="0" width="600" height="700" />
        </clipPath>
      </defs>

      <rect x="0" y="0" width="600" height="700" fill="#f8f7f5" />

      <g clipPath="url(#uk-clip)">
        {/* Background: Ireland, France */}
        {contextFeatures.map((f, i) => {
          const d = pathGen(f.geometry as GeoJSON.Geometry)
          if (!d) return null
          return <path key={`ctx-${i}`} d={d} fill="#eeece9" stroke="#dddbd8" strokeWidth={0.5} style={{ pointerEvents: 'none' }} />
        })}

        {/* England + Wales NUTS1 (10 regions) */}
        {ewFeatures.map((f, i) => renderPath(f, nationFromEW(f), `ew-${i}`))}

        {/* Scotland LADs (all = scotland) */}
        {scoFeatures.map((f, i) => renderPath(f, 'scotland', `sco-${i}`))}

        {/* Northern Ireland LGDs (all = ni) */}
        {niFeatures.map((f, i) => renderPath(f, 'ni', `ni-${i}`))}
      </g>

      {/* University dots */}
      {projectedUnis.map((u) => {
        const hot = hoveredNation === u.nation
        const dim = hoveredNation && !hot
        return (
          <g key={u.name} style={{ pointerEvents: 'none', opacity: dim ? 0.15 : 1, transition: 'opacity 0.2s' }}>
            <circle cx={u.x} cy={u.y} r={hot ? 12 : 7} fill="url(#uk-uni-glow)" />
            <circle
              cx={u.x} cy={u.y}
              r={hot ? 4.5 : 2.5}
              fill={hot ? '#faf9f7' : '#775a19'}
              stroke={hot ? '#5d4201' : 'none'}
              strokeWidth={hot ? 1.5 : 0}
              style={{ transition: 'all 0.2s' }}
            />
          </g>
        )
      })}

      {/* Tooltip */}
      {hoveredNation && (() => {
        const c = centroids[hoveredNation]
        if (!c) return null
        const name     = UK_NATION_NAMES[hoveredNation] ?? hoveredNation
        const uniCount = UK_UNIVERSITIES.filter(u => u.nation === hoveredNation).length
        const W = 220, H = 44
        let tx = Math.max(4, Math.min(c[0] - W / 2, 596 - W))
        const ty = Math.max(4, Math.min(c[1] - 54, 700 - H - 4))
        return (
          <g style={{ pointerEvents: 'none' }}>
            <rect x={tx} y={ty} width={W} height={H} fill="#000101" opacity="0.88" />
            <text x={tx + W / 2} y={ty + 16} textAnchor="middle" fontSize="11" fontWeight="700" fill="#faf9f7" style={{ letterSpacing: '0.05em' }}>{name}</text>
            <text x={tx + W / 2} y={ty + 31} textAnchor="middle" fontSize="8" fill="#c5c6ca" style={{ letterSpacing: '0.1em' }}>
              {uniCount} {uniCount === 1 ? 'university' : 'universities'} — click to explore
            </text>
          </g>
        )
      })()}
    </svg>
  )
}
