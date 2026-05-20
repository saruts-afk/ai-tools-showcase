import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ImageCarousel from './ImageCarousel.jsx'
import { ICONS } from './icons.jsx'

const SECTION_COLORS = {
  problem: '#ff5c5c',
  solution: '#34d399',
  benefits: '#60a5fa',
}

const DEFAULT_FOCUSED_SECTION = 'painPoints'

const FOCUS_GRID_CLASSES = {
  painPoints: 'tool-bento-focus-left tool-bento-focus-top',
  solution: 'tool-bento-focus-right tool-bento-focus-top',
  benefits: 'tool-bento-focus-left tool-bento-focus-bottom',
  getStarted: 'tool-bento-focus-right tool-bento-focus-bottom',
}

export default function ToolContainer({ tool }) {
  const [showFeatures, setShowFeatures] = useState(false)
  const ToolIcon = ICONS[tool.id]

  return (
    <div className="slide tool-slide bg-grid">
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${tool.shadow} 0%, transparent 65%)`,
          pointerEvents: 'none',
          opacity: 0.5,
        }}
      />

      <div
        className="tool-slide-head"
        style={{
          background: `linear-gradient(135deg, ${tool.bg} 0%, transparent 100%)`,
          borderBottom: `1px solid ${tool.color}20`,
        }}
      >
        <div className="tool-slide-icon" style={{ background: tool.dim }}>
          <ToolIcon color={tool.color} />
        </div>
        <div>
          <div
            className="tool-slide-name"
            style={{
              background: `linear-gradient(90deg, #fff 0%, ${tool.color} 200%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {tool.name}
          </div>
          <div className="tool-slide-tagline" style={{ color: tool.color }}>{tool.tagline}</div>
        </div>
        <div className="tool-tabs-wrap" style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <div className="tool-tabs" style={{ display: 'flex', borderRadius: '10px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            <button
              className="tool-tab-button"
              onClick={() => setShowFeatures(false)}
              style={{
                padding: '10px 24px',
                border: 'none',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                cursor: showFeatures ? 'pointer' : 'default',
                background: !showFeatures ? tool.color : 'transparent',
                color: !showFeatures ? '#fff' : 'rgba(255,255,255,0.38)',
                fontSize: '17px',
                fontWeight: 700,
                fontFamily: 'inherit',
                transition: 'background 0.25s, color 0.25s',
                textShadow: !showFeatures ? '0 0 12px rgba(255,255,255,0.4)' : 'none',
              }}
            >
              Overview
            </button>
            <button
              className="tool-tab-button"
              onClick={() => setShowFeatures(true)}
              style={{
                padding: '10px 24px',
                border: 'none',
                cursor: showFeatures ? 'default' : 'pointer',
                background: showFeatures ? tool.color : 'transparent',
                color: showFeatures ? '#fff' : 'rgba(255,255,255,0.38)',
                fontSize: '17px',
                fontWeight: 700,
                fontFamily: 'inherit',
                transition: 'background 0.25s, color 0.25s',
                textShadow: showFeatures ? '0 0 12px rgba(255,255,255,0.4)' : 'none',
              }}
            >
              Key Features
            </button>
          </div>
        </div>
      </div>

      <div className="tool-content-viewport" style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <div
          className="tool-panel-track"
          style={{
            display: 'flex',
            height: '100%',
            width: '200%',
            transform: showFeatures ? 'translateX(-50%)' : 'translateX(0)',
            transition: 'transform 0.55s cubic-bezier(0.16,1,0.3,1)',
            willChange: 'transform',
          }}
        >
          <OverviewPanel tool={tool} />
          <FeaturesPanel tool={tool} />
        </div>
      </div>
    </div>
  )
}

function OverviewPanel({ tool }) {
  const [focusedSection, setFocusedSection] = useState(DEFAULT_FOCUSED_SECTION)
  const focusGridClass = FOCUS_GRID_CLASSES[focusedSection] || FOCUS_GRID_CLASSES[DEFAULT_FOCUSED_SECTION]

  const sections = [
    {
      id: 'painPoints',
      number: '01',
      label: 'Pain Points',
      color: SECTION_COLORS.problem,
      icon: <WarningIcon color={SECTION_COLORS.problem} />,
      details: <BentoItemList items={tool.painPoints} color={SECTION_COLORS.problem} />,
    },
    {
      id: 'solution',
      number: '02',
      label: 'Solution',
      color: SECTION_COLORS.solution,
      icon: <LightbulbIcon color={SECTION_COLORS.solution} />,
      details: <BentoItemList items={tool.solutions} color={SECTION_COLORS.solution} />,
    },
    {
      id: 'benefits',
      number: '03',
      label: 'Benefit',
      color: SECTION_COLORS.benefits,
      icon: <GrowthIcon color={SECTION_COLORS.benefits} />,
      details: <BentoItemList items={tool.benefits} color={SECTION_COLORS.benefits} />,
    },
    {
      id: 'getStarted',
      number: '04',
      label: 'Get Started',
      color: tool.color,
      icon: <PlayIcon color={tool.color} />,
      headAside: <ReadyBadge />,
      style: { borderColor: `${tool.color}35`, background: tool.bg },
      details: <GetStartedDetails tool={tool} />,
    },
  ]

  return (
    <div className="overview-panel" style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className={`tool-bento ${focusGridClass}`}>
        {sections.map((section) => (
          <BentoSection
            key={section.id}
            {...section}
            isFocused={focusedSection === section.id}
            onFocus={setFocusedSection}
          />
        ))}
      </div>
    </div>
  )
}

function BentoSection({ id, number, label, color, icon, headAside, style, details, isFocused, onFocus }) {
  const handleSelect = () => onFocus(id)
  const handleKeyDown = (e) => {
    if (e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSelect()
    }
  }

  return (
    <div
      className={`bento-cell ${isFocused ? 'is-focused' : 'is-minimized'}`}
      role="button"
      tabIndex={0}
      aria-expanded={isFocused}
      aria-label={`Show ${label} details`}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      style={{ '--section-color': color, borderColor: `${color}33`, ...style }}
    >
      <div className="bento-cell-num" aria-hidden="true">{number}</div>
      <div className="bento-cell-head">
        <span className="bento-icon">{icon}</span>
        <div className="bento-label" style={{ color }}>{label}</div>
        {isFocused ? headAside : null}
      </div>
      {isFocused ? <div className="bento-details">{details}</div> : null}
    </div>
  )
}

function BentoItemList({ items, color }) {
  return (
    <div className="bento-items">
      {items.map((item, i) => (
        <div key={i} className="bento-item">
          <span className="bento-dot" style={{ background: color, marginTop: '7px' }} />
          {item}
        </div>
      ))}
    </div>
  )
}

function GetStartedDetails({ tool }) {
  return (
    <>
      <div className="bento-items bento-steps">
        {tool.howToUse.map((step, i) => (
          <div key={i} className="bento-step">
            <span className="bento-step-num" style={{ background: tool.dim, color: tool.color }}>{step.n}</span>
            {step.text}
          </div>
        ))}
      </div>
      <DemoLink href={tool.demoUrl} color={tool.color} shadow={tool.shadow} compact onClick={(e) => e.stopPropagation()}>
        <ExternalLinkIcon width="15" height="15" strokeWidth="2.5" />
        Open Tool
      </DemoLink>
    </>
  )
}

function ReadyBadge() {
  return (
    <div className="bento-ready-badge">
      <span className="live-dot" />Ready to Use
    </div>
  )
}

function FeaturesPanel({ tool }) {
  const [previewImage, setPreviewImage] = useState(null)
  const columnCount = getFeatureColumnCount(tool.features.length)
  const rowCount = Math.ceil(tool.features.length / columnCount)
  const openImagePreview = (src, title) => setPreviewImage({ src, title })
  const closeImagePreview = () => setPreviewImage(null)

  useEffect(() => {
    if (!previewImage) return undefined

    const onKey = (e) => {
      if (e.key === 'Escape') closeImagePreview()
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [previewImage])

  return (
    <div className="features-panel" style={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', padding: '14px 24px 16px', gap: '12px' }}>
      <div
        className="features-grid"
        style={{
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gap: '12px',
          gridTemplateColumns: Array(columnCount).fill('1fr').join(' '),
          gridTemplateRows: Array(rowCount).fill('1fr').join(' '),
        }}
      >
        {tool.features.map((feature, i) => (
          <FeatureCard key={i} feature={feature} index={i} tool={tool} onImageOpen={openImagePreview} />
        ))}
      </div>
      <DemoLink href={tool.demoUrl} color={tool.color} shadow={tool.shadow}>
        Launch Live Demo →
      </DemoLink>
      {previewImage ? (
        <ImageLightbox image={previewImage} color={tool.color} onClose={closeImagePreview} />
      ) : null}
    </div>
  )
}

function FeatureCard({ feature, index, tool, onImageOpen }) {
  return (
    <div
      className="feature-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: 'rgba(255,255,255,0.025)',
        border: `1px solid ${tool.color}20`,
        borderRadius: '16px',
        overflow: 'hidden',
        padding: '18px',
      }}
    >
      <div className="feature-card-head" style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
        <div
          className="feature-card-index"
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '8px',
            background: tool.dim,
            color: tool.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '15px',
            fontWeight: 800,
            flexShrink: 0,
            marginTop: '2px',
          }}
        >
          {index + 1}
        </div>
        <div className="feature-title" style={{ fontSize: '34px', fontWeight: 800, color: '#fff', letterSpacing: 0, lineHeight: 1.14 }}>{feature.title}</div>
      </div>

      {feature.images ? (
        <ImageCarousel images={feature.images} title={feature.title} color={tool.color} onImageOpen={onImageOpen} />
      ) : (
        <button
          type="button"
          className="feature-image-button"
          aria-label={`Open ${feature.title} image full screen`}
          onClick={() => onImageOpen(feature.image, feature.title)}
        >
          <img src={feature.image} alt={feature.title} className="feature-image" />
        </button>
      )}

      <div className="feature-points" style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {feature.points.map((point, i) => (
          <div className="feature-point" key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '20px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: tool.color, flexShrink: 0, marginTop: '7px' }} />
            {point}
          </div>
        ))}
      </div>
    </div>
  )
}

function ImageLightbox({ image, color, onClose }) {
  return createPortal(
    <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`${image.title} full-size image`} onClick={onClose}>
      <button
        type="button"
        className="image-lightbox-close"
        aria-label="Close full-size image"
        onClick={onClose}
        style={{ borderColor: `${color}55`, color }}
      >
        ×
      </button>
      <img
        src={image.src}
        alt={image.title}
        className="image-lightbox-img"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  )
}

function DemoLink({ href, color, shadow, compact = false, onClick, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={compact ? compactLinkStyle(color, shadow) : fullLinkStyle(color, shadow)}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.filter = 'brightness(1.12)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = 'brightness(1)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {children}
    </a>
  )
}

function getFeatureColumnCount(featureCount) {
  if (featureCount <= 2) return featureCount
  if (featureCount === 4) return 2
  return 3
}

function compactLinkStyle(color, shadow) {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '12px',
    padding: '11px 16px',
    borderRadius: '11px',
    background: color,
    color: '#fff',
    fontSize: '18px',
    fontWeight: 700,
    textDecoration: 'none',
    letterSpacing: '-0.1px',
    boxShadow: `0 4px 16px ${shadow}`,
    transition: 'filter 0.2s, transform 0.2s',
    flexShrink: 0,
  }
}

function fullLinkStyle(color, shadow) {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '14px',
    borderRadius: '14px',
    background: color,
    color: '#fff',
    fontSize: '20px',
    fontWeight: 700,
    textDecoration: 'none',
    letterSpacing: '-0.2px',
    boxShadow: `0 6px 24px ${shadow}`,
    flexShrink: 0,
    transition: 'filter 0.2s, transform 0.2s',
  }
}

function WarningIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function LightbulbIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <line x1="9" y1="18" x2="15" y2="18" />
      <line x1="10" y1="22" x2="14" y2="22" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  )
}

function GrowthIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

function PlayIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill={color} stroke="none" />
    </svg>
  )
}

function ExternalLinkIcon({ width, height, strokeWidth }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}
