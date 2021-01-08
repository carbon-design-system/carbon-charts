<script lang="ts">
  import { DonutChart } from "../types";
  import type { DonutChart as DC } from "@carbon/charts";

  let chart: DC = null;
  let ref = null;

  const data = [
    {
      group: "2V2N 9KYPM version 1",
      value: 20000,
    },
    {
      group: "L22I P66EP L22I P66EP L22I P66EP",
      value: 65000,
    },
    {
      group: "JQAI 2M4L1",
      value: 75000,
    },
    {
      group: "J9DZ F37AP",
      value: 1200,
    },
    {
      group: "YEL48 Q6XK YEL48",
      value: 10000,
    },
    {
      group: "Misc",
      value: 25000,
    },
  ];

  const options = {
    title: "Donut",
    resizable: true,
    donut: {
      center: {
        label: "Browsers",
      },
    },
    height: "400px",
  };
</script>

<DonutChart
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
  this={DonutChart}
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
