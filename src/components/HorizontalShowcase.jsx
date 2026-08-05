import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function HorizontalShowcase() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  const processSteps = [
    { 
      id: '01', 
      title: 'DISCOVERY', 
      subtitle: 'The Deep Dive', 
      desc: 'We start by understanding your vision, your audience, and your goals. No assumptions, just pure strategy and research to hook your clients.' 
    },
    { 
      id: '02', 
      title: 'DESIGN', 
      subtitle: 'Crafting the Vibe', 
      desc: 'This is where the magic happens. We wireframe, design, and prototype an experience that hooks your users from the first pixel.' 
    },
    { 
      id: '03', 
      title: 'BUILD', 
      subtitle: 'Pixel Perfect Code', 
      desc: 'We bring the designs to life with modern, blazing-fast web technologies. Animations, interactions, and flawless responsiveness.' 
    },
    { 
      id: '04', 
      title: 'LAUNCH', 
      subtitle: 'Into the Wild', 
      desc: 'Time to shine. We deploy your project to the world, ensuring everything runs smoothly and looks stunning on every device.' 
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return

    const sections = gsap.utils.toArray('.horizontal-item')
    
    // We get the total width to move by subtracting the viewport width from the total track width
    const getScrollAmount = () => -(trackRef.current.scrollWidth - window.innerWidth)

    const tween = gsap.to(trackRef.current, {
      x: getScrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculates on resize
      }
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill()
      })
    }
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative z-10 w-full h-screen bg-[#ff1b1b] overflow-hidden flex items-center"
    >
      {/* Massive Dark Glow Background for contrast */}
      <div 
        className="absolute z-0 pointer-events-none rounded-full" 
        style={{ 
          left: '50%', 
          top: '50%', 
          transform: 'translate(-50%, -50%)',
          width: '80vw', 
          height: '60vh', 
          background: 'rgba(0, 0, 0, 0.15)', 
          filter: 'blur(150px)' 
        }} 
      />

      {/* Horizontal Track Container */}
      <div 
        ref={trackRef} 
        className="relative z-10 flex h-full items-center pl-[10vw] pr-[20vw] gap-8 md:gap-16 lg:gap-32 w-max"
      >
        {/* Intro Card */}
        <div className="horizontal-item w-[80vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0 flex flex-col justify-center">
          <h2 className="font-atelier text-[clamp(4rem,10vw,12rem)] leading-[0.8] tracking-tight text-[#101010] uppercase mb-6">
            Our <br /> Process
          </h2>
          <p className="font-sans text-xl md:text-2xl text-[#101010] font-medium max-w-lg leading-relaxed">
            How we turn ideas into unforgettable digital experiences. Slide to explore the journey.
          </p>
        </div>

        {/* Process Step Cards */}
        {processSteps.map((step, index) => (
          <div 
            key={index} 
            className="horizontal-item w-[85vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] flex-shrink-0 relative group"
          >
            <div className="w-full aspect-[4/3] sm:aspect-square md:aspect-[4/5] rounded-[2rem] bg-[#101010] p-8 md:p-12 lg:p-16 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
              
              {/* Giant Background Number */}
              <div className="absolute -top-10 -right-10 md:-top-20 md:-right-20 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <span className="font-atelier text-[#ff1b1b] text-[300px] md:text-[400px] leading-none">{step.id}</span>
              </div>

              {/* Top Section: Number & Subtitle */}
              <div className="relative z-10 flex items-start justify-between border-b border-white/20 pb-8">
                <span className="font-atelier text-white text-5xl md:text-7xl">{step.id}</span>
                <span className="font-sans text-[#ff1b1b] uppercase tracking-widest text-sm md:text-base font-medium bg-[#ff1b1b]/10 px-4 py-2 rounded-full border border-[#ff1b1b]/20">
                  {step.subtitle}
                </span>
              </div>

              {/* Bottom Section: Title & Desc */}
              <div className="relative z-10 mt-auto pt-8">
                <h3 className="font-clash-display text-white text-4xl md:text-5xl lg:text-7xl uppercase tracking-widest mb-6">
                  {step.title}
                </h3>
                <p className="font-sans text-white/70 text-lg md:text-xl font-medium leading-relaxed max-w-sm">
                  {step.desc}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HorizontalShowcase
