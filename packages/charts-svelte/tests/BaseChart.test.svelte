<script lang="ts">
	import BaseChart from '../types/BaseChart'
	import { stackedBarData as data, stackedBarOptions } from '@carbon/charts/demo/data'

	let chart: any | null = null
	let ref: HTMLDivElement | null = null

	const options = stackedBarOptions as any
</script>

<BaseChart
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
	this={BaseChart}
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
