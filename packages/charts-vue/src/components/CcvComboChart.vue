<script lang="ts">
import { defineComponent } from 'vue'
import { ComboChart, type interfaces } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

export default defineComponent({
	name: 'CcvComboChart',
	extends: CcvBaseChart,
	mounted() {
		this.coreChart = new ComboChart(this.$el, {
			data: this.data as interfaces.ChartTabularData,
			options: this.options as interfaces.ComboChartOptions
		})
	}
})
</script>

<template>
	<div class="ccv-combo-chart"></div>
</template>
