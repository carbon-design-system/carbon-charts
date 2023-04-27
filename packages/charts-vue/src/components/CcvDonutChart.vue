<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DonutChart, DonutChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: DonutChartOptions
}

export default defineComponent({
	extends: CcvBaseChart,
	props: {
		data: {
			type: Object as PropType<ChartTabularData>,
			required: true
		},
		options: {
			type: Object as PropType<DonutChartOptions>,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Props
		this.coreChart = new DonutChart(this.$el as HTMLDivElement, { data, options })
	}
})
</script>

<template>
	<div class="ccv-donut-chart"></div>
</template>
