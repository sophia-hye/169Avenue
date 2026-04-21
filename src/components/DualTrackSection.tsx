import { useLanguage } from '../context/LanguageContext'

export function DualTrackSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-surface-container-low py-24 md:py-36 px-6 md:px-16 lg:px-24 mb-24 md:mb-40">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <span className="inline-block font-label text-[10px] uppercase tracking-[0.3em] text-secondary font-semibold bg-secondary/10 px-3 py-1 mb-6">
            {t.dual_track_badge}
          </span>
          <h2 className="font-headline text-2xl md:text-4xl text-primary tracking-tight leading-snug max-w-3xl">
            {t.dual_track_title}
          </h2>
        </div>

        <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-10 max-w-3xl">
          {t.dual_track_body}
        </p>

        <p className="font-headline italic text-lg md:text-2xl text-primary/90 leading-snug mb-14 md:mb-20 max-w-3xl border-l-2 border-secondary pl-6">
          {t.dual_track_highlight}
        </p>

        {/* Flow visualization */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
          {t.dual_track_flow.map((node, i) => (
            <div key={node} className="relative flex items-center justify-center">
              <div className="w-full bg-surface p-6 md:p-8 text-center md:border-r md:last:border-r-0 border-outline-variant/20">
                <span className="font-headline italic text-2xl text-secondary/40 block mb-2">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-body text-sm md:text-base text-primary leading-relaxed">
                  {node}
                </p>
              </div>
              {i < t.dual_track_flow.length - 1 && (
                <span className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10 bg-surface-container-low text-secondary material-symbols-outlined text-base">
                  arrow_forward
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
