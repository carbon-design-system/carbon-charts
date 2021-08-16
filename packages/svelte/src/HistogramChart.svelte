<script>
  export let chart = null;
  export let ref = null;

  import { HistogramChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={HistogramChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
