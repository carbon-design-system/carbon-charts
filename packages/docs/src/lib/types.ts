import type { ChartTabularData, ChartOptions } from '@carbon/charts'
export type Framework = 'html' | 'vanilla' | 'svelte' | 'react' | 'vue' | 'angular'

export interface ChartTypes {
	vanilla: string
	svelte: string
	react: string
	vue: string
	angular: string
}

export interface Example {
	data: ChartTabularData
	options: ChartOptions
	test?: boolean
}
