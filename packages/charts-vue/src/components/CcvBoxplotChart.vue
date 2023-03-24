<script lang="ts">
import { defineComponent } from 'vue'
import { BoxplotChart, type BoxplotChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvBoxplotChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new BoxplotChart(this.$el as HTMLDivElement, {
			data: this.data as ChartTabularData,
			options: this.options as BoxplotChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-boxplot-chart"></div>
</template>
