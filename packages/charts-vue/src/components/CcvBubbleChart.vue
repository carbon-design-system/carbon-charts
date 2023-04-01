<script lang="ts">
import { defineComponent } from 'vue'
import { BubbleChart, BubbleChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
  data: ChartTabularData;
  options: BubbleChartOptions;
}

export default defineComponent({
  extends: CcvBaseChart,
  props: {
    data: {
      type: Object as () => ChartTabularData,
      required: true
    },
    options: {
      type: Object as () => BubbleChartOptions,
      required: true
    }
  },
  mounted() {
    const { data, options } = this.$props as Props;
    this.coreChart = new BubbleChart(this.$el as HTMLDivElement, { data, options });
  }
})
</script>

<template>
	<div class="ccv-bubble-chart"></div>
</template>
