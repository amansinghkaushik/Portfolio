import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'

function CursorFollower({ isVisible = true }) {
  const cursorRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (!cursorRef.current) return

    const $cursor = cursorRef.current
    const $hover = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label, .cursor-hover')

    const onMouseMove = (e) => {
      gsap.to($cursor, {
        x: e.clientX - 32,
        y: e.clientY - 32,
        duration: 0.4,
        overwrite: 'auto',
      })
    }

    const onMouseHover = () => {
      gsap.to($cursor, {
        scale: 2.5,
        duration: 0.4,
        overwrite: 'auto',
      })
    }

    const onMouseHoverOut = () => {
      gsap.to($cursor, {
        scale: 1,
        duration: 0.4,
        overwrite: 'auto',
      })
    }

    document.addEventListener('mousemove', onMouseMove, { passive: true })
    $hover.forEach((el) => {
      el.addEventListener('mouseenter', onMouseHover)
      el.addEventListener('mouseleave', onMouseHoverOut)
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      $hover.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseHover)
        el.removeEventListener('mouseleave', onMouseHoverOut)
      })
    }
  }, [])

  return createPortal(
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed z-9999 mix-blend-difference will-change-transform hidden md:block transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        top: 0, 
        left: 0,
        width: '64px',
        height: '64px',
        overflow: 'visible',
      }}
      aria-hidden="true"
    >
      <svg 
        height="64" 
        width="64" 
        viewBox="0 0 64 64"
        style={{ display: 'block', width: '100%', height: '100%' }}
      >
        <circle cx="32" cy="32" r="16" fill="white" />
      </svg>
    </div>,
    document.body
  )
}

export default CursorFollower
