<script lang="ts">
  import { AreaChart } from "../types";
  import type { AreaChart as AC } from "@carbon/charts";
  import { ScaleTypes } from "@carbon/charts/interfaces";

  let chart: AC = null;
  let ref = null;

  const data = [
    { group: "Dataset 1", date: "2019-01-01T08:00:00.000Z", value: 0 },
    { group: "Dataset 1", date: "2019-01-06T08:00:00.000Z", value: -37312 },
    { group: "Dataset 1", date: "2019-01-08T08:00:00.000Z", value: -22392 },
    { group: "Dataset 1", date: "2019-01-15T08:00:00.000Z", value: -52576 },
    { group: "Dataset 1", date: "2019-01-19T08:00:00.000Z", value: 20135 },
    { group: "Dataset 2", date: "2019-01-01T08:00:00.000Z", value: 47263 },
    { group: "Dataset 2", date: "2019-01-05T08:00:00.000Z", value: 14178 },
    { group: "Dataset 2", date: "2019-01-08T08:00:00.000Z", value: 23094 },
    { group: "Dataset 2", date: "2019-01-13T08:00:00.000Z", value: 45281 },
    { group: "Dataset 2", date: "2019-01-19T08:00:00.000Z", value: -63954 },
  ];

  const options = {
    title: "Area (time series - natural curve)",
    axes: {
      bottom: {
        title: "2019 Annual Sales Figures",
        mapsTo: "date",
        scaleType: ScaleTypes.TIME,
      },
      left: {
        mapsTo: "value",
        scaleType: ScaleTypes.LINEAR,
      },
    },
    curve: "curveNatural",
    height: "400px",
  };
</script>

<AreaChart
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
  this={AreaChart}
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
