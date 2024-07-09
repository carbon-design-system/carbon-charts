import { type ComboChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts'
import type { ChartTypes, Example } from '../types'

const vanilla = 'ComboChart'

export const chartTypes: ChartTypes = {
	vanilla,
	svelte: vanilla,
	react: vanilla,
	angular: 'ibm-combo-chart',
	vue: `Ccv${vanilla}`
}

const comboSimpleOptions: ComboChartOptions = {
	title: 'Combo (Line + Simple bar) - custom configs',
	axes: {
		left: {
			mapsTo: 'value',
			scaleType: ScaleTypes.LINEAR,
			title: 'USA Summer School Attendance'
		},
		right: {
			mapsTo: 'temp',
			scaleType: ScaleTypes.LINEAR,
			title: 'Temperature (°F)',
			correspondingDatasets: ['Temperature']
		},
		bottom: {
			title: 'Day of the Week',
			mapsTo: 'date',
			scaleType: ScaleTypes.LABELS
		}
	},
	comboChartTypes: [
		{
			type: 'simple-bar',
			correspondingDatasets: ['School A']
		},
		{
			type: 'line',
			options: {
				points: {
					radius: 5
				}
			},
			correspondingDatasets: ['Temperature']
		}
	],
	height: '400px'
}

const comboSimpleFloatingOptions: ComboChartOptions = {
	title: 'Combo (Line + Floating bar)',
	axes: {
		left: {
			mapsTo: 'value',
			scaleType: ScaleTypes.LINEAR,
			title: 'USA Summer School Attendance',
			correspondingDatasets: ['School A']
		},
		right: {
			mapsTo: 'temp',
			title: 'Temperature (°F)'
		},
		bottom: {
			title: 'Day of the Week',
			mapsTo: 'date',
			scaleType: ScaleTypes.LABELS
		}
	},
	comboChartTypes: [
		{ type: 'simple-bar', correspondingDatasets: ['Temperature'] },
		{
			type: 'line',
			options: { points: { radius: 5 } },
			correspondingDatasets: ['School A']
		}
	],
	height: '400px'
}

const comboHorizontalOptions: ComboChartOptions = {
	title: 'Horizontal Combo (Line + Simple bar)',
	axes: {
		top: {
			mapsTo: 'value',
			scaleType: ScaleTypes.LINEAR,
			title: 'USA Summer School Attendance'
		},
		bottom: {
			mapsTo: 'temp',
			scaleType: ScaleTypes.LINEAR,
			title: 'Temperature (°F)',
			correspondingDatasets: ['Temperature']
		},
		left: {
			title: 'Day of the Week',
			mapsTo: 'date',
			scaleType: ScaleTypes.LABELS
		}
	},
	comboChartTypes: [
		{
			type: 'simple-bar',
			options: {},
			correspondingDatasets: ['School A']
		},
		{
			type: 'line',
			options: {},
			correspondingDatasets: ['Temperature']
		}
	],
	height: '400px'
}

const comboStackedOptions: ComboChartOptions = {
	title: 'Combo (Line + Stacked bar)',
	axes: {
		left: {
			title: 'Disney Park Attendance',
			mapsTo: 'value',
			stacked: true
		},
		bottom: {
			title: '2018 Annual Sales Figures',
			mapsTo: 'key',
			scaleType: ScaleTypes.LABELS
		},
		right: {
			title: 'Temperature (°C)',
			mapsTo: 'temp',
			correspondingDatasets: ['Temperature']
		}
	},
	comboChartTypes: [
		{
			type: 'stacked-bar',
			options: {},
			correspondingDatasets: ['Florida', 'California', 'Tokyo']
		},
		{
			type: 'line',
			options: {},
			correspondingDatasets: ['Temperature']
		}
	],
	height: '400px'
}

const comboGroupedOptions: ComboChartOptions = {
	title: 'Combo (Line + Grouped bar) - custom configs',
	axes: {
		left: {
			title: 'Sales',
			mapsTo: 'value'
		},
		bottom: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		},
		right: {
			title: 'Temperature (°C)',
			mapsTo: 'temp',
			correspondingDatasets: ['Temperature']
		}
	},
	comboChartTypes: [
		{
			type: 'grouped-bar',
			correspondingDatasets: ['Location 1', 'Location 2', 'Location 3']
		},
		{
			type: 'line',
			options: {
				points: {
					filled: true,
					opacity: 0.5
				}
			},
			correspondingDatasets: ['Temperature']
		}
	],
	height: '400px'
}

const comboGroupedHorizontalOptions: ComboChartOptions = {
	title: 'Combo Horizontal (Line + Grouped bar)',
	axes: {
		top: {
			title: 'Sales',
			mapsTo: 'value',
			main: true
		},
		left: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		},
		bottom: {
			title: 'Temperature (°C)',
			mapsTo: 'temp',
			correspondingDatasets: ['Temperature']
		}
	},
	comboChartTypes: [
		{
			type: 'grouped-bar',
			correspondingDatasets: ['Location 1', 'Location 2', 'Location 3']
		},
		{
			type: 'line',
			correspondingDatasets: ['Temperature']
		}
	],
	height: '400px'
}

const comboAreaLineOptions: ComboChartOptions = {
	title: 'Combo (Line + Area)',
	points: {
		enabled: false
	},
	axes: {
		left: {
			title: 'Score',
			mapsTo: 'value'
		},
		bottom: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		},
		right: {
			title: 'Temperature (°C)',
			mapsTo: 'temp',
			correspondingDatasets: ['Temperature']
		}
	},
	comboChartTypes: [
		{
			type: 'area',
			options: {},
			correspondingDatasets: ['Health']
		},
		{
			type: 'line',
			options: {
				points: {
					enabled: true
				}
			},
			correspondingDatasets: ['Temperature']
		}
	],
	curve: 'curveNatural',
	height: '400px'
}

const comboLineScatterOptions: ComboChartOptions = {
	title: 'Combo (Line + Scatter + Bar)',
	axes: {
		left: {
			mapsTo: 'value',
			title: 'Attendance'
		},
		bottom: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		},
		right: {
			title: 'Temperature (°C)',
			mapsTo: 'temp',
			scaleType: ScaleTypes.LINEAR,
			correspondingDatasets: ['Avg Temperature', 'Paris', 'Marseille']
		}
	},
	curve: 'curveMonotoneX',
	comboChartTypes: [
		{
			type: 'simple-bar',
			correspondingDatasets: ['Attendance']
		},
		{
			type: 'scatter',
			correspondingDatasets: ['Paris', 'Marseille']
		},
		{
			type: 'line',
			correspondingDatasets: ['Avg Temperature']
		}
	],
	height: '400px'
}

const comboEmptyOptions: ComboChartOptions = {
	title: 'Combo Chart (empty)',
	axes: {
		left: {
			mapsTo: 'value',
			title: 'Attendance'
		},
		bottom: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		},
		right: {
			title: 'Temperature (°C)',
			mapsTo: 'temp',
			scaleType: ScaleTypes.LINEAR,
			correspondingDatasets: ['Temperature']
		}
	},
	comboChartTypes: [
		{
			type: 'simple-bar',
			correspondingDatasets: ['Attendance']
		},
		{
			type: 'line',
			correspondingDatasets: ['Temperature']
		}
	],
	height: '400px'
}

const comboLoadingOptions: ComboChartOptions = {
	title: 'Combo Chart (loading)',
	axes: {
		left: {
			mapsTo: 'value',
			title: 'Attendance'
		},
		bottom: {
			scaleType: ScaleTypes.LABELS,
			mapsTo: 'key'
		},
		right: {
			title: 'Temperature (°C)',
			mapsTo: 'temp',
			scaleType: ScaleTypes.LINEAR,
			correspondingDatasets: ['Temperature']
		}
	},
	data: {
		loading: true
	},
	comboChartTypes: [
		{
			type: 'simple-bar',
			correspondingDatasets: ['Attendance']
		},
		{
			type: 'line',
			correspondingDatasets: ['Temperature']
		}
	],
	height: '400px'
}

const comboStackedAreaLineOptions: ComboChartOptions = {
	title: 'Combo (Stacked Area + Line)',
	axes: {
		left: {
			title: 'left',
			stacked: true,
			mapsTo: 'value',
			titleOrientation: 'right'
		},
		bottom: {
			scaleType: ScaleTypes.TIME,
			mapsTo: 'date'
		},
		right: {
			title: 'right',
			scaleType: ScaleTypes.LINEAR,
			mapsTo: 'temp',
			correspondingDatasets: ['Temperature'],
			titleOrientation: 'left'
		}
	},
	curve: 'curveMonotoneX',
	comboChartTypes: [
		{
			type: 'stacked-area',
			options: {
				points: {
					enabled: false
				}
			},
			correspondingDatasets: ['Dataset 1', 'Dataset 2', 'Dataset 3']
		},
		{
			type: 'line',
			correspondingDatasets: ['Temperature']
		}
	],
	height: '400px'
}

const comboAreaLineTimeSeriesOptions: ComboChartOptions = {
	title: 'Combo (Line + Area) Time series',
	points: {
		enabled: false
	},
	axes: {
		left: {
			title: 'Score',
			mapsTo: 'value'
		},
		bottom: {
			scaleType: ScaleTypes.TIME,
			mapsTo: 'key'
		},
		right: {
			title: 'Temperature (°C)',
			mapsTo: 'temp',
			correspondingDatasets: ['Temperature']
		}
	},
	comboChartTypes: [
		{
			type: 'area',
			options: {},
			correspondingDatasets: ['Health']
		},
		{
			type: 'line',
			options: {
				points: {
					enabled: true
				}
			},
			correspondingDatasets: ['Temperature']
		}
	],
	curve: 'curveNatural',
	timeScale: {
		addSpaceOnEdges: 0
	},
	height: '400px'
}

const comboSimpleData: ChartTabularData = [
	{ group: 'School A', date: 'Monday', value: 10000 },
	{ group: 'School A', date: 'Tuesday', value: 65000 },
	{ group: 'School A', date: 'Wednesday', value: 30000 },
	{ group: 'School A', date: 'Thursday', value: 49213 },
	{ group: 'School A', date: 'Friday', value: 49213 },
	{ group: 'Temperature', date: 'Monday', temp: 70 },
	{ group: 'Temperature', date: 'Tuesday', temp: 75 },
	{ group: 'Temperature', date: 'Wednesday', temp: 31 },
	{ group: 'Temperature', date: 'Thursday', temp: 31 },
	{ group: 'Temperature', date: 'Friday', temp: 43 }
]

const comboSimpleFloatingData: ChartTabularData = [
	{ group: 'School A', date: 'Monday', value: 50000 },
	{ group: 'School A', date: 'Tuesday', value: 45000 },
	{ group: 'School A', date: 'Wednesday', value: 58000 },
	{ group: 'School A', date: 'Thursday', value: 31000 },
	{ group: 'School A', date: 'Friday', value: 33000 },
	{ group: 'Temperature', date: 'Monday', temp: [65, 70] },
	{ group: 'Temperature', date: 'Tuesday', temp: [67, 71] },
	{ group: 'Temperature', date: 'Wednesday', temp: [75, 83] },
	{ group: 'Temperature', date: 'Thursday', temp: [31, 42] },
	{ group: 'Temperature', date: 'Friday', temp: [43, 55] }
]

const comboStackedData: ChartTabularData = [
	{ group: 'Florida', key: 'Monday', value: 65000 },
	{ group: 'Florida', key: 'Tuesday', value: 29123 },
	{ group: 'Florida', key: 'Wednesday', value: 35213 },
	{ group: 'Florida', key: 'Thursday', value: 51213 },
	{ group: 'Florida', key: 'Friday', value: 16932 },
	{ group: 'California', key: 'Monday', value: 32432 },
	{ group: 'California', key: 'Tuesday', value: 21312 },
	{ group: 'California', key: 'Wednesday', value: 56456 },
	{ group: 'California', key: 'Thursday', value: 21312 },
	{ group: 'California', key: 'Friday', value: 34234 },
	{ group: 'Tokyo', key: 'Monday', value: 12312 },
	{ group: 'Tokyo', key: 'Tuesday', value: 23232 },
	{ group: 'Tokyo', key: 'Wednesday', value: 34232 },
	{ group: 'Tokyo', key: 'Thursday', value: 12312 },
	{ group: 'Tokyo', key: 'Friday', value: 34234 },
	{ group: 'Temperature', key: 'Monday', temp: 23 },
	{ group: 'Temperature', key: 'Tuesday', temp: 21 },
	{ group: 'Temperature', key: 'Wednesday', temp: 32 },
	{ group: 'Temperature', key: 'Thursday', temp: 34 },
	{ group: 'Temperature', key: 'Friday', temp: 23 }
]

const comboGroupedData: ChartTabularData = [
	{ group: 'Location 1', key: 'Monday', value: 65000 },
	{ group: 'Location 1', key: 'Tuesday', value: -39123 },
	{ group: 'Location 1', key: 'Wednesday', value: -35213 },
	{ group: 'Location 1', key: 'Thursday', value: 51213 },
	{ group: 'Location 1', key: 'Friday', value: 16932 },
	{ group: 'Location 2', key: 'Monday', value: 32432 },
	{ group: 'Location 2', key: 'Tuesday', value: -21312 },
	{ group: 'Location 2', key: 'Wednesday', value: -56456 },
	{ group: 'Location 2', key: 'Thursday', value: -21312 },
	{ group: 'Location 2', key: 'Friday', value: 34234 },
	{ group: 'Location 3', key: 'Monday', value: -12312 },
	{ group: 'Location 3', key: 'Tuesday', value: 23232 },
	{ group: 'Location 3', key: 'Wednesday', value: 34232 },
	{ group: 'Location 3', key: 'Thursday', value: -12312 },
	{ group: 'Location 3', key: 'Friday', value: -34234 },
	{ group: 'Temperature', key: 'Monday', temp: 20 },
	{ group: 'Temperature', key: 'Tuesday', temp: 23 },
	{ group: 'Temperature', key: 'Wednesday', temp: 33 },
	{ group: 'Temperature', key: 'Thursday', temp: 34 },
	{ group: 'Temperature', key: 'Friday', temp: 34 }
]

const comboGroupedHorizontalData: ChartTabularData = [
	{ group: 'Location 1', key: 'Monday', value: 65000 },
	{ group: 'Location 1', key: 'Tuesday', value: -39123 },
	{ group: 'Location 1', key: 'Wednesday', value: -35213 },
	{ group: 'Location 2', key: 'Monday', value: 32432 },
	{ group: 'Location 2', key: 'Tuesday', value: -21312 },
	{ group: 'Location 2', key: 'Wednesday', value: -56456 },
	{ group: 'Location 3', key: 'Monday', value: -12312 },
	{ group: 'Location 3', key: 'Tuesday', value: 23232 },
	{ group: 'Location 3', key: 'Wednesday', value: 34232 },
	{ group: 'Temperature', key: 'Monday', temp: 20 },
	{ group: 'Temperature', key: 'Tuesday', temp: 23 },
	{ group: 'Temperature', key: 'Wednesday', temp: 33 }
]

const comboAreaLineData: ChartTabularData = [
	{ group: 'Health', key: 'January', value: 312 },
	{ group: 'Health', key: 'February', value: 232 },
	{ group: 'Health', key: 'March', value: 432 },
	{ group: 'Health', key: 'April', value: 712 },
	{ group: 'Health', key: 'May', value: 834 },
	{ group: 'Health', key: 'June', value: 800 },
	{ group: 'Health', key: 'July', value: 612 },
	{ group: 'Health', key: 'August', value: 442 },
	{ group: 'Temperature', key: 'January', temp: -20 },
	{ group: 'Temperature', key: 'February', temp: -12 },
	{ group: 'Temperature', key: 'March', temp: 3 },
	{ group: 'Temperature', key: 'April', temp: 18 },
	{ group: 'Temperature', key: 'May', temp: 24 },
	{ group: 'Temperature', key: 'June', temp: 34 },
	{ group: 'Temperature', key: 'July', temp: 37 },
	{ group: 'Temperature', key: 'August', temp: 30 }
]

const comboLineScatterData: ChartTabularData = [
	{ group: 'Paris', key: 'Monday', temp: 25 },
	{ group: 'Paris', key: 'Tuesday', temp: 33 },
	{ group: 'Paris', key: 'Wednesday', temp: 27 },
	{ group: 'Paris', key: 'Thursday', temp: 25 },
	{ group: 'Paris', key: 'Friday', temp: 32 },
	{ group: 'Marseille', key: 'Monday', temp: 16 },
	{ group: 'Marseille', key: 'Tuesday', temp: 22 },
	{ group: 'Marseille', key: 'Wednesday', temp: 20 },
	{ group: 'Marseille', key: 'Thursday', temp: 22 },
	{ group: 'Marseille', key: 'Friday', temp: 25 },
	{ group: 'Avg Temperature', key: 'Monday', temp: 20.5 },
	{ group: 'Avg Temperature', key: 'Tuesday', temp: 27.5 },
	{ group: 'Avg Temperature', key: 'Wednesday', temp: 23.5 },
	{ group: 'Avg Temperature', key: 'Thursday', temp: 23.5 },
	{ group: 'Avg Temperature', key: 'Friday', temp: 28.5 },
	{ group: 'Attendance', key: 'Monday', value: 2650 },
	{ group: 'Attendance', key: 'Tuesday', value: 2553 },
	{ group: 'Attendance', key: 'Wednesday', value: 3433 },
	{ group: 'Attendance', key: 'Thursday', value: 3754 },
	{ group: 'Attendance', key: 'Friday', value: 3744 }
]

const comboEmptyData: ChartTabularData = []

const comboLoadingData = comboLineScatterData

const comboStackedAreaLine: ChartTabularData = [
	{ group: 'Dataset 1', date: '2023-01-01', value: 10000 },
	{ group: 'Dataset 1', date: '2023-01-05', value: 65000 },
	{ group: 'Dataset 1', date: '2023-01-08', value: 10000 },
	{ group: 'Dataset 1', date: '2023-01-13', value: 49213 },
	{ group: 'Dataset 1', date: '2023-01-17', value: 51213 },
	{ group: 'Dataset 2', date: '2023-01-01', value: 20000 },
	{ group: 'Dataset 2', date: '2023-01-05', value: 25000 },
	{ group: 'Dataset 2', date: '2023-01-08', value: 60000 },
	{ group: 'Dataset 2', date: '2023-01-13', value: 30213 },
	{ group: 'Dataset 2', date: '2023-01-17', value: 55213 },
	{ group: 'Dataset 3', date: '2023-01-01', value: 30000 },
	{ group: 'Dataset 3', date: '2023-01-05', value: 20000 },
	{ group: 'Dataset 3', date: '2023-01-08', value: 40000 },
	{ group: 'Dataset 3', date: '2023-01-13', value: 60213 },
	{ group: 'Dataset 3', date: '2023-01-17', value: 25213 },
	{ group: 'Temperature', date: '2023-01-01', temp: 77 },
	{ group: 'Temperature', date: '2023-01-05', temp: 65 },
	{ group: 'Temperature', date: '2023-01-08', temp: 80 },
	{ group: 'Temperature', date: '2023-01-13', temp: 43 },
	{ group: 'Temperature', date: '2023-01-17', temp: 53 }
]

const comboAreaLineTimeSeriesData: ChartTabularData = [
	{ group: 'Health', key: '2022-12-30', value: 312 },
	{ group: 'Health', key: '2023-01-06', value: 232 },
	{ group: 'Health', key: '2023-01-08', value: 432 },
	{ group: 'Health', key: '2023-01-15', value: 712 },
	{ group: 'Health', key: '2023-01-19', value: 834 },
	{ group: 'Health', key: '2023-02-01', value: 800 },
	{ group: 'Health', key: '2023-02-05', value: 612 },
	{ group: 'Health', key: '2023-02-13', value: 442 },
	{ group: 'Temperature', key: '2023-01-01', temp: -20 },
	{ group: 'Temperature', key: '2023-01-05', temp: -12 },
	{ group: 'Temperature', key: '2023-01-08', temp: 3 },
	{ group: 'Temperature', key: '2023-01-13', temp: 18 },
	{ group: 'Temperature', key: '2023-01-19', temp: 24 },
	{ group: 'Temperature', key: '2023-02-02', temp: 34 },
	{ group: 'Temperature', key: '2023-02-07', temp: 37 },
	{ group: 'Temperature', key: '2023-02-09', temp: 30 }
]

const comboHorizontalData = comboSimpleData

export const examples: Example[] = [
	{
		options: comboSimpleOptions,
		data: comboSimpleData,
		tags: ['test']
	},
	{
		options: comboStackedOptions,
		data: comboStackedData,
		tags: ['test']
	},
	{
		options: comboGroupedOptions,
		data: comboGroupedData,
		tags: ['test']
	},
	{
		options: comboSimpleFloatingOptions,
		data: comboSimpleFloatingData,
		tags: ['test']
	},
	{
		options: comboGroupedHorizontalOptions,
		data: comboGroupedHorizontalData,
		tags: ['test']
	},
	{
		options: comboHorizontalOptions,
		data: comboHorizontalData,
		tags: ['test']
	},
	{
		options: comboAreaLineOptions,
		data: comboAreaLineData,
		tags: ['test']
	},
	{
		options: comboStackedAreaLineOptions,
		data: comboStackedAreaLine,
		tags: ['test']
	},
	{
		options: comboLineScatterOptions,
		data: comboLineScatterData,
		tags: ['test']
	},
	{
		options: comboAreaLineTimeSeriesOptions,
		data: comboAreaLineTimeSeriesData,
		tags: ['test']
	},
	{
		options: comboEmptyOptions,
		data: comboEmptyData
	},
	{
		options: comboLoadingOptions,
		data: comboLoadingData
	}
]
