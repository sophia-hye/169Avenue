import { useEffect } from 'react'

const BASE = '169 Avenue'

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} | 해외고 한국대 입시 · 해외 진학 컨설팅`
  }, [title])
}
