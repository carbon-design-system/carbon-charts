<script lang="ts">
import { defineComponent } from 'vue'
import { ComboChart, type ComboChartOptions, type ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvComboChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new ComboChart(this.$el, {
			data: this.data as ChartTabularData,
			options: this.options as ComboChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-combo-chart"></div>
</template>
