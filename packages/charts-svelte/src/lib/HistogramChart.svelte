<script lang="ts">
	import { HistogramChart, type HistogramChartOptions, type ChartTabularData } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let chart: HistogramChart
	export let options: HistogramChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
</script>

<BaseChart
	{...$$restProps}
	Chart={HistogramChart}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy
/>
