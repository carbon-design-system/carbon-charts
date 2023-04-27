<script lang="ts">
import { defineComponent } from 'vue'
import { PieChart, type PieChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: PieChartOptions
}

export default defineComponent({
	extends: CcvBaseChart,
	props: {
		data: {
			type: Array as () => ChartTabularData,
			required: true
		},
		options: {
			type: Object as () => PieChartOptions,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Props
		this.coreChart = new PieChart(this.$el as HTMLDivElement, { data, options })
	}
})
</script>

<template>
	<div class="ccv-pie-chart"></div>
</template>
