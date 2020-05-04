<script>
  import { DonutChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart {...$$restProps} Chart={DonutChart} on:load on:update on:destroy />
