import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function BlogContent() {
  const { t } = useLanguage()

  return (
    <div className="px-6 md:px-16 max-w-screen-2xl mx-auto py-16 md:py-24">
      <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
        {t.blog_tag}
      </span>
      <h1 className="font-headline text-4xl md:text-6xl text-primary tracking-tighter leading-[1] mb-8">
        {t.blog_title}
      </h1>
      <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
        {t.blog_body}
      </p>
    </div>
  )
}

export function BlogPage() {
  usePageTitle('Blog')
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><BlogContent /></main>
        <Footer />
      </div>
      <MobileShell><BlogContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
