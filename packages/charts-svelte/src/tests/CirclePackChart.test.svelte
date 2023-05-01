<script lang="ts">
	import { CirclePackChart } from '../types'
	import type { CirclePackChart as CirclePackChartCore } from '@carbon/charts'
	import { circlePackThreeLevelData as data, circlePackSingleOptions } from '@carbon/charts/demo'

	let chart: CirclePackChartCore | null = null
	let ref: HTMLDivElement | null = null

	const options = circlePackSingleOptions as any
</script>

<CirclePackChart
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
	this={CirclePackChart}
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
