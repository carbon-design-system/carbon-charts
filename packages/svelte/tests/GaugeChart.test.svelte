<script lang="ts">
  import { GaugeChart } from "../types";
  import type { GaugeChart as GC } from "@carbon/charts";
  import { gaugeData as data, gaugeOptionsSemi } from "@carbon/charts/demo/data";

  let chart: GC = null;
  let ref = null;

  const options = gaugeOptionsSemi as any;
</script>

<GaugeChart
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
	this={GaugeChart}
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
