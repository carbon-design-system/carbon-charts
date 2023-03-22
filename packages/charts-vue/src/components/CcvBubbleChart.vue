<script lang="ts">
import { defineComponent } from 'vue'
import { BubbleChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvBubbleChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new BubbleChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.BubbleChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-bubble-chart"></div>
</template>
