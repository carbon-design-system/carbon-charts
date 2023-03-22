<script lang="ts">
import { defineComponent } from 'vue'
import { GaugeChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvGaugeChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new GaugeChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.GaugeChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-gauge-chart"></div>
</template>
