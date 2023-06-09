<script lang="ts">
import { defineComponent } from 'vue'
import { ScatterChart, ScatterChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: ScatterChartOptions
}

export default defineComponent({
	name: 'CcvScatterChart',
	extends: CcvBaseChart,
	props: {
		data: {
			type: Object as () => ChartTabularData,
			required: true
		},
		options: {
			type: Object as () => ScatterChartOptions,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Props
		this.coreChart = new ScatterChart(this.$el as HTMLDivElement, {
			data,
			options
		})
	}
})
</script>

<template>
	<div class="ccv-scatter-chart"></div>
</template>
