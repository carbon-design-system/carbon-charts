<script lang="ts">
import { defineComponent } from 'vue'
import { WordCloudChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvWordCloudChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new WordCloudChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.WorldCloudChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-wordcloud-chart"></div>
</template>
