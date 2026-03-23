const STEPS = [
  {
    number: '01',
    title: 'Academic Diagnosis',
    description: 'We analyze your school country, curriculum (IB/AP/A-Level), GPA, and extracurricular profile to build a comprehensive academic portrait.',
    icon: 'stethoscope',
  },
  {
    number: '02',
    title: 'University Matching',
    description: 'Based on your profile, we identify target universities across reach, match, and safety tiers with data-driven precision.',
    icon: 'target',
  },
  {
    number: '03',
    title: 'Strategy Design',
    description: 'We craft a personalized admissions strategy — major fit analysis, document planning, and a competitive positioning roadmap.',
    icon: 'design_services',
  },
  {
    number: '04',
    title: 'Application Execution',
    description: 'Timeline management, essay development, recommendation letter coordination, and submission oversight for every target school.',
    icon: 'task_alt',
  },
  {
    number: '05',
    title: 'Interview & Final Prep',
    description: 'Mock interviews, supplementary document review, and last-mile preparation to maximize your acceptance probability.',
    icon: 'record_voice_over',
  },
]

export function ProcessSection() {
  return (
    <section className="bg-surface-container-low py-20 md:py-32 px-8 md:px-16 lg:px-24 mb-32 md:mb-40">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16 md:mb-20">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">How We Work</span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary mt-4">Our 5-Step Process</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
          {STEPS.map((step, i) => (
            <div key={step.number} className="group relative">
              {/* Connector line (desktop) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-outline-variant/20 z-0" />
              )}

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-headline italic text-3xl text-outline-variant/30 group-hover:text-secondary transition-colors duration-500">
                    {step.number}
                  </span>
                  <span className="material-symbols-outlined text-secondary text-xl">{step.icon}</span>
                </div>
                <h3 className="font-headline text-lg md:text-xl text-primary mb-3">{step.title}</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
