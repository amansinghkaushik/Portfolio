import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WorkSection from './components/WorkSection'
import AboutSection from './components/AboutSection'
import FooterSection from './components/FooterSection'

function App() {
  return (
    <main className="min-h-screen bg-[#ececec] text-[#0d0d0d]">
      <Navbar />

      <Hero />
      <WorkSection />
      <AboutSection />
      <FooterSection />
    </main>
  )
}

export default App
