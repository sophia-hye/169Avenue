import { Link } from 'react-router-dom'
import { HERO_IMAGE, DESTINATIONS_LAYOUT } from '../data/home'
import { FEATURED_STORY } from '../data/stories'
import { Stats } from './Stats'
import { useLanguage } from '../context/LanguageContext'

export function MobileHome() {
  const { t } = useLanguage()
  return (
    <div className="md:hidden">
      {/* Hero Section */}
      <section className="px-6 mb-20">
        <div className="relative w-full aspect-[3/4] overflow-hidden mb-8">
          <img
            alt="Classical University Campus Architecture"
            className="w-full h-full object-cover brightness-95"
            src={HERO_IMAGE}
          />
          <div className="absolute inset-0 bg-primary/5" />
        </div>
        <div className="max-w-xs">
          <h2 className="text-4xl font-headline italic leading-[1.1] tracking-tighter text-primary">
            {t.hero_title_1} <span className="font-normal">{t.hero_title_2}</span>
          </h2>
          <div className="mt-6 w-12 h-[2px] bg-secondary" />
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* Our Philosophy */}
      <section className="bg-surface-container-low py-24 px-6">
        <div className="flex flex-col gap-10">
          <span className="font-label uppercase tracking-widest text-xs text-secondary font-bold">
            {t.mobile_our_philosophy}
          </span>
          <div className="ml-auto w-4/5">
            <p className="text-2xl font-headline leading-relaxed text-on-surface-variant italic">
              {t.hero_quote}
            </p>
            <p className="mt-8 text-sm leading-7 text-on-surface-variant max-w-sm">
              {t.hero_body}
            </p>
          </div>
        </div>
      </section>

      {/* Curated Services */}
      <section className="py-24 px-6">
        <span className="font-label uppercase tracking-widest text-xs text-secondary font-bold mb-12 block">
          {t.mobile_curated_services}
        </span>
        <div className="grid grid-cols-1 gap-12">
          {t.expertise_items.slice(0, 2).map((item, i) => (
            <Link key={i} to="/about" className="group block">
              <div className="aspect-video bg-surface-container-high overflow-hidden mb-6">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                  src={i === 0
                    ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPxKyKhL_RrinwdU0C-cEIxQlF-oVDTCbqipxtNoXgqyVZiOWJpebhVKvyiJXdjdfx05Xkr7d5jhs0F8b1ATtCuIP0CR4eFU8I-ecavFNbWgoEPhtKswmbUIEjc7UAvucCNbCPcJ_KR6yEiqgpCWT0FqQe__lSD1EsRiZSUCd0Vqhxh3qFdU6_Ut5qw0_S8uuU_b_ylGAp_wSvkwMrPK-hKlBCOrjphxnrKNtzEoWY-l58g4e43wfTUOCrxRj2yNZPnh0n1Nthqd8'
                    : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIdi0QEtI-rwlTubVcMNiBVA3vmUKN-3pW-J-KjLIGowlIukbvq6dA5EmKBUG8FDAaSHzDUOYHpNU--cV3q_mCSVeEbyH6clAu8CfkU3rqGAntnyo9NL37KMuGDg2SudOr0UcG8fUyZ5Dg0Vinr_pLizAHBABnS8T1TIYwmXePtgUC-vUZUmekqtUKpCddIvcHno4dIglYZgrNhovtQbkUXjpu3yUX63TSEkVLMrnSjRajJM9W-11ztKvzsIZhGpXuM9oFhHgtAvI'
                  }
                />
              </div>
              <h3 className="text-xl font-headline mb-3">{item.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 px-6">
        <span className="font-label uppercase tracking-widest text-xs text-secondary font-bold mb-2 block">
          {t.destinations_section_tag}
        </span>
        <h2 className="text-3xl font-headline tracking-tight mb-10">{t.destinations_section_title}</h2>
        <div className="flex flex-col gap-4">
          {DESTINATIONS_LAYOUT.map((layout, i) => {
            const item = t.destinations_items[i]
            return (
              <Link
                key={item.title}
                to="/destinations"
                className={`group relative overflow-hidden ${layout.bgClass} h-40`}
              >
                <img
                  alt={item.title}
                  className={`w-full h-full object-cover ${layout.imgOpacity} group-hover:scale-105 group-hover:grayscale transition-all duration-700`}
                  src={layout.image}
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <span className={`font-label text-[10px] tracking-widest ${layout.textClass} uppercase`}>
                    {item.tag}
                  </span>
                  <div>
                    <h3 className={`text-2xl ${layout.textClass} font-headline mb-1`}>{item.title}</h3>
                    <p className={`${layout.descClass} font-body text-xs`}>{item.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Success Story */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-surface-container-high opacity-50 -mr-16 -mt-16 rotate-45" />
        <div className="bg-surface-container-lowest p-10 shadow-sm relative z-10">
          <Link
            to="/stories"
            className="font-label text-[10px] tracking-[0.2em] uppercase text-secondary mb-6 block hover:text-primary transition-colors"
          >
            {t.success_story_link}
          </Link>
          <p className="text-xl font-headline italic text-primary leading-snug mb-6">
            {FEATURED_STORY.quote}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-outline-variant" />
            <div>
              <span className="font-label text-xs font-bold uppercase tracking-widest text-primary block">
                {FEATURED_STORY.name}
              </span>
              <span className="font-label text-[10px] text-secondary italic">
                {FEATURED_STORY.university}, {FEATURED_STORY.classYear}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-primary text-on-primary">
        <h2 className="text-3xl font-headline italic mb-8">{t.mobile_cta_title}</h2>
        <p className="text-sm font-body opacity-70 mb-12 max-w-xs mx-auto leading-relaxed">
          {t.mobile_cta_body}
        </p>
        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <Link
            to="/domestic"
            className="block bg-surface text-primary py-4 font-label uppercase text-[11px] tracking-[0.2em] font-bold active:scale-95 transition-all"
          >
            Domestic Admissions
          </Link>
          <Link
            to="/destinations"
            className="block border border-on-primary/30 text-on-primary py-4 font-label uppercase text-[11px] tracking-[0.2em] font-bold active:scale-95 transition-all"
          >
            International Admissions
          </Link>
        </div>
      </section>

      {/* Mobile Footer */}
      <footer className="bg-surface-container-low text-primary py-12 px-6 flex flex-col items-center text-center gap-6">
        <div className="font-headline italic text-lg">169 Avenue</div>
        <div className="flex flex-col gap-3 text-sm font-body">
          <Link to="/about" className="text-on-surface-variant/60 hover:text-primary transition-colors">{t.nav_about}</Link>
          <Link to="/partners" className="text-on-surface-variant/60 hover:text-primary transition-colors">{t.nav_partners}</Link>
          <Link to="/stories" className="text-on-surface-variant/60 hover:text-primary transition-colors">{t.mobile_success_stories}</Link>
        </div>
        <div className="mt-8 text-xs text-on-surface-variant/40">
          {t.copyright}
        </div>
      </footer>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-xl flex justify-around items-center px-2 py-3 z-50 border-t border-outline-variant/10">
        <Link to="/about" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">info</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_about}</span>
        </Link>
        <Link to="/partners" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">handshake</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_partners}</span>
        </Link>
        <Link to="/field" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">school</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_field}</span>
        </Link>
        <Link to="/destinations" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">public</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_destinations}</span>
        </Link>
        <Link to="/stories" className="flex flex-col items-center gap-1 text-on-surface-variant/40">
          <span className="material-symbols-outlined text-lg">auto_stories</span>
          <span className="text-[8px] font-label uppercase tracking-widest">{t.bottom_stories}</span>
        </Link>
      </nav>
    </div>
  )
}
