<script lang="ts">
  import { ScatterChart } from "../types";
  import type { ScatterChart as SC } from "@carbon/charts";
  import { ScaleTypes } from "@carbon/charts/interfaces";

  let chart: SC = null;
  let ref = null;

  const data = [
    {
      group: "Dataset 1",
      employees: 5000,
      sales: 32100,
    },
    {
      group: "Dataset 1",
      employees: 3000,
      sales: 25100,
    },
    {
      group: "Dataset 1",
      employees: 8000,
      sales: 12100,
    },
    {
      group: "Dataset 1",
      employees: 4000,
      sales: 53100,
    },
    {
      group: "Dataset 2",
      employees: 5000,
      sales: 32100,
    },
    {
      group: "Dataset 2",
      employees: 2000,
      sales: 34100,
    },
    {
      group: "Dataset 2",
      employees: 4000,
      sales: 23100,
    },
    {
      group: "Dataset 2",
      employees: 7000,
      sales: 14100,
    },
    {
      group: "Dataset 2",
      employees: 6000,
      sales: 53100,
    },
  ];

  const options = {
    title: "Scatter (linear x & y)",
    axes: {
      bottom: {
        title: "No. of employees",
        mapsTo: "employees",
        scaleType: ScaleTypes.LINEAR,
      },
      left: {
        title: "Annual sales",
        mapsTo: "sales",
        scaleType: ScaleTypes.LINEAR,
      },
    },
    height: "400px",
  };
</script>

<ScatterChart
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
  this={ScatterChart}
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
