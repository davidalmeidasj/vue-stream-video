import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      vuetify({ autoImport: true }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        ...(mode === 'test'
          ? { '\\.css$': path.resolve(__dirname, './test/__mocks__/styleMock.js') }
          : {}),
      },
    },
  }
})
