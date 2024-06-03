<script lang="ts">
	import {
		WordCloudChart as WordCloudChartCore,
		type WordCloudChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: WordCloudChartOptions
	export let data: ChartTabularData
	export let chart: WordCloudChartCore | null = null
	export let ref: HTMLDivElement | null = null
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
