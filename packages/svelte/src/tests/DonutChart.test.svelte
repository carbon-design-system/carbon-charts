<script lang="ts">
	import type { DonutChart as DonutChartCore } from '@carbon/charts'
	import { donutDemos } from '@carbon/charts/demo'
	import { DonutChart } from '../../dist'

	const { donutOptions: options, donutData: data } = donutDemos
	let chart: DonutChartCore | null = null
	let ref: HTMLDivElement | null = null
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
