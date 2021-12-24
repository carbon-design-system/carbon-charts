<script>
	export let chart = null;
	export let ref = null;

	import { HeatmapChart } from "@carbon/charts";
	import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
	{...$$restProps}
	Chart={HeatmapChart}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
