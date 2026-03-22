import { useEffect, useRef, useState } from 'react'

interface StatItem {
  readonly value: number
  readonly suffix: string
  readonly label: string
  readonly description: string
}

const STATS: readonly StatItem[] = [
  {
    value: 2847,
    suffix: '+',
    label: 'Successful Admissions',
    description: 'Students placed at world-class universities through our bespoke curation process.',
  },
  {
    value: 530,
    suffix: '+',
    label: 'Partner Universities',
    description: 'Elite institutions across 45 countries available for personalized consultation.',
  },
  {
    value: 94.7,
    suffix: '%',
    label: 'Career Placement Rate',
    description: 'Graduates securing positions at leading firms within 6 months of completion.',
  },
]

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const isDecimal = target % 1 !== 0

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target
      setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [target, duration, start])

  return count
}

function StatCard({ item, index }: { item: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const count = useCountUp(item.value, 2000, visible)

  return (
    <div
      ref={ref}
      className="text-center md:text-left"
      style={{ animation: visible ? `fadeIn 0.6s ease ${index * 0.15}s both` : 'none' }}
    >
      <div className="flex items-baseline justify-center md:justify-start gap-1 mb-4">
        <span className="font-headline text-5xl md:text-6xl lg:text-7xl text-primary tracking-tighter">
          {item.suffix === '%' ? count.toFixed(1) : count.toLocaleString()}
        </span>
        <span className="font-headline text-3xl md:text-4xl text-secondary">{item.suffix}</span>
      </div>
      <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3">
        {item.label}
      </h3>
      <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-xs mx-auto md:mx-0">
        {item.description}
      </p>
    </div>
  )
}

export function Stats() {
  return (
    <section className="px-8 md:px-16 lg:px-24 mb-32 md:mb-40 max-w-screen-2xl mx-auto">
      <div className="border-t border-b border-outline-variant/20 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} item={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
