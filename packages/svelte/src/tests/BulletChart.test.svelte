<script lang="ts">
	import type { BulletChart as BulletChartCore } from '@carbon/charts'
	import { BulletChart } from '../../types'
	import { bulletDemos } from '@carbon/charts/demo'

	const { basicBulletOptions: options, basicBulletData: data } = bulletDemos
	let chart: BulletChartCore | null = null
	let ref: HTMLDivElement | null = null
</script>

<BulletChart
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
	this={BulletChart}
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
