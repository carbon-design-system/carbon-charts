<script>
  import { LineChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart {...$$restProps} Chart={LineChart} on:load on:update on:destroy />
