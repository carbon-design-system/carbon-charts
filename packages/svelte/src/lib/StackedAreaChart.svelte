<script lang="typescript">
	import { StackedAreaChart as StackedAreaChartCore, type StackedAreaChartOptions } from '@carbon/charts'
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
	}: ChartProps<StackedAreaChartCore, StackedAreaChartOptions> = $props()
</script>

<BaseChart
	Chart={StackedAreaChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
