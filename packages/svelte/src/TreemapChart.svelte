<script>
  export let chart = null;
  export let ref = null;

  import { TreemapChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={TreemapChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
