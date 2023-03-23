<script lang="ts">
import { defineComponent } from 'vue'
import { DonutChart, type DonutChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvDonutChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new DonutChart(this.$el, {
			data: this.data as ChartTabularData,
			options: this.options as DonutChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-donut-chart"></div>
</template>
