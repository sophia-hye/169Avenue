import { useLanguage } from '../context/LanguageContext'

export function ProcessSection() {
  const { t } = useLanguage()

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-surface-container-low py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-40">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-14 md:mb-20 max-w-3xl">
          <h2 className="font-headline text-3xl md:text-5xl text-primary tracking-tight mb-4">
            {t.process_title}
          </h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
            {t.process_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {t.process_steps.map((step) => (
            <div
              key={step.step}
              className="relative bg-surface p-8 md:p-10 h-full flex flex-col"
            >
              <span className="font-headline italic text-4xl md:text-5xl text-secondary/30 block mb-8 tracking-tighter">
                {step.step}
              </span>
              <span className="material-symbols-outlined text-secondary text-2xl mb-4">
                {step.icon}
              </span>
              <h3 className="font-headline text-xl md:text-2xl text-primary tracking-tight mb-4">
                {step.title}
              </h3>
              <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
