import type { AxisChartOptions, ChartTabularData } from '@carbon/charts'

const dataZoomBar: ChartTabularData = [
	{ date: '2023-01-01', value: 10000 },
	{ date: '2023-01-02', value: 10 },
	{ date: '2023-01-03', value: 75000 },
	{ date: '2023-01-05', value: 65000 },
	{ date: '2023-01-06', value: 57312 },
	{ date: '2023-01-08', value: 10000 },
	{ date: '2023-01-13', value: 49213 },
	{ date: '2023-01-15', value: 70323 },
	{ date: '2023-01-17', value: 51213 },
	{ date: '2023-01-19', value: 21300 }
]

export const addZoomBarToOptions = (
	options: AxisChartOptions,
	configs: { includeDefinedZoomBarData: boolean; sliderView?: boolean } = {
		includeDefinedZoomBarData: false
	}
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
