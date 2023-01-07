<script>
	export let chart = null;
	export let ref = null;

	import { EXPERIMENTAL_ChoroplethChart } from "@carbon/charts";
	import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
	{...$$restProps}
	Chart={EXPERIMENTAL_ChoroplethChart}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
