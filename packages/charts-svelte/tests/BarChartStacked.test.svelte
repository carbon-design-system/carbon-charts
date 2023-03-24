<script lang="ts">
  import { BarChartStacked } from "../types";
  import type { StackedBarChart as StackedBarChartCore } from "@carbon/charts";
  import { stackedBarData as data, stackedBarOptions } from "@carbon/charts/demo";

  let chart: StackedBarChartCore | null = null;
	let ref: HTMLDivElement | null = null

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
