<script lang="ts">
	import type { StackedBarChart as StackedBarChartCore } from '@carbon/charts'
	import { barDemos } from '@carbon/charts/demo'
	import { BarChartStacked } from '../../dist'

	const { stackedBarOptions: options, stackedBarData: data } = barDemos
	let chart: StackedBarChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<BarChartStacked
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
	this={BarChartStacked}
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
