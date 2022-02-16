<template>
	<div class="ccv-tree-chart"></div>
</template>

<script>
import { TreeChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvTreeChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new TreeChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
