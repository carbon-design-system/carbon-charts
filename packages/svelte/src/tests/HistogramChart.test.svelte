<script lang="ts">
	import type { HistogramChart as HistogramChartCore } from '@carbon/charts'
	import { HistogramChart } from '../../types'
	import { histogramDemos } from '@carbon/charts/demo'

	const { histogramContinueWithBinsOptions: options, histogramContinueData: data } = histogramDemos
	let chart: HistogramChartCore | null = null
	let ref: HTMLDivElement | null = null
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
