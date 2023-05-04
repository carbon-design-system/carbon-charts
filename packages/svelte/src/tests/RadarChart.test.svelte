<script lang="ts">
	import type { RadarChart as RadarChartCore } from '@carbon/charts'
	import { radarDemos } from '@carbon/charts/demo'
	import { RadarChart } from '../../types'

	const { radarOptions: options, radarData: data } = radarDemos
	let chart: RadarChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<RadarChart
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
	this={RadarChart}
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
