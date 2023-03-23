<script lang="ts">
import { defineComponent } from 'vue'
import { RadarChart, type RadarChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvRadarChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new RadarChart(this.$el, {
			data: this.data as ChartTabularData,
			options: this.options as RadarChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-radar-chart"></div>
</template>
