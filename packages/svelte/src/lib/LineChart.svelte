<script lang="typescript">
	import {
		LineChart as LineChartCore,
		type LineChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: LineChartOptions
	export let data: ChartTabularData
	export let chart: LineChartCore | undefined = undefined
	export let ref: HTMLDivElement | undefined = undefined
</script>

<BaseChart
	{...$$restProps}
	Chart={LineChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
