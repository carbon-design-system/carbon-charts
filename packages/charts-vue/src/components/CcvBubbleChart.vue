<script lang="ts">
import { defineComponent } from 'vue'
import { BubbleChart, type BubbleChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvBubbleChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new BubbleChart(this.$el, {
			data: this.data as ChartTabularData,
			options: this.options as BubbleChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-bubble-chart"></div>
</template>
