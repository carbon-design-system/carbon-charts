<script>
	export let chart = null;
	export let ref = null;

	import { LineChart } from "@carbon/charts";
	import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
	{...$$restProps}
	Chart={LineChart}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
