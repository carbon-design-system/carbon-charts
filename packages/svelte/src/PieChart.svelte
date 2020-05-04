<script>
  import { PieChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart {...$$restProps} Chart={PieChart} on:load on:update on:destroy />
