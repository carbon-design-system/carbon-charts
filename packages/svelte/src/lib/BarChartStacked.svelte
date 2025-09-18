<script lang="ts">
	import { StackedBarChart as StackedBarChartCore, type BarChartOptions } from '@carbon/charts'
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
	}: ChartProps<StackedBarChartCore, BarChartOptions> = $props()
</script>

<!-- @component Stacked bar chart component. -->

<BaseChart
	Chart={StackedBarChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
