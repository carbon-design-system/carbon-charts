<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ComboChart, ComboChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: ComboChartOptions
}

export default defineComponent({
	extends: CcvBaseChart,
	props: {
		data: {
			type: Object as PropType<ChartTabularData>,
			required: true
		},
		options: {
			type: Object as PropType<ComboChartOptions>,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Props
		this.coreChart = new ComboChart(this.$el as HTMLDivElement, { data, options })
	}
})
</script>

<template>
	<div class="ccv-combo-chart"></div>
</template>
