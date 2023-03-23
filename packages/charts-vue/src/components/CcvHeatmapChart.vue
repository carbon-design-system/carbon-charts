<script lang="ts">
import { defineComponent } from 'vue'
import { HeatmapChart, type HeatmapChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvHeatmapChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new HeatmapChart(this.$el, {
			data: this.data as ChartTabularData,
			options: this.options as HeatmapChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-heatmap-chart"></div>
</template>
