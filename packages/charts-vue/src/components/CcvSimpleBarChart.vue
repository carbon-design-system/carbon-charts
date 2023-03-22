<script lang="ts">
import { defineComponent } from 'vue'
import { SimpleBarChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvSimpleBarChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new SimpleBarChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.BarChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-simple-bar-chart"></div>
</template>
