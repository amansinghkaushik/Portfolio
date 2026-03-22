import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function QuoteSection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    // Split text into individual characters
    const text = textRef.current.textContent
    textRef.current.innerHTML = text
      .split('')
      .map((char) => `<span class="inline-block opacity-100">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('')

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

    // Animate each character with staggered offset
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
        index * 0.05,
      )
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-40 flex items-center justify-center bg-white"
    >
      <div className="max-w-5xl px-8">
        <p
          ref={textRef}
          className="text-center font-semibold text-6xl leading-relaxed tracking-tighter text-[#0d0d0d]"
        >
          "Design is not just what it looks like. Design is how it works."
        </p>
        <p className="mt-6 w-full text-right text-2xl italic text-[#0d0d0d]">- Steve Jobs</p>
      </div>
    </section>
  )
}

export default QuoteSection
