import { useState } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import CursorFollower from './components/CursorFollower'
import Hero from './components/Hero'
import QuoteSection from './components/QuoteSection'
import WorkSection from './components/WorkSection'
// import HorizontalShowcase from './components/HorizontalShowcase'
import TechStackSection from './components/TechStackSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import TestimonialSection from './components/TestimonialSection'
import FooterSection from './components/FooterSection'

function App() {
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false)

  return (
    <div className="relative bg-black">
      {/* Global SVG Noise Filter Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.25] mix-blend-multiply">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
      {!isPreloaderFinished && <Preloader onComplete={() => setIsPreloaderFinished(true)} />}
      <CursorFollower isVisible={isPreloaderFinished} />
      <Navbar isPreloaderFinished={isPreloaderFinished} />

      <main 
        className="relative z-10 min-h-screen bg-[#ececec] text-[#0d0d0d]"
        style={{ marginBottom: 'var(--footer-height, 0)' }}
      >
        <Hero isPreloaderFinished={isPreloaderFinished} />
        <QuoteSection />
        <TechStackSection />
        <WorkSection />
        {/* <HorizontalShowcase /> */}
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
