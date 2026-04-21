import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

export type MobileTabId = 'about' | 'programs' | 'how' | 'contact' | 'diagnosis' | 'report'

interface Tab {
  id: MobileTabId
  label: string
  to: string
  icon: string
}

interface Props {
  activeTab?: MobileTabId
}

export function MobileBottomNav({ activeTab }: Props) {
  const { t } = useLanguage()
  const { isAdmin } = useAuth()

  const tabs = useMemo<Tab[]>(() => {
    const base: Tab[] = [
      { id: 'about',    label: t.bottom_about,    to: '/about',           icon: 'info' },
      { id: 'how',      label: t.bottom_how,      to: '/how-it-works',    icon: 'route' },
      { id: 'programs', label: t.bottom_programs, to: '/services',        icon: 'layers' },
      { id: 'contact',  label: t.bottom_contact,  to: '/consultation',    icon: 'mail' },
    ]
    if (!isAdmin) return base
    return [
      ...base,
      { id: 'diagnosis', label: t.bottom_diagnosis, to: '/admin/students',  icon: 'analytics' },
    ]
  }, [t, isAdmin])

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl flex justify-around items-center px-2 py-3 z-50 border-t border-outline-variant/10">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <Link
            key={tab.id}
            to={tab.to}
            className={`flex flex-col items-center gap-1 ${isActive ? 'text-secondary font-bold' : 'text-on-surface-variant/40'}`}
          >
            <span
              className="material-symbols-outlined text-lg"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {tab.icon}
            </span>
            <span className="text-[8px] font-label uppercase tracking-widest">{tab.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
