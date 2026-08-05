import sys

with open("src/components/Hero.jsx", "r") as f:
    content = f.read()

# 1. Imports
content = content.replace("import amanBg from '../assets/AmanBG.png'", "import amanBg from '../assets/HeroImage.png'")

# 2. Word groups
old_word_groups = "const portfolioWordGroups = ['P', 'O', 'R', 'T', 'F', 'O', 'L', 'I', 'O']"
new_word_groups = """const askWordGroups = ['A', 'S', 'K']
  const creationsWordGroups = ['C', 'R', 'E', 'A', 'T', 'I', 'O', 'N', 'S']"""
content = content.replace(old_word_groups, new_word_groups)

# 3. Mobile Red Background and Grey Shape
# Find mobile #hero-mobile background
content = content.replace("style={{ backgroundColor: 'black' }}", "style={{ backgroundColor: '#FF3D3D' }}")

# Mobile: replace RedGlowBackground with solid bg + grey shape
mobile_glow_old = """            {/* Red Glow Background */}
            <RedGlowBackground className="z-0 pointer-events-none" />"""

mobile_glow_new = """            {/* Solid Red Background for Hero Screen */}
            <div className="absolute inset-0 bg-[#FF3D3D] z-0 pointer-events-none" />
            {/* Static Gray Shape behind portrait */}
            <div 
              className="absolute right-0 bottom-0 z-0 h-[60vh] w-[80vw] bg-[#C0C0C0]"
              style={{ borderTopLeftRadius: '100vw' }} 
            />"""
content = content.replace(mobile_glow_old, mobile_glow_new)

# 4. Desktop: replace RedGlowBackground with solid bg + grey shape
desktop_glow_old = """        {/* Red Glow Background */}
        <RedGlowBackground className="z-0 pointer-events-none" />"""
desktop_glow_new = """        {/* Solid Red Background for Hero Screen */}
        <div className="absolute inset-0 bg-[#FF3D3D] z-0 pointer-events-none" />
        {/* Static Gray Shape behind portrait */}
        <div 
          className="absolute right-0 bottom-0 z-0 h-[75vh] w-[65vw] bg-[#C0C0C0]"
          style={{ borderTopLeftRadius: '100vw' }} 
        />"""
content = content.replace(desktop_glow_old, desktop_glow_new)

# 5. Mobile Meta and PORTFOLIO text replacement
mobile_meta_old = """              {/* Combined Wrapper for 3-Column Text & PORTFOLIO Text */}
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

                {/* Solid Filled PORTFOLIO Text */}
                <div className="w-full flex flex-col items-center overflow-hidden px-4 sm:px-8">
                  <motion.div
                    className="font-atelier select-none text-[20vw] sm:text-[18vw] uppercase tracking-[-0.01em] text-white flex justify-between items-center text-center w-full whitespace-nowrap translate-y-[10%] sm:translate-y-[22%]"
                    style={{
                      lineHeight: 0.85,
                      paddingTop: '0.01em',
                      paddingBottom: '0.01em'
                    }}
                  >
                    {portfolioWordGroups.map((group, index) => (
                      <motion.span key={index} ref={(el) => { portfolioWordRefs.current[index] = el }} className="inline-block">
                        {group}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>"""

mobile_meta_new = """              {/* Combined Wrapper for ASK CREATIONS Text */}
              <div className="relative w-full h-[100vh] pt-[120px] pb-[80px] flex flex-col pointer-events-none z-10">
                {/* ASK CREATIONS Text */}
                <div className="w-full flex flex-col items-center overflow-hidden px-4 sm:px-8 gap-2">
                  <motion.div
                    className="font-atelier select-none text-[24vw] uppercase tracking-[-0.01em] text-white flex justify-start items-center text-center w-full whitespace-nowrap"
                    style={{ lineHeight: 0.85, paddingTop: '0.01em', paddingBottom: '0.01em' }}
                  >
                    {askWordGroups.map((group, i) => {
                      const index = i;
                      return (
                        <motion.span key={index} ref={(el) => { portfolioWordRefs.current[index] = el }} className="inline-block">
                          {group}
                        </motion.span>
                      )
                    })}
                  </motion.div>
                  <motion.div
                    className="font-atelier select-none text-[24vw] uppercase tracking-[-0.01em] text-white flex justify-between items-center text-center w-full whitespace-nowrap"
                    style={{ lineHeight: 0.85, paddingTop: '0.01em', paddingBottom: '0.01em' }}
                  >
                    {creationsWordGroups.map((group, i) => {
                      const index = askWordGroups.length + i;
                      return (
                        <motion.span key={index} ref={(el) => { portfolioWordRefs.current[index] = el }} className="inline-block">
                          {group}
                        </motion.span>
                      )
                    })}
                  </motion.div>
                </div>

                <div className="w-full flex justify-end px-4 mt-4 z-20 pointer-events-none">
                  <p className="font-sans font-medium text-white/90 text-[10px] sm:text-xs max-w-[280px] text-right uppercase tracking-wider leading-relaxed">
                    UI/UX DESIGNER CRAFTING INTUITIVE, USER-FRIENDLY EXPERIENCES THROUGH WIREFRAMING, PROTOTYPING, & VISUAL DESIGN.
                  </p>
                </div>
              </div>"""

content = content.replace(mobile_meta_old, mobile_meta_new)

# 6. Desktop Meta and PORTFOLIO text replacement
desktop_meta_old = """           {/* Combined Wrapper for PORTFOLIO Text & Meta Info */}
           <div className="relative w-full h-full pt-4 xl:pt-2 pb-[80px] flex flex-col pointer-events-none z-10">

              {/* PORTFOLIO Text — top, full width */}
              <div className="w-full overflow-hidden px-4 lg:px-6">
                <motion.div
                  className="font-atelier select-none text-[17vw] xl:text-[16.5vw] uppercase tracking-[-0.01em] text-white flex justify-between items-center w-full whitespace-nowrap"
                  style={{
                    lineHeight: 0.85,
                  }}
                >
                  {portfolioWordGroups.map((group, index) => (
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
                </motion.div>
              </div>

              {/* Tagline — right aligned below PORTFOLIO */}
              <div className="w-full flex justify-end px-8 lg:px-[6vw] mt-2 z-20 pointer-events-none">
                <p className="font-serif italic text-white/80 text-base lg:text-xl tracking-wide">We create a design that fits your vision.</p>
              </div>

              {/* 3-Column Meta Info — bottom left, vertical stack */}
              <div ref={firstSceneMetaRef} className="absolute bottom-24 lg:bottom-24 left-8 lg:left-12 flex flex-col gap-6 opacity-80 z-20 max-w-[320px]">
                <div className="flex items-start gap-2 pointer-events-auto">
                  <span className="text-2xl font-extrabold text-[#f12020] mt-[-2px] pointer-events-none">›</span>
                  <div className="flex flex-col gap-1.5 text-left pointer-events-none">
                    <p className="meta-heading font-extrabold text-white text-sm lg:text-base uppercase tracking-wider">7+ HACKATHONS WINNER</p>
                    <p className="meta-subheading text-white/50 font-medium text-[10px] lg:text-xs">Proven track record of building innovative solutions in record time.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-2xl font-extrabold text-[#f12020] mt-[-2px]">›</span>
                  <div className="flex flex-col gap-1.5 text-left">
                    <p className="meta-heading font-extrabold text-white text-sm lg:text-base uppercase tracking-wider">WEB DESIGNER / UI/UX</p>
                    <p className="meta-subheading text-white/50 font-medium text-[10px] lg:text-xs">Crafting immersive and functional digital aesthetics for modern brands.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-2xl font-extrabold text-[#f12020] mt-[-2px]">›</span>
                  <div className="flex flex-col gap-1.5 text-left">
                    <p className="meta-heading font-extrabold text-white text-sm lg:text-base uppercase tracking-wider">BASED IN INDIA</p>
                    <p className="meta-subheading text-white/50 font-medium text-[10px] lg:text-xs">Delivering global scale products built with passion, precision, and artistry.</p>
                  </div>
                </div>
              </div>
            </div>"""

desktop_meta_new = """           {/* Combined Wrapper for PORTFOLIO Text & Meta Info */}
           <div className="relative w-full h-full pt-4 xl:pt-2 flex flex-col pointer-events-none z-10">

              {/* Vertical Social Icons on left */}
              <div className="absolute left-4 md:left-[30px] bottom-36 flex flex-col gap-8 z-30 pointer-events-auto">
                {communityIcons.map(icon => (
                  <a href={icon.link} key={icon.alt} target="_blank" rel="noreferrer" className="hover:opacity-70 transition-opacity">
                    <img src={icon.src} alt={icon.alt} className="w-5 h-5 lg:w-6 lg:h-6 invert mix-blend-difference" />
                  </a>
                ))}
              </div>

              {/* GET IN TOUCH CTA on right */}
              <div className="absolute right-4 md:right-[30px] bottom-36 z-30 pointer-events-auto">
                <a href="/#contact" className="bg-[#EAEAEA] text-black font-sans font-bold text-xs lg:text-sm px-6 py-3 tracking-[0.1em] hover:bg-white transition-colors uppercase">
                  Get In Touch
                </a>
              </div>

              {/* ASK CREATIONS Text — top, full width */}
              <div className="w-full flex flex-col overflow-hidden px-4 md:px-[30px] gap-2 mt-8 lg:mt-4">
                {/* ASK */}
                <motion.div
                  className="font-atelier select-none text-[20vw] xl:text-[18vw] uppercase tracking-[-0.01em] text-white flex justify-start items-center w-full whitespace-nowrap"
                  style={{ lineHeight: 0.8 }}
                >
                  {askWordGroups.map((group, i) => {
                    const index = i;
                    return (
                      <motion.span
                        key={`ask-${i}`}
                        ref={(element) => { portfolioWordRefs.current[index] = element }}
                        className="inline-block"
                      >
                        {group}
                      </motion.span>
                    )
                  })}
                </motion.div>

                {/* CREATIONS */}
                <motion.div
                  className="font-atelier select-none text-[20vw] xl:text-[18vw] uppercase tracking-[-0.01em] text-white flex justify-between items-center w-full whitespace-nowrap"
                  style={{ lineHeight: 0.8 }}
                >
                  {creationsWordGroups.map((group, i) => {
                    const index = askWordGroups.length + i;
                    return (
                      <motion.span
                        key={`cre-${i}`}
                        ref={(element) => { portfolioWordRefs.current[index] = element }}
                        className="inline-block"
                      >
                        {group}
                      </motion.span>
                    )
                  })}
                </motion.div>
              </div>

              {/* Tagline — right aligned below CREATIONS */}
              <div className="w-full flex justify-end px-4 md:px-[30px] mt-6 lg:mt-8 z-20 pointer-events-none">
                <p className="font-sans font-medium text-white/90 text-xs lg:text-sm max-w-[320px] lg:max-w-[440px] text-right uppercase tracking-wider leading-relaxed">
                  UI/UX DESIGNER CRAFTING INTUITIVE, USER-FRIENDLY EXPERIENCES THROUGH WIREFRAMING, PROTOTYPING, & VISUAL DESIGN.
                </p>
              </div>
            </div>"""

content = content.replace(desktop_meta_old, desktop_meta_new)

with open("src/components/Hero.jsx", "w") as f:
    f.write(content)

print("Replacement script executed.")
