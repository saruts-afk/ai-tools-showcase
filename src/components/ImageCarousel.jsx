import { useEffect, useRef, useState } from 'react'

export default function ImageCarousel({ images, title, color, onImageOpen }) {
  const [idx, setIdx] = useState(0)
  const [animated, setAnimated] = useState(true)
  const startX = useRef(null)
  const dragDelta = useRef(0)
  const extended = [...images, images[0]]

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => i + 1), 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (idx !== images.length) return undefined

    const timer = setTimeout(() => {
      setAnimated(false)
      setIdx(0)
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)))
    }, 520)

    return () => clearTimeout(timer)
  }, [idx, images.length])

  const go = (i) => {
    setAnimated(true)
    setIdx(i)
  }

  const activeIdx = idx % images.length

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div
        className="feature-image-button carousel-image-button"
        role="button"
        tabIndex={0}
        aria-label={`Open ${title} image full screen`}
        onMouseDown={(e) => {
          startX.current = e.clientX
          dragDelta.current = 0
        }}
        onMouseUp={(e) => {
          if (startX.current === null) return
          const dx = startX.current - e.clientX
          dragDelta.current = Math.abs(dx)
          if (dx > 30) go(Math.min(idx + 1, images.length))
          else if (dx < -30) go(Math.max(idx - 1, 0))
          startX.current = null
        }}
        onClick={() => {
          if (dragDelta.current > 8) return
          onImageOpen(images[activeIdx], title)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onImageOpen(images[activeIdx], title)
          }
        }}
        onMouseLeave={() => {
          startX.current = null
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '100%',
            transform: `translateX(${-idx * 100}%)`,
            transition: animated ? 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' : 'none',
          }}
        >
          {extended.map((src, imageIdx) => (
            <div key={imageIdx} style={{ flexShrink: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={src} alt={`${title} ${imageIdx + 1}`} className="feature-image" />
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', flexShrink: 0 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            style={{
              width: i === activeIdx ? '18px' : '6px',
              height: '6px',
              borderRadius: '3px',
              padding: 0,
              background: i === activeIdx ? color : 'rgba(255,255,255,0.2)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
          />
        ))}
      </div>
    </div>
  )
}
