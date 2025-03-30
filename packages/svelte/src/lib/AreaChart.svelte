<script lang="ts">
	import { AreaChart as AreaChartCore, type AreaChartOptions } from '@carbon/charts'
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
	}: ChartProps<AreaChartCore, AreaChartOptions> = $props()
</script>

<!-- @component Area chart component. -->

<BaseChart
	Chart={AreaChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
