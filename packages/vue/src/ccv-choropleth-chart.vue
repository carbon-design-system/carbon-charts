<template>
	<div class="experimental-ccv-choropleth-chart"></div>
</template>

<script>
import { EXPERIMENTAL_ChoroplethChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvChoroplethChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new EXPERIMENTAL_ChoroplethChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
