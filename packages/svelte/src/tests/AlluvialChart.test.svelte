<script lang="ts">
	import type { AlluvialChart as AlluvialChartCore } from '@carbon/charts'
	import { alluvialDemos } from '@carbon/charts/demo'
	import { AlluvialChart } from '../../dist'

	const { alluvialSimpleOptions: options, alluvialSimpleData: data } = alluvialDemos
	let chart: AlluvialChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<AlluvialChart
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
	this={AlluvialChart}
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
