<script lang="ts">
  import { BarChartGrouped } from "../types";
  import type { GroupedBarChart as BC } from "@carbon/charts";
  import { ScaleTypes } from "@carbon/charts/interfaces";

  let chart: BC = null;
  let ref = null;

  const data = [
    { group: "Dataset 1", key: "Qty", value: 65000 },
    { group: "Dataset 1", key: "More", value: -29123 },
    { group: "Dataset 1", key: "Sold", value: -35213 },
    { group: "Dataset 1", key: "Restocking", value: 51213 },
    { group: "Dataset 1", key: "Misc", value: 16932 },
    { group: "Dataset 2", key: "Qty", value: 32432 },
    { group: "Dataset 2", key: "More", value: -21312 },
    { group: "Dataset 2", key: "Sold", value: -56456 },
    { group: "Dataset 2", key: "Restocking", value: -21312 },
    { group: "Dataset 2", key: "Misc", value: 34234 },
    { group: "Dataset 3", key: "Qty", value: -12312 },
    { group: "Dataset 3", key: "More", value: 23232 },
    { group: "Dataset 3", key: "Sold", value: 34232 },
    { group: "Dataset 3", key: "Restocking", value: -12312 },
    { group: "Dataset 3", key: "Misc", value: -34234 },
    { group: "Dataset 4", key: "Qty", value: -32423 },
    { group: "Dataset 4", key: "More", value: 21313 },
    { group: "Dataset 4", key: "Sold", value: 64353 },
    { group: "Dataset 4", key: "Restocking", value: 24134 },
    { group: "Dataset 4", key: "Misc", value: 24134 },
  ];

  const options = {
    title: "Grouped bar (selected groups)",
    data: {
      selectedGroups: ["Dataset 1", "Dataset 3"],
    },
    axes: {
      left: {
        mapsTo: "value",
      },
      bottom: {
        scaleType: ScaleTypes.LABELS,
        mapsTo: "key",
      },
    },
    height: "400px",
  };
</script>

<BarChartGrouped
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
  this={BarChartGrouped}
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
