/// <reference types="vite/client" />

import { InlineConfig } from 'vitest'

declare module 'vite' {
	interface UserConfig {
		test?: InlineConfig
	}
}
