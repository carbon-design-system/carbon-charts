<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { HistogramChart, HistogramChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
  data: ChartTabularData[]
  options: HistogramChartOptions
}

export default defineComponent({
  extends: CcvBaseChart,
  props: {
    data: {
      type: Array as PropType<ChartTabularData[]>,
      required: true
    },
    options: {
      type: Object as PropType<HistogramChartOptions>,
      required: true
    }
  },
  mounted() {
    const { data, options } = this.$props as Props
    this.coreChart = new HistogramChart(this.$el as HTMLDivElement, { data, options })
  }
})
</script>

<template>
	<div class="ccv-histogram-chart"></div>
</template>
