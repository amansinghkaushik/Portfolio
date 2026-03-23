import Navbar from './Navbar'
import FooterSection from './FooterSection'

export default function ContactPage() {
  return (
    <div  className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center items-center px-4 pt-32 pb-16">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-9xl font-bold leading-none tracking-tight mb-8">
            Contact
          </h1>
          <div className="flex flex-col pt-[15vh] md:flex-row justify-between items-start gap-12 mt-8 w-full">
            {/* Left: Message/Poem */}
              <div className="flex flex-col text-left text-xl md:text-2xl font-light gap-2 w-full md:w-[60%]">
              <p className="mb-2">→ To listen is to receive</p>
              <p>To resonate is to co-create</p>
              <p>Every click writes <span className="inline-block align-middle">💡</span></p>
              <p>A chapter of your brand</p>
            </div>
            {/* Right: Social Info */}
              <div className="flex flex-col text-left gap-4 w-full md:w-[40%]">
              <h2 className="text-3xl font-semibold mb-2">Social Info</h2>
              <div className="space-y-1 text-lg">
                <p>E-mail: <a href="mailto:hi@yourdomain.com" className="underline hover:text-gray-300">hi@yourdomain.com</a></p>
                <p>Phone: <a href="tel:+911234567890" className="underline hover:text-gray-300">+91 1234567890</a></p>
                <p>LinkedIn: <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">linkedin.com</a></p>
              </div>
              <div className="flex justify-start md:justify-start gap-4 mt-4">
                <a href="#" className="text-2xl hover:text-gray-300">🌐</a>
                <a href="#" className="text-2xl hover:text-gray-300">⚡</a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  )
}
