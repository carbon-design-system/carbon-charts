<script lang="ts">
	import type { CirclePackChart as CirclePackChartCore } from '@carbon/charts'
	import { CirclePackChart } from '../../types'
	import { circlePackDemos } from '@carbon/charts/demo'

	const { circlePackSingleOptions: options, circlePackThreeLevelData: data } = circlePackDemos
	let chart: CirclePackChartCore | null = null
	let ref: HTMLDivElement | null = null
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
