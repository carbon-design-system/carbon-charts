<script lang="ts">
	import { HistogramChart } from '../types'
	import type { HistogramChart as HistogramChartCore } from '@carbon/charts'
	import {
		histogramContinueData as data,
		histogramContinueWithBinsOptions
	} from '@carbon/charts/demo'

	let chart: HistogramChartCore | null = null
	let ref: HTMLDivElement | null = null

	const options = histogramContinueWithBinsOptions as any
</script>

<HistogramChart
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
	this={HistogramChart}
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
