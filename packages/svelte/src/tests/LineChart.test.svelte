<script lang="ts">
	import type { LineChart as LineChartCore } from '@carbon/charts'
	import { lineDemos } from '@carbon/charts/demo'
	import { LineChart } from '../../dist'

	const { lineOptions: options, lineLongLabelData: data } = lineDemos
	let chart: LineChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<LineChart
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
	this={LineChart}
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
