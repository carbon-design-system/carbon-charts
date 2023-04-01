<script lang="ts">
import { defineComponent } from 'vue'
import { StackedBarChart, StackedBarChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
  data: ChartTabularData
  options: StackedBarChartOptions
}

export default defineComponent({
  extends: CcvBaseChart,
  props: {
    data: {
      type: Object as () => ChartTabularData,
      required: true
    },
    options: {
      type: Object as () => StackedBarChartOptions,
      required: true
    }
  },
  mounted() {
    const { data, options } = this.$props as Props
    this.coreChart = new StackedBarChart(this.$el as HTMLDivElement, {
      data,
      options
    })
  }
})
</script>

<template>
	<div class="ccv-stacked-bar-chart"></div>
</template>
