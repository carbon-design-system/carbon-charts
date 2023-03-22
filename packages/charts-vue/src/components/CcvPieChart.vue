<script lang="ts">
import { defineComponent } from 'vue'
import { PieChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvPieChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new PieChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.PieChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-pie-chart"></div>
</template>
