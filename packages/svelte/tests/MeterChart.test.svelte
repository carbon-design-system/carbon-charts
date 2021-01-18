<script lang="ts">
  import { MeterChart } from "../types";
  import type { MeterChart as MC } from "@carbon/charts";
	import { meterData as data, meterOptionsCustomColor } from "@carbon/charts/demo/data";

  let chart: MC = null;
  let ref = null;

  const options = meterOptionsCustomColor as any;
</script>

<MeterChart
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
	this={MeterChart}
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
