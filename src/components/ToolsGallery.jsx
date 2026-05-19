import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ToolsGallery({ tools, onSelectTool }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">Team AI Toolkit</p>
        <h2 className="text-4xl md:text-5xl font-black text-gradient mb-3">Meet Our 4 AI Tools</h2>
        <p className="text-white/40 text-base">Click any tool to explore what it solves and how it helps you</p>
      </motion.div>

      {/* Tool cards grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} onClick={() => onSelectTool(tool.id)} />
        ))}
      </motion.div>
    </motion.div>
  )
}

function ToolCard({ tool, onClick }) {
  return (
    <motion.button
      variants={item}
      onClick={onClick}
      whileHover={{
        scale: 1.02,
        boxShadow: `0 0 40px ${tool.shadowColor}`,
      }}
      whileTap={{ scale: 0.98 }}
      className="text-left p-7 rounded-3xl card-glass transition-all group relative overflow-hidden"
      style={{ borderColor: `${tool.color}25` }}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at top left, ${tool.bgColor} 0%, transparent 70%)` }} />

      <div className="relative z-10">
        {/* Icon + ready badge */}
        <div className="flex items-start justify-between mb-5">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
            style={{ background: tool.bgColor, border: `1px solid ${tool.color}30` }}>
            {tool.emoji}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }}>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            LIVE
          </div>
        </div>

        {/* Name + tagline */}
        <h3 className="text-2xl font-bold text-white mb-1">{tool.name}</h3>
        <p className="text-sm font-medium mb-3" style={{ color: tool.color }}>{tool.tagline}</p>
        <p className="text-sm text-white/40 leading-relaxed">{tool.description}</p>

        {/* CTA hint */}
        <div className="mt-6 flex items-center gap-2 text-xs font-semibold transition-all"
          style={{ color: tool.color }}>
          <span>Explore this tool</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >→</motion.span>
        </div>
      </div>
    </motion.button>
  )
}
