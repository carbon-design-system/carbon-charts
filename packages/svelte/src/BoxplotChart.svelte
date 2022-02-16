<script>
  export let chart = null;
  export let ref = null;

  import { BoxplotChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={BoxplotChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
