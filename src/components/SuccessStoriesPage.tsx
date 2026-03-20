import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { FEATURED_STORY, STORIES } from '../data/stories'

export function SuccessStoriesPage() {
  return (
    <div className="bg-surface selection:bg-secondary/20">
      <Navbar />

      <main className="pt-32">
        {/* Hero Header */}
        <header className="px-8 md:px-12 py-20 md:py-32 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <h1 className="font-headline text-6xl md:text-8xl text-primary tracking-tighter leading-none mb-8">
                The Intellectual <br />
                <span className="italic">Narrative</span>: Success Stories
              </h1>
            </div>
            <div className="md:col-span-4 flex items-end">
              <p className="font-body text-on-surface-variant text-lg leading-relaxed border-l border-outline-variant/30 pl-8 pb-2">
                Beyond the letter of acceptance lies a profound transformation.
                We curate the journey of intellectual growth, turning ambition
                into an enduring legacy of excellence.
              </p>
            </div>
          </div>
        </header>

        {/* Featured Story */}
        <section className="px-8 md:px-12 mb-32 max-w-full">
          <Link to={`/stories/${FEATURED_STORY.id}`} className="block">
            <div className="grid grid-cols-1 lg:grid-cols-12 bg-surface-container-low min-h-[716px] group cursor-pointer">
              <div className="lg:col-span-7 overflow-hidden relative">
                <img
                  alt="Featured Scholar"
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-1000"
                  src={FEATURED_STORY.image}
                />
              </div>
              <div className="lg:col-span-5 p-12 md:p-24 flex flex-col justify-center">
                <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-6 block">
                  {FEATURED_STORY.university} &middot; {FEATURED_STORY.classYear}
                </span>
                <h2 className="font-headline text-4xl md:text-5xl italic mb-10 leading-tight">
                  {FEATURED_STORY.quote}
                </h2>
                <div className="mb-12">
                  <h3 className="font-headline text-2xl mb-4">{FEATURED_STORY.name}</h3>
                  <p className="font-body text-on-surface-variant leading-relaxed mb-6">
                    {FEATURED_STORY.description}
                  </p>
                </div>
                <div>
                  <span className="inline-flex items-center space-x-4">
                    <span className="font-label text-xs uppercase tracking-widest border-b border-primary pb-1 group-hover:text-secondary group-hover:border-secondary transition-all">
                      Read Narrative
                    </span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-2 transition-transform">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Gallery of Achievements */}
        <section className="px-8 md:px-12 mb-32 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-headline text-4xl italic">The Gallery of Achievements</h2>
            <div className="hidden md:block h-[1px] flex-grow mx-12 bg-outline-variant/20 mb-3" />
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              Archive 2020-2024
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {STORIES.map((story) => (
              <Link
                key={story.id}
                to={`/stories/${story.id}`}
                className={`group block ${story.offsetClass}`}
              >
                <div className="aspect-[4/5] overflow-hidden mb-8">
                  <img
                    alt={`${story.university} Success`}
                    className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-700"
                    src={story.image}
                  />
                </div>
                <span className="font-label text-[10px] uppercase tracking-widest text-secondary mb-2 block">
                  {story.university}
                </span>
                <h4 className="font-headline text-2xl mb-4 group-hover:text-secondary transition-colors">
                  {story.name}
                </h4>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                  {story.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Editorial Insight */}
        <section className="mb-48 relative">
          <div className="max-w-4xl mx-auto px-8 md:px-12 relative z-10">
            <div className="bg-surface-container-lowest p-16 md:p-24 shadow-2xl shadow-black/5 -translate-x-4 md:-translate-x-12">
              <span className="font-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-12 block">
                The Curator's Note
              </span>
              <blockquote className="font-headline text-3xl md:text-4xl italic leading-tight text-primary mb-12">
                "A truly successful narrative is not a list of achievements. It is the articulation
                of an intellectual journey that feels both inevitable and surprising. We don't just
                find schools; we find the right canvas for each unique mind."
              </blockquote>
              <div className="flex items-center space-x-6">
                <div className="w-12 h-12 rounded-full bg-zinc-200 overflow-hidden grayscale">
                  <img
                    alt="Head Curator"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzc4F2i-wuEPj-Y-8q6Yay1A47dEIa5V4M5UxOaHmL0x4eLBgasNUIf2xcqiRdevhLF420GWnWmtnXmTmpBjkE4XYupzIKg_1y6RylXZ7_rS_5ZurkM0fZUJw6PRrqntUhDD_J_Nfv0fE7ScT-NUdAq64bctc83Av07imoJnhB_4qo1aK7DJS4yIrzW0SlKKN4Iigzn-WrA3sd2qSL9KTfNhCnetrVP3NmkBhmJTp0thrkvKs4fD1TDxZlIRmlaG7UVzoU0AOko3c"
                  />
                </div>
                <div>
                  <p className="font-headline text-lg italic">Dr. Alistair Vance</p>
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">
                    Head Curator, 169 Avenue
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full bg-surface-container-low -z-0" />
        </section>

        {/* Call to Action */}
        <section className="px-8 md:px-12 py-32 text-center bg-primary text-on-primary">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-5xl md:text-6xl italic mb-12 leading-tight">
              Begin Your Own Narrative
            </h2>
            <p className="font-body text-zinc-400 text-lg mb-16 max-w-xl mx-auto">
              Your intellectual heritage starts with a single inquiry.
              Join our elite cohort of scholars and define your future.
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
