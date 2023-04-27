<script lang="ts">
	import { BulletChart, type BulletChartOptions, type ChartTabularData } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let chart: BulletChart
	export let options: BulletChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
</script>

<BaseChart
	{...$$restProps}
	Chart={BulletChart}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
