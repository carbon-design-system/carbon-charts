<script lang="ts">
  import { BarChartStacked } from "../types";
  import type { StackedBarChart as SBC } from "@carbon/charts";
  import { stackedBarData as data, stackedBarOptions } from "@carbon/charts/demo/data";

  let chart: SBC = null;
  let ref = null;

  const options = stackedBarOptions as any;
</script>

<BarChartStacked
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
	this={BarChartStacked}
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
