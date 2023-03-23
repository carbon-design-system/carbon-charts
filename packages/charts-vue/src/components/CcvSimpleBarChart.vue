<script lang="ts">
import { defineComponent } from 'vue'
import { SimpleBarChart, type BarChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvSimpleBarChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new SimpleBarChart(this.$el, {
			data: this.data as ChartTabularData,
			options: this.options as BarChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-simple-bar-chart"></div>
</template>
