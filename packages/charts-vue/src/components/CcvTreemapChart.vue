<script lang="ts">
import { defineComponent } from 'vue'
import { TreemapChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvTreemapChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new TreemapChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.TreemapChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-treemap-chart"></div>
</template>
