import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const education = [
  { institution: 'ABES Institute of Technology', degree: 'Under Graduate', year: '2023 - 2027' },
  { institution: 'G.N. National Public School', degree: 'High School Senior', year: '2021 - 2022' },
  { institution: 'G.N. National Public School', degree: 'High School Sophomore', year: '2019 - 2020' },
]

function ExperienceSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.exp-animate',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )

      gsap.fromTo(
        '.exp-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.inOut',
          transformOrigin: 'left center',
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
    <section ref={sectionRef} className="ds-section bg-[#f5f5f7] pt-0 pb-20 lg:pb-32">
      <div className="ds-container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
          
          {/* Left Column - Description */}
          <div className="md:col-span-4 lg:col-span-3">
            <p className="exp-animate text-[1.05rem] font-medium leading-[1.6] text-[#1a1a1a]">
              My academic journey has built a strong engineering foundation while fueling my design passion. Each step has shaped my analytical thinking and creative approach to building digital experiences.
            </p>
          </div>

          {/* Right Column - Timeline */}
          <div className="md:col-span-8 lg:col-span-9 md:pl-12">
            <div className="flex flex-col w-full border-t border-black/10 exp-line">
              {education.map((edu, index) => (
                <div 
                  key={index} 
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-black/10 exp-line transition-colors hover:bg-black/5"
                >
                  <div className="flex items-center w-full sm:w-1/3 mb-2 sm:mb-0">
                    <h4 className="exp-animate text-lg font-semibold text-[#111]">{edu.institution}</h4>
                  </div>
                  <div className="flex items-center w-full sm:w-1/3 mb-2 sm:mb-0">
                    <p className="exp-animate text-[1.05rem] font-medium text-[#444]">{edu.degree}</p>
                  </div>
                  <div className="flex items-center w-full sm:w-1/3 sm:justify-end">
                    <p className="exp-animate text-[1.05rem] font-medium text-[#111]">{edu.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
