<script lang="ts">
  import { BarChartSimple } from "../types";
  import type { SimpleBarChart as SBC } from "@carbon/charts";
  import { ScaleTypes } from "@carbon/charts/interfaces";

  let chart: SBC = null;
  let ref = null;

  const data = [
    { group: "Qty", value: 65000 },
    { group: "More", value: 29123 },
    { group: "Sold", value: 35213 },
    { group: "Restocking", value: 51213 },
    { group: "Misc", value: 16932 },
  ];

  const options = {
    title: "Simple bar (discrete)",
    axes: {
      left: {
        mapsTo: "value",
      },
      bottom: {
        mapsTo: "group",
        scaleType: ScaleTypes.LABELS,
      },
    },
    height: "400px",
  };
</script>

<BarChartSimple
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
  this={BarChartSimple}
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
