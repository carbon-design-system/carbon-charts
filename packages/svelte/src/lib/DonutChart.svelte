<script lang="ts">
	import { DonutChart as DonutChartCore, type DonutChartOptions } from '@carbon/charts'
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
	}: ChartProps<DonutChartCore, DonutChartOptions> = $props()
</script>

<!-- @component Donut chart component. -->

<BaseChart
	Chart={DonutChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
