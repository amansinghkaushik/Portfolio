import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Preloader({ onComplete }) {
  const [stage, setStage] = useState('drop') // 'drop' -> 'spread' -> 'expand' -> 'done'
  const squareCount = 9 // odd number so there's a center (4 on left, 1 center, 4 on right)

  useEffect(() => {
    // Stage timings
    const t1 = setTimeout(() => setStage('spread'), 1200)
    const t2 = setTimeout(() => setStage('expand'), 2400)
    const t3 = setTimeout(() => {
      setStage('done')
      onComplete() // Call onComplete immediately
    }, 3200)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden pointer-events-none"
        >
          {/* Squares Container */}
          <div className="relative flex items-center justify-center gap-[10px] sm:gap-[20px]">
            {Array.from({ length: squareCount }).map((_, i) => {
              const centerIdx = Math.floor(squareCount / 2)
              const distance = Math.abs(i - centerIdx)
              const isCenter = i === centerIdx
              
              // We want squares to start stacked exactly at the center.
              // We'll translate them back to center by offsetting their natural flex position.
              const offsetWidth = typeof window !== 'undefined' && window.innerWidth < 640 ? 34 : 44 // approx width + gap
              const startX = (centerIdx - i) * offsetWidth
              
              return (
                <motion.div
                  key={`square-${i}`}
                  initial={isCenter 
                    ? { y: '-100vh', opacity: 1, scale: 1 } 
                    : { x: startX, opacity: 0, scale: 1 }
                  }
                  animate={
                    stage === 'drop' && isCenter
                      ? { y: 0 }
                      : stage === 'spread'
                      ? { x: 0, y: 0, opacity: 1 } 
                      : stage === 'expand'
                      ? { scaleX: 100, scaleY: 100, x: 0, y: 0, opacity: 1 } 
                      : stage === 'drop' && !isCenter
                      ? { x: startX, opacity: 0 }
                      : {}
                  }
                  transition={{
                    duration: stage === 'expand' ? 0.8 : (stage === 'drop' ? 0.8 : 0.6),
                    ease: [0.76, 0, 0.24, 1], // Premium ease
                    delay: stage === 'spread' && !isCenter ? distance * 0.08 : 0
                  }}
                  className="w-5 h-5 sm:w-8 sm:h-8 bg-[#ececec]"
                  style={{
                    transformOrigin: 'center center' // expand equally
                  }}
                />
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
