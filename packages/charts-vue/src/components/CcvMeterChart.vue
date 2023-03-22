<script lang="ts">
import { defineComponent } from 'vue'
import { MeterChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvMeterChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new MeterChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.MeterChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-meter-chart"></div>
</template>
