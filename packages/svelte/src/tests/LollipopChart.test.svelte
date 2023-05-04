<script lang="ts">
	import type { LollipopChart as LollipopChartCore } from '@carbon/charts'
	import { lollipopDemos } from '@carbon/charts/demo'
	import LollipopChart from '../lib/LollipopChart.svelte'

	const { lollipopDiscreteOptions: options, lollipopDiscreteData: data } = lollipopDemos
	let chart: LollipopChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<LollipopChart
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
	this={LollipopChart}
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
