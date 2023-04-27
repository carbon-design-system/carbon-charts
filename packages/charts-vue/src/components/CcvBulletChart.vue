<script lang="ts">
import { defineComponent } from 'vue'
import { BulletChart, BulletChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
	data: ChartTabularData
	options: BulletChartOptions
}

export default defineComponent({
	extends: CcvBaseChart,
	props: {
		data: {
			type: Object as () => ChartTabularData,
			required: true
		},
		options: {
			type: Object as () => BulletChartOptions,
			required: true
		}
	},
	mounted() {
		const { data, options } = this.$props as Props
		this.coreChart = new BulletChart(this.$el as HTMLDivElement, { data, options })
	}
})
</script>

<template>
	<div class="ccv-bullet-chart"></div>
</template>
