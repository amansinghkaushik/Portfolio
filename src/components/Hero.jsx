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

const frameModules = import.meta.glob('../assets/Video-sequence/*.jpg', { eager: true, query: '?url', import: 'default' })
const frames = Object.keys(frameModules).sort().map(key => frameModules[key])

gsap.registerPlugin(ScrollTrigger)

function Hero({ isPreloaderFinished = true }) {
  const sectionRef = useRef(null)
  const welcomeRef = useRef(null)
  const basedRef = useRef(null)
  const paragraphRef = useRef(null)
  const firstSceneMetaRef = useRef(null)
  const passionTextRef = useRef(null)
  const passionTextMobileRef = useRef(null);
  const passionAnimRef = useRef(null);
  const trustBadgeRef = useRef(null);
  const portfolioWordRefs = useRef([])
  const designWordRefs = useRef([])
  const transitionTextRef = useRef(null)
  const bentoRef = useRef(null)
  const sequenceCanvasRef = useRef(null)
  const sequenceImagesRef = useRef([])
  const [progress, setProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isToolsHovered, setIsToolsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
  const bentoStart = 0.72

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

  const isImageExpanded = progress >= imageExpandStart
  const isSocialVisible = progress >= socialStart
  const isBentoVisible = progress >= bentoStart
  const bentoScrollProgress = clamp((progress - bentoStart) / (1 - bentoStart), 0, 1)
  const bottomBarDismissStart = Math.max(shapeRiseStart, shapeRiseEnd - 0.05)
  const bottomBarDismissProgress = clamp((progress - bottomBarDismissStart) / 0.008, 0, 1)
  const bottomBarTranslateY = isImageExpanded ? 100 : bottomBarDismissProgress * 100
  const bottomBarOpacity = isImageExpanded ? 0 : 1 - bottomBarDismissProgress
  const textOpacityProg = clamp((progress - textFadeInStart) / (textFadeInEnd - textFadeInStart), 0, 1)
  const textFadeOutProg = clamp((progress - textFadeOutStart) / (textFadeOutEnd - textFadeOutStart), 0, 1)
  const isTextVisible = progress >= textFadeInStart && progress < textFadeOutEnd
  const textOpacity = isTextVisible ? (progress > textFadeOutStart ? 1 - textFadeOutProg : textOpacityProg) : 0

  const isVideoVisible = progress >= videoStart && progress < videoFadeOutEnd
  const videoOpacityProg = clamp((progress - videoStart) / (videoScrubEnd - videoStart), 0, 1)
  const videoFadeOutProg = clamp((progress - videoFadeOutStart) / (videoFadeOutEnd - videoFadeOutStart), 0, 1)
  const videoOpacity = isVideoVisible ? (progress > videoFadeOutStart ? 1 - videoFadeOutProg : videoOpacityProg) : 0

  const scrubRatio = clamp((progress - videoStart) / (videoFadeOutStart - videoStart), 0, 1)
  const totalFrames = frames.length

  // Preload frames to keep scrolling buttery smooth
  useLayoutEffect(() => {
    sequenceImagesRef.current = frames.map(src => {
      const img = new Image()
      img.src = src
      return img
    })
  }, [])

  // High-performance canvas paint
  useLayoutEffect(() => {
    const canvas = sequenceCanvasRef.current
    if (!canvas || frames.length === 0) return
    const ctx = canvas.getContext('2d', { alpha: false }) // Optimize for opaque images
    
    // Only process drawing if sequence is within view bounds
    const isSequenceVisible = progress >= videoStart && progress < videoFadeOutEnd
    if (!isSequenceVisible) return

    const currentFrameIndex = Math.min(Math.max(Math.floor(scrubRatio * totalFrames), 0), totalFrames - 1)
    const img = sequenceImagesRef.current[currentFrameIndex]

    if (img && img.complete) {
      const { clientWidth, clientHeight } = canvas
      
      // Handle high DPI resizing
      const dpr = window.devicePixelRatio || 1
      if (canvas.width !== clientWidth * dpr || canvas.height !== clientHeight * dpr) {
        canvas.width = clientWidth * dpr
        canvas.height = clientHeight * dpr
        ctx.scale(dpr, dpr)
      }

      // Object-cover calculation
      const canvasRatio = clientWidth / clientHeight
      const imgRatio = img.width / img.height
      let drawWidth = clientWidth
      let drawHeight = clientHeight
      let offsetX = 0
      let offsetY = 0

      if (canvasRatio > imgRatio) {
        drawHeight = clientWidth / imgRatio
        offsetY = (clientHeight - drawHeight) / 2
      } else {
        drawWidth = clientHeight * imgRatio
        offsetX = (clientWidth - drawWidth) / 2
      }

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
    }
  }, [progress, scrubRatio, videoStart, videoFadeOutEnd])
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

  // Trigger Passion text reveal animation on load
  useEffect(() => {
    if (!isPreloaderFinished) return;
    
    const ctx = gsap.context(() => {
      const desktopWords = passionTextRef.current?.querySelectorAll('.passion-word');
      const mobileWords = passionTextMobileRef.current?.querySelectorAll('.passion-word');

      passionAnimRef.current = gsap.timeline({ paused: true });

      const animationProps = {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        stagger: 0.2, // Noticeable slight delay between each word
        ease: "power3.inOut"
      };

      if (desktopWords && desktopWords.length > 0) {
        passionAnimRef.current.to(desktopWords, animationProps, 0);
      }
      if (mobileWords && mobileWords.length > 0) {
        passionAnimRef.current.to(mobileWords, animationProps, 0);
      }
      
      if (trustBadgeRef.current) {
        passionAnimRef.current.to(trustBadgeRef.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.inOut' }, 0.4);
      }

      // Play the animation on load with the delay
      setTimeout(() => {
        if (passionAnimRef.current) passionAnimRef.current.play();
      }, 200);
    });
    return () => ctx.revert();
  }, [isPreloaderFinished]);

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

    if (passionTextRef.current) {
      gsap.set(passionTextRef.current, {
        y: -18 * fadeProgress,
        opacity: 0.9 * (1 - fadeProgress),
      })
      if (passionAnimRef.current) {
        // Trigger reverse to gracefully stagger out when scrolling down
        if (fadeProgress > 0.02) {
          passionAnimRef.current.reverse();
        } else {
          passionAnimRef.current.play();
        }
      }
    }

    if (passionTextMobileRef.current) {
      gsap.set(passionTextMobileRef.current, {
        y: -18 * fadeProgress,
        opacity: 0.9 * (1 - fadeProgress),
      })
    }

    portfolioWordRefs.current.forEach((element, index) => {
      if (!element) return
      const wordProgress = getPortfolioWordProgress(index)
      gsap.set(element, {
        y: 400 * wordProgress,
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
    if (!sectionRef.current || isMobile) return

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

  useEffect(() => {
    if (!isMobile || !bentoRef.current) return

    const ctx = gsap.context(() => {
      const cards = bentoRef.current.querySelectorAll('.bento-animate')
      cards.forEach((el, i) => {
        gsap.set(el, { opacity: 0, y: 30 })
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: 0.08 * i,
              ease: 'power2.out',
            })
          },
        })
      })
    }, bentoRef)

    return () => ctx.revert()
  }, [isMobile])

  // ── Mobile: Animated scenes then static bento below ──────────────────────
  if (isMobile) {
    return (
      <>
        {/* ── Scroll-driven scenes section (portrait, PORTFOLIO text, video, overlays) ── */}
        <section
          id="hero"
          ref={sectionRef}
          className="relative z-0 h-[500vh] w-full"
          style={{ backgroundColor: '#ececec' }}
        >
          <div
            className={`sticky top-[56px] flex flex-col h-[calc(100vh-56px)] w-full overflow-hidden bg-[#ececec] ${transitionClass} ${isSocialVisible ? 'px-4 py-4' : 'px-0 py-0'}`}
          >
            {/* Black circle */}
            <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
              <div
                className="absolute inset-0 bg-black"
                style={{
                  clipPath: `circle(${shapeRadiusPercent}% at 50% 50%)`,
                  WebkitClipPath: `circle(${shapeRadiusPercent}% at 50% 50%)`,
                }}
              />
            </div>

            {/* PORTFOLIO background text & 3-Column Header */}
            <div className={`pointer-events-none absolute inset-0 z-0 w-full h-full transition-opacity duration-1000 ease-out`}>
              {/* Combined Wrapper for 3-Column Text & PORTFOLIO Text */}
              <div className="relative w-full h-[100vh] pt-[120px] pb-[80px] flex flex-col justify-between items-center pointer-events-none z-10">
                
                {/* 3-Column Meta Info Wrapper */}
                <div ref={firstSceneMetaRef} className="w-full flex flex-col sm:flex-row justify-between items-start z-20 opacity-80 px-6 sm:px-[8vw] gap-4 sm:gap-0">
                  <div className="flex items-start gap-1 max-w-[100px] lg:max-w-[200px]">
                    <span className="text-sm font-extrabold text-[#f12020] mt-[-1px]">›</span>
                    <div className="flex flex-col gap-1 text-left">
                      <p className="font-extrabold text-[#111] text-[9px] uppercase tracking-wider">WEB DESIGNER / UI/UX</p>
                      <p className="text-gray-500 font-medium text-[8px] whitespace-nowrap lg:whitespace-normal">Crafting immersive functional digital experiences.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1 max-w-[100px] lg:max-w-[200px] flex">
                    <span className="text-sm font-extrabold text-[#f12020] mt-[-1px]">›</span>
                    <div className="flex flex-col gap-1 text-left">
                      <p className="font-extrabold text-[#111] text-[9px] uppercase tracking-wider">BASED IN INDIA</p>
                      <p className="text-gray-500 font-medium text-[8px] whitespace-nowrap lg:whitespace-normal">Delivering scale and quality globally.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1 max-w-[100px] lg:max-w-[200px] pointer-events-auto">
                    <span className="text-sm font-extrabold text-[#f12020] mt-[-1px] pointer-events-none">›</span>
                    <div className="flex flex-col gap-3 text-left">
                      <div className="flex flex-col gap-1 pointer-events-none">
                        <p className="font-extrabold text-[#111] text-[9px] uppercase tracking-wider">7+ HACKATHONS WON</p>
                        <p className="text-gray-500 font-medium text-[8px] whitespace-nowrap lg:whitespace-normal">Winning solutions built in record time.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Solid Filled PORTFOLIO Text */}
                <div className="w-full flex flex-col items-center overflow-visible">
                  <motion.div
                    className="font-condenso select-none text-[400px] sm:text-[90vw] md:text-[600px] lg:text-[700px] xl:text-[700px] 2xl:text-[750px] uppercase tracking-[0.001em] text-neutral-300 flex flex-col justify-center items-center text-center w-full translate-y-[10%] sm:translate-y-[22%]"
                    style={{
                      lineHeight: 0.75,
                      paddingTop: '0.01em',
                      paddingBottom: '0.01em'
                    }}
                  >
                    {portfolioWordGroups.map((group, index) => (
                      <motion.span key={group} ref={(el) => { portfolioWordRefs.current[index] = el }} className="block">
                        {group}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Portrait area — fills all remaining height */}
            <div className={`relative z-10 flex-1 flex flex-col overflow-hidden ${transitionClass} ${isSocialVisible ? 'rounded-xl' : 'rounded-none'}`}>
              <div className={`relative flex-1 h-full origin-bottom overflow-hidden ${transitionClass} ${isSocialVisible ? 'bg-[#d8d6d8] rounded-xl mb-3' : 'bg-transparent rounded-none mb-0'}`}>
                <img
                  src={amanBg}
                  alt="Portrait"
                  className={`pointer-events-none absolute bottom-0 left-1/2 z-20 h-[65vh] w-auto max-w-none -translate-x-1/2 origin-bottom object-cover ${isImageExpanded ? 'scale-100' : 'scale-[0.85]'}`}
                />
                
                {/* Passion Text Mobile Inside Portrait Wrapper */}
                <div ref={passionTextMobileRef} className="absolute right-2 sm:right-10 bottom-16 sm:bottom-20 z-30 flex flex-col items-start opacity-90 lg:hidden pointer-events-none">
                  <div className="font-clash-display font-bold text-[50px] sm:text-[70px] tracking-tighter uppercase text-[#111] flex flex-col items-start" style={{ lineHeight: 0.85 }}>
                    <div className="passion-word" style={{ clipPath: 'inset(0% 100% 0% 0%)' }}>Passion</div>
                    <div className="passion-word" style={{ clipPath: 'inset(0% 100% 0% 0%)' }}>Ambition</div>
                    <div className="passion-word" style={{ clipPath: 'inset(0% 100% 0% 0%)' }}>Vision</div>
                  </div>
                </div>

                {/* Video scrub */}
                <div
                  className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-end justify-center"
                  style={{ opacity: videoOpacity }}
                >
                  <canvas
                    ref={isMobile ? sequenceCanvasRef : null}
                    className="h-full opacity-80 w-full object-cover origin-bottom"
                    style={{ transform: 'rotateY(180deg) translateZ(0)', willChange: 'transform' }}
                  />
                </div>
              </div>

              {/* Mid-scroll text overlay */}
              <div
                className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-center"
                style={{ opacity: textOpacity }}
              >
                <div className="absolute left-4 bottom-16 max-w-[260px] text-left text-white">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/70">Now Creating</p>
                  <p className="mt-2 text-base leading-relaxed text-white/90">Ideas into campaigns, interfaces, and motion stories that feel handcrafted and unforgettable.</p>
                </div>
                <div className="absolute top-8 left-4 text-left text-white max-w-[260px]">
                  <h1 className="text-6xl font-regular leading-8 tracking-tighter">Built</h1>
                  <p className="pl-4 text-4xl font-serif font-extralight italic tracking-tighter text-white/95">from instinct,</p>
                </div>
                <div className="absolute top-40 right-4 max-w-fit text-right text-white">
                  <p className="text-4xl leading-[1.2] font-medium text-white/95 mb-1">refined by</p>
                  <h1 className="text-6xl font-regular italic font-serif tracking-tight">
                    {['D', 'e', 's', 'i', 'g', 'n', '.'].map((char, index) => (
                      <span key={index} ref={(el) => designWordRefs.current[index] = el} className="inline-block">{char}</span>
                    ))}
                  </h1>
                </div>
              </div>

              {/* Name card */}
              <motion.div
                initial={false}
                animate={isSocialVisible ? { height: 'auto', y: 0, opacity: 1 } : { height: 0, y: -28, opacity: 0 }}
                transition={{ duration: isReady ? 1.3 : 0, ease: [0.16, 1, 0.3, 1] }}
                className={isSocialVisible ? 'overflow-hidden' : 'pointer-events-none overflow-hidden'}
              >
                <div className="flex items-center justify-center rounded-xl bg-[#d8d3e9] px-6 py-7 text-[#43396d]">
                  <p className="text-3xl font-light font-serif italic tracking-wide">Aman Singh Kaushik</p>
                </div>
              </motion.div>
            </div>

            {/* Bottom bar */}
            <div
              className="absolute inset-x-0 bottom-0 z-40 w-full bg-black px-4 pt-1 pb-2 text-white transition-transform duration-300 ease-out"
              style={{ transform: `translateY(${bottomBarTranslateY}%)`, opacity: bottomBarOpacity }}
            >
              <div className="flex items-center justify-between py-1">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] leading-[0.1] flex-1">
                  <span className="font-gochi-hand text-2xl">ASK</span><br />
                  <span className="pl-1 text-sm leading-0.5 tracking-tighter">CREATIONS</span>
                </p>
                <Link to="/contact" className="bg-white px-5 py-2.5 text-[11px] font-semibold text-black hover:bg-zinc-200 whitespace-nowrap block text-center">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Static bento section, just scrolls normally ─────────────────── */}
        <div ref={bentoRef} className="relative z-10 -mt-[100vh] md:-mt-0 bg-black flex flex-col gap-4 md:grid md:grid-cols-3 md:grid-rows-6 md:gap-4 px-4 pt-4 pb-12">

          {/* CTA – yellow */}
          <div className="bento-animate relative overflow-hidden rounded-xl bg-[#ece868] p-5 text-[#101010] flex flex-col justify-between min-h-[160px] md:col-span-1 md:row-span-2 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
            <div className="max-w-[240px]">
              <p className="font-clash-display text-[1.1rem] md:text-[1.75rem] md:leading-[1.1] leading-tight tracking-[-0.02em] font-medium">
                Got an <span className="italic font-serif font-medium">idea</span>? Don't let it rest.
              </p>
              <p className="mt-2 font-clash-grotesk text-base md:text-lg text-black/80">Let's start working on it.</p>
            </div>
            <Link to="/contact" className="mt-4 ml-auto flex w-fit items-center rounded-lg gap-1 border border-black/40 bg-[#efedb7] px-3 py-2 text-xs font-medium text-black/70">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Get in Touch
            </Link>
            <img src={arrowIcon} alt="" className="absolute bottom-5 left-5 h-12 w-12 opacity-80" />
          </div>

          {/* About – blue */}
          <div className="bento-animate rounded-xl bg-[#eaf2ff] p-5 md:p-7 text-[#12305f] flex flex-col md:flex-row gap-4 md:gap-8 md:items-center md:col-span-2 md:row-span-2 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
            <p className="font-clash-grotesk text-lg md:text-[1.35rem] flex-1 leading-[1.4] text-[#143467]">
              As an engineering student and digital designer, I specialize in crafting meaningful UI/UX experiences, visual identities, and logo systems.
            </p>
            <img className="h-28 w-28 md:h-48 md:w-48 object-contain transition-transform duration-700" src={astrick} alt="Asterisk" />
          </div>

          {/* Tools + Social column */}
          <div className="bento-animate flex flex-col gap-4 md:gap-3 md:row-span-2 md:col-span-1">
            {/* Tools strip */}
            <div className="relative flex-1 overflow-hidden rounded-xl bg-[#72e6cc] px-4 py-4 md:py-0 flex items-center min-h-[80px] md:min-h-[120px]">
              <motion.div
                className="flex w-max flex-nowrap items-center gap-8 md:gap-10"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 15, ease: 'linear', repeat: Infinity }}
              >
                {[...toolIcons, ...toolIcons, ...toolIcons].map((icon, index) => (
                  <div key={`tool-mobile-${icon.alt}-${index}`} className="shrink-0 flex items-center justify-center">
                    <img src={icon.src} alt={icon.alt} className="h-12 w-12 md:h-14 md:w-14 rounded-xl md:rounded-2xl object-contain drop-shadow-sm md:drop-shadow-md" />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Social icons */}
            <div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#7cc4ff] py-4">
              {communityIcons.map((icon) => (
                <a key={icon.alt} href={icon.link} target="_blank" rel="noopener noreferrer" className="grid h-14 w-14 place-items-center transition-transform duration-200 hover:scale-125 hover:-translate-y-1">
                  <img src={icon.src} alt={icon.alt} className="h-10 w-10 rounded-2xl object-contain shadow-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bento-animate rounded-xl bg-[#eaf2ff] py-6 px-6 md:p-4 md:col-span-1 md:row-span-2 transition-colors duration-300 hover:bg-white hover:shadow-lg flex items-center justify-center">
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 md:grid-cols-2 md:grid-rows-2 md:gap-x-6 md:gap-y-6 h-full w-full max-w-[480px] md:px-4 md:py-4">
              {[['1+', 'Years experience'], ['3+', 'Projects completed'], ['3+', 'Happy clients'], ['98%', 'On-time delivery']].map(([num, label]) => (
                <div key={label} className="group flex flex-col items-start justify-center text-left transition-transform duration-300 hover:scale-105 hover:translate-x-1">
                  <p className="font-clash-display text-2xl md:text-3xl font-semibold tracking-tight">{num}</p>
                  <p className="mt-1 text-sm font-medium leading-[1.1] text-[#5c6375]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What I Offer */}
          <div className="bento-animate rounded-xl bg-[#eaf2ff] p-5 text-[#12305f] md:col-span-1 md:col-start-3 md:row-span-4 md:row-start-3 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4 md:px-4 md:py-3">
              <p className="text-xl md:text-3xl font-light leading-tight tracking-wider font-serif italic text-[#143467]">What <br className="hidden md:inline" />I Offer</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 256 256" fill="none" className="md:h-[4.75rem] md:w-[4.75rem] shrink-0" aria-hidden="true">
                <path d="M152 70.059L201.539 20.519L235.48 54.461L185.941 104H256V152H185.941L235.48 201.539L201.539 235.48L152 185.941V256H104V185.941L54.46 235.48L20.52 201.539L70.059 152H0V104H70.059L20.519 54.46L54.461 20.52L104 70.059V0H152Z" fill="rgb(0,0,84)" />
              </svg>
            </div>
            <div className="flex flex-col gap-1 md:gap-1.5">
              {[['BR', 'Branding'], ['UX', 'UI/UX Design'], ['IL', 'Illustration'], ['WD', 'Web Development'], ['VI', 'Visual Identity']].map(([code, label]) => (
                <div key={code} className="flex items-center gap-3 rounded-[14px] px-2 md:px-3 py-2 md:py-3">
                  <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#bfdbfe] text-xs font-semibold text-[#1e3a8a]">{code}</span>
                  <p className="text-base md:text-[1.15rem] font-medium text-[#143467]">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects mockup */}
          <a href="#work" className="bento-animate group relative overflow-hidden rounded-xl block min-h-[220px] md:min-h-[80px] cursor-pointer md:col-span-2 md:row-span-2 transition-shadow duration-300 hover:shadow-xl">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-110" style={{ backgroundImage: `url(${taglineMockup})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
            <div className="absolute bottom-5 right-6 flex items-center gap-3 md:gap-4 md:translate-y-4 md:opacity-0 md:transition-all md:duration-500 md:ease-out md:group-hover:translate-y-0 md:group-hover:opacity-100">
              <p className="text-right font-clash-display text-3xl md:text-4xl font-semibold text-white">Projects</p>
              <img src={arrowIcon} alt="" className="h-8 w-8 md:h-10 md:w-10 brightness-0 rotate-90 invert transition-transform duration-500 group-hover:translate-x-2" />
            </div>
          </a>
        </div>
      </>
    )
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-0 h-[850vh] w-full"
      style={{ backgroundColor: '#ececec' }}
    >

      <div
        className={`sticky top-[56px] w-full flex items-center justify-center ${transitionClass} ${isSocialVisible ? 'px-[30px] py-[30px]' : 'px-0 py-0'} ${isBentoVisible ? 'h-auto overflow-visible lg:h-[calc(100dvh-56px)] lg:overflow-hidden' : 'h-[calc(100dvh-56px)] overflow-hidden'}`}
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

        <div className={`pointer-events-none absolute inset-0 z-0 w-full h-full transition-opacity duration-1000 delay-[600ms] ease-out ${!isPreloaderFinished ? 'opacity-0' : 'opacity-100'}`}>
          {/* Combined Wrapper for 3-Column Text & PORTFOLIO Text */}
          <div className="relative w-full h-[100vh] pt-[150px] xl:pt-[100px] pb-[80px] flex justify-center items-center pointer-events-none z-10 w-full">
            <div className="h-full w-full flex flex-col justify-between items-center xl:w-fit px-6 lg:px-[6vw] xl:px-0">
              {/* Top 3-Column Meta Info Wrapper */}
              <div ref={firstSceneMetaRef} className="w-full flex flex-wrap xl:flex-nowrap justify-between opacity-80 z-20 gap-y-10">
              <div className="flex items-start gap-2 max-w-[260px] pointer-events-auto">
                <span className="text-2xl font-extrabold text-[#f12020] mt-[-2px] pointer-events-none">›</span>
                <div className="flex flex-col gap-5 text-left">
                  <div className="flex flex-col gap-1.5 pointer-events-none">
                    <p className="font-extrabold text-[#111] text-lg lg:text-base uppercase tracking-wider">7+ HACKATHONS WINNER</p>
                    <p className="text-gray-500 font-medium text-[10px] lg:text-xs">Proven track record of building innovative solutions in record time.</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 max-w-[260px]">
                <span className="text-2xl font-extrabold text-[#f12020] mt-[-2px]">›</span>
                <div className="flex flex-col gap-1.5 text-left">
                  <p className="font-extrabold text-[#111] text-lg lg:text-base uppercase tracking-wider">WEB DESIGNER / UI/UX</p>
                  <p className="text-gray-500 font-medium text-[10px] lg:text-xs">Crafting immersive and functional digital aesthetics for modern brands.</p>
                </div>
              </div>
              <div className="flex items-start gap-2 max-w-[260px]">
                <span className="text-2xl font-extrabold text-[#f12020] mt-[-2px]">›</span>
                <div className="flex flex-col gap-1.5 text-left">
                  <p className="font-extrabold text-[#111] text-lg lg:text-base uppercase tracking-wider">BASED IN INDIA</p>
                  <p className="text-gray-500 font-medium text-[10px] lg:text-xs">Delivering global scale products built with passion, precision, and artistry.</p>
                </div>
              </div>
            </div>

            {/* Solid Filled PORTFOLIO Text */}
            <div className="w-fit flex flex-col items-center overflow-visible px-4 lg:px-0">
              <motion.div
                className="font-condenso select-none text-[110vw] sm:text-[90vw] md:text-[200px] lg:text-[750px] xl:text-[700px] 2xl:text-[750px] uppercase tracking-[0.001em] text-neutral-300 flex flex-col xl:block justify-center items-center text-center w-full translate-y-[15%] xl:translate-y-[20%]"
                style={{
                  lineHeight: 0.75,
                  paddingTop: '0.01em',
                  paddingBottom: '0.01em',
                }}
              >
                {portfolioWordGroups.map((group, index) => (
                  <motion.span
                    key={group}
                    ref={(element) => {
                      portfolioWordRefs.current[index] = element
                    }}
                    className="block xl:inline-block"
                  >
                    {group}
                  </motion.span>
              ))}
              </motion.div>
            </div>
          </div>

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

          {/* <div
            ref={firstSceneMetaRef}
            className="absolute top-24 left-4 lg:top-auto lg:bottom-36 lg:left-auto lg:right-48 z-30 flex lg:flex flex-col items-start lg:items-end gap-6 lg:gap-10 opacity-90 hidden sm:flex"
          >
            <div className="grid grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-6 lg:gap-y-12 max-w-[320px] lg:max-w-[550px] text-left lg:text-right"> */}
              {/* Left Column */}
              {/* <div className="flex flex-col justify-between gap-2">
                <p className="text-sm font-extrabold uppercase leading-[1.5] tracking-wide text-[#333]">
                  Web and Mobile / UX<br />And UI / Branding
                </p>
                <p className="text-sm font-regular uppercase leading-[1] tracking-wide text-[#444]">
                  Currently available<br />for freelance<br />worldwide
                </p>
              </div> */}

              {/* Right Column */}
              {/* <div className="flex flex-col justify-between gap-2">
                <p className="text-sm font-extrabold uppercase leading-[1.5] tracking-wide text-[#333]">
                  Based in India
                </p>
                <p className="text-sm font-regular uppercase leading-[1] tracking-wide text-[#444]">
                  Born in<br />Uttar Pradesh
                </p>
              </div> */}
            {/* </div> */}

            {/* Achievement Capsule */}
            {/* <div className="flex items-center gap-2.5 rounded-full border border-black/10 bg-black/5 px-5 py-2 backdrop-blur-md">
              <span className="text-base drop-shadow-sm">🏆</span>
              <p className="font-serif italic text-base font-semibold text-[#444] tracking-wide">
                7+ times hackathon winner
              </p>
            </div> */}
          {/* </div> */}

          {/* Testimonial/info block below meta grid */}
          {/* <div className="absolute bottom-5 left-4 lg:bottom-56 lg:left-48 z-30 flex items-center gap-3">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=128&q=80" alt="Client 1" className="h-8 w-8 lg:h-10 lg:w-10 rounded-full border-2 border-white object-cover shadow-md bg-gray-200 z-20" />
              <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=128&q=80" alt="Client 3" className="h-8 w-8 lg:h-10 lg:w-10 rounded-full border-2 border-white object-cover shadow-md bg-gray-200 z-10" />
              <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=128&q=80" alt="Client 2" className="h-8 w-8 lg:h-10 lg:w-10 rounded-full border-2 border-white object-cover shadow-md bg-gray-200 z-0" />
            </div>
            <div className="ml-2 text-[10px] lg:text-xs max-w-40 lg:max-w-48 font-normal text-[#444]">
              Trusted by over <span className="font-bold text-black">many happy clients</span> <span className="font-normal hidden lg:inline">across residential and commercial projects.</span>
            </div>
          </div> */}
        </div>
        <div className="relative flex h-full w-full max-w-[1920px] 2xl:max-h-[1080px] 3xl:aspect-video mx-auto flex-col gap-3 lg:flex-row">
          <div
            className={`hero-profile-wrapper relative z-10 flex lg:min-h-[520px] flex-col overflow-hidden ${transitionClass}
              ${isBentoVisible ? 'flex-none lg:flex-[0_0_33.333%] lg:h-auto lg:min-h-[520px]' : 'flex-1 lg:flex-[0_0_100%]'
              }`}
          >
            <div
              className={`relative flex-1 origin-bottom overflow-hidden transition-all duration-[1200ms] delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${isPreloaderFinished ? 'scale-100 opacity-100' : 'scale-[0.2] opacity-0'} ${transitionClass} ${isSocialVisible ? 'bg-[#d8d6d8]' : 'bg-transparent'
                } ${isSocialVisible ? 'rounded-xl' : 'rounded-none'
                } ${isSocialVisible ? 'mb-3' : 'mb-0'
                }`}
            >
              <img
                src={amanBg}
                alt="Portrait"
                className={`pointer-events-none absolute bottom-0 left-1/2 z-20 h-[55vh] w-auto max-w-none lg:h-full lg:max-h-none lg:w-auto -translate-x-1/2 origin-bottom object-cover ${isImageExpanded ? 'scale-100 lg:scale-[0.92]' : 'scale-[0.85] lg:scale-[0.75]'
                  }`}
              />

              {/* Passion Text Desktop Inside Portrait Wrapper */}
              <div ref={passionTextRef} className="absolute left-[50%] ml-[140px] lg:ml-[180px] xl:ml-[220px] 2xl:ml-[260px] bottom-24 lg:bottom-24 z-30 hidden lg:flex flex-col items-start opacity-90 transition-opacity duration-500 pointer-events-none">
                <div className="font-clash-display font-bold text-[70px] lg:text-[85px] xl:text-[100px] 2xl:text-[120px] tracking-tighter uppercase text-[#111] flex flex-col items-start" style={{ lineHeight: 0.85 }}>
                  <div className="passion-word" style={{ clipPath: 'inset(0% 100% 0% 0%)' }}>Passion</div>
                  <div className="passion-word" style={{ clipPath: 'inset(0% 100% 0% 0%)' }}>Ambition</div>
                  <div className="passion-word" style={{ clipPath: 'inset(0% 100% 0% 0%)' }}>Vision</div>
                </div>
              </div>

              {/* Trust Badge Desktop */}
              {/* <div ref={trustBadgeRef} className="absolute right-[60%] mr-[140px] lg:mr-[180px] xl:mr-[220px] 2xl:mr-[260px] bottom-24 z-30 hidden lg:flex flex-col items-start opacity-0 translate-y-8 pointer-events-auto">
                 <div className="bg-[#111]/95 backdrop-blur-xl text-white p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-3 w-[260px] hover:-translate-y-2 transition-transform duration-500 cursor-default">
                    <div className="flex items-center gap-3">
                       <div className="flex -space-x-2">
                         <div className="w-9 h-9 rounded-full border-2 border-[#111] bg-gray-200 overflow-hidden shrink-0">
                           <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Client" className="w-full h-full object-cover" />
                         </div>
                         <div className="w-9 h-9 rounded-full border-2 border-[#111] bg-gray-300 overflow-hidden shrink-0">
                           <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Client" className="w-full h-full object-cover" />
                         </div>
                         <div className="w-9 h-9 rounded-full border-2 border-[#111] bg-gray-400 overflow-hidden shrink-0">
                           <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Client" className="w-full h-full object-cover" />
                         </div>
                       </div>
                       <div className="flex flex-col justify-center">
                         <div className="flex text-yellow-400">
                           {[1,2,3,4,5].map(i => <svg key={i} className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                         </div>
                         <span className="text-[10px] uppercase tracking-wider text-gray-300 font-medium mt-0.5">5.0 Client Rating</span>
                       </div>
                    </div>
                    <p className="text-sm font-medium leading-snug text-gray-200">
                      Delivering exceptional digital experiences for global brands.
                    </p>
                 </div>
              </div> */}

              <div
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden flex items-end justify-center"
                style={{ opacity: videoOpacity }}
              >
                  <canvas
                    ref={!isMobile ? sequenceCanvasRef : null}
                    className="max-h-screen lg:h-screen max-w-6xl opacity-80 w-full origin-bottom"
                    style={{ transform: 'rotateY(180deg) translateZ(0)', willChange: 'transform' }}
                  />
              </div>
            </div>

            <div
              ref={transitionTextRef}
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-center"
              style={{ opacity: textOpacity }}
            >
              <div className="absolute left-4 lg:left-28 bottom-16 lg:bottom-16 max-w-[280px] lg:max-w-[360px] text-left text-white">
                <p className="text-xs lg:text-sm uppercase tracking-[0.24em] text-white/70">Now Creating</p>
                <p className="mt-2 lg:mt-3 text-base lg:text-lg leading-relaxed text-white/90">
                  Ideas into campaigns, interfaces, and motion stories that feel handcrafted and unforgettable.
                </p>
              </div>
              <div className="absolute top-8 left-4 lg:top-16 lg:left-28 max-w-screen text-left text-white max-w-[280px] lg:max-w-none">
                <h1 className="text-4xl lg:text-8xl font-regular leading-8 lg:leading-14 tracking-tighter sm:text-8xl">Built</h1>
                <p className="pl-4 lg:pl-16 text-xl lg:text-8xl font-serif font-extralight italic tracking-tighter text-white/95 sm:text-8xl">from instinct,</p>
              </div>
              <div className="absolute bottom-40 right-4 lg:bottom-16 lg:right-28 max-w-fit text-right text-white">
                <p className="text-xl lg:text-8xl leading-[1.2] font-medium text-white/95 sm:text-4xl mb-1 lg:mb-0">refined by</p>
                <h1 className="text-4xl lg:text-8xl font-regular italic font-serif tracking-tight sm:text-9xl">
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

          <div className={`relative z-20 lg:flex-[0_0_66.666%] transition-all duration-[1200ms] delay-[300ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isBentoVisible ? 'opacity-100' : 'opacity-0 max-h-0 lg:max-h-none pointer-events-none'} ${!isPreloaderFinished ? 'translate-y-12 opacity-0' : ''}`}>
            <div
              className={`hero-content-grid flex flex-col gap-4 lg:grid lg:gap-4 lg:grid-cols-3 lg:grid-rows-6 px-2 lg:px-0 pb-8 lg:pb-0 ${transitionClass} ${isBentoVisible
                ? 'translate-y-0 h-max lg:h-full lg:translate-x-0'
                : 'pointer-events-none translate-y-4 lg:translate-x-[-6%]'
                }`}
            >
              <div className="group col-span-1 lg:col-span-1 relative overflow-hidden rounded-xl bg-[#ece868] p-3 lg:p-6 text-[#101010] row-span-2 lg:row-span-2 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg flex flex-col justify-between">
                <div className="max-w-[240px]">
                  <p className="font-clash-display text-[1rem] leading-tight lg:text-[1.75rem] lg:leading-[1.1] tracking-[-0.02em] font-medium">
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

              <div className="group max-w-6xl relative overflow-hidden flex flex-col sm:flex-row gap-4 lg:gap-8 items-start sm:items-center rounded-xl bg-[#eaf2ff] p-5 lg:p-7 text-[#12305f] lg:col-span-2 lg:row-span-2 transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg">
                <p className="font-clash-grotesk flex-1 text-left text-lg lg:text-[1.35rem] leading-[1.4] text-[#143467]">
                  As an engineering student and digital designer, I specialize in crafting meaningful
                  UI/UX experiences, visual identities, and logo systems.
                </p>
                <img className='h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 transition-transform duration-700 object-contain' src={astrick} alt="Astrick" />
              </div>
              <div className="flex h-full min-h-0 flex-col gap-2 lg:gap-3 row-span-1 lg:row-span-2 col-span-1 lg:col-span-1">
                <div className="relative flex-1 overflow-hidden rounded-xl bg-[#72e6cc] px-4 flex items-center min-h-[100px] lg:min-h-[120px]">
                  <motion.div
                    className="flex w-max flex-nowrap items-center gap-5"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
                  >
                    {[...toolIcons, ...toolIcons, ...toolIcons].map((icon, index) => (
                      <div key={`tool-desktop-${icon.alt}-${index}`} className="shrink-0 flex items-center justify-center">
                        <img src={icon.src} alt={icon.alt} className="h-10 w-10 lg:h-14 lg:w-14 rounded-2xl object-contain drop-shadow-md" />
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

              <div className="flex items-center justify-center rounded-xl bg-[#eaf2ff] p-2 lg:p-4 text-[#101828] col-span-2 lg:col-span-1 row-span-1 lg:row-span-2 transition-colors hover:bg-white hover:shadow-lg">
                <div className="flex justify-between md:grid h-full w-full max-w-[480px] md:grid-cols-2 md:grid-rows-2 gap-[4px] lg:gap-x-6 lg:gap-y-6 px-1 lg:px-4 py-1 lg:py-4">
                  <div className="group flex h-full w-full flex-col items-start justify-center text-left transition-transform duration-300 hover:scale-105 hover:translate-x-1">
                    <p className="font-clash-display text-xl lg:text-3xl font-semibold tracking-tight">1+</p>
                    <p className="mt-1 text-[9px] md:text-sm font-medium leading-[1.1] text-[#5c6375]">Years<span className="hidden sm:inline"> experience</span></p>
                  </div>
                  <div className="group flex h-full w-full flex-col items-start justify-center text-left transition-transform duration-300 hover:scale-105 hover:translate-x-1">
                    <p className="font-clash-display text-xl lg:text-3xl font-semibold tracking-tight">3+</p>
                    <p className="mt-1 text-[9px] md:text-sm font-medium leading-[1.1] text-[#5c6375]">Projects<span className="hidden sm:inline"> completed</span></p>
                  </div>
                  <div className="group flex h-full w-full flex-col items-start justify-center text-left transition-transform duration-300 hover:scale-105 hover:translate-x-1 md:flex">
                    <p className="font-clash-display text-xl lg:text-3xl font-semibold tracking-tight">3+</p>
                    <p className="mt-1 text-[9px] md:text-sm font-medium leading-[1.1] text-[#5c6375]">Happy clients Worldwide</p>
                  </div>
                  <div className="group flex h-full w-full flex-col items-start justify-center text-left transition-transform duration-300 hover:scale-105 hover:translate-x-1 md:flex">
                    <p className="font-clash-display text-xl lg:text-3xl font-semibold tracking-tight">7+</p>
                    <p className="mt-1 text-[9px] md:text-sm font-medium leading-[1.1] text-[#5c6375]">Hackathon Winner</p>
                  </div>
                </div>
              </div>

              <div className="relative flex h-full min-h-[160px] lg:min-h-0 flex-col justify-between overflow-hidden rounded-xl bg-[#eaf2ff] p-4 text-[#12305f] lg:col-span-1 lg:col-start-3 lg:row-span-4 lg:row-start-3">
                <div className="flex items-center justify-between px-2 lg:px-4 py-2 lg:py-3">
                  <p className="mt-1 text-xl lg:text-3xl font-light leading-tight tracking-wider font-serif italic text-[#143467]">What <br /> I Offer</p>
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

              <a href="#work" className="group relative overflow-hidden rounded-xl col-span-1 lg:col-span-2 row-span-2 lg:row-span-2 cursor-pointer transition-shadow duration-300 hover:shadow-xl block min-h-[220px] lg:min-h-[80px]">
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
        </div>

        <div
          className={`absolute inset-x-0 bottom-0 z-50 w-full bg-black px-4 sm:px-[30px] pt-1 pb-2 sm:py-[10px] text-white pointer-events-auto transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            !isPreloaderFinished ? 'opacity-0 translate-y-full' 
            : progress > 0.05 ? 'opacity-0 translate-y-full' 
            : 'opacity-100 translate-y-0'
          }`}
        >
          <div className="flex items-center justify-between py-1 sm:py-[10px] relative">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] leading-[0.1] sm:text-base flex-1">
              <span className='font-gochi-hand text-2xl'>ASK</span> <br /> <span className='pl-1 text-sm sm:text-lg leading-0.5 tracking-tighter'>CREATIONS</span>
            </p>

            <div className="hidden lg:flex flex-1 justify-center items-center pointer-events-none">
              <div className="flex flex-col items-center gap-1 opacity-50">
                <div className="w-[1.5px] h-6 bg-white/20 relative overflow-hidden rounded-full">
                  <motion.div 
                    animate={{ y: [-10, 24] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-3 bg-white absolute top-0"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold mt-1">Scroll</span>
              </div>
            </div>

            <div className="flex-1 flex justify-end">
              <Link
                to="/contact"
                className="pointer-events-auto bg-white px-5 py-2.5 sm:px-10 sm:py-3 text-[11px] sm:text-sm font-semibold text-black transition-colors hover:bg-zinc-200 whitespace-nowrap block text-center"
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
