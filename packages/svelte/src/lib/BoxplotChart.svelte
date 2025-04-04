<script lang="ts">
	import { BoxplotChart as BoxplotChartCore, type BoxplotChartOptions } from '@carbon/charts'
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
	}: ChartProps<BoxplotChartCore, BoxplotChartOptions> = $props()
</script>

<!-- @component Boxplot chart component. -->

<BaseChart
	Chart={BoxplotChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
