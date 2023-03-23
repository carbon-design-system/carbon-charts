import type { interfaces } from '@carbon/charts'

export interface Demo {
	title: string
	isHighScale: boolean
	chartType: {
		vanilla: string
	}
	data: interfaces.ChartTabularData
	options: interfaces.BaseChartOptions
	codesandbox: {
		svelte: string
	}
}

export interface DemoGroup {
	storyGroupTitle: string
	title: string
	demos: Demo[]
}
