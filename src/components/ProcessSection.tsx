import { useLanguage } from '../context/LanguageContext'

const STEP_ICONS = ['stethoscope', 'target', 'design_services', 'task_alt', 'record_voice_over']

export function ProcessSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-surface-container-low py-20 md:py-32 px-8 md:px-16 lg:px-24 mb-32 md:mb-40">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-16 md:mb-20">
          <span className="font-label text-xs uppercase tracking-[0.3em] text-secondary font-bold">{t.process_tag}</span>
          <h2 className="font-headline text-3xl md:text-5xl text-primary mt-4">{t.process_title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
          {t.process_steps.map((step, i) => {
            const number = String(i + 1).padStart(2, '0')
            return (
              <div key={number} className="group relative">
                {/* Connector line (desktop) */}
                {i < t.process_steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-outline-variant/20 z-0" />
                )}

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-headline italic text-3xl text-outline-variant/30 group-hover:text-secondary transition-colors duration-500">
                      {number}
                    </span>
                    <span className="material-symbols-outlined text-secondary text-xl">{STEP_ICONS[i]}</span>
                  </div>
                  <h3 className="font-headline text-lg md:text-xl text-primary mb-3">{step.title}</h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
