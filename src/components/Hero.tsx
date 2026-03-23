import { Link } from 'react-router-dom'
import { HERO_IMAGE } from '../data/home'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center px-8 md:px-16 lg:px-24 mb-32">
      <div className="grid grid-cols-12 w-full max-w-screen-2xl mx-auto gap-8 items-center">
        <div className="col-span-12 lg:col-span-7 z-10">
          <span className="font-label text-xs tracking-[0.3em] uppercase text-secondary mb-6 block">
            Overseas HS × Korean Uni × Transfer × International
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline leading-[1] tracking-tighter text-primary mb-8 -ml-1 md:-ml-2">
            Can Your Overseas Grades <br />
            <span className="italic font-normal">Get You Into a Top Korean University?</span>
          </h1>
          <p className="max-w-lg font-body text-on-surface-variant text-lg leading-relaxed mb-4">
            We diagnose your competitiveness and design a strategy — whether it's
            재외국민 전형, 편입, or international admissions.
          </p>
          <ul className="max-w-lg font-body text-on-surface-variant text-sm leading-relaxed mb-10 space-y-1">
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm">check</span> Overseas HS → Korean top university admission strategy</li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm">check</span> Foreign university → Korean university transfer planning</li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary text-sm">check</span> Korean student → Overseas university (US/UK/EU/Asia) admissions</li>
          </ul>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Link
              to="/consultation"
              className="bg-primary text-on-primary px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-secondary"
            >
              Free Competitiveness Diagnosis
            </Link>
            <Link
              to="/domestic"
              className="border-2 border-primary text-primary px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 hover:bg-primary hover:text-on-primary"
            >
              Check My Case
            </Link>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0 group">
          <div className="relative w-full aspect-[4/5] bg-surface-container-low overflow-hidden">
            <img
              alt="University Campus"
              className="w-full h-full object-cover transition-all duration-1000 group-hover:grayscale"
              src={HERO_IMAGE}
            />
          </div>
          <div className="absolute -bottom-12 -left-12 hidden md:block bg-surface-container-lowest group-hover:bg-secondary p-8 shadow-sm max-w-[280px] transition-colors duration-500">
            <p className="font-serif italic text-xl text-primary group-hover:text-on-primary leading-snug transition-colors duration-500">
              "We don't just guide applications — we architect your academic future."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
