<script lang="ts">
	import {
		ChoroplethChart as ChoroplethChartCore,
		type ChoroplethChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: ChoroplethChartOptions
	export let data: ChartTabularData
	export let chart: ChoroplethChartCore | undefined = undefined
	export let ref: HTMLDivElement | undefined = undefined
</script>

<BaseChart
	{...$$restProps}
	Chart={ChoroplethChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
