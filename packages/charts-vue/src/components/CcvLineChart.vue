<script lang="ts">
import { defineComponent } from 'vue'
import { LineChart, type LineChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvLineChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new LineChart(this.$el as HTMLDivElement, {
			data: this.data as ChartTabularData,
			options: this.options as LineChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-line-chart"></div>
</template>
