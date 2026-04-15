interface DataPoint {
  axis: string
  value: number // 1-5
}

export function RadarChart({ data, size = 280 }: { data: DataPoint[]; size?: number }) {
  const cx = size / 2
  const cy = size / 2
  const r = size * 0.38
  const n = data.length
  const angleStep = (2 * Math.PI) / n
  const levels = [1, 2, 3, 4, 5]

  const getPoint = (index: number, value: number) => {
    const angle = angleStep * index - Math.PI / 2
    const dist = (value / 5) * r
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) }
  }

  // Grid circles
  const gridPaths = levels.map((level) => {
    const points = Array.from({ length: n }, (_, i) => getPoint(i, level))
    return points.map((p) => `${p.x},${p.y}`).join(' ')
  })

  // Data polygon
  const dataPoints = data.map((d, i) => getPoint(i, d.value))
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(' ')

  // Axis lines
  const axisLines = Array.from({ length: n }, (_, i) => {
    const end = getPoint(i, 5)
    return { x1: cx, y1: cy, x2: end.x, y2: end.y }
  })

  // Labels
  const labels = data.map((d, i) => {
    const p = getPoint(i, 5.8)
    return { ...p, text: d.axis, value: d.value }
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      {/* Grid */}
      {gridPaths.map((points, i) => (
        <polygon key={i} points={points} fill="none" stroke="#E5E0D8" strokeWidth={0.5} />
      ))}

      {/* Axes */}
      {axisLines.map((line, i) => (
        <line key={i} {...line} stroke="#E5E0D8" strokeWidth={0.5} />
      ))}

      {/* Data area */}
      <polygon points={dataPath} fill="#6B4F4F" fillOpacity={0.15} stroke="#6B4F4F" strokeWidth={1.5} />

      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="#6B4F4F" />
      ))}

      {/* Labels */}
      {labels.map((l, i) => (
        <text key={i} x={l.x} y={l.y} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: 11, fill: '#5A5550', fontFamily: '"Pretendard", sans-serif' }}>
          {l.text}
        </text>
      ))}

      {/* Values */}
      {labels.map((l, i) => {
        const vp = getPoint(i, data[i].value + 0.6)
        return (
          <text key={`v${i}`} x={vp.x} y={vp.y} textAnchor="middle" dominantBaseline="middle"
            style={{ fontSize: 10, fill: '#6B4F4F', fontWeight: 600, fontFamily: '"Pretendard", sans-serif' }}>
            {data[i].value.toFixed(1)}
          </text>
        )
      })}
    </svg>
  )
}
