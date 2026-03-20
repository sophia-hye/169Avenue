import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

const PILLARS = [
  {
    number: '01',
    title: 'Narrative Sculpting',
    description: 'We move beyond the template essay. Our editors work as literary curators, helping you extract the philosophical core of your experiences to craft statements of purpose that resonate with admissions committees on a profound level.',
  },
  {
    number: '02',
    title: 'Strategic Architecture',
    description: 'Long-term profile building is an exercise in intentionality. We curate extracurricular paths and research opportunities that aren\'t just \'impressive\' — they are essential to the story you are telling to the world.',
  },
  {
    number: '03',
    title: 'Vocal Artistry',
    description: 'Communication is the ultimate differentiator. Our mastery sessions prepare you for the intellectual rigor of Oxbridge or Ivy interviews, focusing on critical thinking, poise, and the articulation of complex ideas.',
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

export function AboutPage() {
  return (
    <div className="bg-surface selection:bg-secondary-container">
      <Navbar />

      <main className="pt-24">
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
              <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">
                The Methodology
              </span>
              <h2 className="font-headline text-4xl md:text-5xl text-primary mt-4">
                Three Pillars of Excellence
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-16 md:gap-8">
              {PILLARS.map((pillar) => (
                <div key={pillar.number} className="group">
                  <span className="font-headline text-7xl md:text-8xl text-outline-variant/30 italic block mb-6 group-hover:text-secondary/50 transition-colors duration-500">
                    {pillar.number}
                  </span>
                  <h3 className="font-headline text-3xl text-primary mb-6">{pillar.title}</h3>
                  <p className="font-body text-on-surface-variant leading-relaxed mb-8">
                    {pillar.description}
                  </p>
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
              <h2 className="font-headline text-4xl md:text-5xl text-primary italic mb-4">
                Engaging the Atelier
              </h2>
              <p className="font-body text-on-surface-variant uppercase tracking-widest text-sm">
                Selective pathways for academic distinction
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-px bg-outline-variant/20">
              {/* Bespoke Journey */}
              <div className="bg-surface p-12 md:p-16 flex flex-col items-start border-r border-outline-variant/10">
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">
                  Comprehensive
                </span>
                <h3 className="font-headline text-3xl text-primary mb-8">The Bespoke Journey</h3>
                <p className="font-body text-on-surface-variant mb-12 leading-relaxed italic text-lg">
                  An end-to-end partnership from early discovery to final acceptance.
                </p>
                <ul className="space-y-6 w-full mb-12">
                  {BESPOKE_FEATURES.map((feature) => (
                    <li key={feature} className="flex items-center gap-4 text-sm font-body border-b border-outline-variant/10 pb-4">
                      <span className="material-symbols-outlined text-secondary">check</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/consultation"
                  className="mt-auto w-full py-4 bg-primary text-on-primary font-label text-xs uppercase tracking-widest text-center block hover:bg-secondary transition-colors"
                >
                  Apply for Selection
                </Link>
              </div>
              {/* Targeted Review */}
              <div className="bg-surface p-12 md:p-16 flex flex-col items-start">
                <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">
                  Milestone
                </span>
                <h3 className="font-headline text-3xl text-primary mb-8">The Targeted Review</h3>
                <p className="font-body text-on-surface-variant mb-12 leading-relaxed italic text-lg">
                  Focused interventions at critical junctures of the application process.
                </p>
                <ul className="space-y-6 w-full mb-12">
                  {TARGETED_FEATURES.map((feature) => (
                    <li
                      key={feature.label}
                      className={`flex items-center gap-4 text-sm font-body border-b border-outline-variant/10 pb-4 ${feature.included ? '' : 'opacity-40'}`}
                    >
                      <span className="material-symbols-outlined">
                        {feature.included ? 'check' : 'close'}
                      </span>
                      {feature.label}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/consultation"
                  className="mt-auto w-full py-4 border border-outline text-primary font-label text-xs uppercase tracking-widest text-center block hover:bg-surface-container-low transition-colors"
                >
                  Book a Milestone
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Quote */}
        <section className="relative py-48 bg-primary text-on-primary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img
              alt="Minimal Architecture"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLJ-HcGwAaBfcmIISTJhzbHBZZhGxwmR4sTSLNHJdMbVn9s5vAfxHlLzfD1ujN3hVv5-dU2ZnW3WA_njz_29xGG7T4CHqme83IPBuce5TYlLUXornqxkiihLfJvsCb7kFni4Pc5l9sQBxFLrZf_7hDO2v7Hp3LRbMhekZZuEzsg9BjlELxg5a2dWUmubeoLw9FuHC9HFHLvhk7nJAOCFhLcscTtf6ze1bRTpUwwnQLA_C5T7u4lJcLjQlAgYcxFEJ4Akdkae3RN_0"
            />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
            <span
              className="material-symbols-outlined text-secondary text-5xl mb-8 block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              format_quote
            </span>
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
          <h2 className="font-headline text-5xl md:text-7xl text-primary mb-12">
            Curate Your <span className="italic">Future</span>
          </h2>
          <p className="font-body text-on-surface-variant max-w-xl mx-auto mb-16 text-lg">
            Admission to our atelier is limited to a select cohort each year to ensure
            uncompromising quality of service. Begin your journey today.
          </p>
          <Link
            to="/consultation"
            className="inline-block px-12 py-5 bg-primary text-on-primary font-label text-sm uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-300"
          >
            Inquire for Consultation
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
