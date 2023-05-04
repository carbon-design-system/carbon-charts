<script lang="ts">
	import type { WordCloudChart as WordCloudChartCore } from '@carbon/charts'
	import { wordCloudDemos } from '@carbon/charts/demo'
	import { WordCloudChart } from '../../types'

	const { wordCloudOptions: options, wordCloudData: data } = wordCloudDemos
	let chart: WordCloudChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<WordCloudChart
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
	this={WordCloudChart}
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
