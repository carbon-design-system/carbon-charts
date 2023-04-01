<script lang="ts">
import { defineComponent } from 'vue'
import { TreemapChart, TreemapChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
  data: ChartTabularData
  options: TreemapChartOptions
}

export default defineComponent({
  extends: CcvBaseChart,
  props: {
    data: {
      type: Object as () => ChartTabularData,
      required: true
    },
    options: {
      type: Object as () => TreemapChartOptions,
      required: true
    }
  },
  mounted() {
    const { data, options } = this.$props as Readonly<Props>
    this.coreChart = new TreemapChart(this.$el as HTMLDivElement, {
      data,
      options
    })
  }
})
</script>

<template>
	<div class="ccv-treemap-chart"></div>
</template>
