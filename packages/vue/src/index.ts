import {
	CcvAlluvialChart,
	CcvAreaChart,
	CcvBoxplotChart,
	CcvBubbleChart,
	CcvBulletChart,
	CcvCirclePackChart,
	CcvComboChart,
	CcvDonutChart,
	CcvGaugeChart,
	CcvGroupedBarChart,
	CcvHeatmapChart,
	CcvHistogramChart,
	CcvLineChart,
	CcvLollipopChart,
	CcvMeterChart,
	CcvPieChart,
	CcvRadarChart,
	CcvScatterChart,
	CcvSimpleBarChart,
	CcvStackedAreaChart,
	CcvStackedBarChart,
	CcvTreeChart,
	CcvTreemapChart,
	CcvWordCloudChart
} from './components'

// Next revision to export components in custom elements library
// https://vuejs.org/guide/extras/web-components.html#building-custom-elements-with-vue

const components = [
	CcvAreaChart,
	CcvStackedAreaChart,
	CcvSimpleBarChart,
	CcvGroupedBarChart,
	CcvStackedBarChart,
	CcvBoxplotChart,
	CcvBubbleChart,
	CcvBulletChart,
	CcvDonutChart,
	CcvGaugeChart,
	CcvHistogramChart,
	CcvLineChart,
	CcvLollipopChart,
	CcvPieChart,
	CcvScatterChart,
	CcvMeterChart,
	CcvRadarChart,
	CcvComboChart,
	CcvTreeChart,
	CcvTreemapChart,
	CcvCirclePackChart,
	CcvWordCloudChart,
	CcvAlluvialChart,
	CcvHeatmapChart
]

/*
  Allows the module to be used as a Vue plug-in, and has an install()
  method (which is called when the plug-in loads) that registers all the
  components.
*/
export default {
	// options is an array of components to be registered
	// e.g. ['c-button', 'c-modal']
	install(Vue: any, options: any) {
		if (typeof options === 'undefined') {
			for (const c of components) {
				Vue.component(c.name, c)
			}
		} else {
			if (!(options instanceof Array)) {
				throw new TypeError('options must be an array')
			}

			for (const c of components) {
				// register only components specified in the options
				if (options.includes(c.name)) {
					Vue.component(c.name, c)
				}
			}
		}
	}
}

/*
  Allows import of individual components from the module, as an
  alternative to loading them all via a Vue plug-in.
*/
export {
	CcvAreaChart,
	CcvStackedAreaChart,
	CcvSimpleBarChart,
	CcvGroupedBarChart,
	CcvStackedBarChart,
	CcvBoxplotChart,
	CcvBubbleChart,
	CcvBulletChart,
	CcvDonutChart,
	CcvGaugeChart,
	CcvHistogramChart,
	CcvLineChart,
	CcvLollipopChart,
	CcvPieChart,
	CcvScatterChart,
	CcvMeterChart,
	CcvRadarChart,
	CcvComboChart,
	CcvTreeChart,
	CcvTreemapChart,
	CcvCirclePackChart,
	CcvWordCloudChart,
	CcvAlluvialChart,
	CcvHeatmapChart
}
