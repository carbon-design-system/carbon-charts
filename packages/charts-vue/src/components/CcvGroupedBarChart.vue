<script lang="ts">
import { defineComponent } from 'vue'
import { GroupedBarChart, type BarChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvGroupedBarChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new GroupedBarChart(this.$el as HTMLDivElement, {
			data: this.data as ChartTabularData,
			options: this.options as BarChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-grouped-bar-chart"></div>
</template>
