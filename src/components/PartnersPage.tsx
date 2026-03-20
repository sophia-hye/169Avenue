import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { SearchOverlay } from './SearchOverlay'
import { useLanguage } from '../context/LanguageContext'

const HEAD_CURATOR_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSogN2yuQSIB2WFYGDJCgeHPqOmNm8zH-GhptcoYSVqNcS-ftEpmjVaGvlNp6PUty0vUKtGVq4Mn1HJHrbSiiWqZIkMyoiWgkhk6AeozQc-74cHuYcVR_bWWZet_znnuueASKRCVFBGq62gttEEeBtbaZEr3UZ_x5IMj1OqvkfS3T6PjGWuy326fKG7TEymIxAvCLznaB0ix3KceeMHqsu8nF0Od4H7r9K6eJ5fedEP1nKYhQ0PJhTymTHW-3ZUSx6MntH8x5vzQY'

const CURATOR_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCI3u0WZAPn4zsTTIaFSz2naiEUT1HGVkZ_433tyLQFbbPlst51xsed-qkE451LHYUSMNgkpFO5wBmDv6vZkFcRaIg3zsLxkDL0558SDExr3ftWkZMqYgSLBSTOyXOrwRy4PVuU3W1ADFklF7ttLK_RsUdtpgrgzFA5nDMolbEyTiS9n2JFFV3D3JK6MrfEgOgdnLWhSffld8PhRkiZxZTCm4q8ckLrFnb1XvH1hkwkQaoS3wAteQPvRLOsqnpiItOmP1SoqipT6ug',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBWBWB9Nt1Oc8ydni8l6XQRokXm0cd1A2PZD8k8cGbUHqPtFRAVexpaBZVZSmsYSQNLutZhdkvGTz0446sOqs5ah5TaOUbqLy1mmeXPYFMDeAvUKrPDuaQhcsx0VlXzhwK1zJbmiwN9OBoKkBb4OGMBHp9FOw6_A99DvNf4JimYCRQrVxTem7RVYPm4A-v0XORnG9lhbKkZ4dsMQsKbaXbjI7F4hn0JQGWPXXX4g-gHp47Ybn-5PIewmk4rTLsaDgaSogNQQ911qOg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDLBr8X8SHLdaAkJqwYup39DoONL5j3zOs3VV-CJFE1Fj5plqMD3aF0oRh2KNurLZTu176Wc2D9HoiNa2p5Tl3VYPLnwV4Xj3L0JtQTkPbFQ_uOmTCbfSiogCYs9FvY_A6wUKRR2ghbMbCDTx80M5UfcLkkVmOJGB6oaL0N8mmvxbXqG_uPoRGFn0b-h-urrlbO9lMmpuKyIo68TiTbb8NgDmdKQVibiZhCG7PQT7NPX2euF-imprluMBQewPpSQfGbCenl-NIEg-M',
]

function MobilePartners() {
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguage()
  const [searchOpen, setSearchOpen] = useState(false)
  return (
    <div className="md:hidden">
      {/* Mobile Top Bar */}
      <header className="fixed top-0 z-50 w-full bg-surface/80 backdrop-blur-md flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-2">
          <button onClick={() => window.history.length > 1 ? navigate(-1) : navigate('/')}>
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <Link to="/" className="font-headline text-2xl font-bold tracking-tighter text-primary">169 Avenue</Link>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(true)} className="text-primary/70 p-1" aria-label="Search">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <div className="flex items-center border border-outline-variant/30 overflow-hidden">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 font-label text-[10px] uppercase tracking-widest transition-colors duration-200 ${language === 'en' ? 'bg-outline-variant/30 text-primary' : 'text-primary/40'}`}
            >EN</button>
            <span className="w-px h-3 bg-outline-variant/30" />
            <button
              onClick={() => setLanguage('ko')}
              className={`px-2 py-1 font-label text-[10px] uppercase tracking-widest transition-colors duration-200 ${language === 'ko' ? 'bg-outline-variant/30 text-primary' : 'text-primary/40'}`}
            >한</button>
          </div>
          <Link
            to="/consultation"
            className="bg-primary text-on-primary px-3 py-1.5 font-body text-[10px] uppercase tracking-widest hover:bg-secondary transition-all duration-300 active:scale-95"
          >
            {t.nav_consult}
          </Link>
        </div>
      </header>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      <main className="pt-20 pb-24">
        {/* Hero */}
        <section className="px-6 py-12">
          <h2 className="text-5xl font-headline italic tracking-tight text-primary mb-12">
            {t.partners_title}
          </h2>

          {/* Head Curator Spotlight */}
          <div className="relative mb-20">
            <div className="aspect-[3/4] overflow-hidden bg-surface-container-low mb-8">
              <img alt="Dr. Alistair Vance" className="w-full h-full object-cover grayscale contrast-125" src={HEAD_CURATOR_IMAGE} />
            </div>
            <div className="bg-surface-container-lowest p-8 -mt-24 relative z-10 mx-4 shadow-sm">
              <p className="text-xs font-label uppercase tracking-[0.1em] text-secondary mb-4">{t.partners_head_tag}</p>
              <p className="text-2xl font-headline italic tracking-tight leading-relaxed text-on-surface">
                {t.mobile_head_quote}
              </p>
              <p className="mt-6 text-sm font-label font-bold text-primary">-- DR. ALISTAIR VANCE</p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="px-6 space-y-20">
          <div className="border-t border-outline-variant opacity-20 pt-12">
            <p className="text-xs font-label uppercase tracking-[0.1em] text-on-surface-variant mb-12">{t.partners_council}</p>
            <div className="flex flex-col gap-16">
              {t.curators.map((curator, i) => (
                <article key={curator.name} className="group">
                  <div className="aspect-square overflow-hidden bg-surface-container-low mb-6">
                    <img alt={curator.name} className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" src={CURATOR_IMAGES[i]} />
                  </div>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="text-2xl font-headline italic text-primary">{curator.name}</h3>
                      <p className="text-sm font-body text-on-surface-variant">{curator.role}</p>
                    </div>
                    <span className="material-symbols-outlined text-secondary text-lg">arrow_outward</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24 px-6 mb-12">
          <div className="bg-surface-container-low p-10 flex flex-col items-center text-center">
            <h4 className="text-3xl font-headline italic mb-8">{t.mobile_partners_cta_title}</h4>
            <Link to="/consultation" className="block w-full bg-primary text-on-primary py-4 px-8 font-label text-xs uppercase tracking-[0.1em] text-center hover:bg-secondary transition-colors duration-300">
              {t.schedule_consultation}
            </Link>
          </div>
        </section>
      </main>

      {/* Mobile Footer */}
      <footer className="bg-surface-container-low w-full py-12 px-6 flex flex-col items-center text-center gap-6">
        <h5 className="font-headline italic text-lg text-primary">169 Avenue</h5>
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/" className="text-on-surface-variant/60 text-sm font-body hover:text-primary transition-colors">{t.home}</Link>
          <Link to="/about" className="text-on-surface-variant/60 text-sm font-body hover:text-primary transition-colors">{t.nav_about}</Link>
          <Link to="/stories" className="text-on-surface-variant/60 text-sm font-body hover:text-primary transition-colors">{t.stories}</Link>
        </div>
        <p className="text-on-surface-variant/40 text-sm font-body mt-4">{t.copyright}</p>
      </footer>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl flex justify-around items-center px-2 py-3 z-50 border-t border-outline-variant/10">
        <Link to="/about" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">info</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_about}</span>
        </Link>
        <Link to="/partners" className="flex flex-col items-center gap-1 text-secondary font-bold">
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
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

export function PartnersPage() {
  const { t } = useLanguage()
  return (
    <div className="bg-surface selection:bg-secondary selection:text-surface">
      {/* Desktop */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      <main className="hidden md:block pt-24">
        {/* Hero: Head Curator */}
        <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center overflow-hidden">
          <div className="w-full md:w-7/12 h-[500px] md:h-screen relative overflow-hidden">
            <img alt="Dr. Alistair Vance, Head Curator" className="w-full h-full object-cover grayscale brightness-90" src={HEAD_CURATOR_IMAGE} />
          </div>
          <div className="w-full md:w-5/12 bg-surface p-8 md:p-20 flex flex-col justify-center z-10">
            <div className="mb-12">
              <span className="font-label uppercase tracking-[0.3em] text-[10px] text-secondary font-semibold block mb-4">{t.partners_tag}</span>
              <h1 className="font-headline text-5xl md:text-7xl leading-[1.1] text-primary tracking-tight">{t.partners_title}</h1>
            </div>
            <div className="bg-surface-container-lowest p-10 md:-ml-32 shadow-2xl shadow-on-surface/5 relative border-l-4 border-secondary" style={{ marginTop: '-4rem' }}>
              <p className="font-headline italic text-2xl md:text-3xl text-on-surface-variant leading-relaxed">
                {t.partners_head_quote}
              </p>
              <div className="mt-8">
                <p className="font-label font-bold text-primary uppercase tracking-widest text-xs">-- Dr. Alistair Vance</p>
                <p className="font-label text-on-surface-variant text-[10px] uppercase tracking-tighter italic">Founder & Head Curator, D.Phil Oxford</p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-32 px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="font-headline text-4xl text-primary leading-tight">{t.partners_head_title}</h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="font-body text-xl text-on-surface-variant leading-relaxed mb-8">
                {t.partners_head_body}
              </p>
              <div className="h-px w-24 bg-secondary/30" />
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="pb-32 px-8 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-surface-container-low">
            {t.curators.map((curator, i) => (
              <div key={curator.name} className={`group relative bg-surface p-1 overflow-hidden border-b border-surface-container-high ${i < 2 ? 'md:border-r' : ''}`}>
                <div className="aspect-[4/5] overflow-hidden">
                  <img alt={curator.name} className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" src={CURATOR_IMAGES[i]} />
                </div>
                <div className="pt-8 pb-12 px-6">
                  <span className="font-label uppercase tracking-[0.2em] text-[9px] text-secondary mb-3 block">{curator.tag}</span>
                  <h3 className="font-headline text-3xl mb-1 text-primary">{curator.name}</h3>
                  <p className="font-label uppercase tracking-tighter text-[10px] text-on-surface-variant mb-6 italic">{curator.role}</p>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed max-w-xs">{curator.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-40 bg-surface-container-low text-center px-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-[0.03] pointer-events-none">
            <span className="font-headline text-[25vw] leading-none whitespace-nowrap">169 AVENUE</span>
          </div>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="font-headline text-5xl md:text-7xl text-primary mb-12">{t.partners_cta_title}</h2>
            <p className="font-body text-on-surface-variant mb-16 max-w-xl mx-auto text-lg">
              {t.partners_cta_body}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/consultation" className="w-full sm:w-auto bg-primary text-on-primary px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-label hover:bg-secondary transition-colors duration-500 text-center">{t.partners_match}</Link>
              <Link to="/about" className="w-full sm:w-auto border border-outline-variant/30 text-primary px-12 py-5 text-[11px] uppercase tracking-[0.3em] font-label hover:bg-primary hover:text-on-primary transition-all duration-500 text-center">{t.partners_philosophy}</Link>
            </div>
          </div>
        </section>
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile */}
      <MobilePartners />
    </div>
  )
}
