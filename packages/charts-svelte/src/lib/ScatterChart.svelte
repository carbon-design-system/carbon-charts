<script lang="ts">
	import { ScatterChart, type ScatterChartOptions, type ChartTabularData } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let chart: ScatterChart
	export let options: ScatterChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
</script>

<BaseChart {...$$restProps}
	Chart={ScatterChart}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy
/>
