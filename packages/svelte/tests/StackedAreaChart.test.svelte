<script lang="ts">
  import { StackedAreaChart } from "../types";
  import type { StackedAreaChart as SAC } from "@carbon/charts";
  import { stackedAreaTimeSeriesData as data, stackedAreaTimeSeriesOptions } from "@carbon/charts/demo/data";

  let chart: SAC = null;
  let ref = null;

  const options = stackedAreaTimeSeriesOptions as any;
</script>

<StackedAreaChart
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
	this={StackedAreaChart}
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
