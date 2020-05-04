<script>
  import { StackedBarChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={StackedBarChart}
  on:load
  on:update
  on:destroy />
