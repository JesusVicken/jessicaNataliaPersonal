import Projects from "./_components/projects"
import { About } from "./_components/about"
import { Services } from "./_components/services"
import { Tours } from "./_components/tours"
import CheckVaa from "./_components/checkVaa"
import { Footer } from "./_components/footer"

export default function Home() {
  return (
    <main>
      <Projects />
      <About />
      <Services />
      <Tours />
      <CheckVaa />
      <Footer />
    </main>
  )
}