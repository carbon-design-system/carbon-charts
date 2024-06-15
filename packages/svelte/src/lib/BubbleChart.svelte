<script lang="ts">
	import {
		BubbleChart as BubbleChartCore,
		type BubbleChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: BubbleChartOptions
	export let data: ChartTabularData
	export let chart: BubbleChartCore | undefined = undefined
	export let ref: HTMLDivElement | undefined = undefined
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
