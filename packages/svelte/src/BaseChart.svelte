<script>
  export let Chart = undefined;
  export let data = {};
  export let options = {};

  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let ref = undefined;
  let chart = undefined;

  onMount(() => {
    chart = new Chart(ref, { data, options });
    dispatch("load", chart);

    return () => {
      chart.destroy();
      dispatch("destroy");
    };
  });

  $: if (chart) {
    chart.model.setData(data);
    chart.model.setOptions(options);
    dispatch("update", { data, options });
  }
</script>

<div {...$$restProps} bind:this={ref} on:load on:update on:destroy />
