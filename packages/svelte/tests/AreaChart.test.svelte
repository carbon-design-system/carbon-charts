<script lang="ts">
  import { AreaChart } from "../types";
  import type { AreaChart as AC } from "@carbon/charts";
  import { areaTimeSeriesData as data, areaTimeSeriesOptions } from "@carbon/charts/demo/data";

  let chart: AC = null;
  let ref = null;

  const options = areaTimeSeriesOptions as any;
</script>

<AreaChart
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
	this={AreaChart}
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
