import Navbar from "./components/Navbar.jsx"
import Hero from "./components/Hero.jsx"
import About from "./components/About.jsx"
import Skills from "./components/Skills.jsx"
import Projects from "./components/Projects.jsx"
import Parcours from "./components/Parcours.jsx"
import Certifications from "./components/Certifications.jsx"
import Contact from "./components/Contact.jsx"
import Footer from "./components/Footer.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"
import { useScrollReveal } from "./hooks/useScrollReveal.js"

export default function App() {
  useScrollReveal();
  
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Parcours />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
