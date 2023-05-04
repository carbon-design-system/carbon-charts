<script lang="ts">
	import type { PieChart as PieChartCore } from '@carbon/charts'
	import { pieDemos } from '@carbon/charts/demo'
	import { PieChart } from '../../types'

	const { pieCenteredOptions: options, pieCenteredData: data } = pieDemos
	let chart: PieChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<PieChart
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
	this={PieChart}
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
