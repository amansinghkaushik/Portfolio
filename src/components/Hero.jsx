import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import amanBg from '../assets/AmanBG.png'

function Hero() {
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)

  const getSectionProgress = () => {
    if (!sectionRef.current) return 0

    const sectionTop = sectionRef.current.offsetTop
    const sectionHeight = sectionRef.current.offsetHeight
    const maxScrollable = Math.max(sectionHeight - window.innerHeight, 1)
    const scrolledInSection = Math.min(
      Math.max(window.scrollY - sectionTop, 0),
      maxScrollable,
    )
    return scrolledInSection / maxScrollable
  }

  useLayoutEffect(() => {
    setProgress(getSectionProgress())
    setIsReady(true)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setProgress(getSectionProgress())
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const isImageExpanded = progress >= 0.28
  const isSocialVisible = progress >= 0.52
  const isBentoVisible = progress >= 0.76
  const transitionClass = isReady
    ? 'transition-all duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
    : 'transition-none'

  return (
    <section ref={sectionRef} className="relative h-[280vh] w-full bg-white">
      <div
        className={`sticky top-[56px] flex h-[calc(100vh-56px)] w-full items-center justify-center ${transitionClass} ${
          isSocialVisible ? 'px-[30px] py-[30px]' : 'px-0 py-0'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
          <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-start">
            <div className="font-condenso select-none w-full">
              <div className="text-5xl px-2 uppercase tracking-[0.08em] text-[#000000] opacity-80 text-left">
                Welcome to my
              </div>
            </div>
            <div
              className="font-condenso select-none text-[500px] uppercase tracking-[0.02em] text-transparent opacity-70"
              style={{ WebkitTextStroke: '1.8px #8f9299', lineHeight: 0.9 }}
            >
              PORTFOLIO
            </div>
            {/* <div className="font-condenso select-none w-full">
              <div className="text-5xl px-2 uppercase tracking-[0.08em] text-[#000000] opacity-80 text-right">
                Welcome to my
              </div>
            </div> */}
          </div>
        </div>
        <div className="relative flex h-full w-full max-w-[1280px] flex-col gap-3 lg:flex-row">
          <div
            className={`hero-profile-wrapper relative z-10 flex min-h-[520px] flex-col overflow-hidden ${transitionClass} ${
              isSocialVisible ? 'rounded-none bg-transparent' : 'rounded-none bg-transparent'
            } ${
              isBentoVisible ? 'lg:flex-[0_0_33.333%]' : 'lg:flex-[0_0_100%]'
            }`}
          >
          <div
            className={`relative flex-1 origin-bottom overflow-hidden ${transitionClass} ${
              isSocialVisible ? 'bg-[#d8d6d8]' : 'bg-transparent'
            } ${
              isSocialVisible ? 'rounded-xl' : 'rounded-none'
            } ${
              isSocialVisible ? 'mb-3' : 'mb-0'
            } ${
              isImageExpanded ? 'scale-100' : 'scale-[0.75]'
            }`}
          >
            <img
              src={amanBg}
              alt="Portrait"
              className="absolute bottom-0 left-1/2 z-10 h-full w-auto -translate-x-1/2 object-cover"
            />
          </div>

          <motion.div
            initial={false}
            animate={
              isSocialVisible
                ? { height: 'auto', y: 0, opacity: 1 }
                : { height: 0, y: -28, opacity: 0 }
            }
            transition={{ duration: isReady ? 1.3 : 0, ease: [0.16, 1, 0.3, 1] }}
            className={isSocialVisible ? 'overflow-hidden' : 'pointer-events-none overflow-hidden'}
          >
          <div className="flex items-center justify-center gap-8 rounded-[26px] bg-[#d8d3e9] px-6 py-7 text-[#43396d]">
            <a href="#linkedin" className="text-current hover:opacity-70 transition-opacity">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#instagram" className="text-current hover:opacity-70 transition-opacity">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
              </svg>
            </a>
            <a href="#github" className="text-current hover:opacity-70 transition-opacity">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="#mail" className="text-current hover:opacity-70 transition-opacity">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
          </motion.div>
        </div>

          <div
            className={`hero-content-grid relative z-10 grid min-h-[520px] gap-3 ${transitionClass} lg:grid-cols-3 lg:grid-rows-6 ${
              isBentoVisible
                ? 'lg:flex-[0_0_66.666%] lg:translate-x-0 lg:scale-100 lg:opacity-100'
                : 'lg:pointer-events-none lg:flex-[0_0_0%] lg:max-w-0 lg:translate-x-[-6%] lg:scale-95 lg:overflow-hidden lg:opacity-0'
            }`}
          >
          <div className="rounded-[26px] bg-gradient-to-br from-[#5b2ff3] via-[#4b2ad6] to-[#8f79f7] p-8 lg:row-span-2">
            <div className="flex h-full items-center justify-center text-6xl font-semibold lowercase tracking-tight text-white">
              nue
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[26px] bg-[#d8d3e9] p-7 text-[#40366a] lg:col-span-2 lg:row-span-2">
            <div className="mb-5 flex gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-[#bcb5d4] text-xl"></span>
              <span className="grid h-12 w-12 place-items-center rounded-full border border-[#bcb5d4] text-xl">🤖</span>
            </div>
            <p className="text-5xl font-medium tracking-tight">App icon</p>
            <div className="absolute -right-10 -top-5 h-[280px] w-[280px] rotate-[12deg] rounded-[42px] border-[10px] border-[#22252f] bg-gradient-to-b from-[#6d45ff] to-[#4a2bd8]" />
          </div>

          <div className="rounded-[26px] bg-[#d8d3e9] px-7 py-6 text-[#43396d] lg:row-span-2">
            <p className="mb-2 text-3xl">New users</p>
            <p className="text-8xl font-semibold leading-none tracking-tight">78K</p>
            <p className="mt-5 text-4xl font-medium text-[#22b35f]">+10%</p>
          </div>

          <div className="rounded-[26px] bg-[#d8d3e9] px-7 py-6 text-[#43396d] lg:row-span-2">
            <div className="mb-7 flex items-start justify-between">
              <p className="text-8xl font-semibold leading-none tracking-tight">4.9</p>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[#cec8e2] text-3xl">↗</span>
            </div>
            <div className="flex -space-x-3">
              <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#d8d3e9] bg-[#95dca1]">🙂</div>
              <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#d8d3e9] bg-[#a896f3]">🧑</div>
              <div className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#d8d3e9] bg-[#e4a4b8]">🧢</div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[26px] bg-[#d8d3e9] px-8 py-7 text-[#43396d] lg:col-start-3 lg:row-span-4 lg:row-start-3">
            <p className="max-w-[240px] text-6xl font-medium leading-[1.08] tracking-tight">
              Manage your revenue lifecycle
            </p>
            <div className="absolute bottom-10 right-8 h-32 w-32 rounded-[38px] bg-gradient-to-br from-[#7e5bff] to-[#4a2bd8] rotate-12" />
          </div>

          <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-[#4f2ad8] via-[#4d2ddd] to-[#653ff0] px-7 py-6 lg:col-span-2 lg:row-span-2">
            <div className="mb-5 flex justify-end gap-8 text-3xl text-[#92dbff]">
              <span>● Basic</span>
              <span>● Enterprise</span>
            </div>
            <div className="pointer-events-none absolute left-0 right-0 top-20 h-24 opacity-45">
              <div className="h-5 w-full rounded-r-full bg-[#a9a0ee]" />
              <div className="mt-2 h-5 w-[88%] rounded-r-full bg-[#9b8ee9]" />
              <div className="mt-2 h-5 w-[75%] rounded-r-full bg-[#8374dd]" />
              <div className="mt-2 h-5 w-[62%] rounded-r-full bg-[#6f5ecf]" />
            </div>
            <div className="absolute bottom-6 right-7 text-right text-white">
              <p className="text-3xl uppercase tracking-wide text-[#d5cdfa]">MRR</p>
              <p className="text-6xl font-semibold">$24,414</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
