import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function QuoteSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    // Split text into individual characters (desktop) or words (mobile)
    const text = textRef.current.textContent
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      textRef.current.innerHTML = text
        .split(' ')
        .map((word) => `<span class="inline-block opacity-0">${word}</span> `)
        .join('')
    } else {
      textRef.current.innerHTML = text
        .split('')
        .map((char) => `<span class="inline-block opacity-0">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('')
    }

    const spans = textRef.current.querySelectorAll('span')

    // Create GSAP animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
        end: 'top top',
        scrub: 1,
        markers: false,
      },
    })

    // Animate each span with staggered offset
    spans.forEach((span, index) => {
      tl.fromTo(
        span,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
        },
        index * (isMobile ? 0.15 : 0.05),
      )
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-32 md:py-48 flex items-center justify-center bg-[#000000]"
    >
      <div className="max-w-6xl px-8 flex flex-col items-center relative">
        <span className="font-atelier text-[#FF3D3D] text-[120px] md:text-[200px] leading-none mb-[-60px] md:mb-[-100px] opacity-40 select-none">"</span>
        <p
          ref={textRef}
          className="text-center font-atelier uppercase text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.95] tracking-wide text-[#ffffff] relative z-10"
        >
          Design is not just what it looks like. Design is how it works.
        </p>
        <p className="mt-8 md:mt-12 w-full text-right text-xl md:text-3xl font-serif italic font-medium tracking-wide text-[#FF3D3D]">- Steve Jobs</p>
      </div>
    </section>
  )
}

export default QuoteSection
