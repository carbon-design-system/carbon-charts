<script lang="ts">
import { defineComponent } from 'vue'
import { StackedBarChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvStackedBarChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new StackedBarChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.StackedBarChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-stacked-bar-chart"></div>
</template>
