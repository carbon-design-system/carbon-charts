<template>
	<div class="ccv-stacked-bar-chart"></div>
</template>

<script>
import { StackedBarChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvStackedBarChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new StackedBarChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
