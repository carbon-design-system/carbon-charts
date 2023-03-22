<script lang="ts">
import { defineComponent } from 'vue'
import { BoxplotChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvBoxplotChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new BoxplotChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.BoxplotChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-boxplot-chart"></div>
</template>
