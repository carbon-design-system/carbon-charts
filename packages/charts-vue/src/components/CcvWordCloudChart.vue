<script lang="ts">
import { defineComponent } from 'vue'
import { WordCloudChart, type ChartTabularData, type WorldCloudChartOptions } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: WorldCloudChartOptions
}

export default defineComponent({
	extends: CcvBaseChart,
	props: {
		data: {
			type: Object as () => ChartTabularData,
			required: true
		},
		options: {
			type: Object as () => WorldCloudChartOptions,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Readonly<Props>
		this.coreChart = new WordCloudChart(this.$el as HTMLDivElement, {
			data,
			options
		})
	}
})
</script>

<template>
	<div class="ccv-wordcloud-chart"></div>
</template>
