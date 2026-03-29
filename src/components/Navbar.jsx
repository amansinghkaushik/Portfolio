import { useState, useEffect } from 'react'
import MenuButton from './MenuButton'
import TextCycler from './TextCycler'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dateTime, setDateTime] = useState('')
  const location = useLocation()
  const isSubPage = location.pathname !== '/'

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date()
      const time = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      const date = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      setDateTime(`${time} - ${date}`)
    }

    updateDateTime()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleNavClick = (e, targetId) => {
    setIsOpen(false)
    if (window.location.pathname === '/' || window.location.pathname === '') {
      e.preventDefault()
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        // Update URL hash without jumping
        window.history.pushState(null, '', `/#${targetId}`)
      } else {
        window.location.href = `/#${targetId}`
      }
    } else {
      // If not on the homepage, let the browser hard navigate back to the home page anchors
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 border-b border-black/10 bg-black px-4 md:px-[30px] z-[100]">
      {/* Inner NavBar */}
      <div className="flex items-center justify-between py-[10px] text-white relative">

        {/* DateTimeDisplay or Back Button */}
        <div className="flex-1 font-inter text-sm font-medium text-white hidden md:flex items-center">
          {isSubPage ? (
            <Link to="/" className="flex items-center gap-2 hover:text-white/70 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          ) : (
            dateTime
          )}
        </div>

        {/* Element 2 - TextCycler or Mobile Back Button */}
        <div className="flex-1 text-sm font-medium text-left md:text-center flex justify-start md:justify-center items-center">
          {isSubPage ? (
            <>
              {/* Mobile back button (replaces TextCycler) */}
              <Link to="/" className="md:hidden flex items-center justify-start gap-2 hover:text-white/70 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
              {/* Desktop text cycler */}
              <div className="hidden md:block w-full">
                <TextCycler />
              </div>
            </>
          ) : (
            <TextCycler />
          )}
        </div>

        {/* Element 3 - Menu Button or Navigation */}
        <div className="flex-1 flex justify-end items-center gap-7 md:overflow-hidden">
          <div
            className={`
              absolute top-0 -left-4 -right-4 h-[100dvh] bg-black flex-col items-center justify-center gap-10 -z-10
              md:static md:h-auto md:bg-transparent md:border-none md:flex-row md:py-0 md:gap-6 md:z-auto md:justify-end
              font-clash-grotesk font-medium
              transition-all duration-[500ms] md:duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]
              ${isOpen 
                ? 'flex opacity-100 translate-y-0 md:translate-y-0 md:translate-x-0' 
                : 'flex opacity-0 -translate-y-full pointer-events-none md:pointer-events-auto md:translate-y-0 md:translate-x-[120%]'}            `}
          >
            <a
              href="/#work"
              className="group relative text-4xl md:text-sm font-medium transition-colors duration-300 hover:text-blue-700 whitespace-nowrap"
              onClick={(e) => handleNavClick(e, 'work')}
            >
              Works
              <span className="absolute -bottom-1 md:-bottom-1.5 left-0 h-[3px] md:h-[1.5px] w-full origin-left scale-x-0 bg-blue-700 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </a>
            <a
              href="/#about"
              className="group relative text-4xl md:text-sm font-medium transition-colors duration-300 hover:text-blue-700 whitespace-nowrap"
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
              <span className="absolute -bottom-1 md:-bottom-1.5 left-0 h-[3px] md:h-[1.5px] w-full origin-left scale-x-0 bg-blue-700 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </a>
            <Link
              to="/contact"
              className="group relative text-4xl md:text-sm font-medium transition-colors duration-300 hover:text-blue-700 whitespace-nowrap"
              onClick={() => setIsOpen(false)}
            >
              Contact
              <span className="absolute -bottom-1 md:-bottom-1.5 left-0 h-[3px] md:h-[1.5px] w-full origin-left scale-x-0 bg-blue-700 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            </Link>
          </div>
          <div className="transition-all duration-400 ease-in-out z-50 shrink-0">
            <MenuButton
              variant={isOpen ? 'open' : 'closed'}
              onClick={() => setIsOpen((current) => !current)}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
