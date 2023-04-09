<script lang="ts">
	import { BoxplotChart, type BoxplotChartOptions, type ChartTabularData } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let chart: BoxplotChart
	export let options: BoxplotChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
</script>

<BaseChart {...$$restProps}
	Chart={BoxplotChart}
	{options}
	{data}
	bind:ref 
	bind:chart
	on:load
	on:update
	on:destroy
/>
