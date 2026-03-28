import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import me from '../assets/me.jpeg'

gsap.registerPlugin(ScrollTrigger)

function AboutSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-animate-head',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
          },
        },
      )

      gsap.fromTo(
        '.about-animate-lead',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        },
      )

      gsap.fromTo(
        '.about-animate-block',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 55%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="ds-section bg-[#ececec] pt-8">
      <div className="ds-container">
        <div className="about-animate-head mb-16 flex items-center justify-between">
          <p className="ds-heading-xl lowercase">about.</p>
        </div>

        <p className="about-animate-lead mb-12 max-w-2xl ds-heading-md text-[#141414]">
          I'm an engineering student building at the intersection of UI/UX, web development,
          branding, illustration, and logo design.
        </p>

        <div className="flex flex-col lg:flex-row items-center lg:pl-56 gap-10 lg:gap-20">
          <img
            src={me}
            alt="Creative professional"
            className="about-animate-block w-full max-w-[600px] h-auto lg:h-[600px] object-cover rounded-xl"
          />
          <div className="about-animate-block space-y-4">
            <p className="ds-eyebrow">Hybrid Artist + Designer</p>
            <p className="text-xl lg:text-2xl font-medium max-w-md">
              I started with traditional sketching, anatomy studies, and character design, then
              evolved into digital product design, interaction systems, and brand storytelling.
            </p>
            <p className="text-xl lg:text-2xl font-medium max-w-md">
              My focus is creating experiences that feel expressive like art and functional like
              engineering.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
