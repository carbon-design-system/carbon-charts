<script lang="ts">
import { defineComponent } from 'vue'
import { TreemapChart, type TreemapChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvTreemapChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new TreemapChart(this.$el as HTMLDivElement, {
			data: this.data as ChartTabularData,
			options: this.options as TreemapChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-treemap-chart"></div>
</template>
