<script lang="ts">
  import { LineChart } from "../types";
  import type { LineChart as LC } from "@carbon/charts";
  import { lineLongLabelData as data, lineOptions } from "@carbon/charts/demo/data";

  let chart: LC = null;
  let ref = null;

  const options = lineOptions as any;
</script>

<LineChart
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
	this={LineChart}
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
