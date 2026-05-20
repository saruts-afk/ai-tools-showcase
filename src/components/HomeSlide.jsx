import { ICONS } from './icons.jsx'

export default function HomeSlide({ tools, onSelectTool }) {
  return (
    <div className="slide home-slide bg-grid">
      <div className="home-header" style={{ position: 'relative', zIndex: 1 }}>
        <div className="home-eyebrow">
          <span className="live-dot" />
          All tools are live and ready to use
        </div>
        <h1 className="home-title">AoV TH AI Tools</h1>
        <p className="home-sub">4 tools built to eliminate manual work and help every team move faster</p>
      </div>

      <div className="tool-cards" style={{ position: 'relative', zIndex: 1 }}>
        {tools.map((tool, i) => {
          const ToolIcon = ICONS[tool.id]

          return (
            <div
              key={tool.id}
              className="tool-card"
              style={{ borderColor: `${tool.color}25` }}
              onClick={() => onSelectTool(i + 1)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 60px ${tool.shadow}`
                e.currentTarget.style.borderColor = `${tool.color}50`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = `${tool.color}25`
              }}
            >
              <div className="tool-card-icon" style={{ background: tool.bg }}>
                <ToolIcon color={tool.color} />
              </div>
              <div>
                <div className="tool-card-name">{tool.name}</div>
                <div className="tool-card-tagline" style={{ color: tool.color }}>{tool.tagline}</div>
              </div>
              <ul className="tool-card-points">
                {tool.cardPoints.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
              <button className="tool-card-cta" style={{ background: tool.dim, color: tool.color }}>
                Explore →
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
