import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: "Working with Elian was seamless from start to finish. He understood our goals quickly, asked the right questions, and delivered a design system that scaled perfectly with our growing modern bet app.",
    name: "Daniel Reed",
    role: "Founder of NovaLabs",
    avatar: "https://i.pravatar.cc/150?img=11" // Placeholder avatar
  },
  {
    quote: "Elian brought our product vision to life with incredible attention to detail. His ability to balance business needs with user empathy made our platform not just beautiful — but genuinely useful.",
    name: "Sarah Nguyen",
    role: "Product Manager at FlowSync",
    avatar: "https://i.pravatar.cc/150?img=5" // Placeholder avatar
  }
]

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
          
          {/* Subtle center divider for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/5 -translate-x-1/2"></div>
          
          {testimonials.map((test, index) => (
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
