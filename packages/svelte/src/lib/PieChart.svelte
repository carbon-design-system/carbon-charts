<script lang="ts">
	import { PieChart as PieChartCore, type PieChartOptions } from '@carbon/charts'
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
	}: ChartProps<PieChartCore, PieChartOptions> = $props()
</script>

<!-- @component Pie chart component. -->

<BaseChart
	Chart={PieChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
