<script>
  import { MeterChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart {...$$restProps} Chart={MeterChart} on:load on:update on:destroy />
