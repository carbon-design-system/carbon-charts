<script lang="ts">
	import {
		WordCloudChart as WordCloudChartCore,
		type WorldCloudChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let chart: WordCloudChartCore
	export let options: WorldCloudChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
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
