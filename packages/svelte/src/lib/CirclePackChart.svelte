<script lang="ts">
	import {
		CirclePackChart as CirclePackChartCore,
		type CirclePackChartOptions
	} from '@carbon/charts'
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
	}: ChartProps<CirclePackChartCore, CirclePackChartOptions> = $props()
</script>

<!-- @component Circle pack chart component. -->

<BaseChart
	Chart={CirclePackChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
