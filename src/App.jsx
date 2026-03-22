import Navbar from './components/Navbar'
import CursorFollower from './components/CursorFollower'
import Hero from './components/Hero'
import QuoteSection from './components/QuoteSection'
import WorkSection from './components/WorkSection'
import AboutSection from './components/AboutSection'
import FooterSection from './components/FooterSection'

function App() {
  return (
    <main className="min-h-screen bg-[#ececec] text-[#0d0d0d]">
      <CursorFollower />
      <Navbar />

      <Hero />
      <QuoteSection />
      <WorkSection />
      <AboutSection />
      <FooterSection />
    </main>
  )
}

export default App
