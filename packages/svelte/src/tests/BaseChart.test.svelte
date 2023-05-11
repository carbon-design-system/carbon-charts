<script lang="ts">
	import type { Chart as BaseChartCore } from '@carbon/charts'
	import { barDemos } from '@carbon/charts/demo'
	import BaseChart from '../../dist'

	const { stackedBarOptions: options, stackedBarData: data } = barDemos
	let chart: BaseChartCore | null = null
	let ref: HTMLDivElement | null = null
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
	{options} />

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
	{options} />
