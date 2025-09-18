<script lang="ts">
	import { MeterChart as MeterChartCore, type MeterChartOptions } from '@carbon/charts'
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
	}: ChartProps<MeterChartCore, MeterChartOptions> = $props()
</script>

<!-- @component Meter chart component. -->

<BaseChart
	Chart={MeterChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
