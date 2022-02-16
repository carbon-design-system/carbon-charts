<script>
  export let chart = null;
  export let ref = null;

  import { BubbleChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={BubbleChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
