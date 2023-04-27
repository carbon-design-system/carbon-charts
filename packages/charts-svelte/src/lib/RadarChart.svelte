<script lang="ts">
	import { RadarChart, type RadarChartOptions, type ChartTabularData } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let chart: RadarChart
	export let options: RadarChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
</script>

<BaseChart
	{...$$restProps}
	Chart={RadarChart}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
