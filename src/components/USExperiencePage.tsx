import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function USExperienceContent() {
  const { t } = useLanguage()

  return (
    <>
      {/* Header */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
          {t.usexp_tag}
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1] mb-6">
          {t.usexp_title_line1}<br /><span className="italic">{t.usexp_title_line2}</span>
        </h1>
        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
          {t.usexp_intro}
        </p>
      </header>

      {/* Philosophy */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="bg-surface-container-low p-8 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-headline italic text-2xl md:text-3xl text-primary leading-snug mb-6 whitespace-pre-line">
                {t.usexp_quote}
              </h2>
              <p className="font-body text-on-surface-variant text-base leading-relaxed">
                {t.usexp_quote_body}
              </p>
            </div>
            <div className="bg-surface p-8 border border-outline-variant/15">
              <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">
                {t.usexp_where_fits}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-headline text-sm text-on-surface-variant/30">01</span>
                  <div>
                    <span className="font-body text-sm text-on-surface-variant">{t.usexp_step1_label}</span>
                    <span className="font-body text-xs text-on-surface-variant/50 ml-2">{t.usexp_step1_sub}</span>
                  </div>
                </div>
                <div className="h-px bg-outline-variant/15" />
                <div className="flex items-center gap-4">
                  <span className="font-headline text-sm text-secondary">02</span>
                  <div>
                    <span className="font-body text-sm text-primary font-medium">{t.usexp_step2_label}</span>
                    <span className="font-body text-xs text-secondary ml-2">{t.usexp_step2_sub}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="mb-14">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
            {t.usexp_program_tag}
          </span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary tracking-tight">
            {t.usexp_program_title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.usexp_pillars.map((pillar, i) => {
            const isOdd = i % 2 === 0
            const wrapperClass = i < 2
              ? `bg-surface-container-lowest shadow-sm p-8 md:p-10${isOdd ? ' border-l-4 border-secondary' : ''}`
              : `bg-surface-container-low p-8 md:p-10${isOdd ? ' border-l-4 border-secondary' : ''}`
            const subClass = isOdd
              ? 'font-label text-[10px] uppercase tracking-widest text-secondary mb-6'
              : 'font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40 mb-6'
            return (
              <div key={pillar.title} className={wrapperClass}>
                <span className="font-headline italic text-4xl text-secondary/40 block mb-6">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-headline text-xl text-primary mb-2">{pillar.title}</h3>
                <p className={subClass}>{pillar.sub}</p>
                {'body' in pillar && pillar.body && (
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">{pillar.body}</p>
                )}
                <ul className="space-y-3">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 font-body text-sm text-on-surface-variant leading-relaxed">
                      <span className="material-symbols-outlined text-secondary text-xs mt-1 shrink-0">check</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Differentiator */}
      <section className="bg-surface-container-low py-16 md:py-24 px-6 md:px-16 mb-16 md:mb-24">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-headline italic text-2xl md:text-3xl text-primary leading-snug">
            {t.usexp_diff_line1}<br /><br />
            <span className="text-secondary">{t.usexp_diff_highlight}</span>
            <br /><br />
            {t.usexp_diff_line2.split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* What Parents Get */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
              {t.usexp_parents_tag}
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-primary tracking-tight mb-8">
              {t.usexp_parents_title}
            </h2>
            <ul className="space-y-4">
              {t.usexp_parents_items.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-base text-primary leading-relaxed">
                  <span className="material-symbols-outlined text-secondary text-sm mt-1 shrink-0">check</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center">
            <div className="bg-surface-container-lowest shadow-sm p-8 md:p-10 w-full">
              <p className="font-headline italic text-lg text-primary leading-relaxed mb-6">
                {t.usexp_parents_quote}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg">arrow_forward</span>
                  <span className="font-body text-sm text-on-surface-variant">
                    {t.usexp_step1_label} {t.usexp_flow_domestic} — {t.usexp_flow_domestic_sub}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg">arrow_forward</span>
                  <span className="font-body text-sm text-primary font-medium">
                    {t.usexp_flow_overseas_label} — {t.usexp_flow_overseas_sub}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <p className="font-headline italic text-xl md:text-2xl text-on-primary/70 mb-4">
            {t.usexp_cta_pre}
          </p>
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-12">
            {t.usexp_cta_quote}
          </p>
          <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
            {t.usexp_cta_btn}
          </Link>
        </div>
      </section>
    </>
  )
}

export function USExperiencePage() {
  const { t } = useLanguage()
  usePageTitle(t.usexp_page_title)
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><USExperienceContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="partners"><USExperienceContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
