<script lang="ts">
import { defineComponent } from 'vue'
import { StackedAreaChart, StackedAreaChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: StackedAreaChartOptions
}

export default defineComponent({
	extends: CcvBaseChart,
	props: {
		data: {
			type: Object as () => ChartTabularData,
			required: true
		},
		options: {
			type: Object as () => StackedAreaChartOptions,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Props
		this.coreChart = new StackedAreaChart(this.$el as HTMLDivElement, {
			data,
			options
		})
	}
})
</script>

<template>
	<div class="ccv-stacked-area-chart"></div>
</template>
