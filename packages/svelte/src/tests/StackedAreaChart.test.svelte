<script lang="ts">
	import type { StackedAreaChart as StackedAreaChartCore } from '@carbon/charts'
	import { areaDemos } from '@carbon/charts/demo'
	import { StackedAreaChart } from '../../dist'

	const { stackedAreaTimeSeriesOptions: options, stackedAreaTimeSeriesData: data } = areaDemos
	let chart: StackedAreaChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<StackedAreaChart
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
	this={StackedAreaChart}
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
