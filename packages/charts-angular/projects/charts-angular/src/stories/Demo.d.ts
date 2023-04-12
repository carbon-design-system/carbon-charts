import type { ChartTabularData, BaseChartOptions } from '@carbon/charts'

export interface Demo {
	title: string
	chartType: {
		vanilla: string
		angular: string
	}
	data: ChartTabularData
	options: BaseChartOptions
	codesandbox: {
		angular: string
	},
	code: {
		angular: any
	}
}

export interface DemoGroup {
	storyGroupTitle: string
	title: string
	demos: Demo[]
}
