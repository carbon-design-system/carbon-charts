<script>
  import { TreemapChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart {...$$restProps} Chart={TreemapChart} on:load on:update on:destroy />
