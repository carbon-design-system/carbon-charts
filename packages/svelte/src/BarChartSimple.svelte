<script>
  export let chart = null;
  export let ref = null;

  import { SimpleBarChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={SimpleBarChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
