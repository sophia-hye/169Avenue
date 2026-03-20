import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

const PILLARS = [
  {
    number: '01',
    title: 'Narrative Sculpting',
    description: 'We move beyond the template essay. Our editors work as literary curators, helping you extract the philosophical core of your experiences to craft statements of purpose that resonate with admissions committees on a profound level.',
    mobileDescription: 'We don\'t just edit essays; we refine your personal history into a compelling visual and textual narrative that resonates with admission committees of the world\'s most elite institutions.',
  },
  {
    number: '02',
    title: 'Strategic Architecture',
    description: 'Long-term profile building is an exercise in intentionality. We curate extracurricular paths and research opportunities that aren\'t just \'impressive\' — they are essential to the story you are telling to the world.',
    mobileDescription: 'Building a multi-year roadmap that balances intellectual rigor with authentic extracurricular distinction. Every decision is a brushstroke on your academic masterpiece.',
  },
  {
    number: '03',
    title: 'Vocal Artistry',
    description: 'Communication is the ultimate differentiator. Our mastery sessions prepare you for the intellectual rigor of Oxbridge or Ivy interviews, focusing on critical thinking, poise, and the articulation of complex ideas.',
    mobileDescription: 'Mastering the nuances of high-stakes interviews. We cultivate the confidence and rhetorical precision required to articulate your vision with poise and intellectual depth.',
  },
]

const BESPOKE_FEATURES = [
  'Full Narrative Development',
  'Institutional Strategy Mapping',
  'Unlimited Interview Mastery',
  'Portfolio & Research Curation',
]

const TARGETED_FEATURES = [
  { label: 'Essay & Statement Polishing', included: true },
  { label: 'Mock Interview Circuit', included: true },
  { label: 'Strategic Resume Audit', included: true },
  { label: 'Ongoing Strategic Mentorship', included: false },
]

function MobileAbout() {
  return (
    <div className="md:hidden">
      {/* Mobile Top Bar */}
      <header className="fixed top-0 z-50 w-full bg-surface flex justify-between items-center px-6 py-4">
        <Link to="/">
          <span className="material-symbols-outlined text-primary">menu</span>
        </Link>
        <h1 className="text-xl font-headline italic text-primary tracking-tight">169 Avenue</h1>
        <div className="w-6" />
      </header>

      <main className="pt-24 pb-32">
        {/* Hero */}
        <section className="px-6 mb-20">
          <div className="mb-4">
            <span className="font-label uppercase tracking-widest text-[10px] text-secondary font-bold">Services</span>
          </div>
          <h2 className="font-headline italic text-5xl text-primary leading-[0.95] tracking-tight mb-8">
            The Art of <br />Academic Curatorship
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
          {PILLARS.map((pillar) => (
            <div key={pillar.number} className="flex flex-col gap-4">
              <div className="flex items-baseline gap-4">
                <span className="font-headline italic text-4xl text-outline-variant opacity-40">
                  {pillar.number}
                </span>
                <h3 className="font-headline text-3xl text-primary tracking-tight">{pillar.title}</h3>
              </div>
              <div className="pl-12">
                <p className="text-on-surface-variant leading-relaxed font-light text-lg">
                  {pillar.mobileDescription}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Service Tiers */}
        <section className="bg-surface-container-low py-20 px-6 space-y-12">
          <div className="text-center mb-8">
            <h4 className="font-label uppercase tracking-[0.2em] text-xs text-secondary mb-2">The Offerings</h4>
            <div className="h-[1px] w-8 bg-secondary mx-auto" />
          </div>

          {/* Bespoke */}
          <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h5 className="font-headline text-2xl text-primary">The Bespoke Journey</h5>
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              Our flagship end-to-end advisory service. A comprehensive, white-glove experience from initial profile assessment to final enrollment.
            </p>
            <Link
              to="/consultation"
              className="block w-full bg-primary text-on-primary py-4 font-label uppercase tracking-widest text-[10px] font-bold text-center active:scale-95 transition-all"
            >
              Inquire
            </Link>
          </div>

          {/* Targeted */}
          <div className="bg-surface-container-lowest p-8 border border-outline-variant/20 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <h5 className="font-headline text-2xl text-primary">The Targeted Review</h5>
              <span className="material-symbols-outlined text-secondary">auto_stories</span>
            </div>
            <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">
              A focused, high-impact audit of your existing application materials. Precision feedback for candidates who have already laid their foundation.
            </p>
            <Link
              to="/consultation"
              className="block w-full bg-surface border border-primary text-primary py-4 font-label uppercase tracking-widest text-[10px] font-bold text-center active:scale-95 transition-all hover:bg-primary hover:text-on-primary"
            >
              Inquire
            </Link>
          </div>
        </section>

        {/* Editorial Quote */}
        <section className="px-6 -mt-8 relative z-10">
          <div className="bg-surface-container-lowest p-10 shadow-2xl">
            <span className="material-symbols-outlined text-secondary mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <p className="font-headline italic text-2xl text-primary leading-snug tracking-tight">
              "We do not merely facilitate entries; we curate legacies. Your education is the most significant acquisition of your life."
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
          <Link to="/" className="text-on-surface-variant/60 text-sm font-body hover:text-primary transition-colors">Home</Link>
          <Link to="/partners" className="text-on-surface-variant/60 text-sm font-body hover:text-primary transition-colors">Partners</Link>
          <Link to="/consultation" className="text-on-surface-variant/60 text-sm font-body hover:text-primary transition-colors">Consultation</Link>
        </div>
        <p className="text-on-surface-variant/40 text-xs font-body">&copy; 2025 169 Avenue. The Digital Curator.</p>
      </footer>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl flex justify-around items-center py-4 border-t border-outline-variant/10 z-50">
        <Link to="/destinations" className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <span className="material-symbols-outlined">school</span>
          <span className="text-[9px] uppercase tracking-tighter font-bold font-label">Destinations</span>
        </Link>
        <Link to="/about" className="flex flex-col items-center gap-1 text-secondary font-bold">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="text-[9px] uppercase tracking-tighter font-label">Services</span>
        </Link>
        <Link to="/stories" className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <span className="material-symbols-outlined">edit_note</span>
          <span className="text-[9px] uppercase tracking-tighter font-label">Stories</span>
        </Link>
        <Link to="/consultation" className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <span className="material-symbols-outlined">mail</span>
          <span className="text-[9px] uppercase tracking-tighter font-label">Contact</span>
        </Link>
      </nav>
    </div>
  )
}

export function AboutPage() {
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
                The Art of Academic <br />
                <span className="italic">Curatorship</span>
              </h1>
              <div className="md:grid md:grid-cols-2 gap-8">
                <div className="col-start-2">
                  <p className="font-body text-lg text-on-surface-variant leading-relaxed">
                    Beyond the transactional nature of traditional admissions consultancy lies
                    the Atelier approach. We treat your academic profile not as a list of
                    achievements, but as a curated exhibition of intellectual depth and personal evolution.
                  </p>
                  <p className="font-body text-lg text-on-surface-variant leading-relaxed mt-6">
                    Each narrative is meticulously sculpted to reflect the singular voice of
                    the student, aligning global ambition with the heritage of the world's
                    most prestigious institutions.
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
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">The Methodology</span>
              <h2 className="font-headline text-4xl md:text-5xl text-primary mt-4">Three Pillars of Excellence</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-16 md:gap-8">
              {PILLARS.map((pillar) => (
                <div key={pillar.number} className="group">
                  <span className="font-headline text-7xl md:text-8xl text-outline-variant/30 italic block mb-6 group-hover:text-secondary/50 transition-colors duration-500">
                    {pillar.number}
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
              <h2 className="font-headline text-4xl md:text-5xl text-primary italic mb-4">Engaging the Atelier</h2>
              <p className="font-body text-on-surface-variant uppercase tracking-widest text-sm">Selective pathways for academic distinction</p>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-outline-variant/20">
              <div className="bg-surface p-12 md:p-16 flex flex-col items-start border-r border-outline-variant/10">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">Comprehensive</span>
                <h3 className="font-headline text-3xl text-primary mb-8">The Bespoke Journey</h3>
                <p className="font-body text-on-surface-variant mb-12 leading-relaxed italic text-lg">An end-to-end partnership from early discovery to final acceptance.</p>
                <ul className="space-y-6 w-full mb-12">
                  {BESPOKE_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-center gap-4 text-sm font-body border-b border-outline-variant/10 pb-4">
                      <span className="material-symbols-outlined text-secondary">check</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/consultation" className="mt-auto w-full py-4 bg-primary text-on-primary font-label text-xs uppercase tracking-widest text-center block hover:bg-secondary transition-colors">Apply for Selection</Link>
              </div>
              <div className="bg-surface p-12 md:p-16 flex flex-col items-start">
                <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">Milestone</span>
                <h3 className="font-headline text-3xl text-primary mb-8">The Targeted Review</h3>
                <p className="font-body text-on-surface-variant mb-12 leading-relaxed italic text-lg">Focused interventions at critical junctures of the application process.</p>
                <ul className="space-y-6 w-full mb-12">
                  {TARGETED_FEATURES.map((feature) => (
                    <li key={feature.label} className={`flex items-center gap-4 text-sm font-body border-b border-outline-variant/10 pb-4 ${feature.included ? '' : 'opacity-40'}`}>
                      <span className="material-symbols-outlined">{feature.included ? 'check' : 'close'}</span>
                      {feature.label}
                    </li>
                  ))}
                </ul>
                <Link to="/consultation" className="mt-auto w-full py-4 border border-outline text-primary font-label text-xs uppercase tracking-widest text-center block hover:bg-surface-container-low transition-colors">Book a Milestone</Link>
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
              "Achievement is the minimum requirement for the modern scholar. Intellectual depth,
              the ability to see the invisible threads between disciplines, is what transforms
              an applicant into a curator of their own destiny."
            </blockquote>
            <div className="mt-12 h-px w-24 bg-secondary mx-auto" />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-40 bg-surface px-8 text-center">
          <h2 className="font-headline text-5xl md:text-7xl text-primary mb-12">Curate Your <span className="italic">Future</span></h2>
          <p className="font-body text-on-surface-variant max-w-xl mx-auto mb-16 text-lg">
            Admission to our atelier is limited to a select cohort each year to ensure uncompromising quality of service. Begin your journey today.
          </p>
          <Link to="/consultation" className="inline-block px-12 py-5 bg-primary text-on-primary font-label text-sm uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-300">
            Inquire for Consultation
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
