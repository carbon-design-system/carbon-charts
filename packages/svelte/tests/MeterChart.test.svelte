<script lang="ts">
  import { MeterChart } from "../types";
  import type { MeterChart as MC } from "@carbon/charts";
  import type { MeterChartOptions } from "@carbon/charts/interfaces";

  let chart: MC = null;
  let ref = null;

  const data = [
    {
      group: "Dataset 1",
      value: 56,
    },
  ];

  const options: MeterChartOptions = {
    title: "Meter Chart - statuses and custom color",
    meter: {
      title: {
        percentageIndicator: {
          enabled: true
        }
      }
    }
  };
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
