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
      className="fixed bottom-0 left-0 w-full z-0 bg-black px-[var(--space-section-x)] py-20 text-[#f5f5f7]"
    >
      <div className="ds-container">
        <h2 className="text-6xl md:text-8xl font-clash-display font-medium text-white mb-20 tracking-tight">Contact Us</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Form Side - Left 7 columns */}
          <div className="lg:col-span-7 pr-0 lg:pr-16">
            <p className="text-lg md:text-xl text-[#a0a0a0] mb-12 max-w-md">
              Please feel free to contact us and we will get back to you as soon as we can.
            </p>
            
            <form className="flex flex-col gap-8">
              <div className="flex flex-col">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="bg-transparent border-b border-[#444] pb-3 text-white placeholder-[#888] focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-transparent border-b border-[#444] pb-3 text-white placeholder-[#888] focus:outline-none focus:border-white transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <textarea 
                  placeholder="Message" 
                  rows="3"
                  className="bg-transparent border-b border-[#444] pb-3 text-white placeholder-[#888] focus:outline-none focus:border-white transition-colors resize-none"
                ></textarea>
              </div>
              <button 
                type="button" 
                className="mt-4 bg-[#4a4a4a] hover:bg-[#5a5a5a] text-white py-4 font-semibold w-full sm:w-1/2 transition-colors rounded-sm"
              >
                Send
              </button>
            </form>
          </div>

          {/* Info Side - Right 4 cols, offset 1 */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-between pt-2">
            
            <div className="space-y-12 mb-16 lg:mb-0">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 font-clash-display">Visit us</h4>
                <p className="text-[#a0a0a0] leading-relaxed ds-body">
                  Uttar Pradesh, <br />
                  India
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 font-clash-display">Talk to us</h4>
                <p className="text-[#a0a0a0] leading-relaxed ds-body">
                  <a href="tel:+919651969409" className="hover:text-white transition-colors">+91 9651 969409</a><br />
                  <a href="mailto:amansinghkauhsik8@gmail.com" className="hover:text-white transition-colors">amansinghkauhsik8@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-[#a0a0a0]">
              <a href="https://www.instagram.com/aman_singh_kaushik_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://github.com/amansinghkaushik" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>              
              </a>
              <a href="https://www.linkedin.com/in/aman-singh-kaushik-1a37a81a4/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
