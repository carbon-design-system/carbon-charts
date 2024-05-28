<script lang="ts" generics="T extends BaseChartOptions">
	/* eslint-disable @typescript-eslint/no-unused-vars */
	import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
	import type { Charts, ChartConfig, BaseChartOptions, ChartTabularData } from '@carbon/charts'

	const chartHolderCssClass = 'cds--chart-holder'
	export let data: ChartTabularData = []
	export let options: T = {} as T // AlluvialChartOptions, BarChartOptions, etc.
	export let Chart: new (holder: HTMLDivElement, chartConfigs: ChartConfig<T>) => Charts
	export let chart: Charts | undefined // instance of the class passed to the Chart property
	export let ref: HTMLDivElement // expose to parent so the div can be manipulated, if desired
	export let id = `chart-${Math.random().toString(36)}` // id for chart holder element

	interface DispatchedEvents {
		load: null
		update: { data: ChartTabularData; options: T }
		destroy: null
	}

	const dispatch = createEventDispatcher<DispatchedEvents>()

	onMount(() => {
		try {
			chart = new Chart(ref, { data, options })
			dispatch('load')
		} catch (error) {
			console.error('Failed to initialize chart:', error)
		}
	})

	afterUpdate(() => {
		if (chart) {
			try {
				chart.model.setData(data)
				chart.model.setOptions(options)
				dispatch('update', { data, options })
			} catch (error) {
				console.error('Failed to update chart:', error)
			}
		}
	})

	onDestroy(() => {
		if (chart) {
			dispatch('destroy')
			// Almost the same as core's Chart.destroy() but without getting rid of the chart holder
			chart.components.forEach(component => component.destroy())
			chart.model.set({ destroyed: true }, { skipUpdate: true })
			chart = undefined
		}
	})
</script>

<div {id} bind:this={ref} class={chartHolderCssClass} {...$$restProps} />
