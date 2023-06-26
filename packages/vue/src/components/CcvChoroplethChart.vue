<script lang="ts">
import { defineComponent } from 'vue'
import { ChartTabularData, ChoroplethChartOptions, ExperimentalChoroplethChart as ChoroplethChart } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: ChoroplethChartOptions
}

export default defineComponent({
	name: 'ExperimentalCcvChoroplethChart',
	extends: CcvBaseChart,
	props: {
		data: {
			type: Object as () => ChartTabularData,
			required: true
		},
		options: {
			type: Object as () => ChoroplethChartOptions,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Props
		this.coreChart = new ChoroplethChart(this.$el as HTMLDivElement, { data, options	})
	}
})
</script>

<template>
	<div class="experimental-ccv-choropleth-chart"></div>
</template>