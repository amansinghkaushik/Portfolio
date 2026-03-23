import { useState, useEffect } from 'react'
import MenuButton from './MenuButton'
import TextCycler from './TextCycler'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dateTime, setDateTime] = useState('')
  const location = useLocation()
  const isContactPage = location.pathname === '/contact'

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
    <nav className="fixed top-0 left-0 right-0 border-b border-black/10 bg-black px-[30px] z-60">
      {/* Inner NavBar */}
      <div className="flex items-center justify-between py-[10px] text-white">

        {/* DateTimeDisplay or Back Button */}
        <div className="flex-1 font-inter text-sm font-medium text-white flex items-center">
          {isContactPage ? (
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

        {/* Element 2 - TextCycler */}
        <div className="flex-1 text-sm font-medium text-center">
          <TextCycler />
        </div>

        {/* Element 3 - Menu Button or Navigation */}
        <div className="flex-1 flex justify-end items-center gap-7">
          <div
            className={`flex items-center gap-7 overflow-hidden ${
              isOpen ? 'animate-menu-open' : 'animate-menu-close'
            }`}
            style={{ display: isOpen ? 'flex' : 'none' }}
          >
            <a
              href="/#work"
              className="font-clash-grotesk text-sm font-medium hover:opacity-70 transition-opacity duration-300"
              onClick={(e) => handleNavClick(e, 'work')}
            >
              Works
            </a>
            <a
              href="/#about"
              className="font-clash-grotesk text-sm font-medium hover:opacity-70 transition-opacity duration-300"
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
            </a>
            <Link
              to="/contact"
              className="font-clash-grotesk text-sm font-medium hover:opacity-70 transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
          <div className="transition-all duration-400 ease-in-out">
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
