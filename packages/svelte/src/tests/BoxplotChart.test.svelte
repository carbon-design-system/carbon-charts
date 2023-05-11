<script lang="ts">
	import type { BoxplotChart as BoxplotChartCore } from '@carbon/charts'
	import { boxplotDemos } from '@carbon/charts/demo'
	import { BoxplotChart } from '../../dist'

	const { simpleBoxplotOptions: options, simpleBoxplotData: data } = boxplotDemos
	let chart: BoxplotChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<BoxplotChart
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
	this={BoxplotChart}
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
