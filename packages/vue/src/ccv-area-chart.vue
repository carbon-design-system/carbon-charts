<template>
	<div class="ccv-area-chart"></div>
</template>

<script>
import { AreaChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvAreaChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new AreaChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
