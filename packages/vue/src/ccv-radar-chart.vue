<template>
	<div class="ccv-radar-chart"></div>
</template>

<script>
import { RadarChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvRadarChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new RadarChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
