<template>
	<div class="ccv-scatter-chart"></div>
</template>

<script>
import { ScatterChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvScatterChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new ScatterChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
