<script lang="ts">
import { defineComponent } from 'vue'
import { TreeChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvTreeChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new TreeChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.TreeChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-tree-chart"></div>
</template>
