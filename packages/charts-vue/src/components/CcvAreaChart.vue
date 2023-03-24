<script lang="ts">
import { defineComponent } from 'vue'
import { AreaChart, type AreaChartOptions, type ChartTabularData } from '@carbon/charts'

import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvAreaChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new AreaChart(this.$el as HTMLDivElement, {
			data: this.data as ChartTabularData,
			options: this.options as AreaChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-area-chart"></div>
</template>
