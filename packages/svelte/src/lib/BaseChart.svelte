<script lang="ts" generics="T extends BaseChartOptions">
	/* eslint-disable @typescript-eslint/no-unused-vars */
	import { onMount, afterUpdate, onDestroy, createEventDispatcher } from 'svelte'
	import type { Charts, ChartConfig, BaseChartOptions, ChartTabularData } from '@carbon/charts'

	interface DispatchedEvents {
		load: null
		update: { data: ChartTabularData; options: T }
		destroy: null
	}

	type CoreChartClass = new (holder: HTMLDivElement, chartConfigs: ChartConfig<T>) => Charts

	const chartHolderCssClass = 'cds--chart-holder' // Used by Carbon Charts CSS
	export let data: ChartTabularData = [] // Chart data, default is empty
	export let options: T = {} as T // Specific chart option type, default is empty
	export let Chart: CoreChartClass // Used to instantiate next property
	export let chart: Charts | undefined // Instance of the chart class
	export let ref: HTMLDivElement // Binding to chart 'holder' in template below
	export let id = `chart-${Math.random().toString(36)}` // id for chart holder element

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
			// Like core's Chart.destroy() but keeps div chart holder bound to ref as it's part of the template below
			chart.components.forEach(component => component.destroy())
			chart.model.set({ destroyed: true }, { skipUpdate: true })
			chart = undefined
		}
	})
</script>

<div {id} bind:this={ref} class={chartHolderCssClass} {...$$restProps}></div>
