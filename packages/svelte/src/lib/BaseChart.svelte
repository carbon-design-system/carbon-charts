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
			// Keep the holder div, it belongs to this component's template
			chart.destroy({ removeHolder: false })
			chart = undefined
			ondestroy?.()
		}
	})
</script>

<!--
@component Base chart component from which all charts are derived.
-->

<div {id} bind:this={ref} class={chartHolderCssClass} {...rest}></div>
