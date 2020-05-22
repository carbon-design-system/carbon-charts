<template>
	<div class="ccv-line-chart"></div>
</template>

<script>
import { LineChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvLineChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new LineChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
