import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function DomesticContent() {
  const { t } = useLanguage()

  return (
    <>
      {/* ① Headline */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
          {t.domestic_tag}
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1] mb-6">
          {t.domestic_title_line1}<br /><span className="italic">{t.domestic_title_line2}</span>
        </h1>
        <p className="font-headline italic text-xl md:text-2xl text-primary/60 mb-6">
          {t.domestic_subtitle}
        </p>
        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl mb-8">
          {t.domestic_intro}
        </p>
        <Link to="/consultation" className="bg-primary text-on-primary px-8 py-4 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors">
          {t.domestic_free_diag}
        </Link>
      </header>

      {/* ② Problem Empathy */}
      <section className="bg-primary text-on-primary py-16 md:py-24 px-6 md:px-16 mb-16 md:mb-24">
        <div className="max-w-screen-2xl mx-auto max-w-3xl">
          <p className="font-headline italic text-2xl md:text-3xl leading-snug mb-6">
            {t.domestic_problem_quote}
          </p>
          <p className="font-body text-on-primary/70 leading-relaxed">
            {t.domestic_problem_body}
          </p>
        </div>
      </section>

      {/* ③ Services */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <h2 className="font-headline text-3xl md:text-4xl text-primary mb-12">
          {t.domestic_pathways_title}
        </h2>

        {t.domestic_pathways.map((card, i) => {
          const wrapperClass = i === 1
            ? 'bg-surface-container-low p-8 md:p-12 mb-6 grid grid-cols-1 lg:grid-cols-12 gap-8'
            : 'bg-surface-container-lowest shadow-sm p-8 md:p-12 mb-6 grid grid-cols-1 lg:grid-cols-12 gap-8'
          return (
            <div key={card.icon} className={wrapperClass}>
              <div className="lg:col-span-7">
                <span className="material-symbols-outlined text-secondary text-3xl mb-4 block">{card.icon}</span>
                <h3 className="font-headline text-2xl md:text-3xl text-primary mb-4">{card.title}</h3>
                <p className="font-body text-on-surface-variant leading-relaxed mb-6">{card.body}</p>
                <div className="mb-6">
                  <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-3">
                    {t.domestic_recommended_label}
                  </h4>
                  <ul className="space-y-1">
                    {card.recommended.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm font-body text-on-surface-variant">
                        <span className="material-symbols-outlined text-secondary text-xs mt-0.5">person</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/consultation" className="bg-primary text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors text-center">
                    {t.domestic_free_diag}
                  </Link>
                  {'link' in card && card.link && (
                    <Link to={card.link} className="border border-primary text-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all text-center">
                      {t.domestic_learn_more}
                    </Link>
                  )}
                </div>
              </div>
              <div className="lg:col-span-5 bg-surface p-6 border border-outline-variant/15">
                <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-4">
                  {t.domestic_what_you_get_label}
                </h4>
                <ul className="space-y-3">
                  {card.results.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm font-body text-primary leading-relaxed">
                      <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </section>

      {/* ④ Comparison */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <h3 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-6">
          {t.domestic_compare_label}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-primary">
                <th className="text-left py-3 pr-6 font-label text-[10px] uppercase tracking-widest text-on-surface-variant" />
                <th className="text-left py-3 pr-6 font-body text-sm text-on-surface-variant">{t.domestic_compare_typical}</th>
                <th className="text-left py-3 font-body text-sm text-primary font-bold">169 Avenue</th>
              </tr>
            </thead>
            <tbody>
              {t.domestic_compare_rows.map((row, i) => (
                <tr key={i} className="border-b border-outline-variant/15">
                  <td className="py-4 pr-6 font-headline italic text-xl text-outline-variant/30">{String(i + 1).padStart(2, '0')}</td>
                  <td className="py-4 pr-6 font-body text-sm text-on-surface-variant line-through opacity-60">{row.typ}</td>
                  <td className="py-4 font-body text-sm text-primary font-bold">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ⑤ Process */}
      <section className="bg-surface-container-low py-16 md:py-24 px-6 md:px-16 mb-16 md:mb-24">
        <div className="max-w-screen-2xl mx-auto">
          <h3 className="font-headline text-2xl md:text-3xl text-primary mb-10">
            {t.domestic_process_title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {t.domestic_process_steps.map((step, i) => (
              <div key={i} className="text-center">
                <span className="font-headline italic text-3xl text-outline-variant/30 block mb-2">{String(i + 1).padStart(2, '0')}</span>
                <span className="material-symbols-outlined text-secondary text-2xl mb-3 block">{step.icon}</span>
                <p className="font-headline text-base text-primary">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑥ CTA */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <p className="font-headline italic text-xl md:text-2xl text-on-primary/70 mb-4">
            {t.domestic_cta_pre}
          </p>
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-12">
            {t.domestic_cta_quote}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
              {t.domestic_cta_btn1}
            </Link>
            <Link to="/about" className="border border-on-primary/30 text-on-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-surface hover:text-primary transition-all duration-500">
              {t.domestic_cta_btn2}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export function DomesticPage() {
  const { t } = useLanguage()
  usePageTitle(t.domestic_page_title)
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><DomesticContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="about"><DomesticContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
