<script>
	export let chart = null;
	export let ref = null;

	import { AlluvialChart } from "@carbon/charts";
	import BaseChart from "./BaseChart.svelte";
</script>

<BaseChart
	{...$$restProps}
	Chart={AlluvialChart}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
