const fs = require('fs');
const path = './src/components/Hero.jsx';

const newContent = `import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

import amanBg from '../assets/AmanBG.png'

export default function Hero({ isPreloaderFinished = true }) {
  const containerRef = useRef(null)

  // Animation on load
  useEffect(() => {
    if (!isPreloaderFinished || !containerRef.current) return
    
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-element", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: "power3.out", delay: 0.5 }
      )
      
      gsap.fromTo(".hero-gradient",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 2, ease: "power2.out", delay: 0.2 }
      )
    }, containerRef)
    
    return () => ctx.revert()
  }, [isPreloaderFinished])

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col pt-24 md:pt-32 pb-0">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Top Left Blob */}
        <div className="hero-gradient absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] bg-[#FF0000] rounded-full mix-blend-screen opacity-50 blur-[140px]" />
        
        {/* Center Right Diagonal Blob */}
        <div className="hero-gradient absolute top-[20%] right-[-20%] w-[90vw] h-[50vw] bg-[#FF0000] rounded-full mix-blend-screen opacity-[0.65] blur-[160px] -rotate-12" />
      </div>

      {/* Top Section: PORTFOLIO */}
      <div className="relative z-10 w-full px-6 md:px-12 flex flex-col">
        <h1 className="hero-element font-condenso text-[22vw] leading-[0.75] tracking-tight text-white uppercase text-center w-full">
          PORTFOLIO
        </h1>
        <div className="hero-element flex justify-end w-full mt-4 pr-4 md:pr-12">
          <p className="text-white text-sm md:text-2xl font-medium tracking-wide">
            We create a design that fits your vision.
          </p>
        </div>
      </div>

      {/* Middle Section: Meta Info, Portrait, Passion Text */}
      <div className="relative z-10 flex-1 w-full flex flex-col md:flex-row items-end justify-center px-6 md:px-12 mt-12 md:mt-0">
        
        {/* Left Meta Column */}
        <div className="hero-element hidden lg:flex absolute left-12 top-[60%] -translate-y-1/2 flex-col gap-12 z-20">
          <div className="flex flex-col gap-2 max-w-[320px]">
            <h3 className="text-white font-bold text-2xl tracking-wide uppercase">7+ HACKATHON WINNER</h3>
            <p className="text-gray-400 font-light text-base leading-relaxed">
              Proven track record of building<br/>innovative solutions in record time.
            </p>
          </div>
          
          <div className="flex flex-col gap-2 max-w-[320px]">
            <h3 className="text-white font-bold text-2xl tracking-wide uppercase">WEB DESIGNER / UI / UX</h3>
            <p className="text-gray-400 font-light text-base leading-relaxed">
              Creating emmersive and functional<br/>digital aesthetics for modern brands.
            </p>
          </div>
          
          <div className="flex flex-col gap-2 max-w-[320px]">
            <h3 className="text-white font-bold text-2xl tracking-wide uppercase">BASED IN INDIA</h3>
            <p className="text-gray-400 font-light text-base leading-relaxed">
              Delivering global scale product built with<br/>passion, precision and artistry.
            </p>
          </div>
        </div>

        {/* Center Portrait */}
        <div className="hero-element relative z-10 h-[60vh] md:h-[80vh] w-full flex justify-center items-end pointer-events-none">
          <img 
            src={amanBg} 
            alt="Aman Singh Kaushik" 
            className="h-full w-auto object-contain object-bottom mix-blend-normal brightness-[0.2] contrast-[1.5]"
          />
        </div>

        {/* Right Bottom Text */}
        <div className="hero-element absolute right-6 md:right-20 bottom-12 md:bottom-24 z-20 flex flex-col items-start">
          <h2 className="font-clash-display font-bold text-[60px] md:text-[110px] leading-[0.85] text-[#dedede] uppercase tracking-tighter">
            PASSION<br/>
            AMBITION<br/>
            VISION
          </h2>
        </div>
      </div>
    </section>
  )
}
`

fs.writeFileSync(path, newContent);
console.log("Hero.jsx updated successfully.");
