import { useParams, Link, Navigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { MobileShell, MobileFooter } from './MobileShell'
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

  const content = (
    <>
      {/* Back Link */}
      <div className="hidden md:block px-6 md:px-12 max-w-7xl mx-auto mb-8 md:mb-12">
        <Link to="/stories" className="inline-flex items-center space-x-3 group">
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">All Success Stories</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="px-6 md:px-12 mb-12 md:mb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden bg-surface-container-low">
              <img alt={story.name} className="w-full h-full object-cover grayscale" src={story.image} />
            </div>
          </div>
          <div className="lg:col-span-7">
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4 md:mb-6 block">
              {story.university} &middot; {story.classYear}
            </span>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl text-primary tracking-tighter leading-none mb-6 md:mb-10">
              {story.name}
            </h1>
            <p className="font-headline italic text-xl md:text-2xl lg:text-3xl text-primary/80 leading-snug max-w-2xl">
              {story.quote}
            </p>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="px-6 md:px-12 mb-20 md:mb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-32">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-secondary block mb-4">The Narrative</span>
              <div className="w-8 h-[1px] bg-secondary" />
            </div>
          </div>
          <div className="lg:col-span-8">
            <span className="lg:hidden font-label text-[10px] uppercase tracking-[0.2em] text-secondary block mb-6">The Narrative</span>
            {story.fullNarrative.split('\n\n').map((paragraph, i) => (
              <p key={i} className="font-body text-on-surface-variant text-base md:text-lg leading-[1.9] mb-8 md:mb-10 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="border-t border-outline-variant/20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2">
          {prevStory ? (
            <Link to={`/stories/${prevStory.id}`} className="group py-10 md:py-16 pr-4 md:pr-12 border-r border-outline-variant/20">
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-3 md:mb-4 block">Previous</span>
              <div className="flex items-center space-x-3 md:space-x-4">
                <span className="material-symbols-outlined text-sm group-hover:-translate-x-2 transition-transform">arrow_back</span>
                <div>
                  <h4 className="font-headline text-lg md:text-2xl group-hover:text-secondary transition-colors">{prevStory.name}</h4>
                  <span className="font-label text-[9px] md:text-[10px] uppercase tracking-widest text-secondary">{prevStory.university}</span>
                </div>
              </div>
            </Link>
          ) : <div className="py-10 md:py-16 border-r border-outline-variant/20" />}

          {nextStory ? (
            <Link to={`/stories/${nextStory.id}`} className="group py-10 md:py-16 pl-4 md:pl-12 text-right">
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-3 md:mb-4 block">Next</span>
              <div className="flex items-center justify-end space-x-3 md:space-x-4">
                <div>
                  <h4 className="font-headline text-lg md:text-2xl group-hover:text-secondary transition-colors">{nextStory.name}</h4>
                  <span className="font-label text-[9px] md:text-[10px] uppercase tracking-widest text-secondary">{nextStory.university}</span>
                </div>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </div>
            </Link>
          ) : <div className="py-10 md:py-16" />}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 md:py-32 text-center bg-primary text-on-primary">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-5xl lg:text-6xl italic mb-8 md:mb-12 leading-tight">Write Your Own Story</h2>
          <p className="font-body text-zinc-400 text-sm md:text-lg mb-10 md:mb-16 max-w-xl mx-auto">Have a similar background? Get your case analyzed.</p>
          <Link to="/consultation" className="bg-surface text-primary px-10 md:px-16 py-4 md:py-6 font-label uppercase text-xs tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-500">
            Get My Case Analyzed
          </Link>
        </div>
      </section>
    </>
  )

  return (
    <div className="bg-surface selection:bg-secondary/20">
      {/* Desktop */}
      <div className="hidden md:block">
        <Navbar />
        <main className="pt-32">{content}</main>
        <Footer />
      </div>

      {/* Mobile */}
      <MobileShell>{content}</MobileShell>
      <MobileFooter />
    </div>
  )
}
