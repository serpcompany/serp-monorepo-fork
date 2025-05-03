// @ts-check
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createConfig } from '../../../../eslint.config.mjs'
import withNuxt from './.nuxt/eslint.config.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Create base config first
const baseConfig = createConfig({
  quiet: false,
  additionalRules: {},
  additionalIgnores: ['./**'], // This will ignore all files in this directory
  baseDirectory: __dirname
})

// Apply our overrides
baseConfig[1].rules = {
  ...baseConfig[1].rules,
  'no-unused-vars': 'off',
  'vue/no-setup-props-destructure': 'off'
}

// Add a specific ignore configuration at the beginning
baseConfig.unshift({
  ignores: ['./**'] // Explicitly ignore everything in this directory and subdirectories
})

export default withNuxt(baseConfig)
