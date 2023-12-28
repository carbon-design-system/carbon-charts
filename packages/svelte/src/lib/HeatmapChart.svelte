<script lang="ts">
	import {
		HeatmapChart as HeatmapChartCore,
		type HeatmapChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: HeatmapChartOptions
	export let data: ChartTabularData
	export let chart: HeatmapChartCore | null = null
	export let ref: HTMLDivElement | null = null
</script>

<BaseChart
	{...$$restProps}
	Chart={HeatmapChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
