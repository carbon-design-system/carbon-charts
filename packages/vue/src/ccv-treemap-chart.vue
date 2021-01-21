<template>
	<div class="ccv-treemap-chart"></div>
</template>

<script>
import { TreemapChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvTreemapChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new TreemapChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
