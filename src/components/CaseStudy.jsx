import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import taglineMockup from '../assets/taginmockup.png'

export default function CaseStudy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#37352f] selection:bg-[#cce2ff] font-clash-grotesk pb-32">
      {/* Notion-style Top Nav */}
      <nav className="sticky top-0 z-50 flex h-14 items-center gap-2 border-b border-black/5 bg-[#F7F7F5]/80 px-4 backdrop-blur-md sm:px-6">
        <Link 
          to="/" 
          className="flex items-center gap-1.5 rounded pr-2 py-1 text-sm font-medium text-[#37352f]/70 transition-colors hover:bg-black/5 hover:text-[#37352f]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </Link>
        <div className="h-4 w-[1px] bg-black/10 mx-2" />
        <span className="text-sm font-medium text-[#37352f]/90">Case Study: Portfolio Design</span>
      </nav>

      {/* Cover Image */}
      <div className="relative h-[30vh] min-h-[250px] w-full sm:h-[40vh]">
        <img
          src={taglineMockup}
          alt="Cover"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Notion Page Content */}
      <main className="mx-auto mt-16 max-w-[900px] px-6 sm:px-12 md:mt-24">
        {/* Page Icon & Title */}
        <div className="mb-10 lg:mb-16">
          <div className="mb-6 text-6xl sm:text-[5rem]">🎨</div>
          <h1 className="font-clash-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-[#37352f]">
            Designing the Portfolio: A Deep Dive
          </h1>
        </div>

        {/* Properties / Meta data */}
        <div className="mb-12 flex flex-col gap-3 border-b border-black/5 pb-8 text-sm">
          <div className="flex items-center gap-24">
            <div className="flex w-32 items-center gap-2 text-[#37352f]/50">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span>Author</span>
            </div>
            <span className="rounded bg-[#f0f0f0] px-2 py-0.5 font-medium">Aman Singh Kaushik</span>
          </div>
          <div className="flex items-center gap-24">
            <div className="flex w-32 items-center gap-2 text-[#37352f]/50">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span>Date</span>
            </div>
            <span>March 2026</span>
          </div>
          <div className="flex items-center gap-24">
            <div className="flex w-32 items-center gap-2 text-[#37352f]/50">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
              <span>Tags</span>
            </div>
            <div className="flex gap-2">
              <span className="rounded bg-blue-100 px-2 py-0.5 font-medium text-blue-800">UI/UX</span>
              <span className="rounded bg-orange-100 px-2 py-0.5 font-medium text-orange-800">Animation</span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <article className="prose prose-lg prose-p:text-[#37352f]/90 prose-p:leading-[1.65] prose-headings:font-clash-display prose-headings:font-semibold prose-headings:tracking-tight max-w-none">
          
          <h2 className="text-2xl mt-12 mb-4">The Objective</h2>
          <p>
            The goal of this portfolio was to create a space that transcends the standard "digital resume" format. I wanted to build an immersive, cinematic experience that showcases my work while simultaneously demonstrating my capabilities in interaction design and front-end engineering. The website itself is my ultimate case study.
          </p>

          <div className="my-10 border-l-4 border-black/80 bg-black/5 p-6 pl-8 italic text-[#37352f]/80 rounded-r-lg">
            "A portfolio shouldn't just list what you can do; it should be living proof of how well you can do it."
          </div>

          <h2 className="text-2xl mt-12 mb-4">Typography & Structure</h2>
          <p>
            Choosing the right typographic pair was essential. For the massive, structural headings, we selected <span className="font-semibold bg-[#f0f0f0] px-1.5 py-0.5 rounded">Clash Display</span>. Its architectural proportions give the page an immediate editorial authority. 
          </p>
          <p>
            This was paired with <span className="font-semibold bg-[#f0f0f0] px-1.5 py-0.5 rounded">Clash Grotesk</span> for body copy, ensuring supreme readability, while injecting an elegant, classical Serif italic for specific callouts to break the brutalist tension. 
          </p>

          <h2 className="text-2xl mt-12 mb-4">The GSAP Ecosystem</h2>
          <p>
            Motion is treated as a first-class citizen. Instead of rudimentary CSS transitions, the site is hooked up to a robust GSAP (GreenSock) animation ecosystem. 
          </p>
          
          <ul className="list-disc pl-6 space-y-3 mt-4 text-[#37352f]/90">
            <li><strong>ScrollTrigger Sequences:</strong> We mapped the hero section video scale directly to the user's scroll progress, making the transition from full-screen cinematic to the grid layout seamless.</li>
            <li><strong>Parallax Momentum:</strong> Elements float upward at slightly different velocities, creating a sense of 3D depth and premium polish.</li>
            <li><strong>Staggered Reveals:</strong> As you hit the <code>/work</code> section, cards don't just appear—they physically drop in with a slight scale and staggered delay, imitating physical momentum.</li>
          </ul>

          <h2 className="text-2xl mt-16 mb-4">Conclusion</h2>
          <p>
            By focusing heavily on typographic hierarchy, strict grid structures, and buttery-smooth scroll interactions, the outcome is a portfolio that feels both handcrafted and deeply technical. It's built from instinct, refined by design.
          </p>
        </article>

        {/* Bottom CTA */}
        <div className="mt-20 pt-10 border-t border-black/10 flex justify-between items-center text-sm">
          <p className="text-[#37352f]/60">Thanks for reading through the process.</p>
          <Link to="/" className="font-medium hover:underline">Return Home →</Link>
        </div>
      </main>
    </div>
  )
}
