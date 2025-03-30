<script lang="ts">
	import { SimpleBarChart as SimpleBarChartCore, type BarChartOptions } from '@carbon/charts'
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
	}: ChartProps<SimpleBarChartCore, BarChartOptions> = $props()
</script>

<!-- @component Bar chart component. -->

<BaseChart
	Chart={SimpleBarChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
