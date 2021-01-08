<script lang="ts">
  import { GaugeChart } from "../types";
  import type { GaugeChart as GC } from "@carbon/charts";
  import { Statuses, GaugeTypes } from "@carbon/charts/interfaces";

  let chart: GC = null;
  let ref = null;

  const data = [
    {
      group: "value",
      value: 42,
    },
    {
      group: "delta",
      value: -13.37,
    },
  ];

  const options = {
    title: "Gauge semicircular -- danger status",
    resizable: true,
    height: "250px",
    width: "100%",
    gauge: {
      type: GaugeTypes.SEMI,
      status: Statuses.DANGER,
    },
  };
</script>

<GaugeChart
  bind:chart
  bind:ref
  on:load={(e) => {
    console.log(e.detail);
  }}
  on:update={(e) => {
    console.log(e.detail);
  }}
  on:destroy={(e) => {
    console.log(e.detail);
  }}
  {data}
  {options} />

<svelte:component
  this={GaugeChart}
  on:load={(e) => {
    console.log(e.detail);
  }}
  on:update={(e) => {
    console.log(e.detail);
  }}
  on:destroy={(e) => {
    console.log(e.detail);
  }}
  {data}
  {options} />
