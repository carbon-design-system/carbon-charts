<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { MeterChart, MeterChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
  data: ChartTabularData
  options: MeterChartOptions
}

export default defineComponent({
  extends: CcvBaseChart,
  props: {
    data: {
      type: Array as PropType<ChartTabularData>,
      required: true
    },
    options: {
      type: Object as PropType<MeterChartOptions>,
      required: true
    }
  },
  mounted() {
    const { data, options } = this.$props as Props
    this.coreChart = new MeterChart(this.$el as HTMLDivElement, {
      data,
      options
    })
  }
})
</script>

<template>
	<div class="ccv-meter-chart"></div>
</template>
