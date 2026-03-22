import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'

const STEPS = [
  { number: '01', title: 'Transfer Eligibility Review', desc: 'We assess your current university credits, GPA, and coursework to determine eligibility for transfer into Korean universities. Each institution has different credit requirements and acceptance policies for transfer students.' },
  { number: '02', title: 'Credit Evaluation & Mapping', desc: 'Detailed analysis of how your existing credits will transfer. We identify which courses will be recognized, which may require supplementary exams, and how to minimize credit loss during the transition.' },
  { number: '03', title: 'Application Strategy', desc: 'Strategic positioning of your international university experience as a competitive advantage. We craft narratives that explain your motivation for transferring and highlight the unique perspectives you bring.' },
  { number: '04', title: 'Transition Support', desc: 'Comprehensive support beyond admission — including housing guidance, Korean language preparation, academic advising, and cultural adjustment resources for a smooth transition to campus life in Korea.' },
]

const CONSIDERATIONS = [
  { icon: 'checklist', title: 'Credit Requirements', desc: 'Most Korean universities require a minimum of 35-70 credits for transfer eligibility. We help you plan course selection at your current institution to maximize transferability.' },
  { icon: 'schedule', title: 'Timing', desc: 'Transfer applications typically open in November (spring semester) and May (fall semester). Early preparation is essential for competitive programs.' },
  { icon: 'language', title: 'Language Proficiency', desc: 'Many programs require TOPIK Level 4+ for Korean-taught courses. We help you plan language study alongside your transfer preparation.' },
  { icon: 'workspace_premium', title: 'GPA Requirements', desc: 'Top universities typically require a cumulative GPA of 3.0/4.0 or equivalent. Some competitive programs set higher thresholds.' },
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
          Overseas University → Korean University
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-none mb-6">
          Transfer <br /><span className="italic">Admission Strategy</span>
        </h1>
        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
          For students currently enrolled at overseas universities who wish to transfer
          into Korea's top institutions while preserving their academic progress.
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

      {/* Key Considerations */}
      <section className="bg-surface-container-low py-20 md:py-32 px-6 md:px-16">
        <div className="max-w-screen-2xl mx-auto">
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-4 block">Important Factors</span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary mb-12">Key Considerations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {CONSIDERATIONS.map((item) => (
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

      {/* CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-5xl italic mb-8 md:mb-12 leading-tight">Plan Your Transfer Today</h2>
          <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  )
}

export function DomesticTransferPage() {
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
