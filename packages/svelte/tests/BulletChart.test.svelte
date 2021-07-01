<script lang="ts">
    import { BulletChart } from "../types";
    import type { BulletChart as BC } from "@carbon/charts";
    import { basicBulletData as data, basicBulletOptions  } from "@carbon/charts/demo/data";
  
    let chart: BC = null;
    let ref = null;
  
    const options = basicBulletOptions as any;
  </script>
  
  <BulletChart
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
      this={BulletChart}
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
  