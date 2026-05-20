import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cpSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

function copyImagesPlugin() {
  let root
  let outDir

  return {
    name: 'copy-root-images',
    apply: 'build',
    configResolved(config) {
      root = config.root
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const source = resolve(root, 'images')
      const target = resolve(outDir, 'images')
      if (existsSync(source)) cpSync(source, target, { recursive: true })
    },
  }
}

export default defineConfig({
  plugins: [react(), copyImagesPlugin()],
})
