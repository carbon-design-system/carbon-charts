<script>
  import { SimpleBarChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={SimpleBarChart}
  on:load
  on:update
  on:destroy />
