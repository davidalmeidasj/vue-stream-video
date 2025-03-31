import { defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

const resolvedViteConfig = viteConfig({ mode: 'test', command: 'serve' })

export default defineConfig({
  plugins: resolvedViteConfig.plugins,
  resolve: resolvedViteConfig.resolve,

  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    setupFiles: ['./test/setup.ts'],
    css: false,
    deps: {
      optimizer: {
        web: {
          include: ['vuetify'],
        },
      },
    },
  },
})
