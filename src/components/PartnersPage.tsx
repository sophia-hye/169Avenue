import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
import { useLanguage } from '../context/LanguageContext'
import { usePageTitle } from '../hooks/usePageTitle'

function ServicesContent() {
  const { t } = useLanguage()

  return (
    <>
      {/* Header */}
      <header className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
          Future Pathway Program | {t.partners_hero_label}
        </span>
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-primary tracking-tighter leading-[1] mb-6">
          {t.partners_hero_title_line1}<br /><span className="italic">{t.partners_hero_title_line2}</span>
        </h1>
        <p className="font-body text-on-surface-variant text-base md:text-lg leading-relaxed max-w-2xl">
          {t.partners_hero_intro}
        </p>
      </header>

      {/* === HOW IT WORKS === */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="mb-14">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary mb-4 block">
            {t.partners_process_tag}
          </span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary tracking-tight">
            {t.partners_process_title}
          </h2>
          <p className="font-body text-on-surface-variant text-base mt-3 max-w-xl">
            {t.partners_process_body}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.partners_process_steps.map((item) => (
            <div key={item.step} className="bg-surface-container-low p-8 md:p-10">
              <span className="font-headline italic text-4xl text-secondary/40 block mb-6">{item.step}</span>
              <h3 className="font-headline text-xl text-primary mb-3">{item.title}</h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === 3-TIER PRICING LADDER === */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-8 md:mb-12">
        <h2 className="font-headline text-3xl md:text-4xl text-primary text-center mb-3">
          {t.partners_pricing_title}
        </h2>
        <p className="font-body text-sm text-on-surface-variant text-center max-w-xl mx-auto">
          {t.partners_pricing_sub}
        </p>
      </section>

      {/* --- ENTRY: Weekend --- */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
        <div className="bg-surface-container-lowest shadow-sm p-8 md:p-14 border-l-4 border-outline-variant/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-label text-[10px] uppercase tracking-widest bg-outline-variant/10 text-on-surface-variant px-3 py-1">Entry</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary">{t.partners_entry.period}</span>
              </div>
              <h3 className="font-headline text-2xl md:text-3xl text-primary mb-2">
                {t.partners_entry.title}
              </h3>
              <p className="font-headline italic text-base text-primary/50 mb-6">
                {t.partners_entry.quote}
              </p>
              <p className="font-body text-on-surface-variant text-base leading-relaxed mb-6">
                {t.partners_entry.body}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="border border-outline-variant/15 p-4">
                  <h4 className="font-headline text-sm text-primary mb-2">DAY 1</h4>
                  <ul className="space-y-1">
                    {t.partners_entry.day1.map((b) => (
                      <li key={b} className="font-body text-xs text-on-surface-variant flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[10px] mt-0.5">check</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-outline-variant/15 p-4">
                  <h4 className="font-headline text-sm text-primary mb-2">DAY 2</h4>
                  <ul className="space-y-1">
                    {t.partners_entry.day2.map((b) => (
                      <li key={b} className="font-body text-xs text-on-surface-variant flex items-start gap-1.5">
                        <span className="material-symbols-outlined text-secondary text-[10px] mt-0.5">check</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Link to="/consultation" className="inline-block bg-primary text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors">
                {t.partners_entry.cta}
              </Link>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <div className="bg-surface p-6 border border-outline-variant/15 w-full">
                <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.partners_parents_get_label}</div>
                <ul className="space-y-3">
                  {t.partners_entry.parents.map((r) => (
                    <li key={r} className="flex items-start gap-2 font-body text-sm text-primary">
                      <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>{r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CORE: 1~2 Week --- */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-10 md:mb-16">
        <div className="bg-surface-container-low p-8 md:p-14 border-l-4 border-secondary">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-label text-[10px] uppercase tracking-widest bg-secondary/10 text-secondary px-3 py-1">Core</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary">{t.partners_core.period}</span>
              </div>
              <h3 className="font-headline text-2xl md:text-3xl text-primary mb-2">
                {t.partners_core.title}
              </h3>
              <p className="font-headline italic text-base text-primary/50 mb-6">
                {t.partners_core.quote}
              </p>
              <p className="font-body text-on-surface-variant text-base leading-relaxed mb-6">
                {t.partners_core.body}
              </p>

              <ul className="space-y-3 mb-6">
                {t.partners_core.items.map((item) => (
                  <li key={item.icon} className="flex items-start gap-3 font-body text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-base mt-0.5 shrink-0">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <Link to="/consultation" className="inline-block bg-primary text-on-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-secondary transition-colors">
                {t.partners_core.cta}
              </Link>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <div className="bg-surface p-6 border border-outline-variant/15 w-full">
                <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.partners_parents_get_label}</div>
                <ul className="space-y-3 mb-6">
                  {t.partners_core.parents.map((r) => (
                    <li key={r} className="flex items-start gap-2 font-body text-sm text-primary">
                      <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>{r}
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-secondary/5 border border-secondary/10">
                  <p className="font-headline italic text-sm text-primary">
                    {t.partners_core.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PREMIUM: 1~3 Month --- */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="bg-primary text-on-primary p-8 md:p-14 border-l-4 border-secondary">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-label text-[10px] uppercase tracking-widest bg-secondary text-white px-3 py-1">Premium</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary">{t.partners_premium.period}</span>
              </div>
              <h3 className="font-headline text-2xl md:text-3xl mb-2">
                {t.partners_premium.title}
              </h3>
              <p className="font-headline italic text-base text-on-primary/50 mb-6">
                {t.partners_premium.quote}
              </p>
              <p className="font-body text-on-primary/80 text-base leading-relaxed mb-6">
                {t.partners_premium.body}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {t.partners_premium.blocks.map((block) => (
                  <div key={block.icon} className="bg-on-primary/5 border border-on-primary/10 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="material-symbols-outlined text-secondary text-lg">{block.icon}</span>
                      <h4 className="font-headline text-base text-on-primary">{block.title}</h4>
                    </div>
                    <ul className="space-y-1">
                      {block.items.map((b) => (
                        <li key={b} className="font-body text-xs text-on-primary/60 flex items-start gap-1.5">
                          <span className="material-symbols-outlined text-secondary text-[10px] mt-0.5">check</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link to="/consultation" className="inline-block bg-surface text-primary px-6 py-3 font-label text-xs uppercase tracking-widest hover:bg-secondary hover:text-white transition-colors">
                {t.partners_premium.cta}
              </Link>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <div className="bg-on-primary/5 border border-on-primary/10 p-6 w-full">
                <div className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.partners_parents_get_label}</div>
                <ul className="space-y-3 mb-6">
                  {t.partners_premium.parents.map((r) => (
                    <li key={r} className="flex items-start gap-2 font-body text-sm text-on-primary/80">
                      <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>{r}
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-secondary/10 border border-secondary/20">
                  <p className="font-headline italic text-sm text-on-primary">
                    {t.partners_premium.note}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === UPGRADE PATH VISUAL === */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="bg-surface-container-lowest shadow-sm p-8 md:p-16">
          <h3 className="font-headline text-2xl md:text-3xl text-primary mb-3 text-center">
            {t.partners_upgrade_title}
          </h3>
          <p className="font-body text-sm text-on-surface-variant text-center mb-10 max-w-lg mx-auto">
            {t.partners_upgrade_sub}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {t.partners_upgrade_path.map((item, i) => (
              <div key={item.tier} className="relative flex flex-col items-center text-center p-8">
                {i < t.partners_upgrade_path.length - 1 && <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 text-secondary text-2xl font-bold">{'>'}</div>}
                <div className={`font-label text-[10px] uppercase tracking-widest px-4 py-1 mb-4 ${
                  i === 0 ? 'bg-outline-variant/10 text-on-surface-variant' :
                  i === 1 ? 'bg-secondary/10 text-secondary' :
                  'bg-secondary text-white'
                }`}>{item.tier}</div>
                <div className="font-headline text-3xl text-primary mb-1">{item.period}</div>
                <div className="font-headline italic text-lg text-secondary mb-3">{item.goal}</div>
                <p className="font-body text-sm text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === AGE-BASED CURRICULUM === */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <h2 className="font-headline text-3xl md:text-4xl text-primary text-center mb-3">
          {t.partners_age_title}
        </h2>
        <p className="font-body text-sm text-on-surface-variant text-center max-w-xl mx-auto mb-12">
          {t.partners_age_sub}
        </p>

        <div className="space-y-8">
          {t.partners_age_curriculums.map((item) => (
            <div key={item.icon} className={`bg-surface-container-lowest shadow-sm border-l-4 ${item.color} p-8 md:p-12`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
                {/* Left: Info */}
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-secondary text-2xl">{item.icon}</span>
                    <h3 className="font-headline text-xl md:text-2xl text-primary">{item.age}</h3>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant mb-2">{t.partners_age_goal_label}: {item.goal}</p>
                  <p className="font-headline italic text-base text-secondary mb-6">{item.keyword}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="border border-outline-variant/15 p-5 bg-surface">
                      <h4 className="font-headline text-sm text-primary mb-3">DAY 1</h4>
                      <ul className="space-y-2">
                        {item.day1.map((b) => (
                          <li key={b} className="flex items-start gap-2 font-body text-sm text-on-surface-variant">
                            <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">play_arrow</span>{b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border border-outline-variant/15 p-5 bg-surface">
                      <h4 className="font-headline text-sm text-primary mb-3">DAY 2</h4>
                      <ul className="space-y-2">
                        {item.day2.map((b) => (
                          <li key={b} className="flex items-start gap-2 font-body text-sm text-on-surface-variant">
                            <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">play_arrow</span>{b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right: Extension */}
                <div className="lg:col-span-4">
                  <div className="bg-surface-container-low p-6 h-full">
                    <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-4">
                      {t.partners_age_extend_label}
                    </h4>
                    <ul className="space-y-3">
                      {item.extend.map((b) => (
                        <li key={b} className="flex items-start gap-2 font-body text-sm text-on-surface-variant">
                          <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">arrow_upward</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === DOMESTIC vs OVERSEAS === */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <h3 className="font-headline text-2xl md:text-3xl text-primary mb-8 text-center">
          {t.partners_compare_title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Domestic */}
          <div className="bg-surface-container-lowest shadow-sm p-8 border-t-4 border-secondary/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">location_city</span>
              <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 font-label uppercase tracking-widest">{t.partners_domestic.badge}</span>
            </div>
            <h4 className="font-headline text-xl text-primary mb-2">{t.partners_domestic.title}</h4>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.partners_domestic.sub}</p>
            <ul className="space-y-2 mb-4">
              {t.partners_domestic.items.map((b) => (
                <li key={b} className="flex items-start gap-2 font-body text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">check</span>{b}
                </li>
              ))}
            </ul>
            <p className="font-headline italic text-sm text-primary/60">{t.partners_domestic.quote}</p>
          </div>

          {/* Overseas */}
          <div className="bg-surface-container-low p-8 border-t-4 border-secondary">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary text-2xl">flight_takeoff</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 font-label uppercase tracking-widest">{t.partners_overseas.badge}</span>
            </div>
            <h4 className="font-headline text-xl text-primary mb-2">{t.partners_overseas.title}</h4>
            <p className="font-label text-[10px] uppercase tracking-widest text-secondary mb-4">{t.partners_overseas.sub}</p>
            <ul className="space-y-2 mb-4">
              {t.partners_overseas.items.map((b) => (
                <li key={b} className="flex items-start gap-2 font-body text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-xs mt-0.5 shrink-0">check</span>{b}
                </li>
              ))}
            </ul>
            <p className="font-headline italic text-sm text-primary/60">{t.partners_overseas.quote}</p>
          </div>
        </div>
      </section>

      {/* === About Link === */}
      <section className="px-6 md:px-16 max-w-screen-2xl mx-auto mb-16 md:mb-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-container-low p-8 md:p-12">
          <p className="font-headline italic text-xl md:text-2xl text-primary leading-snug text-center md:text-left">
            {t.partners_about_question}
          </p>
          <Link to="/about" className="shrink-0 inline-flex items-center gap-2 font-label text-xs uppercase tracking-widest border border-primary text-primary px-8 py-4 hover:bg-primary hover:text-on-primary transition-all group">
            {t.partners_about_btn}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* === Final CTA === */}
      <section className="py-20 md:py-32 px-6 md:px-16 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <p className="font-headline italic text-xl md:text-2xl text-on-primary/70 mb-4">
            {t.partners_final_pre}
          </p>
          <p className="font-headline italic text-2xl md:text-4xl leading-snug mb-12">
            {t.partners_final_quote}
          </p>
          <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
            {t.partners_final_btn}
          </Link>
        </div>
      </section>
    </>
  )
}

export function PartnersPage() {
  const { t } = useLanguage()
  usePageTitle(t.partners_page_title)
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32"><ServicesContent /></main>
        <Footer />
      </div>
      <MobileShell activeTab="programs"><ServicesContent /></MobileShell>
      <MobileFooter />
    </div>
  )
}
