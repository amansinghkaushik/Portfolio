import { useRef, useState } from 'react'
import Navbar from './Navbar'
import emailjs from '@emailjs/browser'

// ─── EmailJS Config ────────────────────────────────────────────────────────────
// 1. Go to https://www.emailjs.com, create a free account
// 2. Create a service (Gmail, etc.) and note the Service ID
// 3. Create an email template and note the Template ID
// 4. Grab your Public Key from Account > API Keys
// Then fill in these three values:
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
// ──────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-clash-grotesk">
      <Navbar />

      <main className="flex-1 flex flex-col px-6 md:px-16 lg:px-24 pt-28 pb-24">
        {/* Hero Text */}
        <div className="mb-20">
          <h1 className="font-clash-display text-[13vw] sm:text-[8vw] leading-[0.9] font-semibold uppercase tracking-[-0.04em] text-white select-none">
            Let's Talk.
          </h1>
          <p className="mt-6 text-lg text-white/50 max-w-md">
            Have a project in mind? Drop me a message and let's make something great together.
          </p>
        </div>

        {/* Form + Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">

          {/* Form — Left 7 cols */}
          <div className="lg:col-span-7">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-10">
              <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                <label className="text-xs uppercase tracking-[0.15em] text-white/40">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                  className="bg-transparent text-white text-xl placeholder-white/20 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                <label className="text-xs uppercase tracking-[0.15em] text-white/40">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="bg-transparent text-white text-xl placeholder-white/20 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1 border-b border-white/10 pb-4">
                <label className="text-xs uppercase tracking-[0.15em] text-white/40">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="bg-transparent text-white text-xl placeholder-white/20 focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group flex items-center gap-3 border border-white/20 px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-white hover:text-black transition-all disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending…
                    </span>
                  ) : 'Send Message'}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7L7 17M17 7H8M17 7v9" />
                  </svg>
                </button>

                {status === 'success' && (
                  <p className="text-sm text-green-400 font-medium">✓ Message sent! I'll be in touch soon.</p>
                )}
                {status === 'error' && (
                  <p className="text-sm text-red-400 font-medium">Something went wrong. Try emailing me directly.</p>
                )}
              </div>
            </form>
          </div>

          {/* Info — Right 4 cols */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-12 pt-2 text-white/60">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-3">Email</p>
              <a href="mailto:amansinghkauhsik8@gmail.com" className="text-lg text-white hover:text-white/70 transition-colors">
                amansinghkauhsik8@gmail.com
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-3">Phone</p>
              <a href="tel:+919651969409" className="text-lg text-white hover:text-white/70 transition-colors">
                +91 9651 969409
              </a>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-3">Based in</p>
              <p className="text-lg text-white">Uttar Pradesh, India</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-white/30 mb-3">Socials</p>
              <div className="flex flex-col gap-2">
                <a href="https://www.instagram.com/aman_singh_kaushik_/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/60 transition-colors">Instagram ↗</a>
                <a href="https://github.com/amansinghkaushik" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/60 transition-colors">GitHub ↗</a>
                <a href="https://www.linkedin.com/in/aman-singh-kaushik-1a37a81a4/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/60 transition-colors">LinkedIn ↗</a>
                <a href="https://wa.me/919651969409" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/60 transition-colors">WhatsApp ↗</a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
