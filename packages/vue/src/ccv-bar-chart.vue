<template>
  <div class="ccv-bar-chart"></div>
</template>

<script>
  import { BarChart } from '@carbon/charts';
  import CcvBaseChart from './ccv-base-chart.vue';

  export default {
    name: 'CcvBarChart',
    extends: CcvBaseChart,

    mounted() {
      this.coreChart = new BarChart(
        this.$el,
        {
          data: this.data,
          options: this.options
        }
      );
    },
  };
</script>
