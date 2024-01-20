<script lang="ts">
	import {
		TreeChart as TreeChartCore,
		type TreeChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: TreeChartOptions
	export let data: ChartTabularData
	export let chart: TreeChartCore | null = null
	export let ref: HTMLDivElement | null = null
</script>

<BaseChart
	{...$$restProps}
	Chart={TreeChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
