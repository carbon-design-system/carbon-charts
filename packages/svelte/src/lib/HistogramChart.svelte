<script lang="ts">
	import {
		HistogramChart as HistogramChartCore,
		type HistogramChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: HistogramChartOptions
	export let data: ChartTabularData
	export let chart: HistogramChartCore | undefined = undefined
	export let ref: HTMLDivElement | undefined = undefined
</script>

<BaseChart
	{...$$restProps}
	Chart={HistogramChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
