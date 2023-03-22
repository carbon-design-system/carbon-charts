<script lang="ts">
import { defineComponent } from 'vue'
import { LineChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvLineChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new LineChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.LineChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-line-chart"></div>
</template>
