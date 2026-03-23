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
        '.work-animate-head',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        },
      )

      gsap.fromTo(
        '.work-animate-card',
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

  const workCards = [
    {
      title: 'Web Development',
      image: taglineMockup,
    },
    {
      title: 'Sundarban',
      image: sundarban,
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
    <section ref={sectionRef} id="work" className="relative z-0 ds-section bg-[#ececec]">
      <div className="ds-container">
        <div className="work-animate-head mb-16 flex items-center justify-between">
          <h2 className="ds-heading-xl lowercase">work.</h2>
          <button type="button" className="ds-button-ghost">Show More</button>
        </div>

        <div className="relative mt-8">
          <div className="relative w-full overflow-hidden rounded-xl h-[650px] sm:h-[800px] lg:h-[950px]">
            <div className="grid gap-4 sm:grid-cols-2 pb-32">
              {workCards.map((card) => (
                <article key={card.title} className="work-animate-card group relative aspect-square overflow-hidden bg-white rounded-xl">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Title and Read More */}
                  <div className="absolute inset-x-0 bottom-6 lg:bottom-8 px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 opacity-0 translate-y-4 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 z-20 pointer-events-none">
                    <p className="font-clash-display text-3xl font-medium tracking-tight text-white mb-2 sm:mb-0 sm:text-4xl">
                      {card.title}
                    </p>
                    <Link to="/case-study" className="pointer-events-auto flex items-center gap-4 group/btn">
                      <span className="flex w-fit shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black">
                        Read More
                      </span>
                      <svg className="w-7 h-7 text-white transition-transform duration-300 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7L7 17M17 7H8M17 7v9" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Mask Overlay over the bottom half cutting off the overflow */}
            <div className="absolute inset-x-0 bottom-0 h-[400px] z-10 pointer-events-none flex flex-col items-center justify-end bg-gradient-to-t from-[#ececec] from-10% via-[#ececec]/90 via-50% to-transparent pb-16">
              <div className="bg-[#161616] pointer-events-auto px-8 py-3 shadow-xl hover:bg-black transition-all cursor-pointer border border-[#333]">
                <p className="font-clash-display text-xl md:text-2xl text-white font-medium tracking-wide">
                  Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkSection
