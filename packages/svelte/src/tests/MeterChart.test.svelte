<script lang="ts">
	import MeterChart from '../lib/MeterChart.svelte'
	import type { MeterChart as MeterChartCore } from '@carbon/charts'
	import { meterData as data, meterOptionsCustomColor } from '@carbon/charts/demo'

	let chart: MeterChartCore | null = null
	let ref: HTMLDivElement | null = null

	const options = meterOptionsCustomColor as any
</script>

<MeterChart
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
	this={MeterChart}
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
