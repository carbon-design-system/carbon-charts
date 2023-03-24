<script lang="ts">
import { defineComponent } from 'vue'
import { ScatterChart, type ScatterChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvScatterChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new ScatterChart(this.$el as HTMLDivElement, {
			data: this.data as ChartTabularData,
			options: this.options as ScatterChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-scatter-chart"></div>
</template>
