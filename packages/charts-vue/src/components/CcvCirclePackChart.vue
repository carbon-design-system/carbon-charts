<script lang="ts">
import { defineComponent } from 'vue'
import { CirclePackChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvCirclePackChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new CirclePackChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.CirclePackChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-circle-pack-chart"></div>
</template>
