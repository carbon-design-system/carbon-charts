<script lang="ts">
  import { PieChart } from "../types";
  import type { PieChart as PC } from "@carbon/charts";
  import { pieCenteredData as data, pieCenteredOptions } from "@carbon/charts/demo/data";

  let chart: PC = null;
  let ref = null;

  const options = pieCenteredOptions as any;
</script>

<PieChart
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
	this={PieChart}
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
