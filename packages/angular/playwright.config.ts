import { defineConfig } from '@playwright/test'
import { buildConfig } from '../../tests/playwright.config'

export default defineConfig(buildConfig(3001))
