<script lang="ts">
import { defineComponent } from 'vue'
import { TreeChart, TreeChartOptions, ChartTabularData } from '@carbon/charts'
import CcvBaseChart from './CcvBaseChart.vue'

interface Props {
  data: ChartTabularData
  options: TreeChartOptions
}

export default defineComponent({
  extends: CcvBaseChart,
  props: {
    data: {
      type: Object as () => ChartTabularData,
      required: true
    },
    options: {
      type: Object as () => TreeChartOptions,
      required: true
    }
  },
  mounted() {
    const { data, options } = this.$props as Readonly<Props>
    this.coreChart = new TreeChart(this.$el as HTMLDivElement, {
      data,
      options
    })
  }
})
</script>

<template>
	<div class="ccv-tree-chart"></div>
</template>
