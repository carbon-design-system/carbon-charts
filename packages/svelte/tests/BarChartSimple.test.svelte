<script lang="ts">
  import { BarChartSimple } from "../types";
  import type { SimpleBarChart as SBC } from "@carbon/charts";
  import { simpleBarData as data, simpleBarOptions } from "@carbon/charts/demo/data";

  let chart: SBC = null;
  let ref = null;

  const options = simpleBarOptions as any;
</script>

<BarChartSimple
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
	this={BarChartSimple}
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
