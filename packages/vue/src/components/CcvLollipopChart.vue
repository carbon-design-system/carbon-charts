<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { LollipopChart, LollipopChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: LollipopChartOptions
}

export default defineComponent({
	name: 'CcvLollipopChart',
	extends: CcvBaseChart,
	props: {
		data: {
			type: Array as PropType<ChartTabularData>,
			required: true
		},
		options: {
			type: Object as PropType<LollipopChartOptions>,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Props
		this.coreChart = new LollipopChart(this.$el as HTMLDivElement, {
			data,
			options
		})
	}
})
</script>

<template>
	<div class="ccv-lollipop-chart"></div>
</template>
