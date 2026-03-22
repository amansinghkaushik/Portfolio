import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import taglineMockup from '../assets/taginmockup.png'

gsap.registerPlugin(ScrollTrigger)

function WorkSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-animate-head',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        },
      )

      gsap.fromTo(
        '.work-animate-card',
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const workCards = [
    {
      title: 'Web Development',
      image: taglineMockup,
    },
    {
      title: 'Visual Experiments',
      image:
        'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Product Storytelling',
      image:
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
    },
    {
      title: 'Graphic Systems',
      image:
        'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=900&q=80',
    },
  ]

  return (
    <section ref={sectionRef} id="work-section" className="relative z-0 ds-section bg-[#ececec]">
      <div className="ds-container">
        <div className="work-animate-head mb-8 flex items-center justify-between">
          <h2 className="ds-heading-lg lowercase">work.</h2>
          <button type="button" className="ds-button-ghost">Show More</button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {workCards.map((card) => (
            <article key={card.title} className="work-animate-card group relative aspect-square overflow-hidden bg-white">
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <p className="pointer-events-none absolute bottom-8 left-8 text-3xl font-semibold tracking-tight text-white opacity-0 transition-all duration-500 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 sm:text-4xl">
                {card.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkSection
