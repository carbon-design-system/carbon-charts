<script lang="ts">
import { defineComponent } from 'vue'
import { ScatterChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvScatterChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new ScatterChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.ScatterChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-scatter-chart"></div>
</template>
