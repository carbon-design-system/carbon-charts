<template>
	<div class="ccv-heatmap-chart"></div>
</template>

<script>
import { HeatmapChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvHeatmapChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new HeatmapChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
