<script lang="ts">
	import type { GroupedBarChart as GroupedBarChartCore } from '@carbon/charts'
	import { barDemos } from '@carbon/charts/demo'
	import { BarChartGrouped } from '../../dist'

	const { groupedBarOptions: options, groupedBarData: data } = barDemos
	let chart: GroupedBarChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<BarChartGrouped
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
	this={BarChartGrouped}
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
