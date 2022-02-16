<script>
	export let chart = null;
	export let ref = null;

	import { GroupedBarChart } from "@carbon/charts";
	import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
	{...$$restProps}
	Chart={GroupedBarChart}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
