<script lang="ts">
  import { RadarChart } from "../types";
  import type { RadarChart as RC } from "@carbon/charts";

  let chart: RC = null;
  let ref = null;

  const data = [
    {
      product: "Product 1",
      feature: "Price",
      score: 60,
    },
    {
      product: "Product 1",
      feature: "Usability",
      score: 92,
    },
    {
      product: "Product 1",
      feature: "Availability",
      score: 5,
    },
    {
      product: "Product 1",
      feature: "Performance",
      score: 85,
    },
    {
      product: "Product 1",
      feature: "Quality",
      score: 60,
    },
    {
      product: "Product 2",
      feature: "Price",
      score: 70,
    },
    {
      product: "Product 2",
      feature: "Usability",
      score: 63,
    },
    {
      product: "Product 2",
      feature: "Availability",
      score: 78,
    },
    {
      product: "Product 2",
      feature: "Performance",
      score: 50,
    },
    {
      product: "Product 2",
      feature: "Quality",
      score: 30,
    },
  ];

  const options = {
    title: "Radar",
    radar: {
      axes: {
        angle: "feature",
        value: "score",
      },
    },
    data: {
      groupMapsTo: "product",
    },
    height: "400px",
  };
</script>

<RadarChart
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
  this={RadarChart}
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
