<script lang="ts">
	import type { AreaChart as AreaChartCore } from '@carbon/charts'
	import { areaDemos } from '@carbon/charts/demo'
	import { AreaChart } from '../../types'

	const { areaTimeSeriesOptions: options, areaTimeSeriesData: data } = areaDemos
	let chart: AreaChartCore | null = null
	let ref: HTMLDivElement | null = null
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
