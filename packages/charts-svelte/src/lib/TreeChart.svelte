<script lang="ts">
	import { TreeChart, type TreeChartOptions, type ChartTabularData } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let chart: TreeChart
	export let options: TreeChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
</script>

<BaseChart {...$$restProps}
	Chart={TreeChart}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy
/>
