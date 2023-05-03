<script lang="ts">
	import AreaChart from  '../lib/AreaChart.svelte'
	import type { AreaChart as AreaChartCore } from '@carbon/charts'
	import { areaTimeSeriesData as data, areaTimeSeriesOptions } from '@carbon/charts/demo'

	let chart: AreaChartCore | null = null
	let ref: HTMLDivElement | null = null

	const options = areaTimeSeriesOptions as any
</script>

<AreaChart
	bind:chart
	bind:ref
	on:load={(e) => {
		console.log(e.detail)
	}}
	on:update={(e) => {
		console.log(e.detail)
	}}
	on:destroy={(e) => {
		console.log(e.detail)
	}}
	{data}
	{options} />

<svelte:component
	this={AreaChart}
	on:load={(e) => {
		console.log(e.detail)
	}}
	on:update={(e) => {
		console.log(e.detail)
	}}
	on:destroy={(e) => {
		console.log(e.detail)
	}}
	{data}
	{options} />
