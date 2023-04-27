<script lang="ts">
	import { LollipopChart, type LollipopChartOptions, type ChartTabularData } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let chart: LollipopChart
	export let options: LollipopChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
</script>

<BaseChart
	{...$$restProps}
	Chart={LollipopChart}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
