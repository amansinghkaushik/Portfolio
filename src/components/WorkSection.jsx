import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import taglineMockup from '../assets/taginmockup.png'
import sundarban from '../assets/sundarban.png'
import pawwfy from '../assets/pawwfy.png'
import mworld from '../assets/mworld.png'

gsap.registerPlugin(ScrollTrigger)

function WorkSection() {
  const sectionRef = useRef(null)
  const [expandedCard, setExpandedCard] = useState(null)

  const toggleExpand = (title) => {
    setExpandedCard((prev) => (prev === title ? null : title))
  }

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
          ease: 'power3.inOut',
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
      title: 'M-world',
      role: 'Creative Head',
      image: mworld,
      link: 'https://mworld.tech',
      description:
        'Led creative direction across all digital products, marketing campaigns, social media, and investor materials. Defined and documented brand guidelines covering typography, colour systems, iconography, layouts, and motion for cross-functional execution.',
    },
    {
      title: 'Pawwfy',
      role: 'Product Designer',
      image: pawwfy,
      link: 'https://www.figma.com/design/9Llr3YgsLlpOyAHHw0QBbF/PAWFFY?node-id=0-1&t=dp9iptxkneeOTWI2-1',
      description:
        'Architected end-to-end UX for a 5-role pet-care platform across 3 surfaces. Built a Figma design system with over 40 components & design tokens, achieving a 30% improvement in task completion rates through targeted usability testing.',
    },
    {
      title: 'Tag-in',
      role: 'UI/UX & Frontend Lead',
      image: taglineMockup,
      link: 'https://tag-in-manufacture.vercel.app',
      description:
        'Designed end-to-end user flows, responsive interfaces, and product interactions under strict deadlines using React & Tailwind CSS, securing top placements across 7+ national and college-level hackathons.',
    },
    {
      title: 'Sundarban',
      role: 'UI/UX & Frontend Lead',
      image: sundarban,
      link: 'https://sundarban-portfolio.vercel.app',
      description:
        'Led a cross-functional 6-person team to design, build, and deploy a complete product in a intense 36-hour sprint, securing Top 50 out of 1,000+ teams nationwide at Smart India Hackathon.',
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
          <div className="relative w-full rounded-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              {workCards.map((card) => {
                const isExpanded = expandedCard === card.title

                return (
                  <article
                    key={card.title}
                    className={`work-animate-card group relative aspect-square overflow-hidden bg-black rounded-xl transition-all duration-700 ease-in-out`}
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`h-full w-full object-cover transition-all duration-700 ease-in-out ${
                        isExpanded
                          ? 'scale-105 opacity-100'
                          : 'group-hover:scale-110 opacity-100'
                      }`}
                    />

                    {/* Gradient Overlay: Expands upward seamlessly when card is expanded */}
                    <div
                      className={`pointer-events-none absolute inset-0 transition-all duration-700 ease-in-out ${
                        isExpanded
                          ? 'bg-gradient-to-t from-black/95 via-black/75 via-65% to-black/10 opacity-100'
                          : 'bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100'
                      }`}
                    />

                    {/* Card Content & Action Bar */}
                    <div
                      className={`absolute inset-x-0 bottom-0 p-6 lg:p-8 flex flex-col justify-end transition-all duration-700 ease-in-out z-20 ${
                        isExpanded
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="flex flex-col items-start gap-2">
                          <h3 className="font-clash-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                            {card.title}
                          </h3>
                          {/* Role Pill */}
                          <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white border border-white/30">
                            {card.role}
                          </span>
                        </div>

                        <div className="pointer-events-auto flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleExpand(card.title)}
                            className="flex w-fit shrink-0 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-white hover:text-black cursor-pointer"
                          >
                            {isExpanded ? 'Close' : 'Read More'}
                          </button>
                          {card.link && card.link !== '#' && (
                            <a
                              href={card.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/arrow flex items-center justify-center p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
                              title="Visit link"
                            >
                              <svg
                                className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover/arrow:-translate-y-0.5 group-hover/arrow:translate-x-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 7L7 17M17 7H8M17 7v9"
                                />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Expanded Explanation Text */}
                      {isExpanded && (
                        <div className="mt-4 pt-3 border-t border-white/20 text-white/95 text-sm sm:text-base leading-relaxed animate-expand-smooth">
                          <p>{card.description}</p>
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkSection
