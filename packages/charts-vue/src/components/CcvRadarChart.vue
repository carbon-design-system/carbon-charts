<script lang="ts">
import { defineComponent } from 'vue'
import { RadarChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvRadarChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new RadarChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.RadarChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-radar-chart"></div>
</template>
