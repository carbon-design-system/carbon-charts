<script>
  import { StackedAreaChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={StackedAreaChart}
  on:load
  on:update
  on:destroy />
