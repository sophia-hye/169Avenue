import { Link } from 'react-router-dom'

const TARGETS = [
  {
    title: 'Overseas HS → Korean University',
    bullets: ['IB / AP / GPA-based strategy design', 'Special admission tracks (재외국민 / 외국인 전형)'],
    cta: 'Diagnose My Eligibility',
    link: '/domestic/freshman',
    icon: 'flight_land',
  },
  {
    title: 'Korean Domestic Admissions',
    bullets: ['학생부종합 / 정시 strategy design', 'Major direction & narrative building'],
    cta: 'Book a Consultation',
    link: '/consultation',
    icon: 'school',
  },
  {
    title: 'Foreign Univ → Korean Transfer',
    bullets: ['Credit-based feasibility analysis', 'University-specific transfer strategy'],
    cta: 'Get Transfer Assessment',
    link: '/domestic/transfer',
    icon: 'swap_horiz',
  },
]

export function TargetCards() {
  return (
    <section className="px-8 md:px-16 lg:px-24 mb-32 md:mb-40 max-w-screen-2xl mx-auto">
      <div className="mb-12 md:mb-16">
        <h2 className="font-headline text-3xl md:text-4xl text-primary">
          We design strategy for <span className="italic">your situation</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TARGETS.map((t) => (
          <Link
            key={t.title}
            to={t.link}
            className="group bg-surface-container-low p-8 md:p-10 hover:bg-primary transition-colors duration-500 flex flex-col"
          >
            <span className="material-symbols-outlined text-secondary group-hover:text-on-primary/60 text-3xl mb-6 transition-colors duration-500">
              {t.icon}
            </span>
            <h3 className="font-headline text-xl md:text-2xl text-primary group-hover:text-on-primary mb-4 transition-colors duration-500">
              {t.title}
            </h3>
            <ul className="space-y-2 mb-8 flex-1">
              {t.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm font-body text-on-surface-variant group-hover:text-on-primary/70 leading-relaxed transition-colors duration-500">
                  <span className="material-symbols-outlined text-secondary group-hover:text-on-primary/50 text-xs mt-1 shrink-0 transition-colors duration-500">check</span>
                  {b}
                </li>
              ))}
            </ul>
            <span className="font-label text-xs uppercase tracking-widest text-primary group-hover:text-on-primary border-b border-primary/20 group-hover:border-on-primary/30 pb-1 self-start transition-colors duration-500">
              {t.cta} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
