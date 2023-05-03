<script lang="ts">
	import DonutChart from '../lib/DonutChart.svelte'
	import type { DonutChart as DonutChartCore } from '@carbon/charts'
	import { donutData as data, donutOptions } from '@carbon/charts/demo'

	let chart: DonutChartCore | null = null
	let ref: HTMLDivElement | null = null

	const options = donutOptions as any
</script>

<DonutChart
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
	this={DonutChart}
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
