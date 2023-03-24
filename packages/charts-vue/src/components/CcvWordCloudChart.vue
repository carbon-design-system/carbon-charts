<script lang="ts">
import { defineComponent } from 'vue'
import { WordCloudChart, type WorldCloudChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvWordCloudChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new WordCloudChart(this.$el as HTMLDivElement, {
			data: this.data as ChartTabularData,
			options: this.options as WorldCloudChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-wordcloud-chart"></div>
</template>
