import { defineComponent, onMounted, ref, watch, toRefs } from 'vue'
import type { Chart, ChartTabularData, ChartOptions } from '@carbon/charts'

export function chartFactory<T extends ChartOptions>(chartType: any, chartName: string) {
	return defineComponent({
		name: chartName,
		props: {
			data: {
				type: Object as () => ChartTabularData,
				required: true
			},
			options: {
				type: Object as () => T,
				required: true
			}
		},
		setup(props) {
			const chartDiv = ref<HTMLDivElement | null>(null)
			const chart = ref<Chart | null>(null)
			const { data, options } = toRefs(props)

			onMounted(() => {
				chart.value = new chartType(chartDiv.value, {
					data: data.value,
					options: options.value
				})
			})

			watch(
				data,
				(newData: ChartTabularData) => {
					chart.value?.model.setData(newData)
				},
				{ immediate: true }
			)

			watch(options as T, (newOptions: T) => {
				chart.value?.model.setOptions(newOptions)
			})

			return { chart, chartDiv }
		},
		template: `<div ref="chartDiv"></div>`
	})
}
