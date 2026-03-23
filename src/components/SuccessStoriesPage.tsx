import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { SearchOverlay } from './SearchOverlay'
import { MidPageCTA } from './PageCTA'
import { FEATURED_STORY, STORIES } from '../data/stories'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function MobileStories() {
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguage()
  const [searchOpen, setSearchOpen] = useState(false)
  return (
    <div className="md:hidden">
      {/* Mobile Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center w-full px-4 py-3">
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

      <main className="min-h-screen pt-16 pb-20">
        {/* Header */}
        <header className="px-6 pt-12 pb-8">
          <div className="inline-block border-b border-outline-variant/20 mb-4 pb-1">
            <span className="font-label uppercase text-xs tracking-[0.1em] text-secondary">{t.stories_tag}</span>
          </div>
          <h1 className="font-headline italic text-5xl text-primary tracking-tight leading-none">
            {t.stories_title}
          </h1>
        </header>

        {/* Featured Story */}
        <section className="mb-20 px-6">
          <Link to={`/stories/${FEATURED_STORY.id}`} className="block relative">
            <div className="w-full aspect-[4/5] bg-surface-container-high overflow-hidden">
              <img alt={FEATURED_STORY.name} className="w-full h-full object-cover grayscale transition-transform duration-700 hover:scale-105" src={FEATURED_STORY.image} />
            </div>
            <div className="absolute -bottom-10 right-0 left-8 bg-surface-container-lowest p-8 shadow-sm">
              <p className="font-headline italic text-2xl text-primary leading-tight mb-4">{FEATURED_STORY.quote}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-label text-sm font-bold text-primary">{FEATURED_STORY.name}</p>
                  <p className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">
                    {FEATURED_STORY.classYear} &middot; {FEATURED_STORY.university}
                  </p>
                </div>
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
              </div>
            </div>
          </Link>
        </section>

        <div className="h-16" />

        {/* Gallery of Achievements */}
        <section className="px-6 mb-24">
          <div className="flex items-baseline justify-between mb-10">
            <h2 className="font-headline italic text-3xl text-primary">{t.stories_gallery_title}</h2>
            <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant">{t.vol}</span>
          </div>

          <div className="space-y-16">
            {STORIES.map((story) => (
              <Link key={story.id} to={`/stories/${story.id}`} className="group block">
                <div className="aspect-video w-full bg-surface-container-low mb-6 overflow-hidden">
                  <img alt={story.name} className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-110 transition-transform duration-700" src={story.image} />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-label uppercase text-[10px] tracking-[0.1em] text-secondary">{story.university}</span>
                  <h3 className="font-headline italic text-2xl text-primary">{story.name}</h3>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed max-w-[90%]">{story.description}</p>
                  <div className="mt-4 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                    <span className="font-label text-xs font-bold uppercase tracking-[0.1em]">{t.read_narrative}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Mid-page CTA */}
          <div className="mt-12 bg-surface-container-lowest p-8 shadow-sm text-center">
            <p className="font-headline italic text-xl text-primary mb-6">Have a similar case?</p>
            <Link to="/consultation" className="inline-block bg-primary text-on-primary px-8 py-4 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors">
              Get My Case Analyzed
            </Link>
          </div>

          {/* CTA */}
          <div className="mt-20 bg-primary p-10 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-headline italic text-3xl text-on-primary mb-6 tracking-tight">
                {t.mobile_draft_narrative}
              </h2>
              <p className="font-body text-on-primary/70 text-sm mb-8 px-4">
                {t.mobile_draft_body}
              </p>
              <Link to="/consultation" className="inline-block bg-surface px-10 py-4 font-label uppercase text-xs tracking-[0.1em] text-primary active:scale-95 transition-all">
                {t.begin_consultation}
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-20 -mr-10 -mt-10 blur-3xl" />
          </div>
        </section>
      </main>

      {/* Mobile Footer */}
      <footer className="bg-surface-container-low w-full py-12 px-6 flex flex-col items-center text-center gap-6">
        <span className="font-headline italic text-lg text-primary">169 Avenue</span>
        <nav className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="text-on-surface-variant/60 text-sm font-body hover:text-primary transition-colors">{t.home}</Link>
          <Link to="/about" className="text-on-surface-variant/60 text-sm font-body hover:text-primary transition-colors">{t.nav_about}</Link>
          <Link to="/services" className="text-on-surface-variant/60 text-sm font-body hover:text-primary transition-colors">{t.nav_partners}</Link>
        </nav>
        <p className="text-xs text-on-surface-variant/40 font-body tracking-wide">{t.copyright}</p>
      </footer>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl flex justify-around items-center px-2 py-3 z-50 border-t border-outline-variant/10">
        <Link to="/about" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">info</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_about}</span>
        </Link>
        <Link to="/services" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
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
        <Link to="/stories" className="flex flex-col items-center gap-1 text-secondary font-bold">
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_stories}</span>
        </Link>
      </nav>
      <div className="h-16" />
    </div>
  )
}

export function SuccessStoriesPage() {
  const { t } = useLanguage()
  usePageTitle('Case Studies - 케이스 스터디')
  return (
    <div className="bg-surface selection:bg-secondary/20">
      {/* Desktop */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      <main className="hidden md:block pt-32">
        {/* Hero Header */}
        <header className="px-8 md:px-12 py-20 md:py-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <h1 className="font-headline text-6xl md:text-8xl text-primary tracking-tighter leading-none mb-8">
                {t.stories_hero_title_1} <br />
                <span className="italic">{t.stories_hero_title_2}</span>{t.stories_hero_suffix}
              </h1>
            </div>
            <div className="md:col-span-4 flex items-end">
              <p className="font-body text-on-surface-variant text-lg leading-relaxed border-l border-outline-variant/30 pl-8 pb-2">
                {t.stories_hero_body}
              </p>
            </div>
          </div>
        </header>

        {/* Featured Story */}
        <section className="px-8 md:px-12 mb-32 max-w-full">
          <Link to={`/stories/${FEATURED_STORY.id}`} className="block">
            <div className="grid grid-cols-1 lg:grid-cols-12 bg-surface-container-low min-h-[716px] group cursor-pointer">
              <div className="lg:col-span-7 overflow-hidden relative">
                <img alt="Featured Scholar" className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-1000" src={FEATURED_STORY.image} />
              </div>
              <div className="lg:col-span-5 p-12 md:p-24 flex flex-col justify-center">
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-6 block">
                  {FEATURED_STORY.university} &middot; {FEATURED_STORY.classYear}
                </span>
                <h2 className="font-headline text-4xl md:text-5xl italic mb-10 leading-tight">{FEATURED_STORY.quote}</h2>
                <div className="mb-12">
                  <h3 className="font-headline text-2xl mb-4">{FEATURED_STORY.name}</h3>
                  <p className="font-body text-on-surface-variant leading-relaxed mb-6">{FEATURED_STORY.description}</p>
                </div>
                <div>
                  <span className="inline-flex items-center space-x-4">
                    <span className="font-label text-xs uppercase tracking-widest border-b border-primary pb-1 group-hover:text-secondary group-hover:border-secondary transition-all">
                      {t.read_narrative}
                    </span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Gallery */}
        <section className="px-8 md:px-12 mb-32 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-headline text-4xl italic">{t.stories_gallery_desktop}</h2>
            <div className="hidden md:block h-[1px] flex-grow mx-12 bg-outline-variant/20 mb-3" />
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-400">{t.stories_archive}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {STORIES.map((story) => (
              <Link key={story.id} to={`/stories/${story.id}`} className={`group block ${story.offsetClass}`}>
                <div className="aspect-[4/5] overflow-hidden mb-8">
                  <img alt={`${story.university} Success`} className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-700" src={story.image} />
                </div>
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2 block">{story.university}</span>
                <h4 className="font-headline text-2xl mb-4 group-hover:text-secondary transition-colors">{story.name}</h4>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">{story.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <MidPageCTA text="Have a similar case? Get your strategy designed." buttonText="Get My Case Analyzed" />

        {/* Editorial Insight */}
        <section className="mb-48 relative">
          <div className="max-w-4xl mx-auto px-8 md:px-12 relative z-10">
            <div className="bg-surface-container-lowest p-16 md:p-24 shadow-2xl shadow-black/5 -translate-x-4 md:-translate-x-12">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-12 block">{t.stories_curator_note}</span>
              <blockquote className="font-headline text-3xl md:text-4xl italic leading-tight text-primary mb-12">
                {t.stories_curator_quote}
              </blockquote>
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 rounded-full bg-zinc-200 overflow-hidden grayscale">
                  <img alt="Head Curator" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzc4F2i-wuEPj-Y-8q6Yay1A47dEIa5V4M5UxOaHmL0x4eLBgasNUIf2xcqiRdevhLF420GWnWmtnXmTmpBjkE4XYupzIKg_1y6RylXZ7_rS_5ZurkM0fZUJw6PRrqntUhDD_J_Nfv0fE7ScT-NUdAq64bctc83Av07imoJnhB_4qo1aK7DJS4yIrzW0SlKKN4Iigzn-WrA3sd2qSL9KTfNhCnetrVP3NmkBhmJTp0thrkvKs4fD1TDxZlIRmlaG7UVzoU0AOko3c" />
                </div>
                <div>
                  <p className="font-headline text-lg italic">Dr. Alistair Vance</p>
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">{t.stories_head_curator}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-surface-container-low -z-0" />
        </section>

        {/* CTA */}
        <section className="px-8 md:px-12 py-32 text-center bg-primary text-on-primary">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-5xl md:text-6xl italic mb-12 leading-tight">{t.stories_cta_title}</h2>
            <p className="font-body text-zinc-400 text-lg mb-16 max-w-xl mx-auto">
              {t.stories_cta_body}
            </p>
            <Link to="/consultation" className="bg-surface text-primary px-16 py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
              {t.book_consultation}
            </Link>
          </div>
        </section>
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile */}
      <MobileStories />
    </div>
  )
}
