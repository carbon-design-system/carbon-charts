<script lang="ts">
	import {
		StackedBarChart as StackedBarChartCore,
		type BarChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'
	export let chart: StackedBarChartCore
	export let options: BarChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
</script>

<BaseChart
	{...$$restProps}
	Chart={StackedBarChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
