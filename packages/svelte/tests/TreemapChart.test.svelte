<script lang="ts">
  import { TreemapChart } from "../types";
  import type { TreemapChart as TC } from "@carbon/charts";
  import { treemapData as data, treemapOptions } from "@carbon/charts/demo/data";

  let chart: TC = null;
  let ref = null;

  const options = treemapOptions;
</script>

<TreemapChart
	bind:chart
	bind:ref
	on:load={e => {
		console.log(e.detail);
	}}
	on:update={e => {
		console.log(e.detail);
	}}
	on:destroy={e => {
		console.log(e.detail);
	}}
	{data}
	{options} />

<svelte:component
	this={TreemapChart}
	on:load={e => {
		console.log(e.detail);
	}}
	on:update={e => {
		console.log(e.detail);
	}}
	on:destroy={e => {
		console.log(e.detail);
	}}
	{data}
	{options} />
