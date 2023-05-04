<script lang="ts">
	import type { ComboChart as ComboChartChartCore } from '@carbon/charts'
	import { ComboChart } from '../../types'
	import { comboDemos } from '@carbon/charts/demo'

	const { comboSimpleOptions: options, comboSimpleData: data } = comboDemos
	let chart: ComboChartChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<ComboChart
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
	this={ComboChart}
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