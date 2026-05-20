export default function NavBar({ current, tools, onNavigate, navigateMain }) {
  return (
    <nav className="nav">
      <span className="nav-logo" onClick={() => onNavigate(0)}>AoV TH AI Tools</span>

      <div className="nav-pills">
        <button
          className={`nav-pill${current === 0 ? ' active' : ''}`}
          style={{ color: current === 0 ? '#fff' : '' }}
          onClick={() => onNavigate(0)}
        >
          Overview
        </button>
        {tools.map((tool, i) => {
          const isActive = current === i + 1

          return (
            <button
              key={tool.id}
              className={`nav-pill${isActive ? ' active' : ''}`}
              style={{ color: isActive ? tool.color : '', background: isActive ? tool.bg : '' }}
              onClick={() => onNavigate(i + 1)}
            >
              {tool.name}
            </button>
          )
        })}
      </div>

      <div className="nav-right">
        <div className="nav-arrows">
          <button className="nav-arrow" onClick={() => navigateMain(-1)} disabled={current === 0}>←</button>
          <button className="nav-arrow" onClick={() => navigateMain(1)} disabled={current === tools.length}>→</button>
        </div>
      </div>
    </nav>
  )
}
