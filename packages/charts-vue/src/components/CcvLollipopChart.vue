<script lang="ts">
import { defineComponent } from 'vue'
import { LollipopChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvLollipopChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new LollipopChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.LollipopChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-lollipop-chart"></div>
</template>
