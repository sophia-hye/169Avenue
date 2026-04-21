import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function DecisionContent() {
  const { t } = useLanguage()

  return (
    <>
      {/* 1. Hero */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-36 max-w-screen-2xl mx-auto pt-12 md:pt-16">
        <span className="font-label text-[11px] uppercase tracking-[0.3em] text-secondary font-semibold block mb-8">
          {t.decision_eyebrow}
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1.05] mb-10 max-w-4xl">
          {t.decision_headline}
        </h1>
        <p className="font-headline italic text-lg md:text-2xl text-primary/70 leading-snug mb-12 max-w-3xl">
          {t.decision_sub}
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
          <Link
            to="/consultation"
            className="bg-primary text-on-primary px-8 py-4 font-label text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-colors"
          >
            {t.decision_cta_primary}
          </Link>
          <a
            href="#program-structure"
            className="border-2 border-primary text-primary px-8 py-4 font-label text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-on-primary transition-colors"
          >
            {t.decision_cta_secondary}
          </a>
        </div>
      </section>

      {/* 2. Who It's For */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-36 max-w-screen-2xl mx-auto">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
          {t.decision_who_tag}
        </span>
        <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight mb-12 md:mb-16 max-w-3xl">
          {t.decision_who_title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {t.decision_who_items.map((item) => (
            <div
              key={item.label}
              className="bg-surface-container-lowest p-8 md:p-10 border-l-2 border-secondary/60"
            >
              <span className="material-symbols-outlined text-secondary text-3xl mb-5 block">
                {item.icon}
              </span>
              <p className="font-headline text-lg md:text-xl text-primary tracking-tight">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Problem */}
      <section className="bg-surface-container-low py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-36">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-headline text-2xl md:text-4xl text-primary tracking-tight leading-snug mb-12 md:mb-14 max-w-3xl">
            {t.decision_problem_title}
          </h2>
          <ul className="space-y-6 md:space-y-8 mb-12">
            {t.decision_problem_items.map((q) => (
              <li
                key={q}
                className="font-headline italic text-xl md:text-2xl text-primary/80 leading-snug"
              >
                {q}
              </li>
            ))}
          </ul>
          <div className="w-12 h-px bg-secondary mb-6" />
          <p className="font-headline text-lg md:text-2xl text-primary tracking-tight">
            {t.decision_problem_conclusion}
          </p>
        </div>
      </section>

      {/* 4. What You Get */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-36 max-w-screen-2xl mx-auto">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
          {t.decision_what_tag}
        </span>
        <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight mb-12 md:mb-16 max-w-3xl">
          {t.decision_what_title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {t.decision_what_items.map((item) => (
            <div
              key={item.label}
              className="bg-surface-container-lowest p-8 md:p-10"
            >
              <span className="material-symbols-outlined text-secondary text-3xl mb-6 block">
                {item.icon}
              </span>
              <h3 className="font-headline text-xl md:text-2xl text-primary tracking-tight mb-3">
                {item.label}
              </h3>
              <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Program Structure */}
      <section id="program-structure" className="scroll-mt-24 bg-surface-container-low py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-36">
        <div className="max-w-screen-2xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
            {t.decision_structure_tag}
          </span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight mb-12 md:mb-16 max-w-3xl">
            {t.decision_structure_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {t.decision_structure_steps.map((step) => (
              <div
                key={step.step}
                className="bg-surface p-8 md:p-10"
              >
                <span className="font-headline italic text-4xl text-secondary/30 block mb-6 tracking-tighter">
                  {step.step}
                </span>
                <span className="material-symbols-outlined text-secondary text-2xl mb-4">
                  {step.icon}
                </span>
                <div className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold mb-3">
                  {step.label}
                </div>
                <h3 className="font-headline text-xl text-primary tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Key Experience (Dual Track) */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-36 max-w-5xl mx-auto">
        <span className="inline-block font-label text-[10px] uppercase tracking-[0.3em] text-secondary font-semibold bg-secondary/10 px-3 py-1 mb-6">
          {t.decision_key_badge}
        </span>
        <h2 className="font-headline text-2xl md:text-4xl text-primary tracking-tight leading-snug mb-8 max-w-3xl">
          {t.decision_key_title}
        </h2>
        <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-12 md:mb-16 max-w-3xl">
          {t.decision_key_body}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {t.decision_key_days.map((d) => (
            <div
              key={d.day}
              className="bg-primary text-on-primary p-10 md:p-12"
            >
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary font-semibold mb-5 block">
                {d.day}
              </span>
              <p className="font-headline text-2xl md:text-4xl tracking-tight">
                {d.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Outcomes */}
      <section className="bg-primary text-on-primary py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-36">
        <div className="max-w-5xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
            {t.decision_outcomes_tag}
          </span>
          <h2 className="font-headline text-3xl md:text-5xl tracking-tight mb-12 md:mb-16 max-w-3xl">
            {t.decision_outcomes_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {t.decision_outcomes_items.map((item) => (
              <div
                key={item.step}
                className="bg-on-primary/5 border border-on-primary/10 p-8 md:p-10"
              >
                <span className="font-headline italic text-4xl text-secondary/60 block mb-6">
                  {item.step}
                </span>
                <p className="font-headline text-lg md:text-xl tracking-tight">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Next Step */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-36 max-w-screen-2xl mx-auto">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
          {t.decision_next_tag}
        </span>
        <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight mb-6 max-w-3xl">
          {t.decision_next_title}
        </h2>
        <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-12 md:mb-16 max-w-3xl">
          {t.decision_next_body}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {t.decision_next_tracks.map((track) => (
            <Link
              key={track.destination}
              to={track.href}
              className="group bg-surface-container-lowest p-8 md:p-10 flex items-center gap-6 hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60 mb-2">
                  {track.fit}
                </div>
                <h3 className="font-headline text-xl md:text-2xl text-primary tracking-tight mb-2">
                  {track.destination}
                </h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {track.description}
                </p>
              </div>
              <span className="material-symbols-outlined text-secondary text-2xl group-hover:translate-x-1 transition-transform shrink-0">
                arrow_forward
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 9. CTA */}
      <section className="mb-24 md:mb-36 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight leading-tight mb-12 md:mb-16">
            {t.decision_cta_title}
          </h2>
          <Link
            to="/consultation"
            className="inline-block bg-primary text-on-primary px-12 py-5 text-sm tracking-[0.2em] uppercase hover:bg-secondary transition-colors"
          >
            {t.decision_cta_btn}
          </Link>
        </div>
      </section>
    </>
  )
}

export function DecisionProgramPage() {
  const { t } = useLanguage()
  usePageTitle(t.decision_page_title)
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><DecisionContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="programs"><DecisionContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
