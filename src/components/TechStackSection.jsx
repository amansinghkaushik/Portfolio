import React from 'react';

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

  const allTech = [
    { name: 'React.js', icon: reactIcon },
    { name: 'Next.js', icon: nextIcon },
    { name: 'Three.js', icon: threeIcon },
    { name: 'GSAP', icon: gsapIcon },
    { name: 'Tailwind', icon: tailwindIcon },
    { name: 'Vercel', icon: vercelIcon },
    { name: 'Git', icon: gitIcon },
    { name: 'Figma', icon: figmaIcon },
    { name: 'Framer', icon: framerIcon },
    { name: 'Webflow', icon: webflowIcon },
  ];

  return (
    <section className="relative z-10 w-full bg-[#ececec] py-4 md:py-8 flex flex-col items-center overflow-hidden">
      
      {/* Endless Marquee Container */}
      <div className="w-full flex flex-col overflow-hidden">
        <div className="animate-marquee flex gap-12 md:gap-20 items-center pr-12 md:pr-20">
          {/* Duplicate the array exactly once to ensure seamless scrolling since transform maps from 0 to -50% */}
          {[...allTech, ...allTech].map((tech, i) => (
            <div 
              key={i} 
              className="flex items-center gap-4 group cursor-pointer flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-500"
            >
              <img 
                src={tech.icon} 
                alt={tech.name} 
                className="w-4 h-4 md:w-12 md:h-12 object-contain brightness-0 transition-transform duration-500 group-hover:scale-110"
              />
              <span className="font-clash-display font-medium text-xl md:text-2xl uppercase tracking-widest text-[#101010] whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
