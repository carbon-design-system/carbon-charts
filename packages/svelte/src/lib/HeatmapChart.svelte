<script lang="typescript">
	import { HeatmapChart as HeatmapChartCore, type HeatmapChartOptions } from '@carbon/charts'
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
	}: ChartProps<HeatmapChartCore, HeatmapChartOptions> = $props()
</script>

<BaseChart
	Chart={HeatmapChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
