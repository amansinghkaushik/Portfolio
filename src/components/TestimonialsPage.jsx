import React, { useEffect } from 'react'
import Navbar from './Navbar'
import FooterSection from './FooterSection'
import CursorFollower from './CursorFollower'

import { testimonialsData } from '../data/testimonials'
export default function TestimonialsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative bg-black text-[#111] min-h-screen flex flex-col font-clash-grotesk">
      <CursorFollower />
      <Navbar />

      <main 
        className="flex-1 flex flex-col px-6 md:px-16 lg:px-24 pt-32 pb-32 w-full relative z-10 bg-white"
        style={{ marginBottom: 'var(--footer-height, 0)' }}
      >
        <div className="mb-20 max-w-5xl mx-auto w-full text-center">
          <h1 className="font-clash-display text-5xl md:text-7xl font-semibold tracking-tight text-[#0d0d0d]">
            Client Love.
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take my word for it. Here is what people are saying about my work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 gap-y-24 lg:gap-24 lg:gap-y-32 relative mt-16 max-w-[1400px] mx-auto w-full">
          {/* Subtle center divider for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/5 -translate-x-1/2"></div>
          
          {testimonialsData.map((test, index) => (
            <div key={index} className="flex flex-col relative pr-8">
              
              {/* Quote Icon */}
              <div className="absolute right-0 top-0 opacity-10 font-serif text-[8rem] leading-none pointer-events-none select-none">
                "
              </div>
              
              <p className="text-[1.35rem] md:text-[1.5rem] font-medium leading-[1.4] tracking-[-0.01em] text-[#111] mb-12 relative z-10">
                {test.quote}
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={test.avatar} 
                  alt={test.name} 
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-[#111]">{test.name}</h4>
                  <p className="text-sm text-gray-500">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <FooterSection />
    </div>
  )
}
