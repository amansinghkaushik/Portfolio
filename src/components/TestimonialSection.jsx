import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

import { testimonialsData } from '../data/testimonials'

function TestimonialSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.test-animate',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="ds-section bg-white py-20 lg:py-32 relative overflow-hidden">
      <div className="ds-container">
        
        {/* Header with View All Button */}
        <div className="test-animate flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <p className="ds-eyebrow mb-2">Testimonials</p>
            <h2 className="text-4xl md:text-6xl font-clash-display font-semibold tracking-tight text-[#111]">
              Client Love.
            </h2>
          </div>
          <Link 
            to="/testimonials" 
            className="group flex flex-shrink-0 items-center gap-2 px-6 py-3 rounded-full border border-black text-sm font-semibold uppercase tracking-widest text-[#111] hover:bg-black hover:text-white transition-colors"
          >
            Show All
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7L7 17M17 7H8M17 7v9" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
          
          {/* Subtle center divider for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/5 -translate-x-1/2"></div>
          
          {testimonialsData.slice(0, 2).map((test, index) => (
            <div key={index} className="test-animate flex flex-col relative pr-8">
              
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
      </div>
    </section>
  )
}

export default TestimonialSection
