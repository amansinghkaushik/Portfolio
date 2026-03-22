import { useState, useEffect } from 'react'
import MenuButton from './MenuButton'
import TextCycler from './TextCycler'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dateTime, setDateTime] = useState('')

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

  return (
    <nav className="fixed top-0 left-0 right-0 border-b border-black/10 bg-black px-[30px] z-60">
      {/* Inner NavBar */}
      <div className="flex items-center justify-between py-[10px] text-white">

        {/* DateTimeDisplay */}
        <div className="flex-1 font-inter text-sm font-medium text-white">
          {dateTime}
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
            <Link
              to="/"
              className="text-sm font-medium hover:opacity-70 transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <a
              href="#works"
              className="text-sm font-medium hover:opacity-70 transition-opacity duration-300"
            >
              Works
            </a>
            <a
              href="#about"
              className="text-sm font-medium hover:opacity-70 transition-opacity duration-300"
            >
              About
            </a>
            <Link
              to="/contact"
              className="text-sm font-medium hover:opacity-70 transition-opacity duration-300"
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
