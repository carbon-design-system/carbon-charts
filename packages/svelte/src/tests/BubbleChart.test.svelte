<script lang="ts">
	import type { BubbleChart as BubbleChartCore } from '@carbon/charts'
	import { BubbleChart } from '../../types'
	import { bubbleDemos } from '@carbon/charts/demo'

	const { bubbleDoubleLinearOptions: options, bubbleDoubleLinearData: data } = bubbleDemos
	let chart: BubbleChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<BubbleChart
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
	this={BubbleChart}
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
