<script lang="ts">
	import { TreemapChart as TreemapChartCore, type TreemapChartOptions } from '@carbon/charts'
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
	}: ChartProps<TreemapChartCore, TreemapChartOptions> = $props()
</script>

<!-- @component Treemap chart component. -->

<BaseChart
	Chart={TreemapChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
