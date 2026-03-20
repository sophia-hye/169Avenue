import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface MobileShellProps {
  children: ReactNode
  activeTab?: 'about' | 'destinations' | 'field' | 'stories' | 'consultation'
}

const TABS = [
  { id: 'about', label: 'About', to: '/about', icon: 'info' },
  { id: 'destinations', label: 'Destinations', to: '/destinations', icon: 'public' },
  { id: 'field', label: 'Field', to: '/field', icon: 'school' },
  { id: 'stories', label: 'Stories', to: '/stories', icon: 'auto_stories' },
  { id: 'consultation', label: 'Consultation', to: '/consultation', icon: 'mail' },
] as const

export function MobileShell({ children, activeTab }: MobileShellProps) {
  return (
    <div className="md:hidden">
      {/* Mobile Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center w-full px-6 py-4">
        <Link to="/">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </Link>
        <Link to="/" className="text-xl font-headline italic text-primary tracking-tight">169 Avenue</Link>
        <div className="w-6" />
      </header>

      {/* Content */}
      <main className="pt-20 pb-24">
        {children}
      </main>

      {/* Bottom Nav - 5 tabs matching desktop menu */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl flex justify-around items-center px-2 py-3 z-50 border-t border-outline-variant/10">
        {TABS.map((tab) => {
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
    </div>
  )
}

export function MobileFooter() {
  return (
    <footer className="md:hidden bg-surface-container-low py-12 px-6 flex flex-col items-center text-center gap-6 mb-16">
      <div className="font-headline italic text-lg text-primary">169 Avenue</div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <Link to="/" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">Home</Link>
        <Link to="/partners" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">Partners</Link>
        <Link to="/consultation" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">Consultation</Link>
      </div>
      <div className="text-[10px] font-body text-on-surface-variant/30">&copy; 2025 169 Avenue.</div>
    </footer>
  )
}
