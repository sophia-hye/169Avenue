import { useState } from 'react'

const FAQS = [
  {
    q: 'Can students from overseas high schools apply to Korean universities without a Korean student record (학생부)?',
    a: 'Yes. Most top Korean universities offer 재외국민 특별전형 (Special Admission for Overseas Koreans) or 외국인 전형 (International Student Admission) tracks that do not require a Korean 학생부. Your overseas transcripts, standardized test scores, and personal statements serve as the primary evaluation materials.',
  },
  {
    q: 'Is it difficult to enter top Korean universities without IB or AP coursework?',
    a: 'Not necessarily. While IB/AP coursework can strengthen your application, Korean universities also recognize other international curricula (A-Level, American standard, Canadian, Australian, etc.). We help position your existing curriculum as a competitive asset and identify supplementary credentials if needed.',
  },
  {
    q: 'What is the most important factor when transferring from a foreign university to a Korean university?',
    a: 'Credit transferability is the most critical factor. Each Korean university has its own policies on which foreign credits they accept. We conduct a detailed credit mapping analysis before you apply, so you know exactly how many credits will transfer and how long it will take to graduate.',
  },
  {
    q: 'Can I prepare for both Korean and overseas university admissions simultaneously?',
    a: 'Yes, and this is actually one of our core specialties. We design parallel strategies that maximize your options — preparing Korean-specific documents while simultaneously building applications for overseas institutions. The key is starting early enough to manage both timelines.',
  },
  {
    q: 'What deliverables do I receive after a consultation?',
    a: 'After your initial consultation, you receive: a target university list (reach/match/safety tiers), a curriculum gap analysis, a personalized preparation timeline, and a strategic positioning document. Full-service clients receive ongoing support through the entire application cycle.',
  },
  {
    q: 'How early should I start preparing for Korean university admission from abroad?',
    a: 'Ideally 12-18 months before the application deadline. For 재외국민 전형, applications typically open in September for spring entry and May for fall entry. Starting early allows time for TOPIK preparation, document gathering, and strategic course selection at your current school.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="px-8 md:px-16 lg:px-24 mb-32 md:mb-40 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-4">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">Common Questions</span>
          <h2 className="font-headline text-3xl md:text-4xl text-primary mt-4 mb-6">
            Frequently Asked <span className="italic">Questions</span>
          </h2>
          <p className="font-body text-on-surface-variant leading-relaxed text-sm">
            Answers to the questions we hear most from students and parents navigating international-to-Korean admissions.
          </p>
        </div>

        <div className="lg:col-span-8">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="border-b border-outline-variant/20">
                <button
                  className="w-full flex items-start justify-between py-6 md:py-8 text-left group"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span className="font-headline text-base md:text-lg text-primary leading-snug pr-8 group-hover:text-secondary transition-colors">
                    {faq.q}
                  </span>
                  <span className={`material-symbols-outlined text-on-surface-variant shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-8' : 'max-h-0'}`}
                >
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed pl-0 md:pl-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
