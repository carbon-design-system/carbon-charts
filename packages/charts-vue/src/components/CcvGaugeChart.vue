<script lang="ts">
import { defineComponent } from 'vue'
import { GaugeChart, type GaugeChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: GaugeChartOptions
}

export default defineComponent({
	extends: CcvBaseChart,
	props: {
		data: {
			type: Object as () => ChartTabularData,
			required: true
		},
		options: {
			type: Object as () => GaugeChartOptions,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Props
		this.coreChart = new GaugeChart(this.$el as HTMLDivElement, {
			data,
			options
		})
	}
})
</script>

<template>
	<div class="ccv-gauge-chart"></div>
</template>
