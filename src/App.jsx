import { useState } from 'react'
import MenuButton from './components/MenuButton'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#0d0d0d]">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Main Content - Demo Section */}
      <div className="px-[30px] py-[30px]">
        <h1 className="mb-8 text-center text-xl font-medium tracking-tight sm:text-2xl">
          Menu Button Variants
        </h1>

        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-8 rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
          <div className="grid justify-items-center gap-2">
            <p className="m-0 text-sm font-medium">Closed</p>
            <MenuButton variant="closed" />
          </div>

          <div className="grid justify-items-center gap-2">
            <p className="m-0 text-sm font-medium">Open</p>
            <MenuButton variant="open" />
          </div>

          <div className="grid justify-items-center gap-2">
            <p className="m-0 text-sm font-medium">Interactive</p>
            <MenuButton
              variant={isOpen ? 'open' : 'closed'}
              onClick={() => setIsOpen((current) => !current)}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
