<script lang="ts">
	import type { TreemapChart as TreemapChartCore } from '@carbon/charts'
	import { TreemapChart } from '../../types'
	import { treemapDemos } from '@carbon/charts/demo'

	const { treemapOptions: options, treemapData: data } = treemapDemos
	let chart: TreemapChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<TreemapChart
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
	this={TreemapChart}
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
