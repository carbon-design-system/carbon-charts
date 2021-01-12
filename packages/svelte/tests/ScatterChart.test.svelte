<script lang="ts">
  import { ScatterChart } from "../types";
  import type { ScatterChart as SC } from "@carbon/charts";
  import { scatterDiscreteData as data, scatterDiscreteOptions } from "@carbon/charts/demo/data";

  let chart: SC = null;
  let ref = null;

  const options = scatterDiscreteOptions as any;
</script>

<ScatterChart
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
	this={ScatterChart}
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
