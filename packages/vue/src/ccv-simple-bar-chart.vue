<template>
	<div class="ccv-simple-bar-chart"></div>
</template>

<script>
import { SimpleBarChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvSimpleBarChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new SimpleBarChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
