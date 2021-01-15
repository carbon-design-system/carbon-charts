<script>
  export let chart = null;
  export let ref = null;

  import { PieChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={PieChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
