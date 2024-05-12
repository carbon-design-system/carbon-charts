import type { AxisChartOptions, ChartTabularData } from '@carbon/charts'

const dataZoomBar: ChartTabularData = [
	{ date: new Date(2019, 0, 1), value: 10000 },
	{ date: new Date(2019, 0, 2), value: 10 },
	{ date: new Date(2019, 0, 3), value: 75000 },
	{ date: new Date(2019, 0, 5), value: 65000 },
	{ date: new Date(2019, 0, 6), value: 57312 },
	{ date: new Date(2019, 0, 8), value: 10000 },
	{ date: new Date(2019, 0, 13), value: 49213 },
	{ date: new Date(2019, 0, 15), value: 70323 },
	{ date: new Date(2019, 0, 17), value: 51213 },
	{ date: new Date(2019, 0, 19), value: 21300 }
]

export const addZoomBarToOptions = (
	options: AxisChartOptions,
	configs: any = { includeDefinedZoomBarData: false }
) => {
	options['experimental'] = true
	if (configs.includeDefinedZoomBarData) {
		options.title += ' - Defined zoom bar enabled'
		options.zoomBar = {
			top: {
				enabled: true,
				data: dataZoomBar,
				...(configs.sliderView
					? {
							type: 'slider_view'
						}
					: null)
			}
		}
	} else {
		options.title += ' - Zoom bar enabled'
		options.zoomBar = {
			top: {
				enabled: true,
				...(configs.sliderView
					? {
							type: 'slider_view'
						}
					: null)
			}
		}
	}
	return options
}
