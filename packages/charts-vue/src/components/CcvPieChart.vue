<script lang="ts">
import { defineComponent } from 'vue'
import { PieChart, type PieChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvPieChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new PieChart(this.$el as HTMLDivElement, {
			data: this.data as ChartTabularData,
			options: this.options as PieChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-pie-chart"></div>
</template>
