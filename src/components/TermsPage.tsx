import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'

export function TermsPage() {
  const { t } = useLanguage()

  const content = (
    <div className="max-w-3xl mx-auto px-6 md:px-0 py-16 md:py-24">
      <div className="mb-16">
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4 block">169 Avenue</span>
        <h1 className="font-headline text-5xl md:text-6xl text-primary tracking-tight mb-4">{t.terms_title}</h1>
        <p className="font-body text-sm text-on-surface-variant">{t.terms_updated}</p>
      </div>

      <div className="space-y-14">
        {t.terms_sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-headline text-xl italic text-primary mb-4">{s.title}</h2>
            <p className="font-body text-on-surface-variant leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-10 border-t border-outline-variant/20">
        <Link to="/" className="font-label text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors">
          ← {t.home}
        </Link>
      </div>
    </div>
  )

  return (
    <div className="bg-surface">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <main className="hidden md:block pt-32 pb-20 max-w-screen-lg mx-auto px-8 md:px-16">
        {content}
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <MobileShell>{content}</MobileShell>
    </div>
  )
}
