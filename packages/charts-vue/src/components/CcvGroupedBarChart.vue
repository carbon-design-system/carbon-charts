<script lang="ts">
import { defineComponent } from 'vue'
import { GroupedBarChart, type BarChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: BarChartOptions
}

export default defineComponent({
	extends: CcvBaseChart,
	props: {
		data: {
			type: Object as () => ChartTabularData,
			required: true
		},
		options: {
			type: Object as () => BarChartOptions,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Props
		this.coreChart = new GroupedBarChart(this.$el as HTMLDivElement, {
			data,
			options
		})
	}
})
</script>

<template>
	<div class="ccv-grouped-bar-chart"></div>
</template>
