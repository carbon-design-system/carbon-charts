<template>
	<div class="ccv-pie-chart"></div>
</template>

<script>
import { PieChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvPieChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new PieChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
