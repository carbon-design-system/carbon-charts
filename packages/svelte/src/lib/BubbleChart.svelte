<script lang="ts">
	import { BubbleChart as BubbleChartCore, type BubbleChartOptions } from '@carbon/charts'
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
	}: ChartProps<BubbleChartCore, BubbleChartOptions> = $props()
</script>

<!-- @component Bubble chart component. -->

<BaseChart
	Chart={BubbleChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
