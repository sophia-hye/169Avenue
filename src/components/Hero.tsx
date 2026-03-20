import { Link } from 'react-router-dom'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center px-8 md:px-16 lg:px-24 mb-32">
      <div className="grid grid-cols-12 w-full max-w-screen-2xl mx-auto gap-8 items-center">
        <div className="col-span-12 lg:col-span-7 z-10">
          <span className="font-label text-xs tracking-[0.3em] uppercase text-secondary mb-6 block">
            Est. 2025 — Premium Education Counsel
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-headline leading-[0.9] tracking-tighter text-primary mb-8 -ml-1 md:-ml-2">
            Scholar <br />
            <span className="italic font-normal">Atelier</span>
          </h1>
          <p className="max-w-md font-body text-on-surface-variant text-lg leading-relaxed mb-10">
            Curating academic journeys for the next generation of global leaders.
            We transform aspirations into heritage through bespoke admissions strategy.
          </p>
          <div className="flex items-center space-x-8">
            <Link
              to="/consultation"
              className="bg-primary text-on-primary px-10 py-4 text-sm tracking-widest uppercase transition-all hover:bg-secondary"
            >
              Begin Journey
            </Link>
            <a
              className="font-label text-xs tracking-widest uppercase border-b border-primary/20 pb-1 hover:border-primary transition-all"
              href="#destinations"
            >
              Explore Portfolio
            </a>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0">
          <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden">
            <img
              alt="Classical University Campus Architecture"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt9ZfDIeu-d3y3uQi2eFnUpW9XPAkXGVDBchVkoxFGSK7Mg2V92xSgXEcbyWxwbw0MCe2Whfvwwrsf6c5kLgOkLmbCMhD2iuOfBaJGh56MPDhUl8L8nHoEBTCu_11tWA4cg76dfooajJ5hrWU8vGr_-iV_33uGPPhrGWd-z2ePRKgfpFyMBup3DS4phuBBYBfh3Hx7V4E4gK7V-XM9PWperAIwDNFhE5xV6dAIgc1TgsEvijJBGqYUhTAeZ1Py6o6aKiaCXZNpasg"
            />
          </div>
          <div className="absolute -bottom-12 -left-12 hidden md:block bg-surface-container-lowest p-8 shadow-sm max-w-[280px]">
            <p className="font-serif italic text-xl text-primary leading-snug">
              "Education is the most powerful weapon which you can use to change the world."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
