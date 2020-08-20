<template>
	<div class="ccv-legend-chart"></div>
</template>

<script>
import { LegendChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvLegendChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new LegendChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
