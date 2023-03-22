<script lang="ts">
import { defineComponent } from 'vue'
import { GroupedBarChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvGroupedBarChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new GroupedBarChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.BarChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-grouped-bar-chart"></div>
</template>
