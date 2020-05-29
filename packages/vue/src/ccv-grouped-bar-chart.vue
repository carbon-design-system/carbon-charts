<template>
	<div class="ccv-grouped-bar-chart"></div>
</template>

<script>
import { GroupedBarChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvGroupedBarChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new GroupedBarChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
