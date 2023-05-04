<script lang="ts">
	import type { ScatterChart as ScatterChartCore } from '@carbon/charts'
	import { scatterDemos } from '@carbon/charts/demo'
	import { ScatterChart } from '../../types'

	const { scatterDiscreteOptions: options, scatterDiscreteData: data } = scatterDemos
	let chart: ScatterChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<ScatterChart
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
	this={ScatterChart}
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
