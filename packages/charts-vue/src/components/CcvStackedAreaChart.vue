<script lang="ts">
import { defineComponent } from 'vue'
import { StackedAreaChart, type StackedAreaChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvStackedAreaChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new StackedAreaChart(this.$el, {
			data: this.data as ChartTabularData,
			options: this.options as StackedAreaChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-stacked-area-chart"></div>
</template>
