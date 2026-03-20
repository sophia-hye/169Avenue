import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { Destinations } from './Destinations'
import { Expertise } from './Expertise'
import { SuccessStory } from './SuccessStory'
import { CallToAction } from './CallToAction'
import { Footer } from './Footer'

export function HomePage() {
  return (
    <div className="bg-surface selection:bg-secondary/30">
      <Navbar />
      <main className="pt-24 overflow-x-hidden">
        <Hero />
        <Destinations />
        <Expertise />
        <SuccessStory />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}
