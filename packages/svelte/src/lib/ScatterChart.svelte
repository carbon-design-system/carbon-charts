<script lang="ts">
	import { ScatterChart as ScatterChartCore, type ScatterChartOptions } from '@carbon/charts'
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
	}: ChartProps<ScatterChartCore, ScatterChartOptions> = $props()
</script>

<!-- @component Scatter chart component. -->

<BaseChart
	Chart={ScatterChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
