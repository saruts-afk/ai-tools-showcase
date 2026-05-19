import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Cover from './components/Cover'
import ToolsGallery from './components/ToolsGallery'
import ToolDetail from './components/ToolDetail'
import KeyFeatures from './components/KeyFeatures'
import tools from './data/tools'

export default function App() {
  const [page, setPage] = useState('cover')
  const [activeTool, setActiveTool] = useState(null)

  const currentTool = tools.find(t => t.id === activeTool)

  const handleSelectTool = (toolId) => {
    setActiveTool(toolId)
    setPage('detail')
  }

  const handleBack = () => {
    if (page === 'features') setPage('detail')
    else if (page === 'detail') setPage('gallery')
    else if (page === 'gallery') setPage('cover')
  }

  return (
    <div className="min-h-screen" style={{ background: '#070711', color: 'white' }}>
      <AnimatePresence mode="wait">
        {page === 'cover' && (
          <Cover key="cover" onStart={() => setPage('gallery')} />
        )}
        {page === 'gallery' && (
          <ToolsGallery
            key="gallery"
            tools={tools}
            onSelectTool={handleSelectTool}
          />
        )}
        {page === 'detail' && currentTool && (
          <ToolDetail
            key={`detail-${activeTool}`}
            tool={currentTool}
            tools={tools}
            onShowFeatures={() => setPage('features')}
            onBack={handleBack}
            onSelectTool={handleSelectTool}
          />
        )}
        {page === 'features' && currentTool && (
          <KeyFeatures
            key={`features-${activeTool}`}
            tool={currentTool}
            tools={tools}
            onBack={handleBack}
            onSelectTool={handleSelectTool}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
