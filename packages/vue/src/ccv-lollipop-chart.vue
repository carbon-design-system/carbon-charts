<template>
	<div class="ccv-lollipop-chart"></div>
</template>

<script>
import { LollipopChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvLollipopChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new LollipopChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
