import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function TextCycler() {
  const texts = ['ASK/CR8®', 'Digital Creator & Art Director']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % texts.length)
    }, 5500)

    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
        delayChildren: 0,
        staggerDirection: -1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.025,
        staggerDirection: 1,
      },
    },
  }

  const lineVariants = {
    hidden: { y: 24 },
    visible: {
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      y: -24,
      transition: { duration: 0.5 },
    },
  }

  const lines = texts[index].split('\n')

  return (
    <div className="font-inter text-[#ffffff] overflow-hidden text-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={`text_${index}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="inline-block"
        >
          {lines.map((line, i) => (
            <motion.div key={i} variants={lineVariants} className="inline-block">
              {line}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default TextCycler








