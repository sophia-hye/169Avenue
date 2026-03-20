import { FIELDS, type Field } from './fields'

export function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export interface UniversityDetail {
  slug: string
  name: string
  city: string
  country: string
  lon: number
  lat: number
  fields: Array<{ field: Field; rank: number }>
}

let _cache: UniversityDetail[] | null = null

export function getAllUniversities(): UniversityDetail[] {
  if (_cache) return _cache

  const map = new Map<string, UniversityDetail>()

  for (const field of FIELDS) {
    for (const uni of field.universities) {
      const slug = toSlug(uni.name)
      if (!map.has(slug)) {
        map.set(slug, {
          slug,
          name: uni.name,
          city: uni.city,
          country: uni.country,
          lon: uni.lon,
          lat: uni.lat,
          fields: [],
        })
      }
      map.get(slug)!.fields.push({ field, rank: uni.rank })
    }
  }

  _cache = Array.from(map.values()).sort((a, b) => {
    const aMin = Math.min(...a.fields.map((f) => f.rank))
    const bMin = Math.min(...b.fields.map((f) => f.rank))
    return aMin - bMin
  })

  return _cache
}

export function getUniversityBySlug(slug: string): UniversityDetail | undefined {
  return getAllUniversities().find((u) => u.slug === slug)
}
