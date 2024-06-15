<script lang="ts">
	import {
		TreemapChart as TreemapChartCore,
		type TreemapChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: TreemapChartOptions
	export let data: ChartTabularData
	export let chart: TreemapChartCore | undefined = undefined
	export let ref: HTMLDivElement | undefined = undefined
</script>

<BaseChart
	{...$$restProps}
	Chart={TreemapChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
