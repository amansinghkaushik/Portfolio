import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import taglineMockup from '../assets/taginmockup.png'
import sundarban from '../assets/sundarban.png'

gsap.registerPlugin(ScrollTrigger)

function WorkSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-head-animate',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )

      gsap.fromTo(
        '.work-row-animate',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const workCards = [
    { title: 'FINFLOW DASHBOARD', category: 'FINTECH PRODUCT', image: taglineMockup, link: "https://tag-in-manufacture.vercel.app" },
    { title: 'NEURA AI ASSISTANT', category: 'AI PRODUCT', image: sundarban, link: 'https://sundarban-portfolio.vercel.app' },
  ]

  return (
    <section ref={sectionRef} id="work" className="relative z-0 ds-section bg-[#ececec]">
      <div className="ds-container px-0 md:px-8">
        
        {/* Massive Stacked Header */}
        <div className="flex flex-col items-center justify-center pt-5 pb-24 md:pb-32 overflow-hidden">
          <h2 className="font-atelier uppercase leading-[0.8] tracking-tight text-[#101010] text-[clamp(4rem,14vw,16rem)] text-center flex flex-col items-center">
            <span className="work-head-animate block">Featured</span>
            <span className="work-head-animate flex items-center gap-2 md:gap-6 mt-2">
              Works <span className="font-sans text-[clamp(1.5rem,4vw,4rem)] tracking-normal mt-auto mb-[2%] font-medium align-top leading-none">(12)</span>
            </span>
          </h2>
        </div>

        {/* Minimalist Accordion List */}
        <div className="w-full flex flex-col border-t border-black/20 pb-4">
          {workCards.map((card, index) => {
            const num = (index + 1).toString().padStart(3, '0')
            return (
              <a 
                key={index} 
                href={card.link || '#'}
                target={card.link ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="work-row-animate group relative flex flex-col md:flex-row md:items-center justify-between py-6 px-6 md:px-12 border-b border-black/20 hover:bg-[#ff0000] transition-colors duration-300 cursor-pointer"
              >
                {/* Floating Image Reveal (Hidden on small screens) */}
                <div className="absolute left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] aspect-[4/3] pointer-events-none opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 hidden lg:block">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover shadow-2xl" />
                </div>
                
                {/* Left Side: Index & Title */}
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-16 z-20 pointer-events-none transition-colors duration-300">
                  <span className="font-sans font-medium text-sm md:text-base text-[#101010]/50 group-hover:text-white/50">{num}</span>
                  <h3 className="font-sans uppercase font-semibold text-xl md:text-3xl lg:text-4xl tracking-tight text-[#101010] group-hover:text-white">{card.title}</h3>
                </div>
                
                {/* Right Side: Category */}
                <div className="z-20 pointer-events-none transition-colors duration-300 mt-2 md:mt-0 md:text-right">
                  <span className="font-sans font-medium text-xs md:text-sm uppercase tracking-widest text-[#101010]/70 group-hover:text-white/70">{card.category}</span>
                </div>
              </a>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default WorkSection
