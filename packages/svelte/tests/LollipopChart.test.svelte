<script lang="ts">
  import { LollipopChart } from "../types";
  import type { LollipopChart as LC } from "@carbon/charts";
  import { lollipopDiscreteData as data, lollipopDiscreteOptions } from "@carbon/charts/demo/data/lollipop";

  let chart: LC = null;
  let ref = null;

  const options = lollipopDiscreteOptions as any;
</script>

<LollipopChart
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
	this={LollipopChart}
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
