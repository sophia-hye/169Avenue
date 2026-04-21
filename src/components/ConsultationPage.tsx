import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function ConsultationContent() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [interests, setInterests] = useState<string[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const toggleInterest = (id: string) => {
    setInterests((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  // Success state
  if (submitted) {
    return (
      <section className="px-6 md:px-16 lg:px-24 max-w-3xl mx-auto pt-12 md:pt-16 pb-24 md:pb-36 text-center">
        <span className="material-symbols-outlined text-secondary text-6xl mb-8" style={{ fontVariationSettings: "'FILL' 1" }}>
          check_circle
        </span>
        <h1 className="font-headline italic text-4xl md:text-5xl text-primary tracking-tight mb-6">
          {t.consult_success_title}
        </h1>
        <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-12 max-w-xl mx-auto">
          {t.consult_success_body}
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-on-primary px-10 py-4 font-label text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-colors"
        >
          {t.consult_success_cta}
        </Link>
      </section>
    )
  }

  return (
    <>
      {/* 1. Hero */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-36 max-w-screen-2xl mx-auto pt-12 md:pt-16">
        <span className="font-label text-[11px] uppercase tracking-[0.3em] text-secondary font-semibold block mb-8">
          {t.consult_hero_eyebrow}
        </span>
        <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl text-primary tracking-tighter leading-[1.1] mb-10 max-w-4xl">
          {t.consult_hero_headline}
        </h1>
        <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-10 max-w-3xl">
          {t.consult_hero_sub}
        </p>
        <a
          href="#inquiry-form"
          className="inline-block bg-primary text-on-primary px-8 py-4 font-label text-xs uppercase tracking-[0.2em] hover:bg-secondary transition-colors"
        >
          {t.consult_hero_cta}
        </a>
      </section>

      {/* 2. Who It's For */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-36 max-w-screen-2xl mx-auto">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
          {t.consult_audience_tag}
        </span>
        <h2 className="font-headline text-2xl md:text-4xl text-primary tracking-tight mb-12 md:mb-16 max-w-3xl">
          {t.consult_audience_title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {t.consult_audience_cards.map((card) => (
            <div
              key={card.title}
              className="bg-surface-container-lowest p-8 md:p-10 border-l-2 border-secondary/50 flex items-start gap-5"
            >
              <span className="material-symbols-outlined text-secondary text-2xl shrink-0 mt-1">
                {card.icon}
              </span>
              <p className="font-headline text-lg md:text-xl text-primary/90 tracking-tight leading-snug">
                {card.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. What You'll Get */}
      <section className="bg-surface-container-low py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-36">
        <div className="max-w-5xl mx-auto">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
            {t.consult_benefits_tag}
          </span>
          <h2 className="font-headline text-2xl md:text-4xl text-primary tracking-tight leading-tight mb-12 md:mb-16 max-w-3xl">
            {t.consult_benefits_title}
          </h2>
          <ul className="space-y-4 md:space-y-5">
            {t.consult_benefits_items.map((item) => (
              <li
                key={item.label}
                className="bg-surface p-6 md:p-8 flex items-start gap-5"
              >
                <span className="material-symbols-outlined text-secondary text-2xl shrink-0">
                  {item.icon}
                </span>
                <p className="font-body text-base md:text-lg text-primary leading-relaxed flex-1">
                  {item.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-36 max-w-screen-2xl mx-auto">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
          {t.consult_flow_tag}
        </span>
        <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight mb-12 md:mb-16 max-w-3xl">
          {t.consult_flow_title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0">
          {t.consult_flow_steps.map((step, i) => (
            <div key={step.step} className="relative flex items-start">
              <div className="w-full bg-surface-container-lowest p-8 md:p-10 md:border-r md:last:border-r-0 border-outline-variant/20">
                <span className="font-headline italic text-4xl text-secondary/30 block mb-6 tracking-tighter">
                  {step.step}
                </span>
                <h3 className="font-headline text-xl md:text-2xl text-primary tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>
              {i < t.consult_flow_steps.length - 1 && (
                <span className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 bg-surface text-secondary material-symbols-outlined text-base">
                  arrow_forward
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. Inquiry Form */}
      <section id="inquiry-form" className="scroll-mt-24 bg-primary text-on-primary py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-36">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl md:text-5xl tracking-tight mb-3">
            {t.consult_form_title}
          </h2>
          <p className="font-body text-sm text-on-primary/50 mb-12 md:mb-14">
            {t.consult_form_sub}
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Parent Name */}
            <FormField label={t.consult_form_parent} required>
              <input
                type="text"
                required
                className="w-full bg-transparent border-b border-on-primary/30 focus:border-secondary py-3 font-body text-base text-on-primary placeholder:text-on-primary/30 outline-none transition-colors"
              />
            </FormField>

            {/* Student Name + Grade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField label={t.consult_form_student} required>
                <input
                  type="text"
                  required
                  className="w-full bg-transparent border-b border-on-primary/30 focus:border-secondary py-3 font-body text-base text-on-primary placeholder:text-on-primary/30 outline-none transition-colors"
                />
              </FormField>
              <FormField label={t.consult_form_grade} required>
                <input
                  type="text"
                  required
                  placeholder={t.consult_form_grade_ph}
                  className="w-full bg-transparent border-b border-on-primary/30 focus:border-secondary py-3 font-body text-base text-on-primary placeholder:text-on-primary/30 outline-none transition-colors"
                />
              </FormField>
            </div>

            {/* Interests */}
            <div>
              <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-primary/60 block mb-4">
                {t.consult_form_interests}
              </label>
              <div className="flex flex-wrap gap-3">
                {t.consult_form_interest_options.map((opt) => {
                  const active = interests.includes(opt.id)
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleInterest(opt.id)}
                      className={`px-5 py-2.5 font-body text-sm border transition-colors ${
                        active
                          ? 'border-secondary bg-secondary text-on-primary'
                          : 'border-on-primary/30 text-on-primary/70 hover:border-on-primary/60'
                      }`}
                    >
                      {opt.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Concern */}
            <FormField label={t.consult_form_concern} required>
              <textarea
                required
                rows={4}
                placeholder={t.consult_form_concern_ph}
                className="w-full bg-transparent border-b border-on-primary/30 focus:border-secondary py-3 font-body text-base text-on-primary placeholder:text-on-primary/30 outline-none transition-colors resize-none whitespace-pre-line"
              />
            </FormField>

            {/* Phone + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField label={t.consult_form_phone} required>
                <input
                  type="tel"
                  required
                  className="w-full bg-transparent border-b border-on-primary/30 focus:border-secondary py-3 font-body text-base text-on-primary placeholder:text-on-primary/30 outline-none transition-colors"
                />
              </FormField>
              <FormField label={t.consult_form_email} required>
                <input
                  type="email"
                  required
                  className="w-full bg-transparent border-b border-on-primary/30 focus:border-secondary py-3 font-body text-base text-on-primary placeholder:text-on-primary/30 outline-none transition-colors"
                />
              </FormField>
            </div>

            {/* Preferred Time */}
            <FormField label={t.consult_form_time}>
              <input
                type="text"
                placeholder={t.consult_form_time_ph}
                className="w-full bg-transparent border-b border-on-primary/30 focus:border-secondary py-3 font-body text-base text-on-primary placeholder:text-on-primary/30 outline-none transition-colors"
              />
            </FormField>

            {/* Submit */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-secondary text-on-primary px-10 py-5 font-label text-xs uppercase tracking-[0.3em] hover:bg-on-primary hover:text-primary transition-colors"
              >
                {t.consult_form_submit}
              </button>
              <p className="font-body text-xs text-on-primary/50 mt-4 text-center">
                {t.consult_form_submit_note}
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="px-6 md:px-16 lg:px-24 mb-24 md:mb-36 max-w-4xl mx-auto">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-semibold mb-4 block">
          {t.consult_faq_tag}
        </span>
        <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight mb-12 md:mb-16">
          {t.consult_faq_title}
        </h2>
        <div className="divide-y divide-outline-variant/15 border-y border-outline-variant/15">
          {t.consult_faq_items.map((item, i) => {
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

      {/* 7. Final CTA */}
      <section className="mb-24 md:mb-36 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight leading-tight mb-8 md:mb-10">
            {t.consult_final_title}
          </h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-12 md:mb-16 max-w-2xl mx-auto">
            {t.consult_final_body}
          </p>
          <a
            href="#inquiry-form"
            className="inline-block bg-primary text-on-primary px-12 py-5 text-sm tracking-[0.2em] uppercase hover:bg-secondary transition-colors"
          >
            {t.consult_final_btn}
          </a>
        </div>
      </section>
    </>
  )
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-primary/60 block mb-2">
        {label}{required && <span className="text-secondary ml-1">*</span>}
      </span>
      {children}
    </label>
  )
}

export function ConsultationPage() {
  const { t } = useLanguage()
  usePageTitle(t.consult_page_title)

  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><ConsultationContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="contact"><ConsultationContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
