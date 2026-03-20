import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

const STUDY_LEVELS = [
  'Select Tier',
  'Elite Boarding Prep',
  'Undergraduate Ivy/Oxbridge',
  'Postgraduate Research',
  'MBA / Law / Medical',
]

const REGIONS = [
  'Select Region',
  'United States (Ivy League+)',
  'United Kingdom (G5)',
  'Continental Europe',
  'Pan-Asia',
]

const OFFICES = [
  {
    city: 'Seoul',
    address: 'Cheongdam-dong, Gangnam-gu',
    detail: 'Private Academic Salon',
    phone: '+82 2-555-0000',
  },
  {
    city: 'London',
    address: 'Mayfair, St James\'s Place',
    detail: 'Curatorial Suite',
    phone: '+44 20 7946 0000',
  },
  {
    city: 'New York',
    address: 'Upper East Side, 5th Ave',
    detail: 'The Atelier Tower',
    phone: '+1 212-555-0100',
  },
]

export function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-surface selection:bg-secondary/20">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-surface/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-12 py-6 max-w-[1920px] mx-auto">
          <Link
            to="/"
            className="font-headline font-bold text-2xl tracking-tighter text-primary active:scale-95 duration-200"
          >
            169 Avenue
          </Link>
          <div className="hidden md:flex items-center space-x-12">
            <Link
              to="/"
              className="text-on-surface-variant hover:text-primary transition-colors font-headline italic tracking-tight text-lg"
            >
              Home
            </Link>
            <a
              className="text-on-surface-variant hover:text-primary transition-colors font-headline italic tracking-tight text-lg"
              href="#offices"
            >
              Global Offices
            </a>
            <span className="text-secondary font-medium border-b border-secondary font-headline italic tracking-tight text-lg">
              Consultation
            </span>
          </div>
          <Link
            to="/"
            className="bg-primary text-on-primary px-8 py-2 font-label uppercase tracking-widest text-[10px] hover:opacity-70 transition-opacity duration-300"
          >
            Home
          </Link>
        </div>
        <div className="bg-surface-container-low h-[1px] w-full" />
      </nav>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-8">
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-primary leading-none tracking-tight mb-8">
                The Beginning of <br />
                <span className="italic font-light">Your Legacy</span>
              </h1>
              <p className="font-headline italic text-xl md:text-2xl text-on-surface-variant max-w-2xl leading-relaxed">
                We believe that education is the ultimate curator of destiny. Our bespoke
                consultation is a private, intentional dialogue designed to architect your
                academic future with the precision of a master artisan.
              </p>
            </div>
            <div className="hidden md:block md:col-span-4 pb-4">
              <div className="w-full aspect-[3/4] overflow-hidden grayscale contrast-125 opacity-90">
                <img
                  alt="Classical architectural detail"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIJuanZH--r2rB6b7w1He3VUDciTPOw-sEVJoxUYT3cj8DzinO5w2pBMA3Fhp-hMrtCA0-SLBu3DLggvRWqgzHlCMTrqtSrgqUd3W1dB98P3TNtG6eurYzvOKBjtuj8tbys93p1Xr719RdoUGseJ8cqlXoOlbG00ggGUFSbqnVTehsDaI6p54yfZaKusZorGKl0F13NtN9EuEe-IeRVCzQl5PYas7RmEZX9UPhxNsqv1jfAjsEcbKQwnqjDU1uTeM4OYQObmzDLps"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="py-20 text-center space-y-8">
                <span className="material-symbols-outlined text-secondary text-6xl">check_circle</span>
                <h2 className="font-headline text-4xl italic text-primary">
                  Thank you for your inquiry.
                </h2>
                <p className="font-body text-on-surface-variant text-lg max-w-md mx-auto leading-relaxed">
                  A senior curator will review your dossier and respond within 48 hours.
                </p>
                <Link
                  to="/"
                  className="inline-block bg-primary text-on-primary px-12 py-5 text-sm tracking-widest uppercase hover:bg-secondary transition-all mt-8"
                >
                  Return Home
                </Link>
              </div>
            ) : (
              <form className="space-y-24" onSubmit={handleSubmit}>
                {/* Step 1: Personal Narrative */}
                <div className="space-y-12">
                  <div className="flex items-center space-x-4 border-b border-outline-variant/30 pb-4">
                    <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">01</span>
                    <h2 className="font-label text-xs tracking-[0.2em] text-primary uppercase font-bold">
                      Personal Narrative
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                        Full Legal Name <span className="text-secondary">*</span>
                      </label>
                      <input
                        className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors"
                        placeholder="The Honorable..."
                        type="text"
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                        Direct Correspondence (Email) <span className="text-secondary">*</span>
                      </label>
                      <input
                        className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors"
                        placeholder="contact@example.com"
                        type="email"
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                        Phone / Secure Messenger
                      </label>
                      <input
                        className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors"
                        placeholder="+1 (000) 000-0000"
                        type="tel"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                        Current Residency
                      </label>
                      <input
                        className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors"
                        placeholder="e.g. Geneva, Switzerland"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Academic Aspirations */}
                <div className="space-y-12">
                  <div className="flex items-center space-x-4 border-b border-outline-variant/30 pb-4">
                    <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">02</span>
                    <h2 className="font-label text-xs tracking-[0.2em] text-primary uppercase font-bold">
                      Academic Aspirations
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                        Intended Level of Study <span className="text-secondary">*</span>
                      </label>
                      <select
                        className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic appearance-none cursor-pointer focus:border-secondary focus:outline-none transition-colors"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>Select Tier</option>
                        {STUDY_LEVELS.slice(1).map((level) => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                        Primary Geographic Region <span className="text-secondary">*</span>
                      </label>
                      <select
                        className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic appearance-none cursor-pointer focus:border-secondary focus:outline-none transition-colors"
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>Select Region</option>
                        {REGIONS.slice(1).map((region) => (
                          <option key={region} value={region}>{region}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col space-y-2 md:col-span-2">
                      <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                        Anticipated Commencement
                      </label>
                      <input
                        className="bg-transparent border-b border-outline-variant py-4 font-headline text-xl italic placeholder:text-stone-300 focus:border-secondary focus:outline-none transition-colors"
                        placeholder="e.g. Autumn Term 2025"
                        type="text"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3: Concierge Notes */}
                <div className="space-y-12">
                  <div className="flex items-center space-x-4 border-b border-outline-variant/30 pb-4">
                    <span className="font-label text-[10px] tracking-[0.2em] text-secondary uppercase">03</span>
                    <h2 className="font-label text-xs tracking-[0.2em] text-primary uppercase font-bold">
                      Concierge Notes
                    </h2>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                      Share your story or unique objectives
                    </label>
                    <textarea
                      className="bg-surface-container-low border-none p-8 font-headline text-xl italic placeholder:text-stone-400 focus:bg-surface-container-lowest focus:outline-none transition-colors"
                      placeholder="Briefly describe the student's unique profile, challenges, and ultimate vision..."
                      rows={4}
                    />
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-8">
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-8">
                    <span className="text-secondary">*</span> Required fields
                  </p>
                </div>
                <div>
                  <button
                    type="submit"
                    className="group flex items-center space-x-6 bg-primary text-on-primary px-12 py-6 hover:bg-secondary transition-all duration-500"
                  >
                    <span className="font-label text-xs uppercase tracking-[0.3em]">Submit Inquiry</span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">
                      arrow_forward
                    </span>
                  </button>
                  <p className="mt-6 font-label text-[9px] uppercase tracking-widest text-on-surface-variant opacity-60">
                    Upon submission, a senior curator will review your dossier within 48 hours.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-20">
            {/* Quote */}
            <div className="bg-surface-container-lowest p-10 shadow-[0_10px_40px_-10px_rgba(0,1,1,0.04)] border border-surface-container">
              <span
                className="material-symbols-outlined text-secondary mb-6 block"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                format_quote
              </span>
              <p className="font-headline italic text-xl leading-relaxed text-primary mb-8">
                "We do not merely fill applications; we articulate the depth of a student's
                soul. A Scholar Atelier consultation is the first step in translating ambition
                into institutional heritage."
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-[1px] bg-secondary" />
                <span className="font-label text-[10px] uppercase tracking-widest text-primary font-bold">
                  Director Alistair Thorne
                </span>
              </div>
            </div>

            {/* Privacy Shield */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'wght' 200" }}
                >
                  verified_user
                </span>
                <div>
                  <h4 className="font-label text-[11px] uppercase tracking-widest font-bold text-primary mb-2">
                    Absolute Discretion
                  </h4>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                    Our engagement is bound by a strict non-disclosure framework. We serve as a
                    private concierge to families who value anonymity as much as excellence.
                  </p>
                </div>
              </div>
            </div>

            {/* Location Image */}
            <div className="aspect-video bg-surface-container-high relative overflow-hidden">
              <img
                alt="London street view"
                className="w-full h-full object-cover grayscale brightness-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ9ttfmvUbJ6W2BkaCHf0lJ7NdRnv0Rt7ovPhdKH51Yyqax8YuriNeEghuudsiw8o8_g6ZRr3S0Z-PlamFmc2qYRtNTkHRqtQzi4NDinnpqvy_zffDifUwWYmtrBDoQJ_AIQ8kFcXWraT15btYH_G6j0teYoK80Pxp_echfGGl_tBJfAbD0pCTHYFmjXH9_Py7gCYvr4e95I_1tkuch-EkibaW51UWjpTnLLs-YkvdGwJtolG7dERLWd6PcsvYzDFmdtZVj8CIwwk"
              />
              <div className="absolute inset-0 bg-secondary/5" />
              <div className="absolute bottom-6 left-6">
                <span className="font-label text-[10px] uppercase tracking-widest text-white bg-primary px-3 py-1">
                  London Office
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section id="offices" className="mt-40 border-t border-outline-variant/30 pt-20 px-6 md:px-12 max-w-7xl mx-auto">
          <h3 className="font-headline text-3xl italic text-primary mb-16">Global Offices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {OFFICES.map((office) => (
              <div key={office.city} className="space-y-4">
                <h4 className="font-label text-xs uppercase tracking-[0.2em] font-bold text-primary">
                  {office.city}
                </h4>
                <p className="font-body text-sm text-on-surface-variant leading-loose">
                  {office.address}<br />
                  {office.detail}<br />
                  {office.phone}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-surface w-full px-12 py-20 mt-20 border-t border-stone-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end max-w-[1920px] mx-auto">
          <div className="space-y-8">
            <Link to="/" className="font-headline text-3xl font-bold tracking-tighter text-surface">
              169 Avenue
            </Link>
            <p className="font-body uppercase tracking-widest text-[10px] text-stone-400 max-w-xs leading-relaxed">
              Private Concierge for the Global Academic. Curating legacies through elite education since 2025.
            </p>
          </div>
          <div className="flex flex-col space-y-12 items-start md:items-end">
            <div className="flex flex-wrap gap-8 justify-start md:justify-end">
              {['Privacy Policy', 'Terms of Service', 'Accessibility', 'Alumni Portal'].map((link) => (
                <a
                  key={link}
                  className="text-stone-500 hover:text-stone-300 font-body uppercase tracking-widest text-[10px] transition-colors"
                  href="#"
                >
                  {link}
                </a>
              ))}
            </div>
            <p className="font-body uppercase tracking-widest text-[10px] text-stone-500">
              &copy; 2025 169 Avenue. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
