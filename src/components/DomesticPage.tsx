import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'

const PATHS = [
  {
    number: '01',
    title: 'Foreign High School to Korean University',
    titleKo: 'Overseas High School → Korean University Admission',
    description: 'Strategic guidance for students educated abroad who wish to enter Korea\'s top universities — Seoul National, KAIST, Yonsei, Korea University, and more. We navigate the unique admissions criteria for international Korean students, including special admission tracks (재외국민 특별전형) and document preparation.',
    link: '/domestic/freshman',
    cta: 'Explore Freshman Strategy',
    icon: 'flight_land',
  },
  {
    number: '02',
    title: 'Foreign University to Korean University Transfer',
    titleKo: 'Overseas University → Korean University Transfer',
    description: 'Expert support for students currently enrolled at foreign universities who seek to transfer into Korean institutions. We handle credit evaluation, transfer eligibility, and positioning your international experience as a competitive advantage in Korea\'s academic landscape.',
    link: '/domestic/transfer',
    cta: 'Explore Transfer Strategy',
    icon: 'swap_horiz',
  },
]

function PageContent() {
  return (
    <>
      {/* Header */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
          Domestic Admissions
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-8xl text-primary tracking-tighter leading-none mb-6 md:mb-8">
          Korean University <br />
          <span className="italic">Admissions</span>
        </h1>
        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
          For globally educated students seeking admission to Korea's most prestigious universities.
          We provide two specialized pathways tailored to your academic background.
        </p>
      </header>

      {/* Two Pathways */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-20 md:mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PATHS.map((path) => (
            <Link
              key={path.number}
              to={path.link}
              className="group bg-surface-container-low p-8 md:p-12 hover:bg-surface-container-high transition-colors duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-headline italic text-5xl md:text-6xl text-outline-variant/30 group-hover:text-secondary/50 transition-colors duration-500">
                  {path.number}
                </span>
                <span className="material-symbols-outlined text-secondary text-3xl">{path.icon}</span>
              </div>
              <h3 className="font-headline text-xl md:text-2xl text-primary mb-2 group-hover:text-secondary transition-colors">
                {path.title}
              </h3>
              <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-6">
                {path.titleKo}
              </p>
              <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed mb-8 flex-1">
                {path.description}
              </p>
              <div className="flex items-center space-x-3 mt-auto">
                <span className="font-label text-xs uppercase tracking-widest border-b border-primary pb-1 group-hover:text-secondary group-hover:border-secondary transition-all">
                  {path.cta}
                </span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why 169 Avenue */}
      <section className="bg-surface-container-low py-20 md:py-32 px-6 md:px-16 mb-20 md:mb-0">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-4 block">Why Choose Us</span>
            <h2 className="font-headline text-3xl md:text-4xl text-primary mb-6">
              Bridging <span className="italic">Global</span> & Korean Education
            </h2>
            <p className="font-body text-on-surface-variant leading-relaxed">
              With deep expertise in both international and Korean academic systems,
              we understand the nuances of navigating between two worlds. Our curators
              have guided hundreds of students through the complexities of Korean
              university admissions.
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { icon: 'translate', title: 'Bilingual Support', desc: 'Full guidance in English and Korean throughout the entire process.' },
              { icon: 'description', title: 'Document Preparation', desc: 'Expert handling of transcripts, recommendation letters, and Korean-specific forms.' },
              { icon: 'school', title: 'University Matching', desc: 'Strategic selection of target universities based on your profile and goals.' },
              { icon: 'psychology', title: 'Interview Coaching', desc: 'Preparation for Korean university interviews with mock sessions.' },
            ].map((item) => (
              <div key={item.icon} className="space-y-3">
                <span className="material-symbols-outlined text-secondary text-2xl">{item.icon}</span>
                <h4 className="font-headline text-lg text-primary">{item.title}</h4>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function DomesticPage() {
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
