<template>
	<div class="ccv-wordcloud-chart"></div>
</template>

<script>
import { WordCloudChart } from '@carbon/charts';
import CcvBaseChart from './ccv-base-chart.vue';

export default {
	name: 'CcvWordCloudChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new WordCloudChart(this.$el, {
			data: this.data,
			options: this.options,
		});
	},
};
</script>
