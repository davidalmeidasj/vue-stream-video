import { vi, beforeAll } from 'vitest'
import { config } from '@vue/test-utils'
import { vuetify } from '../src/plugins/vuetify'

vi.mock('vuetify/lib/components/VBtn/VBtn.css', () => ({}))

beforeAll(() => {
  config.global.plugins = [vuetify]
})
