<script>
  export let chart = null;
  export let ref = null;

  import { ScatterChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={ScatterChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
