<template>
	<div class="ccv-bullet-chart"></div>
</template>

<script>
import { BulletChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvBulletChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new BulletChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
