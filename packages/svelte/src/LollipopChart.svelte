<script>
  import { LollipopChart } from "@carbon/charts";
  import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart {...$$restProps} Chart={LollipopChart} on:load on:update on:destroy />
