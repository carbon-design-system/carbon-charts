<script lang="ts">
import { defineComponent } from 'vue'
import { HistogramChart, type HistogramChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvHistogramChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new HistogramChart(this.$el, {
			data: this.data as ChartTabularData,
			options: this.options as HistogramChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-histogram-chart"></div>
</template>
