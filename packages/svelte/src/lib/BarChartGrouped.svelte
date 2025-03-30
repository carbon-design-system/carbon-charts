<script lang="ts">
	import { GroupedBarChart as GroupedBarChartCore, type BarChartOptions } from '@carbon/charts'
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
	}: ChartProps<GroupedBarChartCore, BarChartOptions> = $props()
</script>

<!-- @component Grouped bar chart component. -->

<BaseChart
	Chart={GroupedBarChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
