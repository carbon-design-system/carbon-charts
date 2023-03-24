<script lang="ts">
import { defineComponent } from 'vue'
import { AlluvialChart, type AlluvialChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvAlluvialChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new AlluvialChart(this.$el as HTMLDivElement, {
			data: this.data as ChartTabularData,
			options: this.options as AlluvialChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-alluvial-chart"></div>
</template>
