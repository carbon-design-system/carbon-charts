<script lang="ts">
	import type { GaugeChart as GaugeChartCore } from '@carbon/charts'
	import { gaugeDemos } from '@carbon/charts/demo'
	import { GaugeChart } from '../../types'

	const { gaugeOptionsSemi: options, gaugeData: data } = gaugeDemos
	let chart: GaugeChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<GaugeChart
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
	this={GaugeChart}
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
