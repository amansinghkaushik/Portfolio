import { useState } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import CursorFollower from './components/CursorFollower'
import Hero from './components/Hero'
import QuoteSection from './components/QuoteSection'
import WorkSection from './components/WorkSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import TestimonialSection from './components/TestimonialSection'
import FooterSection from './components/FooterSection'

function App() {
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false)

  return (
    <div className="relative bg-black">
      {!isPreloaderFinished && <Preloader onComplete={() => setIsPreloaderFinished(true)} />}
      <CursorFollower isVisible={isPreloaderFinished} />
      <Navbar isPreloaderFinished={isPreloaderFinished} />

      <main 
        className="relative z-10 min-h-screen bg-[#ececec] text-[#0d0d0d]"
        style={{ marginBottom: 'var(--footer-height, 0)' }}
      >
        <Hero isPreloaderFinished={isPreloaderFinished} />
        <QuoteSection />
        <WorkSection />
        <AboutSection />
        <ExperienceSection />
        <TestimonialSection />
        {/* Scroll target for the fixed footer */}
        <div id="contact" className="h-0 w-full" />
      </main>

      <FooterSection />
    </div>
  )
}

export default App
