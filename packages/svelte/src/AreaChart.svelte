<script>
  import { AreaChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={AreaChart}
  on:load
  on:update
  on:destroy />
