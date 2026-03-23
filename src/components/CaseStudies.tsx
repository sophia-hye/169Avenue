import { Link } from 'react-router-dom'

const CASES = [
  {
    tag: 'Foreign HS → Korean University',
    title: 'US High School, GPA 3.8 / AP Calculus, Economics',
    strategy: 'Targeted top-tier Korean business programs through 재외국민 특별전형. Positioned AP coursework as equivalent rigor, crafted bilingual personal statement emphasizing cross-cultural leadership experience.',
    result: 'Reach: Yonsei · Korea Univ. Business / Match: Sungkyunkwan SKKU / Safety: Hanyang · Chung-Ang',
    color: 'bg-primary',
    textColor: 'text-on-primary',
  },
  {
    tag: 'International School → Korean University',
    title: 'Southeast Asia International School / No AP / Student Council',
    strategy: 'Designed application around leadership narrative and community impact. Compensated for lack of AP with IB predicted 36 points and curated extracurricular portfolio.',
    result: 'Reach: Sungkyunkwan SKKU / Match: Hanyang · Kyung Hee / Safety: Chung-Ang · Dongguk (+ TOPIK plan)',
    color: 'bg-surface-container-low',
    textColor: 'text-primary',
  },
  {
    tag: 'Foreign University → Korean Transfer',
    title: 'US University Sophomore / 72 Credits / GPA 3.5',
    strategy: 'Credit transfer analysis revealed 85% transferability. Built transfer narrative around desire for specialized Korean research programs unavailable abroad.',
    result: 'Reach: Korea Univ. · Sogang / Match: Sungkyunkwan · Hanyang / Mapped 61 of 72 credits transferable',
    color: 'bg-surface-container-low',
    textColor: 'text-primary',
  },
  {
    tag: 'International → Overseas University',
    title: 'Korean HS Student / TOEFL 112 / Science Olympiad Gold',
    strategy: 'Leveraged Olympiad achievement for STEM positioning at US/UK universities. Developed research narrative connecting Korean science education with global innovation goals.',
    result: 'Application strategy spanning MIT, Caltech, Imperial College, and ETH Zurich.',
    color: 'bg-primary',
    textColor: 'text-on-primary',
  },
]

export function CaseStudies() {
  return (
    <section className="px-8 md:px-16 lg:px-24 mb-32 md:mb-40 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-6">
        <div>
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">Real-World Strategy</span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary mt-4">Case Studies</h2>
        </div>
        <p className="font-body text-sm text-on-surface-variant max-w-sm leading-relaxed">
          Anonymized examples of how we design admissions strategies for different student profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CASES.map((c, i) => (
          <div
            key={i}
            className={`${c.color} p-8 md:p-12 flex flex-col`}
          >
            <span className={`font-label text-[10px] uppercase tracking-[0.2em] ${c.color === 'bg-primary' ? 'text-secondary' : 'text-secondary'} mb-6 block`}>
              {c.tag}
            </span>
            <h3 className={`font-headline text-xl md:text-2xl ${c.textColor} mb-6 leading-snug`}>
              {c.title}
            </h3>
            <p className={`font-body text-sm ${c.color === 'bg-primary' ? 'text-on-primary/70' : 'text-on-surface-variant'} leading-relaxed mb-6 flex-1`}>
              {c.strategy}
            </p>
            <div className={`border-t ${c.color === 'bg-primary' ? 'border-on-primary/20' : 'border-outline-variant/20'} pt-6`}>
              <span className={`font-label text-[10px] uppercase tracking-widest ${c.color === 'bg-primary' ? 'text-on-primary/50' : 'text-on-surface-variant/60'} block mb-2`}>
                Outcome
              </span>
              <p className={`font-body text-sm ${c.textColor} leading-relaxed`}>
                {c.result}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/consultation"
          className="inline-flex items-center space-x-3 group"
        >
          <span className="font-label text-xs uppercase tracking-widest border-b border-primary pb-1 group-hover:text-secondary group-hover:border-secondary transition-all">
            Get Your Strategy Designed
          </span>
          <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
        </Link>
      </div>
    </section>
  )
}
