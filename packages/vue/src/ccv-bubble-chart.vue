<template>
	<div class="ccv-bubble-chart"></div>
</template>

<script>
import { BubbleChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvBubbleChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new BubbleChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
