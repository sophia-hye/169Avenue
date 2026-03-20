import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { getAllUniversities } from '../data/university-utils'
import { FIELDS } from '../data/fields'

interface SearchOverlayProps {
  onClose: () => void
}

interface Result {
  type: 'university' | 'field'
  label: string
  sub: string
  to: string
  icon: string
}

function buildResults(query: string): Result[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  const results: Result[] = []

  for (const field of FIELDS) {
    if (field.name.toLowerCase().includes(q)) {
      results.push({
        type: 'field',
        label: field.name,
        sub: 'Academic Field',
        to: '/field',
        icon: field.icon,
      })
    }
  }

  for (const uni of getAllUniversities()) {
    if (uni.name.toLowerCase().includes(q) || uni.city.toLowerCase().includes(q) || uni.country.toLowerCase().includes(q)) {
      results.push({
        type: 'university',
        label: uni.name,
        sub: `${uni.city}, ${uni.country}`,
        to: `/university/${uni.slug}`,
        icon: 'school',
      })
    }
  }

  return results.slice(0, 10)
}

export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    setResults(buildResults(query))
  }, [query])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] bg-primary/80 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center gap-4 px-6 py-5 border-b border-outline-variant/20">
          <span className="material-symbols-outlined text-secondary">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search universities or fields..."
            className="flex-1 bg-transparent font-headline text-xl text-primary placeholder:text-on-surface-variant/40 focus:outline-none"
          />
          <button onClick={onClose} className="text-on-surface-variant/60 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul className="max-h-[60vh] overflow-y-auto">
            {results.map((r, i) => (
              <li key={i}>
                <Link
                  to={r.to}
                  onClick={onClose}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-surface-container-low transition-colors group"
                >
                  <span
                    className="material-symbols-outlined text-secondary/60 group-hover:text-secondary transition-colors"
                    style={{ fontVariationSettings: "'wght' 200" }}
                  >
                    {r.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline text-base text-primary truncate">{r.label}</p>
                    <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{r.sub}</p>
                  </div>
                  <span className="material-symbols-outlined text-sm text-on-surface-variant/40 group-hover:text-secondary group-hover:translate-x-1 transition-all">
                    arrow_forward
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {query && results.length === 0 && (
          <div className="px-6 py-10 text-center">
            <p className="font-body text-on-surface-variant text-sm">No results for "{query}"</p>
          </div>
        )}

        {!query && (
          <div className="px-6 py-5">
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/50">
              Search universities, cities, or fields of study
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
