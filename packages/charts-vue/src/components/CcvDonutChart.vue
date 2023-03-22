<script lang="ts">
import { defineComponent } from 'vue'
import { DonutChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvDonutChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new DonutChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.DonutChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-donut-chart"></div>
</template>
