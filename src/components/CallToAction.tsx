import { Link } from 'react-router-dom'

export function CallToAction() {
  return (
    <section className="mb-40 px-8 md:px-16 lg:px-24 text-center max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-6xl font-headline mb-8">
        Find Out If Your Profile <span className="italic">Qualifies</span>
      </h2>
      <p className="font-body text-on-surface-variant text-lg mb-12 leading-relaxed">
        Every admissions case is unique. Book a free 15-minute diagnostic session
        to understand your competitiveness and next steps.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
        <Link
          to="/consultation"
          className="w-full md:w-auto bg-primary text-on-primary px-12 py-5 text-sm tracking-widest uppercase hover:bg-secondary transition-all"
        >
          Free 15-Min Diagnosis
        </Link>
        <Link
          to="/domestic"
          className="w-full md:w-auto bg-transparent border border-primary text-primary px-12 py-5 text-sm tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-all"
        >
          Check My Eligibility
        </Link>
      </div>
    </section>
  )
}
