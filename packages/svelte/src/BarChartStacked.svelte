<script>
  export let chart = null;
  export let ref = null;

  import { StackedBarChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={StackedBarChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
