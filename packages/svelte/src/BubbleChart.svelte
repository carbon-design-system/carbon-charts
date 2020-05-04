<script>
  import { BubbleChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart {...$$restProps} Chart={BubbleChart} on:load on:update on:destroy />
