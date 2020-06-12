<script>
  import { RadarChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart {...$$restProps} Chart={RadarChart} on:load on:update on:destroy />
