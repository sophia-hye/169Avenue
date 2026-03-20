import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface MobileShellProps {
  children: ReactNode
  activeTab?: 'destinations' | 'stories' | 'fields' | 'contact' | 'agency'
}

export function MobileShell({ children, activeTab }: MobileShellProps) {
  const tabClass = (tab: string) =>
    activeTab === tab
      ? 'flex flex-col items-center gap-1 text-secondary font-bold'
      : 'flex flex-col items-center gap-1 text-on-surface-variant/40'

  const iconStyle = (tab: string) =>
    activeTab === tab ? { fontVariationSettings: "'FILL' 1" } : {}

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

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl flex justify-around items-center px-4 py-3 z-50 border-t border-outline-variant/10">
        <Link to="/destinations" className={tabClass('destinations')}>
          <span className="material-symbols-outlined" style={iconStyle('destinations')}>school</span>
          <span className="text-[9px] font-label uppercase tracking-widest">Destinations</span>
        </Link>
        <Link to="/stories" className={tabClass('stories')}>
          <span className="material-symbols-outlined" style={iconStyle('stories')}>auto_stories</span>
          <span className="text-[9px] font-label uppercase tracking-widest">Stories</span>
        </Link>
        <Link to="/field" className={tabClass('fields')}>
          <span className="material-symbols-outlined" style={iconStyle('fields')}>edit_note</span>
          <span className="text-[9px] font-label uppercase tracking-widest">Fields</span>
        </Link>
        <Link to="/consultation" className={tabClass('contact')}>
          <span className="material-symbols-outlined" style={iconStyle('contact')}>mail</span>
          <span className="text-[9px] font-label uppercase tracking-widest">Contact</span>
        </Link>
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
        <Link to="/about" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">About</Link>
        <Link to="/consultation" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">Contact</Link>
      </div>
      <div className="text-[10px] font-body text-on-surface-variant/30">&copy; 2025 169 Avenue.</div>
    </footer>
  )
}
