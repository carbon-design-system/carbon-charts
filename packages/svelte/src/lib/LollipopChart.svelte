<script lang="ts">
	import { LollipopChart as LollipopChartCore, type LollipopChartOptions } from '@carbon/charts'
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
	}: ChartProps<LollipopChartCore, LollipopChartOptions> = $props()
</script>

<!-- @component Lollipop chart component. -->

<BaseChart
	Chart={LollipopChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
