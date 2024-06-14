<script lang="ts">
	import {
		WordCloudChart as WordCloudChartCore,
		type WordCloudChartOptions,
		type WorldCloudChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: WordCloudChartOptions | WorldCloudChartOptions
	export let data: ChartTabularData
	export let chart: WordCloudChartCore | undefined = undefined
	export let ref: HTMLDivElement | undefined = undefined
</script>

<BaseChart
	{...$$restProps}
	Chart={WordCloudChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
