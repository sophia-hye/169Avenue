import { useParams, Link, Navigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { findStoryById, ALL_STORIES } from '../data/stories'

export function StoryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const story = id ? findStoryById(id) : undefined

  if (!story) {
    return <Navigate to="/stories" replace />
  }

  const currentIndex = ALL_STORIES.findIndex((s) => s.id === story.id)
  const prevStory = currentIndex > 0 ? ALL_STORIES[currentIndex - 1] : undefined
  const nextStory = currentIndex < ALL_STORIES.length - 1 ? ALL_STORIES[currentIndex + 1] : undefined

  return (
    <div className="bg-surface selection:bg-secondary/20">
      <Navbar />

      <main className="pt-32">
        {/* Back Link */}
        <div className="px-8 md:px-12 max-w-7xl mx-auto mb-12">
          <Link
            to="/stories"
            className="inline-flex items-center space-x-3 group"
          >
            <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">
              All Success Stories
            </span>
          </Link>
        </div>

        {/* Hero Image */}
        <section className="px-8 md:px-12 mb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-5">
              <div className="aspect-[4/5] overflow-hidden bg-surface-container-low">
                <img
                  alt={story.name}
                  className="w-full h-full object-cover grayscale"
                  src={story.image}
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-6 block">
                {story.university} &middot; {story.classYear}
              </span>
              <h1 className="font-headline text-5xl md:text-7xl text-primary tracking-tighter leading-none mb-10">
                {story.name}
              </h1>
              <p className="font-headline italic text-2xl md:text-3xl text-primary/80 leading-snug max-w-2xl">
                {story.quote}
              </p>
            </div>
          </div>
        </section>

        {/* Narrative Content */}
        <section className="px-8 md:px-12 mb-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-2">
              <div className="sticky top-32">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary block mb-4">
                  The Narrative
                </span>
                <div className="w-8 h-[1px] bg-secondary" />
              </div>
            </div>
            <div className="lg:col-span-8">
              {story.fullNarrative.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className="font-body text-on-surface-variant text-lg leading-[1.9] mb-10 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Prev / Next Navigation */}
        <section className="border-t border-outline-variant/20 px-8 md:px-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {prevStory ? (
              <Link
                to={`/stories/${prevStory.id}`}
                className="group py-16 pr-12 border-b md:border-b-0 md:border-r border-outline-variant/20"
              >
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 block">
                  Previous Story
                </span>
                <div className="flex items-center space-x-4">
                  <span className="material-symbols-outlined text-sm group-hover:-translate-x-2 transition-transform">
                    arrow_back
                  </span>
                  <div>
                    <h4 className="font-headline text-2xl group-hover:text-secondary transition-colors">
                      {prevStory.name}
                    </h4>
                    <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                      {prevStory.university}
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="py-16 border-b md:border-b-0 md:border-r border-outline-variant/20" />
            )}

            {nextStory ? (
              <Link
                to={`/stories/${nextStory.id}`}
                className="group py-16 pl-0 md:pl-12 text-right"
              >
                <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 block">
                  Next Story
                </span>
                <div className="flex items-center justify-end space-x-4">
                  <div>
                    <h4 className="font-headline text-2xl group-hover:text-secondary transition-colors">
                      {nextStory.name}
                    </h4>
                    <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                      {nextStory.university}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">
                    arrow_forward
                  </span>
                </div>
              </Link>
            ) : (
              <div className="py-16" />
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="px-8 md:px-12 py-32 text-center bg-primary text-on-primary">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-5xl md:text-6xl italic mb-12 leading-tight">
              Write Your Own Story
            </h2>
            <p className="font-body text-zinc-400 text-lg mb-16 max-w-xl mx-auto">
              Every narrative begins with a single conversation. Let us help you discover yours.
            </p>
            <Link
              to="/consultation"
              className="bg-surface text-primary px-16 py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500"
            >
              Book a Private Consultation
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
