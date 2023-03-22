<script lang="ts">
	// import type { Chart as BaseChart } from '@carbon/charts/chart'
	import { interfaces, type BaseChart } from '@carbon/charts'

	/**
	 * Provide a Carbon chart class to instantiate
	 */
	export let Chart: any = undefined

	/**
	 * Obtain a reference to the instantiated chart
	 */
	export let chart: BaseChart | null = null

	/**
	 * Set the chart data using the tabular data format
	 * https://carbon-design-system.github.io/carbon-charts/?path=/story/docs-tutorials--tabular-data-format
	 */
	export let data: interfaces.ChartTabularData = []

	/**
	 * Set the chart options
	 */
	export let options: any = {}

	/**
	 * Specify the Carbon theme
	 * @deprecated as of v1, pass theme into options
	 */
	export let theme: interfaces.ChartTheme = interfaces.ChartTheme.WHITE

	/** Specify the id for the chart holder element */
	export let id = 'chart-' + Math.random().toString(36)

	/**
	 * Obtain a reference to the chart holder element
	 */
	export let ref: HTMLDivElement | null = null

	import { onMount, createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

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
		const element = ref || document.getElementById(id)

		if (element) {
			chart = new Chart(element, { data, options })
			dispatch('load', chart)
		}

		return () => {
			if (chart) {
				chart.components.forEach((component) => component.destroy())
				chart = null
				dispatch('destroy')
			}
		}
	})

	$: if (chart) {
		chart.model.setData(data)
		chart.model.setOptions({ theme, ...options })
		dispatch('update', { data, options })
	}
</script>

<div {...$$restProps} data-carbon-theme={theme} bind:this={ref} {id} />
