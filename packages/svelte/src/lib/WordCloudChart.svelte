<script lang="ts">
	import { WordCloudChart as WordCloudChartCore, type WordCloudChartOptions } from '@carbon/charts'
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
	}: ChartProps<WordCloudChartCore, WordCloudChartOptions> = $props()
</script>

<!-- @component Word cloud chart component. -->

<BaseChart
	Chart={WordCloudChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
