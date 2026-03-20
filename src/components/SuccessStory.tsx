import { Link } from 'react-router-dom'
import { FEATURED_STORY } from '../data/stories'
import { useLanguage } from '../context/LanguageContext'

export function SuccessStory() {
  const { t } = useLanguage()
  return (
    <section id="stories" className="max-w-screen-2xl mx-auto px-8 md:px-16 lg:px-24 mb-40">
      <div className="relative py-20 px-8 md:px-24 bg-surface-container-lowest overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -skew-x-12 translate-x-1/2 opacity-50" />

        <div className="relative z-10 grid grid-cols-12 gap-12 items-center">
          <div className="col-span-12 lg:col-span-8">
            <Link
              to="/stories"
              className="font-label text-xs tracking-[0.2em] uppercase text-secondary mb-12 block hover:text-primary transition-colors"
            >
              {t.success_story_link}
            </Link>
            <p className="text-3xl md:text-5xl font-headline italic leading-tight text-primary mb-10">
              {FEATURED_STORY.quote}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-[1px] bg-primary/20" />
                <div>
                  <p className="font-label text-xs tracking-widest uppercase text-primary">
                    {FEATURED_STORY.name}
                  </p>
                  <p className="font-serif italic text-sm text-secondary">
                    {FEATURED_STORY.university}, {FEATURED_STORY.classYear}
                  </p>
                </div>
              </div>
              <Link
                to="/stories"
                className="hidden md:inline-flex items-center space-x-4 group"
              >
                <span className="font-label text-xs uppercase tracking-widest border-b border-primary pb-1 group-hover:text-secondary group-hover:border-secondary transition-all">
                  {t.success_story_view_all}
                </span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 hidden lg:block">
            <Link to={`/stories/${FEATURED_STORY.id}`} className="block aspect-square bg-surface-container-high overflow-hidden group">
              <img
                alt={FEATURED_STORY.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                src={FEATURED_STORY.image}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
