<script lang="ts">
	import { GaugeChart as GaugeChartCore, type GaugeChartOptions } from '@carbon/charts'
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
	}: ChartProps<GaugeChartCore, GaugeChartOptions> = $props()
</script>

<!-- @component Guage chart component. -->

<BaseChart
	Chart={GaugeChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
