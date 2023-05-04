<script lang="ts">
	import type { MeterChart as MeterChartCore } from '@carbon/charts'
	import { meterDemos } from '@carbon/charts/demo'
	import { MeterChart } from '../../types'

	const { meterOptionsCustomColor: options, meterData: data } = meterDemos
	let chart: MeterChartCore | null = null
	let ref: HTMLDivElement | null = null
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
