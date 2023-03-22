<script lang="ts">
import { defineComponent } from 'vue'
import { AreaChart, type interfaces  } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvAreaChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new AreaChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.AreaChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-area-chart"></div>
</template>
