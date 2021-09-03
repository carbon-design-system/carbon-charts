<template>
	<div class="ccv-alluvial-chart"></div>
</template>

<script>
import { AlluvialChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvAlluvialChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new AlluvialChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
