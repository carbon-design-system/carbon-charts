<script lang="ts">
import { defineComponent } from 'vue'
import { HeatmapChart, HeatmapChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
  data: ChartTabularData;
  options: HeatmapChartOptions;
}

export default defineComponent({
  extends: CcvBaseChart,
  props: {
    data: {
      type: Object as () => ChartTabularData,
      required: true
    },
    options: {
      type: Object as () => HeatmapChartOptions,
      required: true
    }
  },
  mounted() {
    const { data, options } = this.$props as Props;
    this.coreChart = new HeatmapChart(this.$el as HTMLDivElement, { data, options });
  }
})
</script>

<template>
	<div class="ccv-heatmap-chart"></div>
</template>
