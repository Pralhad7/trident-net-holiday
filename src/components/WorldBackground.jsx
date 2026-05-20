import { useEffect, useRef } from 'react'

export default function WorldBackground() {
  const worldRef = useRef(null)

  useEffect(() => {
    let rotation = 0
    const animate = () => {
      rotation += 0.08
      if (worldRef.current) {
        worldRef.current.style.transform = `rotate(${rotation}deg)`
      }
      requestAnimationFrame(animate)
    }
    const frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [])

  return (
    <div className="world-bg">
      <div className="world-container" ref={worldRef}>
        <svg viewBox="0 0 800 400" className="world-svg">
          <defs>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a4a6a" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#2a6a8a" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#1a4a6a" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
          <ellipse cx="400" cy="200" rx="380" ry="180" fill="url(#oceanGrad)" stroke="#5ba9c8" strokeWidth="1" strokeOpacity="0.3"/>
          <g fill="none" stroke="#5ba9c8" strokeWidth="0.5" strokeOpacity="0.2">
            <ellipse cx="400" cy="200" rx="380" ry="180"/>
            <ellipse cx="400" cy="200" rx="280" ry="130"/>
            <ellipse cx="400" cy="200" rx="180" ry="80"/>
            <ellipse cx="400" cy="200" rx="80" ry="35"/>
            <line x1="20" y1="200" x2="780" y2="200"/>
            <line x1="400" y1="20" x2="400" y2="380"/>
            <ellipse cx="400" cy="200" rx="190" ry="90" transform="rotate(30 400 200)"/>
            <ellipse cx="400" cy="200" rx="190" ry="90" transform="rotate(-30 400 200)"/>
          </g>
          <g fill="#5ba9c8" fillOpacity="0.15">
            <circle cx="180" cy="120" r="8"/>
            <circle cx="520" cy="100" r="6"/>
            <circle cx="650" cy="180" r="7"/>
            <circle cx="150" cy="250" r="5"/>
            <circle cx="700" cy="250" r="6"/>
            <circle cx="320" cy="280" r="4"/>
            <circle cx="480" cy="300" r="5"/>
            <circle cx="600" cy="320" r="4"/>
            <circle cx="250" cy="150" r="3"/>
            <circle cx="550" cy="220" r="3"/>
          </g>
          <g fill="none" stroke="#d98a2b" strokeWidth="1.5" strokeOpacity="0.4">
            <path d="M100,280 Q200,260 280,290 T400,270 T520,300 T650,280"/>
            <path d="M80,180 Q180,160 300,190 T500,170 T750,200" strokeDasharray="4 4"/>
          </g>
        </svg>
      </div>
    </div>
  )
}