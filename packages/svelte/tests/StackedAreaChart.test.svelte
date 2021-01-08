<script lang="ts">
  import { StackedAreaChart } from "../types";
  import type { StackedAreaChart as SAC } from "@carbon/charts";
  import { ScaleTypes } from "@carbon/charts/interfaces";

  let chart: SAC = null;
  let ref = null;

  const data = [
    {
      group: "Dataset 1",
      date: "2019-01-01T08:00:00.000Z",
      value: 10000,
    },
    {
      group: "Dataset 1",
      date: "2019-01-05T08:00:00.000Z",
      value: 65000,
    },
    {
      group: "Dataset 1",
      date: "2019-01-08T08:00:00.000Z",
      value: 10000,
    },
    {
      group: "Dataset 1",
      date: "2019-01-13T08:00:00.000Z",
      value: 49213,
    },
    {
      group: "Dataset 1",
      date: "2019-01-17T08:00:00.000Z",
      value: 51213,
    },
    {
      group: "Dataset 2",
      date: "2019-01-01T08:00:00.000Z",
      value: 20000,
    },
    {
      group: "Dataset 2",
      date: "2019-01-05T08:00:00.000Z",
      value: 25000,
    },
    {
      group: "Dataset 2",
      date: "2019-01-08T08:00:00.000Z",
      value: 60000,
    },
    {
      group: "Dataset 2",
      date: "2019-01-13T08:00:00.000Z",
      value: 30213,
    },
    {
      group: "Dataset 2",
      date: "2019-01-17T08:00:00.000Z",
      value: 55213,
    },
    {
      group: "Dataset 3",
      date: "2019-01-01T08:00:00.000Z",
      value: 30000,
    },
    {
      group: "Dataset 3",
      date: "2019-01-05T08:00:00.000Z",
      value: 20000,
    },
    {
      group: "Dataset 3",
      date: "2019-01-08T08:00:00.000Z",
      value: 40000,
    },
    {
      group: "Dataset 3",
      date: "2019-01-13T08:00:00.000Z",
      value: 60213,
    },
    {
      group: "Dataset 3",
      date: "2019-01-17T08:00:00.000Z",
      value: 25213,
    },
  ];

  const options = {
    title: "Stacked area (time series)",
    axes: {
      left: {
        stacked: true,
        scaleType: ScaleTypes.LINEAR,
        mapsTo: "value",
      },
      bottom: {
        scaleType: ScaleTypes.TIME,
        mapsTo: "date",
      },
    },
    curve: "curveMonotoneX",
    height: "400px",
  };
</script>

<StackedAreaChart
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
  this={StackedAreaChart}
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
