<template>
	<div class="ccv-circle-pack-chart"></div>
</template>

<script>
import { CirclePackChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvCirclePackChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new CirclePackChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
