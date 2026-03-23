const TRUST_ITEMS = [
  {
    icon: 'school',
    title: 'University Coverage',
    items: ['Korean SKY + top 15 universities', 'US Ivy League & Top 50', 'UK Russell Group & Oxbridge', 'EU/Asia-Pacific elite institutions'],
  },
  {
    icon: 'analytics',
    title: 'Diagnostic Framework',
    items: ['IB/AP/A-Level/Korean curriculum analysis', 'GPA conversion & competitiveness scoring', 'Extracurricular impact assessment', 'Language proficiency positioning'],
  },
  {
    icon: 'description',
    title: 'Deliverables After Consultation',
    items: ['Target university list (reach/match/safety)', 'Curriculum gap analysis report', 'Personalized preparation timeline', 'Strategic positioning document'],
  },
]

export function TrustSection() {
  return (
    <section className="bg-surface-container-low py-20 md:py-32 px-8 md:px-16 lg:px-24 mb-32 md:mb-40">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16 md:mb-20">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">What You Get</span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary mt-4">Transparent & Verifiable</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="bg-surface-container-lowest p-8 md:p-10 shadow-sm">
              <span className="material-symbols-outlined text-secondary text-3xl mb-6 block">{item.icon}</span>
              <h3 className="font-headline text-xl text-primary mb-6">{item.title}</h3>
              <ul className="space-y-4">
                {item.items.map((li) => (
                  <li key={li} className="flex items-start gap-3 text-sm font-body text-on-surface-variant leading-relaxed">
                    <span className="material-symbols-outlined text-secondary text-sm mt-0.5 shrink-0">check</span>
                    {li}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
