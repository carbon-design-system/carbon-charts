<script>
  export let chart = null;
  export let ref = null;

  import { WordCloudChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={WordCloudChart}
  bind:ref
  bind:chart
  on:load
  on:update
  on:destroy />
