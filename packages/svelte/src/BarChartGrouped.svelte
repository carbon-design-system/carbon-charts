<script>
  import { GroupedBarChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={GroupedBarChart}
  on:load
  on:update
  on:destroy />
