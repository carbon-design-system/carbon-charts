<script lang="ts">
import { defineComponent } from 'vue'
import { BulletChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvBulletChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new BulletChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.BulletChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-bullet-chart"></div>
</template>
