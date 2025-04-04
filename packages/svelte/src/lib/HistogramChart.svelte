<script lang="ts">
	import { HistogramChart as HistogramChartCore, type HistogramChartOptions } from '@carbon/charts'
	import type { ChartProps } from '$lib/interfaces'
	import BaseChart from './BaseChart.svelte'

	let {
		data,
		options,
		ref = $bindable(),
		chart = $bindable(),
		onload,
		onupdate,
		ondestroy,
		...rest
	}: ChartProps<HistogramChartCore, HistogramChartOptions> = $props()
</script>

<!-- @component Histogram chart component. -->

<BaseChart
	Chart={HistogramChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
