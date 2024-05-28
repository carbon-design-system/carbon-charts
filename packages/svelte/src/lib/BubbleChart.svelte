<script lang="ts">
	import {
		BubbleChart as BubbleChartCore,
		type BubbleChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: BubbleChartOptions
	export let data: ChartTabularData
	export let chart: BubbleChartCore
	export let ref: HTMLDivElement
</script>

<BaseChart
	{...$$restProps}
	Chart={BubbleChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
