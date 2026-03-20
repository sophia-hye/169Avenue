import { Link } from 'react-router-dom'

export function MobileHome() {
  return (
    <div className="md:hidden">
      {/* Hero Section */}
      <section className="px-6 mb-20">
        <div className="relative w-full aspect-[3/4] overflow-hidden mb-8">
          <img
            alt="Minimalist Architecture"
            className="w-full h-full object-cover grayscale brightness-95"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbqRCkRwrUlzVZHx0qyywme53paE26cSMuiPjz_1Tq9FlIKm98VjqtQLWtjYZ3Kid1WahDs-YV9GerARoBSEVAguydUFEjJf5JCxO9iPNyr-aLViSdQ6SjHvVxOv8RT3Uct_paTBGlT1-naZYj4HpwdbUrd7l4NtH9mSxb5SPVc_6pswOZi8DSiVjyux8F96jKIV0PnvZLOrpv5wwFCWel64dOtNhkHHx4vAKC8MlzHfkVs53kTkIxX2FWSDKbtrtm5Bb27R1FtG8"
          />
          <div className="absolute inset-0 bg-primary/5" />
        </div>
        <div className="max-w-xs">
          <h2 className="text-4xl font-headline italic leading-[1.1] tracking-tighter text-primary">
            Scholar <span className="font-normal">Atelier</span>
          </h2>
          <div className="mt-6 w-12 h-[2px] bg-secondary" />
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="bg-surface-container-low py-24 px-6">
        <div className="flex flex-col gap-10">
          <span className="font-label uppercase tracking-widest text-xs text-secondary font-bold">
            Our Philosophy
          </span>
          <div className="ml-auto w-4/5">
            <p className="text-2xl font-headline leading-relaxed text-on-surface-variant italic">
              "Education is the most powerful weapon which you can use to change the world."
            </p>
            <p className="mt-8 text-sm leading-7 text-on-surface-variant max-w-sm">
              Curating academic journeys for the next generation of global leaders. We transform aspirations into heritage through bespoke admissions strategy.
            </p>
          </div>
        </div>
      </section>

      {/* Curated Services */}
      <section className="py-24 px-6">
        <span className="font-label uppercase tracking-widest text-xs text-secondary font-bold mb-12 block">
          Curated Services
        </span>
        <div className="grid grid-cols-1 gap-12">
          <Link to="/about" className="group block">
            <div className="aspect-video bg-surface-container-high overflow-hidden mb-6">
              <img
                alt="Library Interior"
                className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPxKyKhL_RrinwdU0C-cEIxQlF-oVDTCbqipxtNoXgqyVZiOWJpebhVKvyiJXdjdfx05Xkr7d5jhs0F8b1ATtCuIP0CR4eFU8I-ecavFNbWgoEPhtKswmbUIEjc7UAvucCNbCPcJ_KR6yEiqgpCWT0FqQe__lSD1EsRiZSUCd0Vqhxh3qFdU6_Ut5qw0_S8uuU_b_ylGAp_wSvkwMrPK-hKlBCOrjphxnrKNtzEoWY-l58g4e43wfTUOCrxRj2yNZPnh0n1Nthqd8"
              />
            </div>
            <h3 className="text-xl font-headline mb-3">Editorial Essay Mentoring</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Crafting compelling personal narratives that highlight individual brilliance and intellectual curiosity.
            </p>
          </Link>

          <Link to="/about" className="group block">
            <div className="aspect-video bg-surface-container-high overflow-hidden mb-6">
              <img
                alt="Writing Desk"
                className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIdi0QEtI-rwlTubVcMNiBVA3vmUKN-3pW-J-KjLIGowlIukbvq6dA5EmKBUG8FDAaSHzDUOYHpNU--cV3q_mCSVeEbyH6clAu8CfkU3rqGAntnyo9NL37KMuGDg2SudOr0UcG8fUyZ5Dg0Vinr_pLizAHBABnS8T1TIYwmXePtgUC-vUZUmekqtUKpCddIvcHno4dIglYZgrNhovtQbkUXjpu3yUX63TSEkVLMrnSjRajJM9W-11ztKvzsIZhGpXuM9oFhHgtAvI"
              />
            </div>
            <h3 className="text-xl font-headline mb-3">Strategic Profile Building</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Developing a 4-year roadmap of extracurricular and academic achievements designed for impact.
            </p>
          </Link>
        </div>
      </section>

      {/* Signature Quote */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-surface-container-high opacity-50 -mr-16 -mt-16 rotate-45" />
        <div className="bg-surface-container-lowest p-10 shadow-sm relative z-10">
          <p className="text-xl font-headline italic text-primary leading-snug">
            Our approach is not a process; it is a curation. We look beyond the transcript to find the narrative that resonates with admissions committees.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-8 h-[1px] bg-outline-variant" />
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
              The Director's Note
            </span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center bg-primary text-on-primary">
        <h2 className="text-3xl font-headline italic mb-8">Begin Your Narrative</h2>
        <p className="text-sm font-body opacity-70 mb-12 max-w-xs mx-auto leading-relaxed">
          Experience the bespoke approach to global academic placement. Secure your private consultation.
        </p>
        <Link
          to="/consultation"
          className="inline-block bg-surface text-primary px-10 py-4 font-label uppercase text-[11px] tracking-[0.3em] font-bold hover:bg-secondary-fixed-dim transition-colors"
        >
          Inquire Now
        </Link>
      </section>

      {/* Mobile Footer */}
      <footer className="bg-surface-container-low text-primary py-12 px-6 flex flex-col items-center text-center gap-6">
        <div className="font-headline italic text-lg">169 Avenue</div>
        <div className="flex flex-col gap-3 text-sm font-body">
          <Link to="/about" className="text-on-surface-variant/60 hover:text-primary transition-colors">About</Link>
          <Link to="/partners" className="text-on-surface-variant/60 hover:text-primary transition-colors">Partners</Link>
          <Link to="/stories" className="text-on-surface-variant/60 hover:text-primary transition-colors">Success Stories</Link>
        </div>
        <div className="mt-8 text-xs text-on-surface-variant/40">
          &copy; 2025 169 Avenue. The Digital Curator.
        </div>
      </footer>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-t border-primary/5 flex justify-around items-center px-4 py-3">
        <Link to="/destinations" className="flex flex-col items-center gap-1 text-secondary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          <span className="uppercase tracking-widest text-[9px] font-label">Destinations</span>
        </Link>
        <Link to="/field" className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="uppercase tracking-widest text-[9px] font-label">Fields</span>
        </Link>
        <Link to="/stories" className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <span className="material-symbols-outlined">edit_note</span>
          <span className="uppercase tracking-widest text-[9px] font-label">Stories</span>
        </Link>
        <Link to="/consultation" className="flex flex-col items-center gap-1 text-on-surface-variant/60">
          <span className="material-symbols-outlined">mail</span>
          <span className="uppercase tracking-widest text-[9px] font-label">Inquire</span>
        </Link>
      </nav>
    </div>
  )
}
