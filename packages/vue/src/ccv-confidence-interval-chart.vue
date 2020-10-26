<template>
	<div class="ccv-confidence-interval-chart"></div>
</template>

<script>
import { ConfidenceIntervalChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvConfidenceIntervalChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new ConfidenceIntervalChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
