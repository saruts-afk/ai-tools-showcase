import { useCallback, useEffect, useState } from 'react'
import NavBar from './components/NavBar.jsx'
import HomeSlide from './components/HomeSlide.jsx'
import ToolContainer from './components/ToolContainer.jsx'
import tools from './data/tools.js'

export default function App() {
  const [current, setCurrent] = useState(0)
  const lastSlide = tools.length

  const navigate = useCallback((idx) => {
    if (idx >= 0 && idx <= lastSlide) setCurrent(idx)
  }, [lastSlide])

  const navigateMain = useCallback((dir) => {
    const next = current + dir
    if (next >= 0 && next <= lastSlide) setCurrent(next)
  }, [current, lastSlide])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') navigateMain(1)
      if (e.key === 'ArrowLeft') navigateMain(-1)
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigateMain])

  useEffect(() => {
    let startX = null

    const onTouchStart = (e) => {
      startX = e.touches[0].clientX
    }

    const onTouchEnd = (e) => {
      if (startX === null) return
      const dx = startX - e.changedTouches[0].clientX
      if (Math.abs(dx) > 60) navigateMain(dx > 0 ? 1 : -1)
      startX = null
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [navigateMain])

  const progressPct = (current / lastSlide) * 100
  const activeTool = current >= 1 ? tools[current - 1] : null

  return (
    <div>
      <NavBar current={current} tools={tools} onNavigate={navigate} navigateMain={navigateMain} />

      <div className="slides-viewport">
        <div className="slides-track" style={{ transform: `translateX(${-current * 100}vw)` }}>
          <HomeSlide tools={tools} onSelectTool={navigate} />
          {tools.map((tool) => (
            <ToolContainer key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progressPct}%`,
            background: activeTool ? activeTool.color : 'rgba(255,255,255,0.3)',
          }}
        />
      </div>

      <div className="slide-hint">Use ← → arrow keys or swipe to navigate</div>
    </div>
  )
}
