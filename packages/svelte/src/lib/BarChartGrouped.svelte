<script lang="typescript">
	import {
		GroupedBarChart as GroupedBarChartCore,
		type BarChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: BarChartOptions
	export let data: ChartTabularData
	export let chart: GroupedBarChartCore | undefined = undefined
	export let ref: HTMLDivElement | undefined = undefined
</script>

<BaseChart
	{...$$restProps}
	Chart={GroupedBarChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
