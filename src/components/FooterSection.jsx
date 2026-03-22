function FooterSection() {
  return (
    <footer className="bg-black px-[var(--space-section-x)] pb-14 pt-16 text-white">
      <div className="ds-container">
        <div className="mb-16 flex justify-end gap-8 text-sm text-white/75">
          <a href="#" className="hover:text-white">
            Linkedin
          </a>
          <a href="#" className="hover:text-white">
            Twitter
          </a>
          <a href="#" className="hover:text-white">
            Behance
          </a>
        </div>

        <h3 className="mb-10 max-w-5xl text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-white/95">
          Curious about what we can build together? Let's design work that is bold, useful, and
          memorable.
        </h3>

        <div className="mb-16 flex flex-wrap items-center gap-8">
          <button
            type="button"
            className="rounded-none bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-[#e7e7e7]"
          >
            Get in Touch
          </button>
          <p className="text-base text-white/80">● Available For Internships & Freelance</p>
        </div>

        <div className="grid gap-6 text-base text-white/70 sm:grid-cols-3">
          <div>
            <p>+81 (0)90 1234 5678</p>
            <p>hello@yuya.com</p>
          </div>
          <p>Designed & Developed by Peter Hodak</p>
          <p className="sm:text-right">All rights reserved, YUYA © 2024</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
