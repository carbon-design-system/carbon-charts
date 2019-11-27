<template>
	<div class="ccv-donut-chart"></div>
</template>

<script>
import { DonutChart } from '@ibm-sterling/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvDonutChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new DonutChart(this.$el, {
			data: this.data,
			options: this.options
		});
	}
};
</script>
