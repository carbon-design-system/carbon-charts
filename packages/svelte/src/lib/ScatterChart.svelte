<script lang="typescript">
	import {
		ScatterChart as ScatterChartCore,
		type ScatterChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: ScatterChartOptions
	export let data: ChartTabularData
	export let chart: ScatterChartCore | undefined = undefined
	export let ref: HTMLDivElement | undefined = undefined
</script>

<BaseChart
	{...$$restProps}
	Chart={ScatterChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
