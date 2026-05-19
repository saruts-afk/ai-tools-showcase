import { motion } from 'framer-motion'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function ToolDetail({ tool, tools, onShowFeatures, onBack, onSelectTool }) {
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
          ← All Tools
        </button>

        {/* Tool switcher */}
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
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: tool.bgColor, border: `1px solid ${tool.color}30` }}>
              {tool.emoji}
            </div>
            <div>
              <h1 className="text-4xl font-black text-white">{tool.name}</h1>
              <p className="font-medium mt-0.5" style={{ color: tool.color }}>{tool.tagline}</p>
            </div>
          </div>
          <p className="text-white/50 text-base leading-relaxed pl-20">{tool.description}</p>
        </motion.div>

        {/* Pain Points */}
        <Section
          icon="😤"
          label="Pain Points"
          sublabel="What's slowing the team down"
          accentColor="#f87171"
          bgColor="rgba(248,113,113,0.07)"
          borderColor="rgba(248,113,113,0.2)"
          items={tool.painPoints}
          itemIcon="⚠️"
        />

        {/* Solution */}
        <Section
          icon="💡"
          label="Our Solution"
          sublabel="How this tool solves it"
          accentColor="#34d399"
          bgColor="rgba(52,211,153,0.07)"
          borderColor="rgba(52,211,153,0.2)"
          items={tool.solutions}
          itemIcon="✅"
        />

        {/* Benefit */}
        <Section
          icon="🚀"
          label="What You Gain"
          sublabel="Real outcomes for your team"
          accentColor="#60a5fa"
          bgColor="rgba(96,165,250,0.07)"
          borderColor="rgba(96,165,250,0.2)"
          items={tool.benefits}
          itemIcon="⚡"
        />

        {/* Ready badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex items-center gap-4 p-5 rounded-2xl mb-10"
          style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)' }}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-400/15 flex items-center justify-center text-xl">✅</div>
          <div>
            <p className="text-sm font-semibold text-emerald-400">Tool Status: Ready to Use</p>
            <p className="text-xs text-white/40 mt-0.5">This tool is live and available for your team right now</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            LIVE
          </div>
        </motion.div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.4 }}
          onClick={onShowFeatures}
          whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${tool.shadowColor}` }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all"
          style={{ background: tool.color, color: 'white' }}
        >
          See Key Features & Live Demo
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >→</motion.span>
        </motion.button>
      </div>
    </motion.div>
  )
}

function Section({ icon, label, sublabel, accentColor, bgColor, borderColor, items, itemIcon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 rounded-2xl overflow-hidden"
      style={{ background: bgColor, border: `1px solid ${borderColor}` }}
    >
      <div className="px-6 py-4 flex items-center gap-3"
        style={{ borderBottom: `1px solid ${borderColor}` }}>
        <span className="text-xl">{icon}</span>
        <div>
          <p className="font-bold text-white text-sm">{label}</p>
          <p className="text-xs" style={{ color: accentColor, opacity: 0.8 }}>{sublabel}</p>
        </div>
      </div>
      <motion.ul
        className="px-6 py-5 space-y-3"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {items.map((item, i) => (
          <motion.li key={i} variants={fadeUp} className="flex items-start gap-3">
            <span className="mt-0.5 text-base flex-shrink-0">{itemIcon}</span>
            <span className="text-sm text-white/70 leading-relaxed">{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
