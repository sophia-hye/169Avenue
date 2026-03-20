const EXPERTISE_ITEMS = [
  {
    icon: 'history_edu',
    title: 'Editorial Essay Mentoring',
    description: 'Crafting compelling personal narratives that highlight individual brilliance and intellectual curiosity.',
  },
  {
    icon: 'architecture',
    title: 'Strategic Profile Building',
    description: 'Developing a 4-year roadmap of extracurricular and academic achievements designed for impact.',
  },
  {
    icon: 'diversity_3',
    title: 'Interview Artistry',
    description: 'Mastering the art of communication to leave a lasting impression on elite university alumni.',
  },
  {
    icon: 'gavel',
    title: 'Visa & Global Compliance',
    description: 'Seamless handling of complex international regulations for a stress-free transition.',
  },
]

export function Expertise() {
  return (
    <section id="services" className="bg-surface-container-low py-32 mb-40">
      <div className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-12 gap-12 items-start">
          <div className="col-span-12 lg:col-span-4">
            <h2 className="text-5xl font-headline tracking-tight mb-8">
              Refined <br /> Methodology
            </h2>
            <p className="font-body text-on-surface-variant leading-relaxed mb-10">
              Our approach is not a process; it is a curation. We look beyond the transcript
              to find the narrative that resonates with admissions committees.
            </p>
            <button className="flex items-center space-x-4 group">
              <span className="font-label text-xs tracking-widest uppercase border-b border-primary pb-1 group-hover:pr-4 transition-all">
                Download Prospectus
              </span>
              <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </button>
          </div>

          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            {EXPERTISE_ITEMS.map((item) => (
              <div key={item.icon} className="space-y-6">
                <div className="w-12 h-12 flex items-center justify-center bg-surface-container-highest">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                </div>
                <h4 className="text-xl font-headline italic">{item.title}</h4>
                <p className="text-sm font-body text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
