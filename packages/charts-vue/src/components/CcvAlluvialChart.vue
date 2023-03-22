<script lang="ts">
import { defineComponent } from 'vue'
import { AlluvialChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvAlluvialChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new AlluvialChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.AlluvialChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-alluvial-chart"></div>
</template>
