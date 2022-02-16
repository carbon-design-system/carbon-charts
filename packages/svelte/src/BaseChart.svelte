<script>
	/**
	 * Provide a Carbon chart class to instantiate
	 * @type {typeof import("@carbon/charts").BaseChart}
	 */
	export let Chart = undefined;

	/**
	 * Obtain a reference to the instantiated chart
	 * @type {null | typeof import("@carbon/charts").BaseChart}
	 */
	export let chart = null;

	/**
	 * Set the chart data using the tabular data format
	 * https://carbon-design-system.github.io/carbon-charts/?path=/story/docs-tutorials--tabular-data-format
	 * @type {typeof import("@carbon/charts/interfaces").ChartTabularData}
	 */
	export let data = [];

	/**
	 * Set the chart options
	 * @type {typeof import("@carbon/charts/interfaces").BaseChartOptions}
	 */
	export let options = {};

	/** Specify the id for the chart holder element */
	export let id = "chart-" + Math.random().toString(36);

	/**
	 * Obtain a reference to the chart holder element
	 * @type {null | HTMLDivElement}
	 */
	export let ref = null;

	import { onMount, createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

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
				chart.components.forEach(component => component.destroy());
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
