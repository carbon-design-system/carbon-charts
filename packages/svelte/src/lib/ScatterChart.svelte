<script lang="ts">
	import {
		ScatterChart as ScatterChartCore,
		type ScatterChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: ScatterChartOptions
	export let data: ChartTabularData
	export let chart: ScatterChartCore | null = null
	export let ref: HTMLDivElement | null = null
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
