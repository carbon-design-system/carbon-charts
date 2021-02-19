<script>
  export let chart = null;
  export let ref = null;

  import { GaugeChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={GaugeChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
