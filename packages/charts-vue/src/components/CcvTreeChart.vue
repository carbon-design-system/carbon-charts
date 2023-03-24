<script lang="ts">
import { defineComponent } from 'vue'
import { TreeChart, type TreeChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvTreeChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new TreeChart(this.$el as HTMLDivElement, {
			data: this.data as ChartTabularData,
			options: this.options as TreeChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-tree-chart"></div>
</template>
