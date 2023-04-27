<script lang="ts">
	import { HeatmapChart, type HeatmapChartOptions, type ChartTabularData } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let chart: HeatmapChart
	export let options: HeatmapChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
</script>

<BaseChart
	{...$$restProps}
	Chart={HeatmapChart}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
