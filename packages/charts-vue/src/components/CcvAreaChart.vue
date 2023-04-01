<script lang="ts">
import { defineComponent } from 'vue'
import { AreaChart, AreaChartOptions, ChartTabularData } from '@carbon/charts'

import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
  data: ChartTabularData;
  options: AreaChartOptions;
}

export default defineComponent({
  extends: CcvBaseChart,
  props: {
    data: {
      type: Object as () => ChartTabularData,
      required: true
    },
    options: {
      type: Object as () => AreaChartOptions,
      required: true
    }
  },
  mounted() {
    const { data, options } = this.$props as Props;
    this.coreChart = new AreaChart(this.$el as HTMLDivElement, { data, options });
  }
})
</script>

<template>
	<div class="ccv-area-chart"></div>
</template>
