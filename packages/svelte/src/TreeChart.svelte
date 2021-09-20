<script>
  export let chart = null;
  export let ref = null;

  import { TreeChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={TreeChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
