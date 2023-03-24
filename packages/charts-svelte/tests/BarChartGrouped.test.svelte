<script lang="ts">
  import { BarChartGrouped } from "../types";
  import type { GroupedBarChart as GroupedBarChartCore } from "@carbon/charts";
  import { groupedBarData as data, groupedBarOptions } from "@carbon/charts/demo";

  let chart: GroupedBarChartCore | null = null;
	let ref: HTMLDivElement | null = null

  const options = groupedBarOptions as any;
</script>

<BarChartGrouped
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
	this={BarChartGrouped}
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
