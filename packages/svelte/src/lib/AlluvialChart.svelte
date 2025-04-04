<script lang="ts">
	import { AlluvialChart as AlluvialChartCore, type AlluvialChartOptions } from '@carbon/charts'
	import type { ChartProps } from '$lib/interfaces'
	import BaseChart from '$lib/BaseChart.svelte'

	let {
		data,
		options,
		ref = $bindable(),
		chart = $bindable(),
		onload,
		onupdate,
		ondestroy,
		...rest
	}: ChartProps<AlluvialChartCore, AlluvialChartOptions> = $props()
</script>

<!-- @component Alluvial chart component. -->

<BaseChart
	Chart={AlluvialChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
