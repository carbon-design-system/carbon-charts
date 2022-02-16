<template>
	<div class="ccv-stacked-area-chart"></div>
</template>

<script>
import { StackedAreaChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvStackedAreaChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new StackedAreaChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
