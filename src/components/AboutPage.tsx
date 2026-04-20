import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'
import { MidPageCTA } from './PageCTA'

function AboutContent() {
  const { t } = useLanguage()

  return (
    <>
      {/* ① Hero */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
          {t.about_tag}
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1] mb-8">
          {t.about_title_line1}<br /><span className="italic">{t.about_title_line2}</span>
        </h1>
      </header>

      {/* ② Problem Definition */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="bg-surface-container-low p-8 md:p-16">
          <p className="font-body text-on-surface-variant text-base md:text-lg leading-[1.9] max-w-3xl">
            {t.about_problem}
          </p>
        </div>
      </section>

      {/* ③ Solution */}
      <section className="bg-primary text-on-primary py-20 md:py-32 px-6 md:px-16 mb-20 md:mb-32">
        <div className="max-w-screen-2xl mx-auto max-w-3xl">
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-8">
            {t.about_solution_quote}
          </p>
          <p className="font-body text-on-primary/80 text-base md:text-lg leading-relaxed mb-8">
            {t.about_solution_body}
          </p>
          <div className="h-[2px] w-16 bg-secondary" />
        </div>
      </section>

      {/* ④ What We Do */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <p className="font-body text-on-surface-variant text-sm md:text-base mb-10">
          {t.about_what_we_do_intro}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.about_what_we_do.map((s) => (
            <div key={s.icon} className="bg-surface-container-low p-8 md:p-10">
              <span className="material-symbols-outlined text-secondary text-3xl mb-6 block">{s.icon}</span>
              <h3 className="font-headline text-xl text-primary mb-3">{s.title}</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <MidPageCTA />

      {/* ⑤ Our Approach */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-4">
              {t.about_approach_title}
            </h2>
            <p className="font-headline italic text-xl md:text-2xl text-primary/60">
              {t.about_approach_subtitle}
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="space-y-0">
              {t.about_methods.map((m, i) => (
                <li key={i} className="flex items-center gap-4 py-5 border-b border-outline-variant/20">
                  <span className="material-symbols-outlined text-secondary text-sm">check</span>
                  <span className="font-body text-base text-on-surface-variant">{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ⑥ Results */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="bg-surface-container-lowest p-8 md:p-16 shadow-sm">
          <h2 className="font-headline text-2xl md:text-3xl text-primary mb-3">
            {t.about_results_title}
          </h2>
          <p className="font-headline italic text-xl md:text-2xl text-secondary mb-10">
            {t.about_results_subtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about_results.map((r) => (
              <div key={r.icon} className="border border-outline-variant/15 p-6">
                <span className="material-symbols-outlined text-secondary text-2xl mb-4 block">{r.icon}</span>
                <h4 className="font-headline text-lg text-primary mb-2">{r.title}</h4>
                <p className="font-body text-xs text-on-surface-variant">{r.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑦ Differentiator */}
      <section className="bg-surface-container-low py-16 md:py-24 px-6 md:px-16 mb-20 md:mb-32">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-headline italic text-2xl md:text-3xl text-primary leading-snug">
            {t.about_diff_intro}<br /><br />
            <span className="text-secondary">
              {t.about_diff_highlight.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </span>
            <br /><br />{t.about_diff_outro}
          </p>
        </div>
      </section>

      {/* ⑧ Team */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="mb-12">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold mb-2 block">
            {t.about_team_tag}
          </span>
          <p className="font-body text-on-surface-variant text-base">
            {t.about_team_intro}
          </p>
        </div>

        {/* Director Card - Full Width */}
        <div className="bg-primary text-on-primary p-8 md:p-12 shadow-sm mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2">{t.about_director_role}</p>
              <h4 className="font-headline text-2xl md:text-3xl mb-2">
                {t.about_director_title}
              </h4>
              <p className="font-body text-on-primary/70 text-base leading-relaxed mb-8">
                {t.about_director_body}
              </p>
              <ul className="space-y-3">
                {t.about_director_bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm font-body text-on-primary/80 leading-relaxed">
                    <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">check</span>{b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <div className="w-full bg-on-primary/5 border border-on-primary/10 p-8">
                <p className="font-headline italic text-lg text-on-primary/90 leading-relaxed">
                  {t.about_director_quote}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.about_specialists.map((sp) => (
            <div key={sp.title} className="bg-surface-container-lowest p-8 shadow-sm border-l-4 border-secondary">
              <h4 className="font-headline text-lg text-primary mb-1">
                {sp.title}
              </h4>
              <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">
                {sp.sub}
              </p>
              <ul className="space-y-2">
                {sp.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm font-body text-on-surface-variant leading-relaxed">
                    <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">check</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="font-body text-on-surface-variant text-sm text-center mt-10 max-w-2xl mx-auto leading-relaxed">
          {t.about_team_footer}
        </p>
      </section>

      {/* ⑨ CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <p className="font-headline italic text-xl md:text-2xl text-on-primary/70 mb-4">
            {t.about_cta_pre}
          </p>
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-12">
            {t.about_cta_quote}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
              {t.about_cta_diagnose}
            </Link>
            <Link to="/consultation" className="border border-on-primary/30 text-on-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-surface hover:text-primary transition-all duration-500">
              {t.about_cta_book}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function AboutPage() {
  const { t } = useLanguage()
  usePageTitle(t.about_page_title)
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><AboutContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="about"><AboutContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
