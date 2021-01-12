<script lang="ts">
  import BaseChart from "../types/BaseChart";
  import type { Chart as BC } from "@carbon/charts/chart";
  import { stackedBarData as data, stackedBarOptions } from "@carbon/charts/demo/data";

  let chart: BC = null;
  let ref = null;

  const options = stackedBarOptions as any;
</script>

<BaseChart
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
	this={BaseChart}
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
