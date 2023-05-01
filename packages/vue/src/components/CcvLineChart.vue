<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { LineChart, LineChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: LineChartOptions
}

export default defineComponent({
	extends: CcvBaseChart,
	props: {
		data: {
			type: Array as PropType<ChartTabularData>,
			required: true
		},
		options: {
			type: Object as PropType<LineChartOptions>,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Props
		this.coreChart = new LineChart(this.$el as HTMLDivElement, { data, options })
	}
})
</script>

<template>
	<div class="ccv-line-chart"></div>
</template>
