import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function AboutContent() {
  const { t } = useLanguage()

  return (
    <>
      {/* 1. Hero — Brand definition */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-40 max-w-screen-2xl mx-auto pt-12 md:pt-16">
        <span className="font-label text-[11px] uppercase tracking-[0.3em] text-secondary font-semibold block mb-8">
          {t.about_hero_eyebrow}
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1.05] mb-10 max-w-4xl">
          {t.about_hero_headline_1}<br />
          <span className="italic text-secondary">{t.about_hero_headline_2}</span>
        </h1>
        <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed max-w-3xl">
          {t.about_hero_sub}
        </p>
      </section>

      {/* 2. Why We Exist — Problem */}
      <section className="bg-surface-container-low py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-40">
        <div className="max-w-4xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
            {t.about_why_tag}
          </span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight leading-tight mb-10 md:mb-12 max-w-3xl">
            {t.about_why_title}
          </h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-4 max-w-3xl">
            {t.about_why_body_1}
          </p>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-12 md:mb-14 max-w-3xl">
            {t.about_why_body_2}
          </p>
          <ul className="space-y-6 mb-12 md:mb-14">
            {t.about_why_questions.map((q) => (
              <li
                key={q}
                className="font-headline italic text-xl md:text-2xl text-primary/80 leading-snug"
              >
                {q}
              </li>
            ))}
          </ul>
          <div className="w-12 h-px bg-secondary mb-6" />
          <p className="font-headline text-xl md:text-3xl text-primary tracking-tight leading-snug">
            {t.about_why_conclusion}
          </p>
        </div>
      </section>

      {/* 3. What Makes Us Different */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-40 max-w-screen-2xl mx-auto">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
          {t.about_diff_tag}
        </span>
        <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-6 max-w-3xl">
          {t.about_diff_lead}
        </p>
        <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight leading-tight mb-14 md:mb-16 max-w-4xl">
          {t.about_diff_title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {t.about_diff_pillars.map((p) => (
            <div
              key={p.name}
              className="bg-surface-container-lowest p-8 md:p-10"
            >
              <span className="material-symbols-outlined text-secondary text-3xl mb-6 block">
                {p.icon}
              </span>
              <h3 className="font-headline text-xl md:text-2xl text-primary tracking-tight mb-3">
                {p.name}
              </h3>
              <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. The 169 Method — preview */}
      <section className="bg-primary text-on-primary py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-40">
        <div className="max-w-5xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
            {t.about_method_tag}
          </span>
          <h2 className="font-headline text-3xl md:text-5xl tracking-tight leading-tight mb-12 md:mb-16 max-w-3xl">
            {t.about_method_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
            {t.about_method_steps.map((step) => (
              <div
                key={step.step}
                className="bg-on-primary/5 border border-on-primary/10 p-6 md:p-8 h-full"
              >
                <span className="font-headline italic text-3xl text-secondary/70 block mb-4">
                  {step.step}
                </span>
                <span className="material-symbols-outlined text-secondary text-2xl mb-4 block">
                  {step.icon}
                </span>
                <div className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary font-semibold mb-2">
                  {step.label}
                </div>
                <p className="font-body text-sm md:text-base text-on-primary/80 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="border-l-2 border-secondary pl-5 mb-10 md:mb-12 max-w-3xl">
            <p className="font-headline italic text-lg md:text-2xl text-on-primary/90 leading-snug">
              {t.about_method_closing}
            </p>
          </div>
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 font-label text-xs uppercase tracking-[0.2em] border border-on-primary/40 text-on-primary px-6 py-3 hover:bg-surface hover:text-primary transition-colors"
          >
            {t.about_method_cta}
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* 5. Who We Serve */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-40 max-w-screen-2xl mx-auto">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
          {t.about_audience_tag}
        </span>
        <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-14 md:mb-16 max-w-3xl">
          {t.about_audience_lead}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {t.about_audience_items.map((item) => (
            <div
              key={item.label}
              className="bg-surface-container-lowest p-8 md:p-10 border-l-2 border-secondary/60"
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

      {/* 6. Our Philosophy */}
      <section className="bg-surface-container-low py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-40">
        <div className="max-w-4xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
            {t.about_philosophy_tag}
          </span>
          <h2 className="font-headline italic text-3xl md:text-5xl text-primary tracking-tight leading-tight mb-14 md:mb-20">
            {t.about_philosophy_title}
          </h2>
          <ul className="space-y-10 md:space-y-12">
            {t.about_philosophy_beliefs.map((belief, i) => (
              <li key={belief} className="flex items-start gap-6 md:gap-10">
                <span className="font-headline italic text-3xl md:text-4xl text-secondary/50 shrink-0 w-14 md:w-20">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-headline text-lg md:text-2xl text-primary tracking-tight leading-snug flex-1">
                  {belief}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Closing + CTA */}
      <section className="mb-24 md:mb-36 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight leading-tight mb-12 md:mb-16">
            {t.about_cta_title}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <Link
              to="/consultation"
              className="w-full sm:w-auto bg-primary text-on-primary px-12 py-5 text-sm tracking-[0.2em] uppercase hover:bg-secondary transition-colors"
            >
              {t.about_cta_primary}
            </Link>
            <Link
              to="/consultation"
              className="w-full sm:w-auto border border-primary text-primary px-12 py-5 text-sm tracking-[0.2em] uppercase hover:bg-primary hover:text-on-primary transition-colors"
            >
              {t.about_cta_secondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function AboutPage() {
  const { t } = useLanguage()
  usePageTitle(t.about_page_title)
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><AboutContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="about"><AboutContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
