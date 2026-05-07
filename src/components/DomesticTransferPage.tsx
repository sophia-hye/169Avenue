import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function PageContent() {
  const { t } = useLanguage()

  return (
    <>
      <div className="hidden md:block px-6 md:px-16 max-w-screen-2xl mx-auto mb-8 md:mb-12">
        <Link to="/domestic" className="inline-flex items-center space-x-3 group">
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">{t.domdet_back_to_domestic}</span>
        </Link>
      </div>

      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4 block">
          {t.trans_eyebrow}
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-none mb-6">
          {t.trans_h1_1} <br /><span className="italic">{t.trans_h1_2}</span>
        </h1>
        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl mb-4">
          {t.trans_intro}
        </p>
        <p className="font-headline italic text-xl md:text-2xl text-primary/70 max-w-2xl">
          {t.trans_quote}
        </p>
      </header>

      {/* Process Steps */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-10 block">{t.domdet_our_process}</span>
        <div className="space-y-16 md:space-y-20">
          {t.trans_steps.map((step) => (
            <div key={step.number} className="grid grid-cols-12 gap-4 md:gap-8">
              <div className="col-span-2 md:col-span-1">
                <span className="font-headline italic text-4xl md:text-5xl text-outline-variant/30">{step.number}</span>
              </div>
              <div className="col-span-10 md:col-span-8">
                <h3 className="font-headline text-xl md:text-2xl text-primary mb-3">{step.title}</h3>
                <p className="font-body text-on-surface-variant leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MiniCTA */}
      <div className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="bg-surface-container-lowest p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-headline italic text-xl md:text-2xl text-primary leading-snug text-center md:text-left">
            {t.trans_mini_cta}
          </p>
          <Link to="/consultation" className="shrink-0 bg-primary text-on-primary px-8 py-4 text-sm tracking-widest uppercase hover:bg-secondary transition-all duration-300">
            {t.trans_free_assessment}
          </Link>
        </div>
      </div>

      {/* Key Considerations */}
      <section className="bg-surface-container-low py-20 md:py-32 px-6 md:px-16">
        <div className="max-w-screen-2xl mx-auto">
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-4 block">{t.trans_consid_eyebrow}</span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-12">{t.trans_considerations_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {t.trans_considerations.map((item) => (
              <div key={item.icon} className="space-y-4">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                </div>
                <h4 className="font-headline text-lg text-primary">{item.title}</h4>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32 mt-20 md:mt-32">
        <div className="bg-surface-container-lowest p-8 md:p-16 shadow-sm">
          <h3 className="font-headline text-2xl md:text-3xl text-primary mb-3">{t.domdet_what_you_get}</h3>
          <p className="font-headline italic text-lg text-secondary mb-8">{t.trans_after_consult}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.trans_results.map((r) => (
              <div key={r.icon} className="border border-outline-variant/15 p-6">
                <span className="material-symbols-outlined text-secondary text-2xl mb-4 block">{r.icon}</span>
                <h4 className="font-headline text-lg text-primary mb-2">{r.title}</h4>
                <p className="font-body text-xs text-on-surface-variant">{r.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-5xl italic mb-8 md:mb-12 leading-tight">{t.trans_cta_title}</h2>
          <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
            {t.domdet_book_consultation}
          </Link>
        </div>
      </section>
    </>
  )
}

export function DomesticTransferPage() {
  const { t } = useLanguage()
  usePageTitle(t.trans_page_title)
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><PageContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="about"><PageContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
