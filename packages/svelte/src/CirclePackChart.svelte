<script>
  export let chart = null;
  export let ref = null;

  import { CirclePackChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={CirclePackChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
