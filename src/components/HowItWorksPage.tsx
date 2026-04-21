import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { MentorsSection } from './MentorsSection'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function HowItWorksContent() {
  const { t } = useLanguage()
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      {/* 1. Hero */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-36 max-w-screen-2xl mx-auto pt-12 md:pt-16">
        <span className="font-label text-[11px] uppercase tracking-[0.3em] text-secondary font-semibold block mb-8">
          {t.hiw_eyebrow}
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1.05] mb-10 max-w-4xl">
          {t.hiw_headline}
        </h1>
        <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-12 max-w-3xl">
          {t.hiw_sub}
        </p>
        <Link
          to="/consultation"
          className="inline-block bg-primary text-on-primary px-8 py-4 font-label text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-colors"
        >
          {t.hiw_cta_primary}
        </Link>
      </section>

      {/* 2. Overview */}
      <section className="bg-surface-container-low py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-36">
        <div className="max-w-screen-2xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
            {t.hiw_overview_tag}
          </span>
          <h2 className="font-headline text-2xl md:text-4xl text-primary tracking-tight mb-12 md:mb-16 max-w-3xl">
            {t.hiw_overview_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
            {t.hiw_overview_steps.map((step, i) => (
              <div key={step.step} className="relative flex items-center justify-center">
                <div className="w-full bg-surface p-8 text-center md:border-r md:last:border-r-0 border-outline-variant/20">
                  <span className="font-headline italic text-3xl text-secondary/40 block mb-3">
                    {step.step}
                  </span>
                  <span className="material-symbols-outlined text-secondary text-2xl mb-3 block">
                    {step.icon}
                  </span>
                  <div className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold mb-2">
                    {step.label}
                  </div>
                  <p className="font-headline text-lg text-primary tracking-tight">
                    {step.title}
                  </p>
                </div>
                {i < t.hiw_overview_steps.length - 1 && (
                  <span className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 bg-surface-container-low text-secondary material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-6. Step details */}
      {t.hiw_details.map((detail, i) => {
        const isAlt = i % 2 === 1
        return (
          <section
            key={detail.step}
            id={`step-${detail.step}`}
            className="scroll-mt-24 px-6 md:px-16 lg:px-24 mb-24 md:mb-36 max-w-screen-2xl mx-auto"
          >
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start ${isAlt ? 'lg:direction-rtl' : ''}`}>
              <div className="lg:col-span-5">
                <span className="font-headline italic text-6xl md:text-7xl text-secondary/30 block mb-4 tracking-tighter">
                  {detail.step}
                </span>
                <div className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary font-semibold mb-4">
                  {detail.label}
                </div>
                <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight leading-tight mb-6">
                  {detail.title}
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-8">
                <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
                  {detail.description}
                </p>
                <dl className="bg-surface-container-lowest p-6 md:p-8 space-y-4">
                  {detail.meta.map((m) => (
                    <div key={m.label} className="flex items-baseline gap-5 border-b border-outline-variant/10 last:border-b-0 pb-3 last:pb-0">
                      <dt className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/60 w-20 shrink-0">
                        {m.label}
                      </dt>
                      <dd className="font-body text-sm md:text-base text-primary">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="border-l-2 border-secondary pl-5">
                  <p className="font-headline italic text-base md:text-lg text-primary/80 leading-snug">
                    {detail.rationale}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* 7. Mentors (premium rationale — who runs every session) */}
      <MentorsSection />

      {/* 8. Example */}
      <section className="bg-primary text-on-primary py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-36">
        <div className="max-w-5xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
            {t.hiw_example_tag}
          </span>
          <h2 className="font-headline text-3xl md:text-5xl tracking-tight leading-tight mb-6 max-w-3xl">
            {t.hiw_example_title}
          </h2>
          <p className="font-body text-base md:text-lg text-on-primary/70 leading-relaxed mb-12 md:mb-16 max-w-3xl">
            {t.hiw_example_intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-14">
            {t.hiw_example_days.map((d) => (
              <div key={d.day} className="bg-on-primary/5 border border-on-primary/10 p-8 md:p-10">
                <div className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold mb-5">
                  {d.day}
                </div>
                <ul className="space-y-3">
                  {d.notes.map((n) => (
                    <li key={n} className="flex items-start gap-3 font-body text-sm md:text-base text-on-primary/80 leading-relaxed">
                      <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">circle</span>
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-l-2 border-secondary pl-6 max-w-3xl">
            <div className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary mb-3">
              {t.hiw_example_outcome_label}
            </div>
            <p className="font-headline italic text-lg md:text-2xl leading-snug">
              {t.hiw_example_outcome}
            </p>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-36 max-w-4xl mx-auto">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
          {t.hiw_faq_tag}
        </span>
        <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight mb-12 md:mb-16">
          {t.hiw_faq_title}
        </h2>
        <div className="divide-y divide-outline-variant/15 border-y border-outline-variant/15">
          {t.hiw_faq_items.map((item, i) => {
            const isOpen = openFaq === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full py-6 md:py-8 flex items-start gap-6 text-left hover:bg-surface-container-lowest transition-colors px-4 -mx-4"
                >
                  <span className="font-headline italic text-xl text-secondary/60 shrink-0 w-10">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-headline text-lg md:text-xl text-primary tracking-tight flex-1">
                    {item.q}
                  </span>
                  <span className={`material-symbols-outlined text-on-surface-variant/50 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    add
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-8 pl-20 pr-6 -mt-2">
                    <p className="font-body text-base text-on-surface-variant leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* 10. CTA */}
      <section className="mb-24 md:mb-36 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight leading-tight mb-8 md:mb-10">
            {t.hiw_cta_title}
          </h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-12 md:mb-16 max-w-2xl mx-auto">
            {t.hiw_cta_body}
          </p>
          <Link
            to="/consultation"
            className="inline-block bg-primary text-on-primary px-12 py-5 text-sm tracking-[0.2em] uppercase hover:bg-secondary transition-colors"
          >
            {t.hiw_cta_btn}
          </Link>
        </div>
      </section>
    </>
  )
}

export function HowItWorksPage() {
  const { t } = useLanguage()
  usePageTitle(t.hiw_page_title)
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><HowItWorksContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="how"><HowItWorksContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
