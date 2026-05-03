import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import reactIcon from '../assets/react.svg';
import nextIcon from '../assets/nextjs.svg';
import threeIcon from '../assets/threejs.svg';
import gsapIcon from '../assets/gsap.svg';
import tailwindIcon from '../assets/tailwindcss.svg';
import vercelIcon from '../assets/vercel.svg';
import gitIcon from '../assets/git.svg';
import figmaIcon from '../assets/figma2.svg';
import framerIcon from '../assets/framer2.svg';
import webflowIcon from '../assets/webflow.svg';

export default function TechStackSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.tech-animate-head',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        '.tech-animate-item',
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const topRow = [
    { name: 'React.js', icon: reactIcon },
    { name: 'Next.js', icon: nextIcon },
    { name: 'Three.js', icon: threeIcon },
  ];

  const bottomRow = [
    { name: 'GSAP', icon: gsapIcon },
    { name: 'Tailwind', icon: tailwindIcon },
    { name: 'Vercel', icon: vercelIcon },
    { name: 'Git', icon: gitIcon },
    { name: 'Figma', icon: figmaIcon },
    { name: 'Framer', icon: framerIcon },
    { name: 'Webflow', icon: webflowIcon },
  ];

  return (
    <section ref={sectionRef} className="relative z-10 w-full bg-[#ececec] py-20 lg:py-32 md:pb-24 flex flex-col items-center">
      <div className="tech-animate-head w-full px-4 md:px-8 mb-16 flex justify-start max-w-[1400px]">
        <h2 className="ds-heading-xl lowercase">tech stack i use.</h2>
      </div>
      
      {/* Full width container, gap-[1px] for internal borders */}
      <div className="w-full flex flex-col bg-[#d1d5db] border-y border-[#d1d5db] gap-[1px]">
        
        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px]">
          {topRow.map((tech, i) => (
            <div 
              key={i} 
              className="tech-animate-item group flex flex-col items-center justify-center relative bg-[#ececec] hover:bg-[#111] transition-colors duration-500 h-64 md:h-80 cursor-pointer overflow-hidden"
            >
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className="w-20 h-20 md:w-28 md:h-28 object-contain group-hover:invert transition-all duration-500 brightness-0"
              />
              
              {/* Hover Text */}
              <div className="absolute bottom-6 w-full text-center">
                <span 
                  className="font-sans font-bold text-[12px] uppercase tracking-[0.2em] text-white block transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-4 group-hover:translate-y-0 [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0_0)]"
                >
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-[1px]">
          {bottomRow.map((tech, i) => (
            <div 
              key={i} 
              className="tech-animate-item group flex flex-col items-center justify-center relative bg-[#ececec] hover:bg-[#111] transition-colors duration-500 aspect-square cursor-pointer overflow-hidden"
            >
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className="w-12 h-12 md:w-16 md:h-16 object-contain group-hover:invert transition-all duration-500 brightness-0"
              />
              
              {/* Hover Text */}
              <div className="absolute bottom-4 w-full text-center">
                <span 
                  className="font-sans font-bold text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-white block transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-4 group-hover:translate-y-0 [clip-path:inset(0_0_100%_0)] group-hover:[clip-path:inset(0_0_0_0)]"
                >
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
