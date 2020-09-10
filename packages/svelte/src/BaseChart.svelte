<script>
  export let Chart = undefined;
  export let data = {};
  export let options = {};
  export let id = "chart-" + Math.random().toString(36);

  import { onMount, afterUpdate, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let ref = null;
  let chart = null;
  let element = null;
  let prevChart = undefined;

  onMount(() => {
    /**
     * CodeSandbox does not resolve Svelte components from the `svelte` package.json entry.
     * This causes `bind:ref` to be `undefined`; the chart can't mount to the element.
     *
     * We fallback to manually querying the DOM for the chart holder element because
     * CodeSandbox does not use uncompiled Svelte source code.
     *
     * See https://github.com/sveltejs/svelte/issues/2937
     */
    element = ref || document.getElementById(id);

    return () => {
      if (chart) {
        chart.components.forEach((component) => component.destroy());
        chart = null;
        dispatch("destroy");
      }
    };
  });

  afterUpdate(() => {
    if (Chart && prevChart !== Chart) {
      chart = new Chart(element, { data, options });
      dispatch("load", chart);
      prevChart = Chart;
    }
  });

  $: if (chart) {
    chart.model.setData(data);
    chart.model.setOptions(options);
    dispatch("update", { data, options });
  }
</script>

<div {...$$restProps} bind:this={ref} {id}></div>
