<script lang="ts">
  import { LollipopChart } from "../types";
  import type { LollipopChart as LC } from "@carbon/charts";
  import { ScaleTypes } from "@carbon/charts/interfaces";

  let chart: LC = null;
  let ref = null;

  const data = [
    {
      group: "Dataset 1",
      key: "Qty",
      value: 34200,
    },
    {
      group: "Dataset 2",
      key: "More",
      value: 34200,
    },
    {
      group: "Dataset 3",
      key: "Sold",
      value: 41200,
    },
    {
      group: "Dataset 4",
      key: "Restocking",
      value: 22000,
    },
  ];

  const options = {
    title: "Lollipop (discrete)",
    axes: {
      bottom: {
        title: "2019 Annual Sales Figures",
        scaleType: ScaleTypes.LABELS,
        mapsTo: "key",
      },
      left: {
        mapsTo: "value",
      },
    },
    height: "400px",
  };
</script>

<LollipopChart
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
  this={LollipopChart}
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
