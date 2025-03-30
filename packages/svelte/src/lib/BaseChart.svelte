<script lang="ts" generics="ChartType extends Charts, ChartOptionType extends BaseChartOptions">
	import { onMount, onDestroy } from 'svelte'
	import type { Charts, BaseChartOptions } from '@carbon/charts'
	import type { BaseChartProps } from './interfaces'

	const chartHolderCssClass = 'cds--chart-holder' // Used by Carbon Charts CSS
	let {
		id = `chart-${Math.random().toString(36)}`,
		data = [],
		options = {} as ChartOptionType,
		ref = $bindable(),
		chart = $bindable(),
		Chart,
		onload,
		onupdate,
		ondestroy,
		...rest
	}: BaseChartProps<ChartType, ChartOptionType> = $props()

	onMount(() => {
		try {
			chart = new Chart(ref as HTMLDivElement, { data, options })
			onload?.()
		} catch (error) {
			console.error('Failed to initialize chart:', error)
		}
	})

	$effect(() => {
		if (chart) {
			chart.model.setData(data)
			chart.model.setOptions(options)
			onupdate?.({ data, options })
		}
	})

	onDestroy(() => {
		if (chart) {
			// Like core's Chart.destroy() but keeps div chart holder bound to ref as it's part of this template
			chart.components.forEach(component => component.destroy())
			chart.model.set({ destroyed: true }, { skipUpdate: true })
			chart = undefined
			ondestroy?.()
		}
	})
</script>

<!--
@component Base chart component from which all charts are derived.
-->

<div {id} bind:this={ref} class={chartHolderCssClass} {...rest}></div>
