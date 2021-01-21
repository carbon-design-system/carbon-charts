<script>
	export let chart = null;
	export let ref = null;

	import { ComboChart } from "@carbon/charts";
	import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
	{...$$restProps}
	Chart={ComboChart}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
