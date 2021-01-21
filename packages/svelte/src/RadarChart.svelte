<script>
  export let chart = null;
  export let ref = null;

  import { RadarChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={RadarChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
