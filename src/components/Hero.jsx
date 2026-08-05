import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FaInstagram, FaFacebookF, FaGithub, FaEnvelope } from 'react-icons/fa'
import astrick from '../assets/astrikshape.png'
import taglineMockup from '../assets/taginmockup.png'

import heroImage from '../assets/HeroImage.png'
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
  const portfolioAnimRef = useRef(null)
  const designWordRefs = useRef([])
  const transitionTextRef = useRef(null)
  const bentoRef = useRef(null)
  const subtitleRef = useRef(null)
  const dShapeRef = useRef(null)
  const dShapeMobileRef = useRef(null)
  const socialRefs = useRef([])
  const ctaRef = useRef(null)
  const entranceAnimRef = useRef(null)
  const heroImageRef = useRef(null)
  const heroImageMobileRef = useRef(null)
  const bottomBlobRef = useRef(null)
  const bottomBlobMobileRef = useRef(null)
  const pillsRefs = useRef([])
  const heroImageWrapperRef = useRef(null)
  const heroImageBgRef = useRef(null)
  const aboutSceneRef = useRef(null)
  const aboutPillRef = useRef(null)
  const aboutHeadingLineRefs = useRef([])
  const aboutStatsRef = useRef(null)
  const aboutBadgeRef = useRef(null)
  const aboutLineLeftRef = useRef(null)
  const aboutLineRightRef = useRef(null)
  const aboutStatItemRefs = useRef([])
  const aboutTimelineRef = useRef(null)
  const aboutTriggered = useRef(false)
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
    // Force scroll to top on load to prevent reversed animations from browser scroll restoration
    window.scrollTo(0, 0)
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

  // ── Phase 1: Fade out all hero text, pills, CTA, social ──
  const firstSceneFadeStart = 0.05
  const firstSceneFadeEnd = 0.20

  const p2Start = 0.20
  const p2End = 0.40

  // ── Phase 3 trigger: auto-play once Phase 2 finishes ──
  const aboutTriggerPoint = 0.45
  const orangeStart = 0.35
  const orangeEnd = 0.45

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

  const bottomBarDismissStart = Math.max(firstSceneFadeStart, firstSceneFadeEnd - 0.03)
  const bottomBarDismissProgress = clamp((progress - bottomBarDismissStart) / 0.008, 0, 1)
  const bottomBarTranslateY = bottomBarDismissProgress * 100
  const bottomBarOpacity = 1 - bottomBarDismissProgress

  const askWordGroups = ['A', 'S', 'K']
  const creationsWordGroups = ['C', 'R', 'E', 'A', 'T', 'I', 'O', 'N', 'S']
  const portfolioWordGroups = [...askWordGroups, ...creationsWordGroups]
  const getPortfolioWordProgress = (index) => {
    // Last-to-first stagger: the right-most segment begins moving first.
    const orderFromLast = portfolioWordGroups.length - 1 - index
    const start = 0.01 + orderFromLast * 0.03
    const end = start + 0.11
    return clamp((progress - start) / (end - start), 0, 1)
  }

  const communityIcons = [
    { Icon: FaInstagram, alt: 'Instagram', link: 'https://www.instagram.com/aman_singh_kaushik_/' },
    { Icon: FaFacebookF, alt: 'Facebook', link: 'https://www.facebook.com/amansinghkaushik' },
    { Icon: FaGithub, alt: 'GitHub', link: 'https://github.com/amansinghkaushik' },
    { Icon: FaEnvelope, alt: 'Mail', link: 'mailto:aman@example.com' },
  ]


  const floatingPills = [
    { label: 'BRANDING', zIndex: 6, top: '50%', left: '30%', rotation: -15 },
    { label: 'PRODUCT DESIGN', zIndex: 6, top: '80%', left: '25%', rotation: -10 },
    { label: 'WEB DESIGN', zIndex: 6, top: '60%', left: '65%', rotation: 15 },
    { label: 'UI/UX DESIGN', zIndex: 6, top: '85%', left: '60%', rotation: 15 },
  ]

  // Trigger Passion text reveal animation on load
  useEffect(() => {
    if (!isPreloaderFinished) return;

    const ctx = gsap.context(() => {
      const desktopWords = passionTextRef.current?.querySelectorAll('.passion-word');
      const mobileWords = passionTextMobileRef.current?.querySelectorAll('.passion-word');

      passionAnimRef.current = gsap.timeline({ delay: 0.2 });

      const animationProps = {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 2.0,
        stagger: 0.25, // Noticeable slight delay between each word
        ease: "power3.inOut"
      };

      if (desktopWords && desktopWords.length > 0) {
        passionAnimRef.current.to(desktopWords, animationProps, 0);
      }
      if (mobileWords && mobileWords.length > 0) {
        passionAnimRef.current.to(mobileWords, animationProps, 0);
      }

      if (trustBadgeRef.current) {
        passionAnimRef.current.to(trustBadgeRef.current, { opacity: 1, y: 0, duration: 2.0, ease: 'power3.inOut' }, 0.5);
      }

      portfolioAnimRef.current = gsap.timeline({ delay: 0.2 });
      const portfolioWords = portfolioWordRefs.current.filter(Boolean);

      if (portfolioWords.length > 0) {
        gsap.set(portfolioWords, { y: '100%', opacity: 0 });
        portfolioAnimRef.current.to(portfolioWords, {
          y: '0%',
          opacity: 1,
          duration: 1.2,
          stagger: 0.05,
          ease: "power3.out"
        }, 0);
      }

      const metaHeadings = firstSceneMetaRef.current?.querySelectorAll('.meta-heading');
      const metaSubheadings = firstSceneMetaRef.current?.querySelectorAll('.meta-subheading');

      if (metaHeadings && metaHeadings.length > 0) {
        gsap.set(metaHeadings, { y: -20, opacity: 0 });
        passionAnimRef.current.to(metaHeadings, { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power3.out' }, 0.3);
      }

      if (metaSubheadings && metaSubheadings.length > 0) {
        gsap.set(metaSubheadings, { y: -15, opacity: 0 });
        passionAnimRef.current.to(metaSubheadings, { y: 0, opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power3.out' }, 0.5);
      }

      const entranceTl = gsap.timeline({ delay: 0.2 });

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
        entranceTl.to(subtitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out'
        }, 0);
      }

      const animateHeroImage = (ref) => {
        if (ref.current) {
          gsap.set(ref.current, { clipPath: 'inset(100% 0% 0% 0%)', y: 50, opacity: 1 });
          entranceTl.to(ref.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 2.0,
            ease: 'power3.out'
          }, 0.6);
        }
      };
      animateHeroImage(heroImageRef);
      animateHeroImage(heroImageMobileRef);

      const animateBottomBlob = (ref) => {
        if (ref.current) {
          gsap.set(ref.current, { opacity: 0 });
          entranceTl.to(ref.current, {
            opacity: 1,
            duration: 2.0,
            ease: 'power3.inOut',
            force3D: false
          }, 0.6);
        }
      };
      animateBottomBlob(bottomBlobRef);
      animateBottomBlob(bottomBlobMobileRef);

      const pills = pillsRefs.current.filter(Boolean);
      if (pills.length > 0) {
        pills.forEach((pill, i) => {
          gsap.set(pill, { y: 40, opacity: 0 });
          entranceTl.to(pill, {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power3.out'
          }, 0.6 + i * 0.1);

          const inner = pill.querySelector('.pill-inner');
          if (inner) {
            gsap.to(inner, {
              y: -15,
              duration: 2 + (i % 3) * 0.5,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: 1.0 + i * 0.2
            });
          }
        });
      }

      const animateDShape = (ref) => {
        if (ref.current) {
          gsap.set(ref.current, { width: '0%' });
          entranceTl.to(ref.current, {
            width: '78%',
            duration: 1.8,
            ease: 'power3.inOut'
          }, 0); // starts exactly when staggered text starts
        }
      };
      animateDShape(dShapeRef);
      animateDShape(dShapeMobileRef);

      if (ctaRef.current) {
        gsap.set(ctaRef.current, { scale: 0.9, opacity: 0 });
        entranceTl.to(ctaRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: 'back.out(1.5)'
        }, 0); // starts at the same time as D-shape
      }

      const socialLinks = socialRefs.current.filter(Boolean);
      if (socialLinks.length > 0) {
        gsap.set(socialLinks, { y: -20, opacity: 0 });
        entranceTl.to(socialLinks, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out'
        }, 0.5); // slightly after D-shape starts
      }

      entranceAnimRef.current = entranceTl;

    });
    return () => ctx.revert();
  }, [isPreloaderFinished]);

  useEffect(() => {
    const fadeProgress = clamp(
      (progress - firstSceneFadeStart) / (firstSceneFadeEnd - firstSceneFadeStart),
      0,
      1,
    )

    // ── Phase 2: D-shape expand + hero image shrink ──
    const p2Progress = clamp((progress - p2Start) / (p2End - p2Start), 0, 1)
    const p2Eased = 1 - Math.pow(1 - p2Progress, 3) // cubic ease-out



    // ── Phase 3: Orange bg appears at end of morph ──
    const orangeProgress = clamp((progress - orangeStart) / (orangeEnd - orangeStart), 0, 1)

    // ── Phase 2: D-shape expansion (both desktop & mobile) ──
    const dShapeBg = gsap.utils.interpolate('#ececec', orangeProgress)

    if (dShapeRef.current) {
      gsap.set(dShapeRef.current, {
        width: `${78 + p2Eased * 22}vw`,
        height: `${48 + p2Eased * 52}vh`,
        borderTopRightRadius: `${611 * (1 - p2Eased)}px`,
        borderBottomRightRadius: `${611 * (1 - p2Eased)}px`,
        backgroundColor: dShapeBg,
      })
    }
    if (dShapeMobileRef.current) {
      gsap.set(dShapeMobileRef.current, {
        width: `${78 + p2Eased * 22}vw`,
        height: `${48 + p2Eased * 52}vh`,
        borderTopRightRadius: `${40 * (1 - p2Eased)}vw`,
        borderBottomRightRadius: `${40 * (1 - p2Eased)}vw`,
        backgroundColor: dShapeBg,
      })
    }

    // ── Phase 2: Hero image shrinks to circle with orange bg ──
    if (heroImageWrapperRef.current) {
      // Start as a huge circle (full image visible), shrink to 16% radius centered at 62% height
      const startRadius = 150
      const endRadius = 16
      const radius = startRadius - (startRadius - endRadius) * p2Eased
      const startCy = 100 // anchored at bottom
      const endCy = 70   // aligned with center of stats
      const cy = startCy - (startCy - endCy) * p2Eased
      gsap.set(heroImageWrapperRef.current, {
        clipPath: `circle(${radius}% at 50% ${cy}%)`,
      })
    }
    
    if (heroImageBgRef.current) {
      gsap.set(heroImageBgRef.current, { opacity: orangeProgress })
    }
    
    if (heroImageRef.current) {
      const startScale = isMobile ? 1 : 0.9
      const endScale = isMobile ? 0.55 : 0.5
      gsap.set(heroImageRef.current, {
        scale: startScale - (startScale - endScale) * p2Eased,
        yPercent: 15 * p2Eased,
      })
    }

    // ── Phase 1: Fade out pills, blobs, CTA, subtitle, social ──
    if (pillsRefs.current) {
      pillsRefs.current.forEach(pill => {
        if (pill) gsap.set(pill, { opacity: 1 - fadeProgress })
      })
    }
    if (bottomBlobRef.current) gsap.set(bottomBlobRef.current, { opacity: 1 - fadeProgress })
    if (bottomBlobMobileRef.current) gsap.set(bottomBlobMobileRef.current, { opacity: 1 - fadeProgress })
    if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1 - fadeProgress, pointerEvents: fadeProgress > 0.5 ? 'none' : 'auto' })
    if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1 - fadeProgress })
    if (socialRefs.current) {
      socialRefs.current.forEach(ref => {
        if (ref) gsap.set(ref, { opacity: 1 - fadeProgress, pointerEvents: fadeProgress > 0.5 ? 'none' : 'auto' })
      })
    }
    if (portfolioWordRefs.current) {
      portfolioWordRefs.current.forEach(ref => {
        if (ref) gsap.set(ref, { opacity: clamp(1 - fadeProgress * 2, 0, 1), yPercent: fadeProgress * 150 })
      })
    }

    // ── Phase 3: Trigger auto-play timeline once when Phase 2 completes ──
    if (progress >= aboutTriggerPoint && !aboutTriggered.current) {
      aboutTriggered.current = true

      // Show the scene container
      if (aboutSceneRef.current) {
        gsap.set(aboutSceneRef.current, { opacity: 1, pointerEvents: 'auto' })
      }

      // Build the auto-play timeline
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      aboutTimelineRef.current = tl

      // 1) Pill slides up
      tl.to(aboutPillRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.1)

      // 2) Heading lines stagger up from behind clip
      aboutHeadingLineRefs.current.forEach((line, i) => {
        if (line) {
          tl.to(line, { opacity: 1, yPercent: 0, duration: 0.6 }, 0.3 + i * 0.12)
        }
      })

      // 3) Lines expand outward
      tl.to(aboutLineLeftRef.current, { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.8)
      tl.to(aboutLineRightRef.current, { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.8)

      // 4) Stats stagger bottom-to-top
      const statRevealOrder = [1, 3, 0, 2]
      statRevealOrder.forEach((idx, order) => {
        const ref = aboutStatItemRefs.current[idx]
        if (ref) {
          tl.to(ref, { opacity: 1, y: 0, duration: 0.5 }, 1.0 + order * 0.12)
        }
      })

      // 5) Badge pop with overshoot
      tl.to(aboutBadgeRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(2.5)',
      }, 1.6)
    }

    // ── Scroll back up: reverse the about scene ──
    if (progress < aboutTriggerPoint - 0.03 && aboutTriggered.current) {
      aboutTriggered.current = false
      if (aboutTimelineRef.current) {
        aboutTimelineRef.current.kill()
        aboutTimelineRef.current = null
      }
      // Reset all about elements
      if (aboutSceneRef.current) gsap.set(aboutSceneRef.current, { opacity: 0, pointerEvents: 'none' })
      if (aboutPillRef.current) gsap.set(aboutPillRef.current, { opacity: 0, y: 20 })
      aboutHeadingLineRefs.current.forEach(line => {
        if (line) gsap.set(line, { opacity: 0, yPercent: 100 })
      })
      if (aboutLineLeftRef.current) gsap.set(aboutLineLeftRef.current, { scaleX: 0, opacity: 0 })
      if (aboutLineRightRef.current) gsap.set(aboutLineRightRef.current, { scaleX: 0, opacity: 0 })
      aboutStatItemRefs.current.forEach(ref => {
        if (ref) gsap.set(ref, { opacity: 0, y: 30 })
      })
      if (aboutBadgeRef.current) gsap.set(aboutBadgeRef.current, { opacity: 0, scale: 0 })
    }

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

    if (portfolioAnimRef.current) {
      if (fadeProgress > 0.02) {
        portfolioAnimRef.current.reverse();
      } else {
        portfolioAnimRef.current.play();
      }
    }

  }, [progress])

  useEffect(() => {
    if (!sectionRef.current) return

    const holdTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'bottom bottom',
      end: () => `+=${window.innerHeight}`,
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



  // ── Mobile: Animated scenes then static bento below ──────────────────────
  if (isMobile) {
    return (
      <>
        {/* ── Scroll-driven scenes section (portrait, PORTFOLIO text, video, overlays) ── */}
        <section
          id="hero"
          ref={sectionRef}
          className="relative z-0 h-[400vh] w-full"
          style={{ backgroundColor: '#FF3D3D' }}
        >
          <div
            className={`sticky top-0 flex flex-col h-[100vh] pt-[56px] w-full overflow-hidden px-0 pb-0`}
            style={{ backgroundColor: '#FF3D3D' }}
          >
            {/* Hero Blobs */}
            <div className="absolute z-[1] pointer-events-none" style={{ left: '-25%', top: '-13%', width: '59%', height: '123%', borderRadius: '50%', background: 'rgba(123, 9, 11, 0.44)', filter: 'blur(121px)' }} />
            <div ref={bottomBlobMobileRef} className="absolute z-[3] pointer-events-none" style={{ left: '15%', top: '51%', width: '52%', height: '80%' }}>
              <div className="w-full h-full rounded-[50%]" style={{ background: '#2B2B2B', filter: 'blur(121px)' }} />
            </div>
            <div className="absolute z-[1] pointer-events-none" style={{ right: '0%', top: '-15%', width: '25%', height: '39%', borderRadius: '50%', background: 'rgba(123, 9, 11, 0.20)', filter: 'blur(121px)' }} />
            {/* Grey D-shape */}
            <div ref={dShapeMobileRef} className="absolute bottom-0 z-0 left-0 w-[78%] h-[48%] rounded-r-[40vw] bg-[#C0C0C0]" />
            {/* Full-bleed hero image */}
            <img src={heroImage} ref={heroImageMobileRef} alt="hero background" className="absolute z-[5] inset-0 w-full h-full object-cover object-center pointer-events-none select-none" draggable={false} />


            {/* PORTFOLIO background text & 3-Column Header */}
            <div className={`pointer-events-none absolute inset-0 z-0 w-full h-full transition-opacity duration-1000 ease-out`}>
              {/* Combined Wrapper for 3-Column Text & PORTFOLIO Text */}
              <div className="relative w-full h-[100vh] pt-[120px] pb-[80px] flex flex-col justify-between items-center pointer-events-none z-10">

                {/* 3-Column Meta Info Wrapper */}
                <div ref={firstSceneMetaRef} className="w-full flex flex-col sm:flex-row justify-between items-start z-20 opacity-80 px-6 sm:px-[8vw] gap-4 sm:gap-0">
                  <div className="flex items-start gap-1 max-w-[100px] lg:max-w-[200px]">
                    <span className="text-sm font-extrabold text-[#f12020] mt-[-1px]">›</span>
                    <div className="flex flex-col gap-1 text-left">
                      <p className="font-extrabold text-white text-[9px] uppercase tracking-wider">WEB DESIGNER / UI/UX</p>
                      <p className="text-white/50 font-medium text-[8px] whitespace-nowrap lg:whitespace-normal">Crafting immersive functional digital experiences.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1 max-w-[100px] lg:max-w-[200px] flex">
                    <span className="text-sm font-extrabold text-[#f12020] mt-[-1px]">›</span>
                    <div className="flex flex-col gap-1 text-left">
                      <p className="font-extrabold text-white text-[9px] uppercase tracking-wider">BASED IN INDIA</p>
                      <p className="text-white/50 font-medium text-[8px] whitespace-nowrap lg:whitespace-normal">Delivering scale and quality globally.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-1 max-w-[100px] lg:max-w-[200px] pointer-events-auto">
                    <span className="text-sm font-extrabold text-[#f12020] mt-[-1px] pointer-events-none">›</span>
                    <div className="flex flex-col gap-3 text-left">
                      <div className="flex flex-col gap-1 pointer-events-none">
                        <p className="font-extrabold text-white text-[9px] uppercase tracking-wider">7+ HACKATHONS WON</p>
                        <p className="text-white/50 font-medium text-[8px] whitespace-nowrap lg:whitespace-normal">Winning solutions built in record time.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ASK Text — first row */}
                <div className="w-full overflow-hidden px-4 sm:px-8">
                  <motion.div
                    className="font-atelier select-none text-[32vw] uppercase tracking-[-0.01em] text-white flex justify-between items-center w-full whitespace-nowrap"
                    style={{ lineHeight: 0.85 }}
                  >
                    {askWordGroups.map((group, index) => (
                      <motion.span key={index} ref={(el) => { portfolioWordRefs.current[index] = el }} className="inline-block">
                        {group}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
                {/* CREATIONS Text — second row */}
                <div className="w-full overflow-hidden px-4 sm:px-8">
                  <motion.div
                    className="font-atelier select-none text-[16vw] uppercase tracking-[0.02em] text-white flex justify-between items-center w-full whitespace-nowrap"
                    style={{ lineHeight: 0.85 }}
                  >
                    {creationsWordGroups.map((group, index) => (
                      <motion.span key={index + askWordGroups.length} ref={(el) => { portfolioWordRefs.current[index + askWordGroups.length] = el }} className="inline-block">
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
                  src={heroImage}
                  alt="Portrait"
                  className={`pointer-events-none absolute bottom-0 left-1/2 z-20 h-[65vh] w-auto max-w-none -translate-x-1/2 origin-bottom object-cover ${isImageExpanded ? 'scale-100' : 'scale-[0.85]'}`}
                />




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


      </>
    )
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-0 h-[400vh] w-full bg-[#c92424]"
    >

      <div
        className={`sticky top-0 w-full flex items-center justify-center px-0 py-0 h-[100vh] overflow-hidden`}
      >
        {/* Hero Blobs */}
        <div className="absolute z-[-1] pointer-events-none" style={{ left: '-25%', top: '-13%', width: '59%', height: '123%', borderRadius: '50%', background: 'rgba(123, 9, 11, 0.44)', filter: 'blur(121px)' }} />
        <div ref={bottomBlobRef} className="absolute z-[3] pointer-events-none" style={{ left: '15%', top: '51%', width: '52%', height: '80%' }}>
          <div className="w-full h-full rounded-[50%]" style={{ background: '#2B2B2B', filter: 'blur(121px)' }} />
        </div>
        <div className="absolute z-[1] pointer-events-none" style={{ right: '0%', top: '-15%', width: '25%', height: '39%', borderRadius: '50%', background: 'rgba(123, 9, 11, 0.20)', filter: 'blur(121px)' }} />

        {/* Floating Pills */}
        {/* {floatingPills.map((pill, index) => (
          <div
            key={index}
            ref={(el) => (pillsRefs.current[index] = el)}
            className="absolute pointer-events-none hidden lg:block"
            style={{ top: pill.top, left: pill.left, zIndex: pill.zIndex }}
          >
            <div 
              className="pill-inner px-10 py-3.5 rounded-[40px] bg-black text-white font-medium text-sm tracking-wider shadow-2xl whitespace-nowrap"
              style={{ transform: `rotate(${pill.rotation}deg)` }}
            >
              {pill.label}
            </div>
          </div>
        ))} */}

        {/* Grey D-shape — bottom left platform */}
        <div ref={dShapeRef} className="absolute bottom-0 z-0 left-0 w-[78%] h-[48%] rounded-r-[40vw] lg:rounded-r-[611px] bg-[#ececec]" />

        {/* Hero image wrapper — clips to circle during Phase 2 */}
        <div
          ref={heroImageWrapperRef}
          className="absolute z-[5] inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
          style={{ clipPath: 'circle(150% at 50% 100%)' }}
        >
          <div ref={heroImageBgRef} className="absolute inset-0 bg-[#FF6B4A]" style={{ opacity: 0 }} />
          <img
            ref={heroImageRef}
            src={heroImage}
            alt="hero background"
            className="relative z-[1] w-auto h-[100vh] lg:h-[110vh] object-cover object-top pointer-events-none select-none origin-center"
            draggable={false}
          />
        </div>





        {/* Lower section: social (left) + CTA (right) - Extracted out for top z-index */}
        <div ref={firstSceneMetaRef} className="absolute bottom-0 left-0 w-full z-50 flex items-end justify-between px-4 sm:px-[30px] pb-8 md:pb-12 gap-4 pointer-events-auto">
          {/* Social icons — vertical stack */}
          <div className="flex flex-col gap-6">
            {communityIcons.map((icon, index) => (
              <a
                key={icon.alt}
                ref={(el) => socialRefs.current[index] = el}
                href={icon.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center"
              >
                <div className="grid h-8 w-8 place-items-center transition-transform duration-300 ease-out group-hover:scale-125">
                  <icon.Icon className="h-6 w-6 text-black opacity-80 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                </div>
                {/* Hover Chip */}
                <div className="absolute left-full ml-4 opacity-0 -translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out z-50">
                  <div className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm whitespace-nowrap shadow-lg">
                    {icon.alt}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* CTA button — right aligned */}
          <Link
            ref={ctaRef}
            to="/contact"
            className="bg-white text-black font-atelier text-xs md:text-xs px-6 md:px-10 py-4 md:py-5 leading-[80%] tracking-wide hover:bg-gray-100 transition-colors shadow-md"
          >
            GET IN TOUCH
          </Link>
        </div>

        <div className={`pointer-events-none absolute inset-0 z-[2] w-full h-full transition-opacity duration-1000 delay-[600ms] ease-out ${!isPreloaderFinished ? 'opacity-0' : 'opacity-100'}`}>
          {/* Combined Wrapper for ASK CREATIONS Text & Layout */}
          <div className="relative w-full h-full flex flex-col pointer-events-none z-10">
            {/* Full-width text block with subtitle overlay */}
            <div className="relative w-full px-2 md:px-4 pt-2 md:pt-[56px]">
              {/* ASK — clipped container */}
              <div className="overflow-hidden pt-10 -mt-10">
                <div
                  className="font-atelier select-none text-[clamp(68px,15.5vw,280px)] uppercase text-white"
                  style={{ lineHeight: '80%', letterSpacing: '0.7vw' }}
                >
                  {askWordGroups.map((group, index) => (
                    <motion.span
                      key={index}
                      ref={(element) => {
                        portfolioWordRefs.current[index] = element
                      }}
                      className="inline-block"
                    >
                      {group}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CREATIONS — clipped container */}
              <div className="overflow-hidden pt-10 -mt-10">
                <div
                  className="font-atelier select-none text-[clamp(68px,15.5vw,280px)] uppercase text-white"
                  style={{ lineHeight: '80%', letterSpacing: '0.7vw' }}
                >
                  {creationsWordGroups.map((group, index) => (
                    <motion.span
                      key={index + askWordGroups.length}
                      ref={(element) => {
                        portfolioWordRefs.current[index + askWordGroups.length] = element
                      }}
                      className="inline-block"
                    >
                      {group}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Subtitle — absolutely positioned top right */}
              <div className="absolute top-2 md:top-[80px] right-4 md:right-8 w-[30%] md:w-[30%]">
                <p ref={subtitleRef} className="font-clash-display font-medium z-40 text-[#E5E5E5] text-xs sm:text-sm md:text-base lg:text-base tracking-wide text-justify leading-[100%]">
                  UI/UX DESIGNER CRAFTING INTUITIVE, USER&#8209;FRIENDLY EXPERIENCES THROUGH WIREFRAMING, PROTOTYPING, &amp; VISUAL DESIGN.
                </p>
              </div>

              {/* Based in India — right aligned below text */}
              <div className="w-full flex justify-end mt-1 pr-2 md:pr-6 overflow-hidden">
                <motion.p
                  ref={basedRef}
                  initial={{ y: '100%' }}
                  animate={{ y: isPreloaderFinished ? 0 : '100%' }}
                  transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-white font-sans text-[10px] md:text-sm tracking-[12px] uppercase"
                >
                  Based in India
                </motion.p>
              </div>
            </div>
            {/* Flexible spacer */}
            <div className="flex-1" />
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


        {/* ── About Me Scene (Phase 3) ── */}
        <div
          ref={aboutSceneRef}
          className="absolute inset-0 z-[8] flex flex-col items-center justify-center pointer-events-none"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          {/* Top: ABOUT ME pill + heading */}
          <div className="absolute top-[8%] lg:top-[10%] left-0 right-0 flex flex-col items-center text-center px-6">
            <div ref={aboutPillRef} className="bg-white text-black font-bold text-[10px] lg:text-xs tracking-[0.2em] px-4 py-1.5 rounded-full mb-5 lg:mb-6 shadow-sm uppercase">
              ABOUT ME
            </div>
            <h2 className="max-w-[700px] text-xl sm:text-2xl lg:text-[2.2rem] font-black uppercase tracking-tight text-[#111] leading-[1.15] lg:leading-[1.15]">
              <span className="block overflow-hidden pb-1"><span ref={el => aboutHeadingLineRefs.current[0] = el} className="block">UI/UX Designer crafting intuitive,</span></span>
              <span className="block overflow-hidden pb-1"><span ref={el => aboutHeadingLineRefs.current[1] = el} className="block">user-friendly experiences through wireframing,</span></span>
              <span className="block overflow-hidden pb-1"><span ref={el => aboutHeadingLineRefs.current[2] = el} className="block">prototyping, &amp; visual design.</span></span>
            </h2>
          </div>

          {/* Middle: Stats flanking the circular hero image */}
          <div ref={aboutStatsRef} className="absolute top-[48%] lg:top-[48%] left-0 right-0 flex items-center justify-between px-6 sm:px-12 lg:px-[8%]">
            {/* Left column stats */}
            <div className="flex flex-col gap-16 lg:gap-24 relative">
              <div ref={aboutLineLeftRef} className="absolute top-1/2 -translate-y-1/2 left-0 right-[-30px] lg:right-[-60px] h-[1px] bg-[#222] origin-left" style={{ scaleX: 0 }} />
              <div ref={el => aboutStatItemRefs.current[0] = el} style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <h3 className="text-5xl lg:text-7xl font-black text-[#111] leading-none tracking-tight">07</h3>
                <p className="text-[10px] lg:text-xs font-bold text-[#111] uppercase tracking-wider mt-1">Years of Experience</p>
              </div>
              <div ref={el => aboutStatItemRefs.current[1] = el} style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <h3 className="text-5xl lg:text-7xl font-black text-[#111] leading-none tracking-tight">120+</h3>
                <p className="text-[10px] lg:text-xs font-bold text-[#111] uppercase tracking-wider mt-1">Total Projects</p>
              </div>
            </div>

            {/* Spacer for the circular image in the center */}
            <div className="w-[34%] lg:w-[30%]" />

            {/* Right column stats */}
            <div className="flex flex-col gap-16 lg:gap-24 relative text-right items-end">
              <div ref={aboutLineRightRef} className="absolute top-1/2 -translate-y-1/2 left-[-30px] lg:left-[-60px] right-0 h-[1px] bg-[#222] origin-right" style={{ scaleX: 0 }} />
              <div ref={el => aboutStatItemRefs.current[2] = el} style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <div className="flex justify-end gap-0.5 mb-1 text-xs lg:text-sm text-[#111]">★★★★★</div>
                <h3 className="text-5xl lg:text-7xl font-black text-[#111] leading-none tracking-tight">5.00</h3>
                <p className="text-[10px] lg:text-xs font-bold text-[#111] uppercase tracking-wider mt-1">70 rating</p>
              </div>
              <div ref={el => aboutStatItemRefs.current[3] = el} style={{ opacity: 0, transform: 'translateY(30px)' }}>
                <h3 className="text-5xl lg:text-7xl font-black text-[#111] leading-none tracking-tight">03</h3>
                <p className="text-[10px] lg:text-xs font-bold text-[#111] uppercase tracking-wider mt-1">Awards</p>
              </div>
            </div>
          </div>

          {/* Bottom: Download CV star badge — 15-sided rounded star, endless rotation */}
          <div ref={aboutBadgeRef} className="absolute z-10" style={{ top: '75%', left: '55%', opacity: 0, transform: 'scale(0)' }}>
            <div className="w-24 h-24 lg:w-28 lg:h-28 relative pointer-events-auto cursor-pointer group">
              {/* Rotating star */}
              <svg
                className="w-full h-full animate-spin-slow"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={(() => {
                    const cx = 100, cy = 100, outerR = 96, innerR = 80, points = 15;
                    let d = '';
                    for (let i = 0; i < points; i++) {
                      const outerAngle = (Math.PI * 2 * i) / points - Math.PI / 2;
                      const innerAngle = (Math.PI * 2 * (i + 0.5)) / points - Math.PI / 2;
                      const ox = cx + outerR * Math.cos(outerAngle);
                      const oy = cy + outerR * Math.sin(outerAngle);
                      const ix = cx + innerR * Math.cos(innerAngle);
                      const iy = cy + innerR * Math.sin(innerAngle);
                      if (i === 0) d += `M ${ox} ${oy} `;
                      else d += `L ${ox} ${oy} `;
                      d += `Q ${ix} ${iy} `;
                      const nextAngle = (Math.PI * 2 * (i + 1)) / points - Math.PI / 2;
                      const nx = cx + outerR * Math.cos(nextAngle);
                      const ny = cy + outerR * Math.sin(nextAngle);
                      d += `${nx} ${ny} `;
                    }
                    return d + 'Z';
                  })()}
                  fill="white"
                />
              </svg>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[7px] lg:text-[8px] font-bold text-center leading-tight tracking-[0.15em] uppercase text-black">Download<br/>My CV</span>
                <svg className="w-3 h-3 mt-0.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
