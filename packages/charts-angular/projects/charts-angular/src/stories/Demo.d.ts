import type { ChartTabularData, BaseChartOptions } from '@carbon/charts'

export interface Demo {
	title: string
	isHighScale: boolean
	chartType: {
		vanilla: string
		angular: string
	}
	data: ChartTabularData
	options: BaseChartOptions
	codesandbox: {
		angular: string
	}
}

export interface DemoGroup {
	storyGroupTitle: string
	title: string
	demos: Demo[]
}
