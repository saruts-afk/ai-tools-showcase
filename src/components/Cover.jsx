import { motion } from 'framer-motion'

const floatingTools = [
  { emoji: '📡', name: 'Livestream', color: '#f43f5e', x: -340, y: -80, delay: 0 },
  { emoji: '🐛', name: 'Bug Tracker', color: '#f97316', x: 320, y: -100, delay: 0.15 },
  { emoji: '📊', name: 'Survey', color: '#3b82f6', x: -300, y: 110, delay: 0.3 },
  { emoji: '🏆', name: 'Elo Checker', color: '#a855f7', x: 310, y: 120, delay: 0.45 },
]

export default function Cover({ onStart }) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-grid overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.10) 0%, transparent 70%)' }} />

      {/* Floating tool cards */}
      {floatingTools.map((tool) => (
        <motion.div
          key={tool.id}
          className="absolute hidden md:flex items-center gap-2 px-4 py-2 rounded-full card-glass"
          style={{ borderColor: `${tool.color}40`, boxShadow: `0 0 20px ${tool.color}20` }}
          initial={{ opacity: 0, x: tool.x * 0.7, y: tool.y * 0.7 }}
          animate={{
            opacity: 1,
            x: tool.x,
            y: tool.y,
          }}
          transition={{ delay: tool.delay + 0.8, duration: 0.6, ease: 'easeOut' }}
        >
          <span className="text-lg">{tool.emoji}</span>
          <span className="text-sm font-medium text-white/70">{tool.name}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-white/60">Built by our team · For every team</span>
          </div>

          <h1 className="text-7xl md:text-8xl font-black mb-5 tracking-tight text-gradient leading-none">
            AI Tools
          </h1>

          <p className="text-lg md:text-xl text-white/50 mb-10 leading-relaxed">
            4 tools built to eliminate manual work, speed up decisions,
            <br className="hidden md:block" /> and help every team move faster.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          onClick={onStart}
          whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(255,255,255,0.15)' }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all"
          style={{ background: 'white', color: '#070711' }}
        >
          <span>Explore Our Tools</span>
          <span className="text-lg">→</span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-5 text-xs text-white/25"
        >
          Press anywhere to continue
        </motion.p>
      </div>

      {/* Click anywhere */}
      <div className="absolute inset-0 cursor-pointer" onClick={onStart} style={{ zIndex: 0 }} />
    </motion.div>
  )
}
