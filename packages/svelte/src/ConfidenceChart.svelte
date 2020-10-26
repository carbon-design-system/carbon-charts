<script>
  import { ConfidenceIntervalChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
  {...$$restProps}
  Chart={ConfidenceIntervalChart}
  on:load
  on:update
  on:destroy />
