<script lang="ts">
	import { AlluvialChart } from '../types'
	import { alluvialSimpleData as data, alluvialSimpleOptions } from '@carbon/charts/demo/data'

	let chart: any | null = null
	let ref: HTMLDivElement | null = null

	const options = alluvialSimpleOptions as any
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
	{options}
/>

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
	{options}
/>
