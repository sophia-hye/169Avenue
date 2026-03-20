import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { useLanguage } from '../context/LanguageContext'

function MobileAbout() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  return (
    <div className="md:hidden">
      {/* Mobile Top Bar */}
      <header className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}>
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <Link to="/" className="font-headline text-2xl font-bold tracking-tighter text-primary">169 Avenue</Link>
        </div>
        <Link
          to="/consultation"
          className="bg-primary text-on-primary px-4 py-2 font-body text-xs uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95"
        >
          {t.nav_consult}
        </Link>
      </header>

      <main className="pt-24 pb-32">
        {/* Hero */}
        <section className="px-6 mb-20">
          <div className="mb-4">
            <span className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">{t.about_tag}</span>
          </div>
          <h2 className="font-headline italic text-5xl text-primary leading-[0.95] tracking-tight mb-8">
            {t.about_title}
          </h2>
          <div className="w-full h-[400px] overflow-hidden grayscale">
            <img
              alt="Classical library architecture"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaEoay5g6u34JFGZrJmfZBE7WkO3dkyrBDrzybWjtJlV6khyy6anZ-Hs37lnZ6Qsf6Ha5rUJWybWg2fBaixahp1TuAmEVPO9_3ei_i0j3GWSi0i_vsGuAmxxYNQfqbu9-XxDnHaBqVFwPVsjOylbwz7r5o0AxSGhubJNq6VEj6InQ17Qz3Ww1DJMXwZ7aYePcqj4pfr9L9nMa25Pp0BIfrtrZzkEhCu6L0dw_O7aWFGedXXBzEsx3SpoinE8jiFNyKJwGkD63kspg"
            />
          </div>
        </section>

        {/* Pillars */}
        <section className="px-6 space-y-20 mb-28">
          {t.about_pillars.map((pillar, i) => (
            <div key={i} className="flex flex-col gap-4">
              <div className="flex items-baseline gap-4">
                <span className="font-headline italic text-4xl text-outline-variant opacity-40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-headline text-3xl text-primary tracking-tight">{pillar.title}</h3>
              </div>
              <div className="pl-12">
                <p className="text-on-surface-variant leading-relaxed font-light text-lg">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Service Tiers */}
        <section className="bg-surface-container-low py-20 px-6 space-y-12">
          <div className="text-center mb-8">
            <h4 className="font-label uppercase tracking-[0.2em] text-xs text-secondary mb-2">{t.mobile_offerings}</h4>
            <div className="h-[1px] w-8 bg-secondary mx-auto" />
          </div>

          {/* Bespoke */}
          <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h5 className="font-headline text-2xl text-primary">{t.about_bespoke_title}</h5>
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              {t.mobile_bespoke_body}
            </p>
            <Link
              to="/consultation"
              className="block w-full bg-primary text-on-primary py-4 font-label uppercase tracking-widest text-[10px] font-bold text-center active:scale-95 transition-all"
            >
              {t.inquire}
            </Link>
          </div>

          {/* Targeted */}
          <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h5 className="font-headline text-2xl text-primary">{t.about_targeted_title}</h5>
              <span className="material-symbols-outlined text-secondary">auto_stories</span>
            </div>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              {t.mobile_targeted_body}
            </p>
            <Link
              to="/consultation"
              className="block w-full bg-surface border border-primary text-primary py-4 font-label uppercase tracking-widest text-[10px] font-bold text-center active:scale-95 transition-all hover:bg-primary hover:text-on-primary"
            >
              {t.inquire}
            </Link>
          </div>
        </section>

        {/* Editorial Quote */}
        <section className="px-6 -mt-8 relative z-10">
          <div className="bg-surface-container-lowest p-10 shadow-2xl">
            <span className="material-symbols-outlined text-secondary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <p className="font-headline italic text-2xl text-primary leading-snug tracking-tight">
              {t.mobile_quote_about}
            </p>
            <div className="mt-6">
              <p className="font-label uppercase tracking-widest text-[10px] font-bold text-primary">-- Dr. Alistair Vance</p>
              <p className="font-label text-[10px] text-on-surface-variant italic">Director of Curation</p>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Footer */}
      <footer className="bg-surface-container-low w-full py-12 px-6 flex flex-col items-center text-center gap-6">
        <div className="font-headline italic text-lg text-primary">169 Avenue</div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="text-on-surface-variant/60 text-sm font-body hover:text-primary transition-colors">{t.home}</Link>
          <Link to="/partners" className="text-on-surface-variant/60 text-sm font-body hover:text-primary transition-colors">{t.nav_partners}</Link>
          <Link to="/consultation" className="text-on-surface-variant/60 text-sm font-body hover:text-primary transition-colors">{t.nav_consult}</Link>
        </div>
        <p className="text-on-surface-variant/40 text-xs font-body">{t.copyright}</p>
      </footer>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl flex justify-around items-center px-2 py-3 z-50 border-t border-outline-variant/10">
        <Link to="/about" className="flex flex-col items-center gap-1 text-secondary font-bold">
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_about}</span>
        </Link>
        <Link to="/partners" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">handshake</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_partners}</span>
        </Link>
        <Link to="/field" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">school</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_field}</span>
        </Link>
        <Link to="/destinations" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">public</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_destinations}</span>
        </Link>
        <Link to="/stories" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">auto_stories</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_stories}</span>
        </Link>
      </nav>
    </div>
  )
}

export function AboutPage() {
  const { t } = useLanguage()
  return (
    <div className="bg-surface selection:bg-secondary-container">
      {/* Desktop */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      <main className="hidden md:block pt-24">
        {/* Hero Section */}
        <section className="px-8 md:px-16 pt-20 pb-32 max-w-screen-2xl mx-auto overflow-hidden">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-7 mb-12">
              <h1 className="font-headline text-6xl md:text-8xl text-primary leading-[0.9] tracking-tight mb-8">
                {t.about_title}
              </h1>
              <div className="md:grid md:grid-cols-2 gap-8">
                <div className="col-start-2">
                  <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                    {t.about_hero_body_1}
                  </p>
                  <p className="font-body text-lg text-on-surface-variant leading-relaxed mt-6">
                    {t.about_hero_body_2}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="relative w-full aspect-[21/9] overflow-hidden">
                <img
                  alt="Classical Library"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjDuyxJt_PGfsC1bXlc7cpsgCXl-lryDzsR5AAtJ8phIcHLekrsyLChbobNrSzHshi_1bBFGhV7vYHNu4GBd9hkShvP5rUVS2drPYonEuDEX0yCo247sCERMJz8P9uRJPzZPAkEUAyZ5c9aQUFsJJ2HNFyK-lVT6WuDXq1iFyXph1r0kd6IUdflsZsyJpq5KVWhZCev-i-ZBVSbmVKiR2LvYAuk8NMI3R0XfB9etz23Exd2ZFEenyikGpf-PkW0xJxjQbaxcpRzv8"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="bg-surface-container-low py-32 px-8 md:px-16">
          <div className="max-w-screen-2xl mx-auto">
            <div className="mb-20">
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">{t.about_methodology_tag}</span>
              <h2 className="font-headline text-4xl md:text-5xl text-primary mt-4">{t.about_methodology_title}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-16 md:gap-8">
              {t.about_pillars.map((pillar, i) => (
                <div key={i} className="group">
                  <span className="font-headline text-7xl md:text-8xl text-outline-variant/30 italic block mb-6 group-hover:text-secondary/50 transition-colors duration-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-headline text-3xl text-primary mb-6">{pillar.title}</h3>
                  <p className="font-body text-on-surface-variant leading-relaxed mb-8">{pillar.description}</p>
                  <div className="h-px w-0 group-hover:w-full bg-secondary transition-all duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Tiers */}
        <section className="py-32 px-8 md:px-16 bg-surface">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="font-headline text-4xl md:text-5xl text-primary italic mb-4">{t.about_engaging_title}</h2>
              <p className="font-body text-on-surface-variant uppercase tracking-widest text-sm">{t.about_engaging_sub}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-outline-variant/20">
              <div className="bg-surface p-12 md:p-16 flex flex-col items-start border-r border-outline-variant/10">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">{t.about_comprehensive}</span>
                <h3 className="font-headline text-3xl text-primary mb-8">{t.about_bespoke_title}</h3>
                <p className="font-body text-on-surface-variant mb-12 leading-relaxed italic text-lg">{t.about_bespoke_body}</p>
                <ul className="space-y-6 w-full mb-12">
                  {t.about_bespoke_features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4 text-sm font-body border-b border-outline-variant/10 pb-4">
                      <span className="material-symbols-outlined text-secondary">check</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/consultation" className="mt-auto w-full py-4 bg-primary text-on-primary font-label text-xs uppercase tracking-widest text-center block hover:bg-secondary transition-colors">{t.about_apply}</Link>
              </div>
              <div className="bg-surface p-12 md:p-16 flex flex-col items-start">
                <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">{t.about_milestone}</span>
                <h3 className="font-headline text-3xl text-primary mb-8">{t.about_targeted_title}</h3>
                <p className="font-body text-on-surface-variant mb-12 leading-relaxed italic text-lg">{t.about_targeted_body}</p>
                <ul className="space-y-6 w-full mb-12">
                  {t.about_targeted_features.map((feature) => (
                    <li key={feature.label} className={`flex items-center gap-4 text-sm font-body border-b border-outline-variant/10 pb-4 ${feature.included ? '' : 'opacity-40'}`}>
                      <span className="material-symbols-outlined">{feature.included ? 'check' : 'close'}</span>
                      {feature.label}
                    </li>
                  ))}
                </ul>
                <Link to="/consultation" className="mt-auto w-full py-4 border border-outline text-primary font-label text-xs uppercase tracking-widest text-center block hover:bg-surface-container-low transition-colors">{t.about_book}</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Quote */}
        <section className="relative py-48 bg-primary text-on-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img alt="Minimal Architecture" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLJ-HcGwAaBfcmIISTJhzbHBZZhGxwmR4sTSLNHJdMbVn9s5vAfxHlLzfD1ujN3hVv5-dU2ZnW3WA_njz_29xGG7T4CHqme83IPBuce5TYlLUXornqxkiihLfJvsCb7kFni4Pc5l9sQBxFLrZf_7hDO2v7Hp3LRbMhekZZuEzsg9BjlELxg5a2dWUmubeoLw9FuHC9HFHLvhk7nJAOCFhLcscTtf6ze1bRTpUwwnQLA_C5T7u4lJcLjQlAgYcxFEJ4Akdkae3RN_0" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
            <span className="material-symbols-outlined text-secondary text-5xl mb-8 block" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <blockquote className="font-headline text-3xl md:text-5xl leading-snug italic font-light">
              {t.about_quote}
            </blockquote>
            <div className="mt-12 h-px w-24 bg-secondary mx-auto" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 bg-surface px-8 text-center">
          <h2 className="font-headline text-5xl md:text-7xl text-primary mb-12">{t.about_final_title}</h2>
          <p className="font-body text-on-surface-variant max-w-xl mx-auto mb-16 text-lg">
            {t.about_final_body}
          </p>
          <Link to="/consultation" className="inline-block px-12 py-5 bg-primary text-on-primary font-label text-sm uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-300">
            {t.about_final_cta}
          </Link>
        </section>
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile */}
      <MobileAbout />
    </div>
  )
}
