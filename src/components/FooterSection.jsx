import { useEffect, useRef } from 'react'

function FooterSection() {
  const footerRef = useRef(null)

  useEffect(() => {
    const updateFooterHeight = () => {
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight
        document.documentElement.style.setProperty('--footer-height', `${height}px`)
      }
    }

    updateFooterHeight()
    const observer = new ResizeObserver(() => updateFooterHeight())
    
    if (footerRef.current) observer.observe(footerRef.current)
    window.addEventListener('resize', updateFooterHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateFooterHeight)
    }
  }, [])

  return (
    <footer 
      ref={footerRef}
      className="fixed bottom-0 left-0 w-full z-0 bg-[#0a0a0a] px-6 md:px-12 pt-16 pb-8 text-[#f5f5f7] flex flex-col justify-between min-h-[60vh] md:min-h-[75vh] font-clash-grotesk"
    >
      {/* Top Section */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start gap-16">
        {/* Top Left Text */}
        <div className="w-full md:w-1/2 max-w-lg">
          <p className="text-2xl md:text-[1.75rem] font-medium leading-[1.1] tracking-tight text-white mb-8">
            Always open to new projects and<br className="hidden md:block"/>
            collaborations — drop a line if you'd<br className="hidden md:block"/>
            like to connect.
          </p>
        </div>

        {/* Top Right Links */}
        <div className="flex gap-8 md:gap-32 text-base font-medium text-white/90">
          <div className="flex flex-col gap-1 items-end">
            <a href="/#hero" className="hover:text-white/60 transition-colors">Home</a>
            <a href="/#work" className="hover:text-white/60 transition-colors">Work</a>
            <a href="/#about" className="hover:text-white/60 transition-colors">About</a>
            <a href="/contact" className="hover:text-white/60 transition-colors mt-1">Contact</a>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <a href="#" className="hover:text-white/60 transition-colors">Style Guide</a>
            <a href="#" className="hover:text-white/60 transition-colors">Components</a>
            <a href="#" className="hover:text-white/60 transition-colors">Licenses</a>
            <a href="#" className="hover:text-white/60 transition-colors">Changelog</a>
          </div>
        </div>
      </div>

      <div className="flex-1"></div> {/* Spacer pushes content to bottom */}

      {/* Bottom Section */}
      <div className="w-full mt-24">
        {/* Socials & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm font-medium text-white/50 mb-10 px-2">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 w-full md:w-auto">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter (X)</a>
            <a href="https://www.instagram.com/aman_singh_kaushik_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://github.com/amansinghkaushik" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/aman-singh-kaushik-1a37a81a4/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="mt-8 md:mt-0 text-center w-full md:w-auto">
            Powered by React. Created by Aman.
          </div>
        </div>

        {/* Huge Typography */}
        <div className="w-full flex justify-center items-center overflow-hidden border-t border-white/10 pt-4">
          <h1 className="text-[13vw] sm:text-[16vw] leading-[0.8] font-semibold uppercase tracking-[-0.04em] text-white whitespace-nowrap select-none font-clash-display">
            ASK<br/> CREATIONS
          </h1>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
