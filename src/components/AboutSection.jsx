import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
        { y: 42, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="ds-section bg-[#ececec] pt-8">
      <div className="ds-container">
        <div className="about-animate-head mb-8 flex items-center justify-between">
          <p className="ds-heading-lg lowercase">about.</p>
          <button type="button" className="ds-button-ghost">Show More</button>
        </div>

        <p className="about-animate-lead mb-12 max-w-5xl text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-[#141414]">
          I'm an engineering student building at the intersection of UI/UX, web development,
          branding, illustration, and logo design.
        </p>

        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
          <img
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80"
            alt="Creative professional"
            className="about-animate-block h-[320px] w-full object-cover"
          />
          <div className="about-animate-block space-y-4">
            <p className="ds-eyebrow">Hybrid Artist + Designer</p>
            <p className="ds-body max-w-md">
              I started with traditional sketching, anatomy studies, and character design, then
              evolved into digital product design, interaction systems, and brand storytelling.
            </p>
            <p className="ds-body max-w-md">
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
