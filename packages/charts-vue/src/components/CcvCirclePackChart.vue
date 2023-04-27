<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { CirclePackChart, CirclePackChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: CirclePackChartOptions
}

export default defineComponent({
	extends: CcvBaseChart,
	props: {
		data: {
			type: Object as PropType<ChartTabularData>,
			required: true
		},
		options: {
			type: Object as PropType<CirclePackChartOptions>,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Props
		this.coreChart = new CirclePackChart(this.$el as HTMLDivElement, { data, options })
	}
})
</script>

<template>
	<div class="ccv-circle-pack-chart"></div>
</template>
