<script lang="ts">
import { defineComponent } from 'vue'
import { StackedBarChart, type StackedBarChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvStackedBarChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new StackedBarChart(this.$el as HTMLDivElement, {
			data: this.data as ChartTabularData,
			options: this.options as StackedBarChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-stacked-bar-chart"></div>
</template>
