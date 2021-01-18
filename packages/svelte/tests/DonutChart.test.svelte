<script lang="ts">
  import { DonutChart } from "../types";
  import type { DonutChart as DC } from "@carbon/charts";
  import { donutData as data, donutOptions } from "@carbon/charts/demo/data";

  let chart: DC = null;
  let ref = null;

  const options = donutOptions as any;
</script>

<DonutChart
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
	this={DonutChart}
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
