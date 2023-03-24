<script lang="ts">
import { defineComponent } from 'vue'
import { BulletChart, type BulletChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvBulletChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new BulletChart(this.$el as HTMLDivElement, {
			data: this.data as ChartTabularData,
			options: this.options as BulletChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-bullet-chart"></div>
</template>
