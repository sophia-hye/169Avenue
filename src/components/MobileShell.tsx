import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { MobileTopBar } from './MobileTopBar'
import { MobileBottomNav, type MobileTabId } from './MobileBottomNav'
import { useLanguage } from '../context/LanguageContext'

interface MobileShellProps {
  children: ReactNode
  activeTab?: MobileTabId
}

export function MobileShell({ children, activeTab }: MobileShellProps) {
  return (
    <>
      <MobileTopBar />
      <div className="md:hidden">
        <main className="pt-20 pb-24">
          {children}
        </main>
      </div>
      <MobileBottomNav activeTab={activeTab} />
    </>
  )
}

export function MobileFooter() {
  const { t } = useLanguage()
  return (
    <footer className="md:hidden bg-surface-container-low py-12 px-6 flex flex-col items-center text-center gap-6 mb-16">
      <div className="font-headline italic text-lg text-primary">169 Avenue</div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <Link to="/" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">{t.home}</Link>
        <Link to="/services" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">{t.nav_programs}</Link>
        <Link to="/consultation" className="text-sm font-body text-on-surface-variant/50 hover:text-primary transition-colors">{t.nav_consult}</Link>
      </div>
      <div className="text-[10px] font-body text-on-surface-variant/30">{t.copyright_short}</div>
    </footer>
  )
}
