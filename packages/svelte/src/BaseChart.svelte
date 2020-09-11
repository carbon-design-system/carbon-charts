<script>
  export let Chart = undefined;
  export let data = {};
  export let options = {};

  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const id = "chart-" + Math.random().toString(36);

  let ref = null;
  let chart = null;

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
    const element = ref || document.getElementById(id);

    if (element) {
      chart = new Chart(element, { data, options });
      dispatch("load", chart);
    }

    return () => {
      if (chart) {
        chart.components.forEach((component) => component.destroy());
        chart = null;
        dispatch("destroy");
      }
    };
  });

  $: if (chart) {
    chart.model.setData(data);
    chart.model.setOptions(options);
    dispatch("update", { data, options });
  }
</script>

<div {...$$restProps} bind:this={ref} {id} />
