<script lang="ts">
	import {
		ChoroplethChart as ChoroplethChartCore,
		type ChoroplethChartOptions
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
	}: ChartProps<ChoroplethChartCore, ChoroplethChartOptions> = $props()
</script>

<!-- @component Choropleth / geographic chart component. -->

<BaseChart
	Chart={ChoroplethChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
