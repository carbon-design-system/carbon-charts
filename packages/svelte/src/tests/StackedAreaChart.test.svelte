<script lang="ts">
	import StackedAreaChart from '../lib/StackedAreaChart.svelte'
	import type { StackedAreaChart as StackedAreaChartCore } from '@carbon/charts'
	import {
		stackedAreaTimeSeriesData as data,
		stackedAreaTimeSeriesOptions
	} from '@carbon/charts/demo'

	let chart: StackedAreaChartCore | null = null
	let ref: HTMLDivElement | null = null

	const options = stackedAreaTimeSeriesOptions as any
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
