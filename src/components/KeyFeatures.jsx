import { motion } from 'framer-motion'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function KeyFeatures({ tool, tools, onBack, onSelectTool }) {
  return (
    <motion.div
      className="min-h-screen bg-grid"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.35 }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-20 px-6 py-4 flex items-center justify-between"
        style={{ background: 'rgba(7,7,17,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          ← Back to Overview
        </button>

        <div className="hidden md:flex items-center gap-2">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelectTool(t.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={t.id === tool.id
                ? { background: tool.bgColor, color: tool.color, border: `1px solid ${tool.color}40` }
                : { color: 'rgba(255,255,255,0.35)', background: 'transparent' }}
            >
              {t.emoji} {t.name}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{tool.emoji}</span>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-white/30">Key Features</p>
              <h2 className="text-3xl font-black text-white">{tool.name}</h2>
            </div>
          </div>
          <div className="h-px w-full mt-5" style={{ background: `linear-gradient(90deg, ${tool.color}60, transparent)` }} />
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {tool.keyFeatures.map((feature, i) => (
            <motion.div
              key={i}
              variants={card}
              whileHover={{ scale: 1.02, boxShadow: `0 0 24px ${tool.shadowColor}` }}
              className="p-6 rounded-2xl card-glass transition-all"
              style={{ borderColor: `${tool.color}20` }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: tool.bgColor, border: `1px solid ${tool.color}25` }}>
                {feature.emoji}
              </div>
              <h4 className="font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px mb-10" style={{ background: 'rgba(255,255,255,0.06)' }} />

        {/* Demo CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-white/40 text-sm mb-6">Ready to see it in action?</p>

          <motion.a
            href={tool.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, boxShadow: `0 0 50px ${tool.shadowColor}` }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-xl text-white transition-all"
            style={{ background: `linear-gradient(135deg, ${tool.color}, ${tool.color}cc)` }}
          >
            <span>🚀</span>
            Launch Live Demo
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            >→</motion.span>
          </motion.a>

          <p className="text-white/20 text-xs mt-4">Opens in a new tab</p>
        </motion.div>

        {/* Next tool hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 flex items-center justify-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-white/25 text-xs">Explore other tools</p>
          <div className="flex gap-2">
            {tools.filter(t => t.id !== tool.id).map(t => (
              <button
                key={t.id}
                onClick={() => onSelectTool(t.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white/40 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                {t.emoji} {t.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
