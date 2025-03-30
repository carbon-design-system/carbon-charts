<script lang="ts">
	import { RadarChart as RadarChartCore, type RadarChartOptions } from '@carbon/charts'
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
	}: ChartProps<RadarChartCore, RadarChartOptions> = $props()
</script>

<!-- @component Radar / kiviat chart component. -->

<BaseChart
	Chart={RadarChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
