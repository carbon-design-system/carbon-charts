<script lang="ts">
import { defineComponent } from 'vue'
import { HeatmapChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvHeatmapChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new HeatmapChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.HeatmapChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-heatmap-chart"></div>
</template>
