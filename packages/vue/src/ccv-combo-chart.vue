<template>
	<div class="ccv-combo-chart"></div>
</template>

<script>
import { ComboChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';
export default {
	name: 'CcvComboChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new ComboChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
