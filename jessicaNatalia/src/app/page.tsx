import Projects from "./_components/projects"
import { About } from "./_components/about"
import { Services } from "./_components/services"
import { Tours } from "./_components/tours"
import PilatesSection from "./_components/pilates-section"
import { Footer } from "./_components/footer"

export default function Home() {
  return (
    <main>
      <Projects />
      <About />
      <PilatesSection />
      <Services />
      <Tours />
      <Footer />
    </main>
  )
}