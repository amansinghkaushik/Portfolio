import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import astrick from '../assets/astrikshape.png'
import taglineMockup from '../assets/taginmockup.png'

import amanBg from '../assets/AmanBG.png'
import arrowIcon from '../assets/Arrow.svg'
import figmaIcon from '../assets/figma.svg'
import framerIcon from '../assets/framer.svg'
import photoshopIcon from '../assets/adobe-ps.svg'
import reactIcon from '../assets/reactjs.svg'
import tailwindIcon from '../assets/tailwind.svg'
import nodeIcon from '../assets/nodejs.svg'
import githubIcon from '../assets/github.svg'
import notionIcon from '../assets/notion.svg'
import pinterestIcon from '../assets/pinterest.svg'
import pythonIcon from '../assets/python.svg'
import instagramIcon from '../assets/instagram.svg'
import linkedinIcon from '../assets/linkedin.svg'
import whatsappIcon from '../assets/whatsapp.svg'
import heroVideo from '../assets/Vdeo.mp4'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const sectionRef = useRef(null)
  const welcomeRef = useRef(null)
  const basedRef = useRef(null)
  const paragraphRef = useRef(null)
  const firstSceneMetaRef = useRef(null)
  const portfolioWordRefs = useRef([])
  const designWordRefs = useRef([])
  const videoRef = useRef(null)
  const targetVideoTimeRef = useRef(0)
  const smoothedVideoTimeRef = useRef(0)
  const transitionTextRef = useRef(null)
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0)
  const [isToolsHovered, setIsToolsHovered] = useState(false)

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

  const shapeRiseStart = 0.12
  const shapeRiseEnd = 0.30
  const firstSceneFadeStart = 0.01
  const firstSceneFadeEnd = 0.10
  const videoStart = 0.20
  const videoScrubEnd = 0.34
  const videoHoldEnd = 0.44
  const textFadeInStart = 0.25
  const textFadeInEnd = 0.30
  const textFadeOutStart = 0.52
  const textFadeOutEnd = 0.56
  const videoFadeOutStart = 0.56
  const videoFadeOutEnd = 0.61
  const socialStart = 0.67
  const imageExpandStart = socialStart
  const bentoStart = 0.80

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

  const isImageExpanded = progress >= imageExpandStart
  const isSocialVisible = progress >= socialStart
  const isBentoVisible = progress >= bentoStart
  const bottomBarDismissStart = Math.max(shapeRiseStart, shapeRiseEnd - 0.05)
  const bottomBarDismissProgress = clamp((progress - bottomBarDismissStart) / 0.008, 0, 1)
  const bottomBarTranslateY = isImageExpanded ? 100 : bottomBarDismissProgress * 100
  const bottomBarOpacity = isImageExpanded ? 0 : 1 - bottomBarDismissProgress
  const textFadeInProgress = clamp((progress - textFadeInStart) / (textFadeInEnd - textFadeInStart), 0, 1)
  const textFadeOutProgress = clamp((progress - textFadeOutStart) / (textFadeOutEnd - textFadeOutStart), 0, 1)
  const textOpacity = progress >= textFadeInStart && progress < textFadeOutEnd
    ? (progress < textFadeOutStart ? textFadeInProgress : 1 - textFadeOutProgress)
    : 0
  const videoFadeOutProgress = clamp((progress - videoFadeOutStart) / (videoFadeOutEnd - videoFadeOutStart), 0, 1)
  const videoOpacity = progress >= videoStart && progress < videoFadeOutEnd
    ? (progress < videoFadeOutStart ? 1 : 1 - videoFadeOutProgress)
    : 0
  const transitionClass = isReady
    ? 'transition-all duration-[1300ms] ease-[cubic-bezier(0.16,1,0.3,1)]'
    : 'transition-none'
  const portfolioWordGroups = ['PORT', 'FOLIO']
  const getPortfolioWordProgress = (index) => {
    // Last-to-first stagger: the right-most segment begins moving first.
    const orderFromLast = portfolioWordGroups.length - 1 - index
    const start = 0.01 + orderFromLast * 0.03
    const end = start + 0.11
    return clamp((progress - start) / (end - start), 0, 1)
  }
  const shapeRiseProgress = clamp(
    (progress - shapeRiseStart) / (shapeRiseEnd - shapeRiseStart),
    0,
    1,
  )
  const shapeRiseEased = 1 - Math.pow(1 - shapeRiseProgress, 2)
  const shapeCoverProgress = Math.min(shapeRiseEased, 0.85)
  const shapeRadiusPercent = 0.1 + shapeCoverProgress * 160
  const videoScrubProgress = clamp(
    (progress - videoStart) / (videoScrubEnd - videoStart),
    0,
    1,
  )
  const toolIcons = [
    { src: figmaIcon, alt: 'Figma' },
    { src: framerIcon, alt: 'Framer' },
    { src: photoshopIcon, alt: 'Photoshop' },
    { src: reactIcon, alt: 'React' },
    { src: tailwindIcon, alt: 'Tailwind' },
    { src: nodeIcon, alt: 'Node.js' },
    { src: githubIcon, alt: 'GitHub' },
  ]
  const communityIcons = [
    { src: instagramIcon, alt: 'Instagram', link: 'https://www.instagram.com/aman_singh_kaushik_/' },
    { src: whatsappIcon, alt: 'WhatsApp', link: 'https://wa.me/919651969409' },
    { src: githubIcon, alt: 'GitHub', link: 'https://github.com/amansinghkaushik' },
    { src: linkedinIcon, alt: 'LinkedIn', link: 'https://www.linkedin.com/in/aman-singh-kaushik-1a37a81a4/' },
  ]

  useEffect(() => {
    const fadeProgress = clamp(
      (progress - firstSceneFadeStart) / (firstSceneFadeEnd - firstSceneFadeStart),
      0,
      1,
    )

    if (welcomeRef.current) {
      gsap.set(welcomeRef.current, {
        y: -36 * fadeProgress,
        opacity: 0.8 * (1 - fadeProgress),
      })
    }

    if (basedRef.current) {
      gsap.set(basedRef.current, {
        y: -28 * fadeProgress,
        opacity: 0.8 * (1 - fadeProgress),
      })
    }

    if (paragraphRef.current) {
      gsap.set(paragraphRef.current, {
        y: -22 * fadeProgress,
        opacity: 0.8 * (1 - fadeProgress),
      })
    }

    if (firstSceneMetaRef.current) {
      gsap.set(firstSceneMetaRef.current, {
        y: -18 * fadeProgress,
        opacity: 0.85 * (1 - fadeProgress),
      })
    }

    portfolioWordRefs.current.forEach((element, index) => {
      if (!element) return
      const wordProgress = getPortfolioWordProgress(index)
      gsap.set(element, {
        y: -220 * wordProgress,
        opacity: 1 - wordProgress,
      })
    })

    if (transitionTextRef.current) {
      gsap.set(transitionTextRef.current, {
        // Base opacity will only apply to the non-Design texts.
        // We'll calculate the opacity for the wrapper, but the Design text handles itself!
        opacity: textOpacity,
      })
    }

    // Staggered letters for 'Design.'
    designWordRefs.current.forEach((el, index) => {
      if (!el) return
      
      const letterFadeInStart = textFadeInStart + (index * 0.003)
      const letterFadeInEnd = letterFadeInStart + 0.04
      
      const letterFadeOutStart = textFadeOutStart + (index * 0.003)
      const letterFadeOutEnd = letterFadeOutStart + 0.04

      const fadeInProg = clamp((progress - letterFadeInStart) / (letterFadeInEnd - letterFadeInStart), 0, 1)
      const fadeOutProg = clamp((progress - letterFadeOutStart) / (letterFadeOutEnd - letterFadeOutStart), 0, 1)
      
      let letterOpacity = 0
      let letterY = 30
      
      if (progress >= letterFadeInStart && progress < letterFadeOutEnd) {
        if (progress < letterFadeOutStart) {
          letterOpacity = fadeInProg
          letterY = 30 * (1 - fadeInProg)
        } else {
          letterOpacity = 1 - fadeOutProg
          letterY = -30 * fadeOutProg
        }
      }
      
      gsap.set(el, {
        opacity: letterOpacity,
        y: letterY,
      })
    })
  }, [progress, textOpacity])

  useEffect(() => {
    if (!videoDuration) return
    targetVideoTimeRef.current = videoDuration * videoScrubProgress
  }, [videoDuration, videoScrubProgress])

  useEffect(() => {
    if (!videoRef.current || !videoDuration) return

    let rafId = 0
    const animateScrub = () => {
      const video = videoRef.current
      if (!video) return

      const target = targetVideoTimeRef.current
      smoothedVideoTimeRef.current += (target - smoothedVideoTimeRef.current) * 0.03

      if (Math.abs(video.currentTime - smoothedVideoTimeRef.current) > 0.016) {
        video.currentTime = smoothedVideoTimeRef.current
      }

      rafId = window.requestAnimationFrame(animateScrub)
    }

    rafId = window.requestAnimationFrame(animateScrub)

    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [videoDuration])

  useEffect(() => {
    if (!sectionRef.current) return

    const holdTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'bottom bottom',
      end: () => `+=${window.innerHeight * 0.75}`,
      pin: true,
      pinSpacing: false,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    })

    return () => {
      holdTrigger.kill()
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-0 h-[850vh] w-full"
      style={{ backgroundColor: '#ececec' }}
    >
      <div
        className={`sticky top-[56px] flex h-[calc(100vh-56px)] w-full items-center justify-center ${transitionClass} ${isSocialVisible ? 'px-[30px] py-[30px]' : 'px-0 py-0'
          }`}
      >
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
          <div
            className="absolute inset-0 bg-black"
            style={{
              clipPath: `circle(${shapeRadiusPercent}% at 50% 50%)`,
              WebkitClipPath: `circle(${shapeRadiusPercent}% at 50% 50%)`,
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
          <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-start">
            <div className=" absolute -top-8  select-none w-full">
              <div ref={welcomeRef} className="font-gochi-hand text-6xl uppercase tracking-[0.02em] text-[#1d4ed8] opacity-80 text-left ">
                Welcome to my
              </div>
            </div>
            <motion.div
              className="font-condenso select-none whitespace-nowrap text-[550px] uppercase tracking-[0.02em] text-transparent opacity-70"
              style={{
                WebkitTextStroke: '3.5px #23242a', // darker outline
                lineHeight: 0.9,
                paddingTop: '0.01em',
                WebkitMaskImage:
                  'linear-gradient(to bottom, #000 18%, rgba(0,0,0,0.18) 62%, rgba(0,0,0,0.03) 84%, transparent 100%)',
                maskImage:
                  'linear-gradient(to bottom, #000 18%, rgba(0,0,0,0.18) 62%, rgba(0,0,0,0.03) 84%, transparent 100%)',
              }}
            >
              {portfolioWordGroups.map((group, index) => (
                <motion.span
                  key={group}
                  ref={(element) => {
                    portfolioWordRefs.current[index] = element
                  }}
                  className="inline-block"
                >
                  {group}
                </motion.span>
              ))}
            </motion.div>
            {/* <div className="text-right flex-col w-full -mt-26 select-none">
              <div ref={basedRef} className="text-2xl uppercase tracking-[0.2em] absolute -right-20 px-6 font-medium text-[#000000] opacity-80 text-right">
                Based in INDIA
              </div>
              <div ref={paragraphRef} className='ml-auto max-w-[500px] tracking-[0.06em] absolute -right-20 leading-6 text-lg px-6 mt-20 font-light text-[#000000] opacity-80 text-right'>
                <span className="font-semibold">Turn bold ideas into unforgettable visuals.</span>
                <br />
                Plan, design, and animate cinematic stories in minutes. Powered by
                next-gen image and video AI, your creations are ready to launch
                anywhere, instantly
              </div>
            </div> */}
            {/* <div className="font-condenso select-none w-full">
              <div className="text-5xl px-2 uppercase tracking-[0.08em] text-[#000000] opacity-80 text-right">
              Welcome to my
              </div>
              </div> */}
          </div>

          <div
            ref={firstSceneMetaRef}
            className="absolute bottom-24 right-48 z-30 flex flex-col items-end gap-10 opacity-90"
          >
            <div className="grid grid-cols-2 gap-x-16 gap-y-12 max-w-[550px]">
              {/* Left Column */}
              <div className="flex flex-col justify-between gap-2 text-right">
                <p className="text-sm font-extrabold uppercase leading-[1.5] tracking-wide text-[#333]">
                  Web and Mobile / UX<br />And UI / Branding
                </p>
                <p className="text-sm font-regular uppercase leading-[1] tracking-wide text-[#444]">
                  Currently available<br />for freelance<br />worldwide
                </p>
              </div>

              {/* Right Column */}
              <div className="flex flex-col justify-between gap-2 text-right">
                <p className="text-sm font-extrabold uppercase leading-[1.5] tracking-wide text-[#333]">
                  Based in India
                </p>
                <p className="text-sm font-regular uppercase leading-[1] tracking-wide text-[#444]">
                  Born in<br />Uttar Pradesh
                </p>
              </div>
            </div>

            {/* Achievement Capsule */}
            <div className="flex items-center gap-2.5 rounded-full border border-black/10 bg-black/5 px-5 py-2 backdrop-blur-md">
              <span className="text-base drop-shadow-sm">🏆</span>
              <p className="font-serif italic text-base font-semibold text-[#444] tracking-wide">
                7+ times hackathon winner
              </p>
            </div>
          </div>

          {/* Testimonial/info block below meta grid */}
          <div className="absolute bottom-56 left-48 z-30 flex items-center gap-3">
            {/* Avatars */}
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=128&q=80" alt="Client 1" className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-md bg-gray-200 z-20" />
              <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=128&q=80" alt="Client 3" className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-md bg-gray-200 z-10" />
              <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=128&q=80" alt="Client 2" className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-md bg-gray-200 z-0" />
            </div>
            {/* Text */}
            <div className="ml-2 text-xs max-w-48 font-normal text-[#444]">
              Trusted by over <span className="font-bold text-black">many happy clients</span> <span className="font-normal">across residential and commercial projects.</span>
            </div>
          </div>
        </div>
        <div className="relative flex h-full w-full max-w-[1280px] flex-col gap-3 lg:flex-row">
          <div
            className={`hero-profile-wrapper relative z-10 flex min-h-[520px] flex-col overflow-hidden ${transitionClass} ${isSocialVisible ? 'rounded-none bg-transparent' : 'rounded-none bg-transparent'
              } ${isBentoVisible ? 'lg:flex-[0_0_33.333%]' : 'lg:flex-[0_0_100%]'
              }`}
          >
            <div
              className={`relative flex-1 origin-bottom overflow-hidden ${transitionClass} ${isSocialVisible ? 'bg-[#d8d6d8]' : 'bg-transparent'
                } ${isSocialVisible ? 'rounded-xl' : 'rounded-none'
                } ${isSocialVisible ? 'mb-3' : 'mb-0'
                }`}
            >
              <img
                src={amanBg}
                alt="Portrait"
                className={`pointer-events-none absolute bottom-0 left-1/2 z-20 h-full w-auto -translate-x-1/2 origin-bottom object-cover ${isImageExpanded ? 'scale-[0.92]' : 'scale-[0.75]'
                  }`}
              />

              <div
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ opacity: videoOpacity }}
              >
                <video
                  ref={videoRef}
                  src={heroVideo}
                  muted
                  playsInline
                  preload="auto"
                  onLoadedMetadata={(event) => {
                    setVideoDuration(event.currentTarget.duration || 0)
                    smoothedVideoTimeRef.current = 0
                    targetVideoTimeRef.current = 0
                  }}
                  className="h-screen opacity-80 w-full object-cover"
                  style={{ transform: 'rotateY(180deg)' }}
                />
              </div>
            </div>

            <div
              ref={transitionTextRef}
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-center"
              style={{ opacity: textOpacity }}
            >
              <div className="absolute left-0 bottom-16 max-w-[360px] text-left text-white">
                <p className="text-sm uppercase tracking-[0.24em] text-white/70">Now Creating</p>
                <p className="mt-3 text-lg leading-relaxed text-white/90">
                  Ideas into campaigns, interfaces, and motion stories that feel handcrafted and unforgettable.
                </p>
              </div>
              <div className="absolute top-16 left-0 max-w-screen text-left text-white">
                <h1 className="text-5xl font-regular leading-14 tracking-tighter sm:text-8xl">Built</h1>
                <p className="pl-16 text-2xl font-serif font-extralight italic tracking-tighter text-white/95 sm:text-8xl">from instint,</p>
              </div>
              <div className="absolute bottom-16 right-0 max-w-fit text-right text-white">
                <p className="text-2xl leading-0 font-medium text-white/95 sm:text-4xl">refined by</p>
                <h1 className="text-5xl font-regular italic font-serif tracking-tight sm:text-9xl">
                  {['D', 'e', 's', 'i', 'g', 'n', '.'].map((char, index) => (
                    <span 
                      key={index}
                      ref={(el) => designWordRefs.current[index] = el}
                      className="inline-block"
                    >
                      {char}
                    </span>
                  ))}
                </h1>
              </div>
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
              <div className="flex items-center justify-center rounded-xl bg-[#d8d3e9] px-6 py-7 text-[#43396d]">
                <p className="text-3xl font-light font-serif italic tracking-wide">Aman Singh Kaushik</p>
              </div>
            </motion.div>
          </div>

          <div
            className={`hero-content-grid relative z-10 grid min-h-[520px] gap-3 ${transitionClass} lg:grid-cols-3 lg:grid-rows-6 ${isBentoVisible
                ? 'lg:flex-[0_0_66.666%] lg:translate-x-0 lg:scale-100 lg:opacity-100'
                : 'lg:pointer-events-none lg:flex-[0_0_0%] lg:max-w-0 lg:translate-x-[-6%] lg:scale-95 lg:overflow-hidden lg:opacity-0'
              }`}
          >
            <div className="group relative overflow-hidden rounded-xl bg-[#ece868] p-6 text-[#101010] lg:row-span-2 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between">
              <div className="max-w-[240px]">
                <p className="font-clash-display text-2xl lg:text-[1.75rem] leading-[1.1] tracking-[-0.02em] font-medium">
                  Got an <span className='italic font-serif font-medium'>idea </span>? Don't let it rest.
                </p>
                <p className="mt-2 font-clash-grotesk text-base lg:text-lg text-black/80">
                  Let's start working on it.
                </p>
              </div>

              <Link
                to="/contact"
                className="mt-4 ml-auto flex w-fit items-center rounded-lg gap-1 border border-black/40 bg-[#efedb7] px-2 py-2 text-xs font-medium text-black/70"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Get in Touch
              </Link>

              <img
                src={arrowIcon}
                alt="Arrow"
                className="absolute bottom-6 left-6 h-12 w-12"
              />
            </div>

            <div className="group relative overflow-hidden flex gap-4 lg:gap-8 items-center rounded-xl bg-[#eaf2ff] p-7 text-[#12305f] lg:col-span-2 lg:row-span-2 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
              <p className="font-clash-grotesk flex-1 text-left text-lg lg:text-[1.35rem] leading-[1.4] text-[#143467]">
                As an engineering student and digital designer, I specialize in crafting meaningful
                UI/UX experiences, visual identities, and logo systems.
              </p>
              <img className='h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 transition-transform duration-700 object-contain' src={astrick} alt="Astrick" />
            </div>

            <div className="flex h-full min-h-0 flex-col gap-3 lg:row-span-2">
              <div
                className="relative flex-1 overflow-hidden rounded-xl bg-[#72e6cc] px-4"
                onMouseEnter={() => setIsToolsHovered(true)}
                onMouseLeave={() => setIsToolsHovered(false)}
              >
                <motion.div
                  className="flex h-full w-max items-center gap-3 whitespace-nowrap pr-6"
                  animate={isToolsHovered ? { x: ['0%', '-50%'] } : { x: '0%' }}
                  transition={isToolsHovered ? { duration: 10, ease: 'linear', repeat: Infinity } : { duration: 0.25 }}
                >
                  {[...toolIcons, ...toolIcons].map((icon, index) => (
                    <div key={`tool-${icon.alt}-${index}`}>
                      <img src={icon.src} alt={icon.alt} className="h-14 w-14 rounded-2xl object-contain" />
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="flex flex-1 items-center justify-center overflow-hidden rounded-xl bg-[#7cc4ff] px-2">
                <div className="flex w-full items-center justify-center">
                  {communityIcons.map((icon) => (
                    <a
                      key={icon.alt}
                      href={icon.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid h-14 w-14 place-items-center transition-transform duration-200 hover:scale-125 hover:-translate-y-1"
                    >
                      <img src={icon.src} alt={icon.alt} className="h-10 w-10 rounded-2xl object-contain shadow-sm" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center rounded-xl bg-[#eaf2ff] p-4 text-[#101828] lg:row-span-2 transition-colors hover:bg-white hover:shadow-lg">
              <div className="grid h-full w-full max-h-[290px] max-w-[480px] grid-cols-2 grid-rows-2 gap-x-6 gap-y-6 px-4 py-4">
                <div className="group flex h-full w-full flex-col items-start justify-center text-left transition-transform duration-300 hover:scale-105 hover:translate-x-1">
                  <p className="font-clash-display text-3xl font-semibold tracking-tight">1+</p>
                  <p className="mt-1 text-xs md:text-sm font-medium leading-[1.1] text-[#5c6375]">Years experience</p>
                </div>
                <div className="group flex h-full w-full flex-col items-start justify-center text-left transition-transform duration-300 hover:scale-105 hover:translate-x-1">
                  <p className="font-clash-display text-3xl font-semibold tracking-tight">3+</p>
                  <p className="mt-1 text-xs md:text-sm font-medium leading-[1.1] text-[#5c6375]">Projects completed</p>
                </div>
                <div className="group flex h-full w-full flex-col items-start justify-center text-left transition-transform duration-300 hover:scale-105 hover:translate-x-1">
                  <p className="font-clash-display text-3xl font-semibold tracking-tight">3+</p>
                  <p className="mt-1 text-xs md:text-sm font-medium leading-[1.1] text-[#5c6375]">Happy clients</p>
                </div>
                <div className="group flex h-full w-full flex-col items-start justify-center text-left transition-transform duration-300 hover:scale-105 hover:translate-x-1">
                  <p className="font-clash-display text-3xl font-semibold tracking-tight">98%</p>
                  <p className="mt-1 text-xs md:text-sm font-medium leading-[1.1] text-[#5c6375]">On-time delivery</p>
                </div>
              </div>
            </div>

            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl bg-[#eaf2ff] p-4 text-[#12305f] lg:col-start-3 lg:row-span-4 lg:row-start-3">
              <div className="flex items-center justify-between px-4 py-3">
                <p className="mt-1 text-3xl font-light leading-tight tracking-wider font-serif italic text-[#143467]">What <br /> I Offer</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="58"
                  height="58"
                  viewBox="0 0 256 256"
                  fill="none"
                  className="pointer-events-none h-[4.75rem] w-[4.75rem] shrink-0"
                  aria-hidden="true"
                >
                  <path
                    d="M152 70.059L201.539 20.519L235.48 54.461L185.941 104H256V152H185.941L235.48 201.539L201.539 235.48L152 185.941V256H104V185.941L54.46 235.48L20.52 201.539L70.059 152H0V104H70.059L20.519 54.46L54.461 20.52L104 70.059V0H152Z"
                    fill="rgb(00, 00, 84)"
                  />
                </svg>
              </div>

              <div className="mt-2 flex flex-col gap-1.5">
                <div className="flex items-center gap-3 rounded-[14px] px-3 py-3">
                  <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#bfdbfe] text-xs font-semibold text-[#1e3a8a]">BR</span>
                  <p className="text-[1.15rem] font-medium text-[#143467]">Branding</p>
                </div>
                <div className="flex items-center gap-3 rounded-[14px] px-3 py-3">
                  <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#bfdbfe] text-xs font-semibold text-[#1e3a8a]">UX</span>
                  <p className="text-[1.15rem] font-medium text-[#143467]">UI/UX Design</p>
                </div>
                <div className="flex items-center gap-3 rounded-[14px] px-3 py-3">
                  <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#bfdbfe] text-xs font-semibold text-[#1e3a8a]">IL</span>
                  <p className="text-[1.15rem] font-medium text-[#143467]">Illustration</p>
                </div>
                <div className="flex items-center gap-3 rounded-[14px] px-3 py-3">
                  <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#bfdbfe] text-xs font-semibold text-[#1e3a8a]">WD</span>
                  <p className="text-[1.15rem] font-medium text-[#143467]">Web Development</p>
                </div>
                <div className="flex items-center gap-3 rounded-[14px] px-3 py-3">
                  <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#bfdbfe] text-xs font-semibold text-[#1e3a8a]">VI</span>
                  <p className="text-[1.15rem] font-medium text-[#143467]">Visual Identity</p>
                </div>
              </div>
            </div>

            <a href="#work" className="group relative overflow-hidden rounded-xl lg:col-span-2 lg:row-span-2 cursor-pointer transition-shadow duration-300 hover:shadow-xl block">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ backgroundImage: `url(${taglineMockup})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
              <div className="absolute bottom-5 right-6 flex items-center gap-4 translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-right font-clash-display text-4xl font-semibold text-white">
                  Projects
                </p>
                <img
                  src={arrowIcon}
                  alt="Arrow"
                  className="h-10 w-10 brightness-0 rotate-90 invert transition-transform duration-500 group-hover:translate-x-2"
                />
              </div>
            </a>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 z-40 w-full bg-black px-[30px] py-[10px] text-white transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${bottomBarTranslateY}%)`,
            opacity: bottomBarOpacity,
          }}
        >
          <div className="flex items-center justify-between py-[10px] relative">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] leading-[0.1] sm:text-base w-1/3">
              <span className='font-gochi-hand text-2xl'>ASK</span> <br /> <span className='pl-2 text-lg leading-0.5 tracking-tighter'>CREATIONS</span>
            </p>
            
            {/* Scroll Indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2 pointer-events-none mt-1">
              <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Scroll to Explore</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>

            <div className="w-1/3 flex justify-end">
              <Link
                to="/contact"
                className="pointer-events-auto bg-white px-8 py-2.5 sm:px-10 sm:py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
