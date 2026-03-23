import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { usePageTitle } from '../hooks/usePageTitle'

const STEPS = [
  { number: '01', title: 'Eligibility Assessment', desc: 'We evaluate your qualifications under the 재외국민 특별전형 (Special Admission for Overseas Koreans) or 외국인 전형 (International Student Admission) tracks, depending on your citizenship and years of overseas education.' },
  { number: '02', title: 'Target University Selection', desc: 'Strategic matching with Korean universities based on your academic profile, intended major, and career goals. We cover SKY (Seoul National, Korea, Yonsei), KAIST, POSTECH, and other top-tier institutions.' },
  { number: '03', title: 'Document & Portfolio Preparation', desc: 'Complete assistance with transcript conversion, personal statements in Korean, recommendation letters, and any supplementary portfolios required by your target programs.' },
  { number: '04', title: 'Interview & Final Preparation', desc: 'Mock interviews conducted in Korean with former admissions committee members. We prepare you for both individual and group interview formats used by Korean universities.' },
]

const KEY_TRACKS = [
  { title: '재외국민 특별전형', subtitle: 'Special Admission for Overseas Koreans', desc: 'For Korean nationals who have completed a certain number of years of education abroad. Each university has specific eligibility criteria regarding years of overseas schooling.' },
  { title: '외국인 전형', subtitle: 'International Student Admission', desc: 'For non-Korean nationals or dual citizens. Typically requires proof of foreign nationality, overseas high school transcripts, and language proficiency (TOPIK or English).' },
  { title: '일반 전형 (수시/정시)', subtitle: 'Regular Admission', desc: 'For students who wish to compete in the general admission pool. We help position international experience as a differentiator in personal statements and extracurriculars.' },
]

function PageContent() {
  return (
    <>
      <div className="hidden md:block px-6 md:px-16 max-w-screen-2xl mx-auto mb-8 md:mb-12">
        <Link to="/domestic" className="inline-flex items-center space-x-3 group">
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">Domestic Admissions</span>
        </Link>
      </div>

      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4 block">
          Overseas High School → Korean University
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-none mb-6">
          Freshman <br /><span className="italic">Admission Strategy</span>
        </h1>
        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
          A comprehensive guide for students who completed their secondary education abroad
          and aim to enter Korea's most prestigious universities as freshmen.
        </p>
      </header>

      {/* Process Steps */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-10 block">Our Process</span>
        <div className="space-y-16 md:space-y-20">
          {STEPS.map((step) => (
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
            Not sure if you qualify for 재외국민 전형?
          </p>
          <Link to="/consultation" className="shrink-0 bg-primary text-on-primary px-8 py-4 text-sm tracking-widest uppercase hover:bg-secondary transition-all duration-300">
            Free Diagnosis
          </Link>
        </div>
      </div>

      {/* Results */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <div className="bg-surface-container-lowest p-8 md:p-16 shadow-sm">
          <h3 className="font-headline text-2xl md:text-3xl text-primary mb-3">What You Get</h3>
          <p className="font-headline italic text-lg text-secondary mb-8">After consultation</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'list_alt', title: 'Target University List', sub: 'Reach / Match / Safety' },
              { icon: 'psychology', title: 'Major Fit Analysis', sub: 'Curriculum × Activities × Story' },
              { icon: 'design_services', title: 'Acceptance Strategy', sub: 'Positioning & document plan' },
              { icon: 'event_note', title: 'Execution Timeline', sub: 'Monthly milestones & deadlines' },
            ].map((r) => (
              <div key={r.icon} className="border border-outline-variant/15 p-6">
                <span className="material-symbols-outlined text-secondary text-2xl mb-4 block">{r.icon}</span>
                <h4 className="font-headline text-lg text-primary mb-2">{r.title}</h4>
                <p className="font-body text-xs text-on-surface-variant">{r.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-32">
        <h3 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-6">Recommended For</h3>
        <ul className="space-y-4 max-w-2xl">
          {['Students at overseas or international high schools', 'IB / AP curriculum students planning Korean university entry', 'Korean nationals educated abroad (재외국민)', 'Students unsure about 재외국민 vs 외국인 전형 eligibility'].map((item) => (
            <li key={item} className="flex items-start gap-3 font-body text-base text-on-surface-variant leading-relaxed">
              <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">person</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Admission Tracks */}
      <section className="bg-surface-container-low py-20 md:py-32 px-6 md:px-16">
        <div className="max-w-screen-2xl mx-auto">
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-4 block">Admission Tracks</span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-12">Available Pathways</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {KEY_TRACKS.map((track) => (
              <div key={track.title} className="bg-surface-container-lowest p-8 shadow-sm">
                <h4 className="font-headline text-xl text-primary mb-1">{track.title}</h4>
                <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-6">{track.subtitle}</p>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">{track.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-5xl italic mb-8 md:mb-12 leading-tight">Start Your Korean University Journey</h2>
          <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  )
}

export function DomesticFreshmanPage() {
  usePageTitle('해외고 한국대 진학 전략 - Overseas HS to Korean Uni')
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
