<script lang="ts">
	import {
		AlluvialChart as AlluvialChartCore,
		type AlluvialChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: AlluvialChartOptions
	export let data: ChartTabularData
	export let chart: AlluvialChartCore | null = null
	export let ref: HTMLDivElement | null = null
</script>

<BaseChart
	{...$$restProps}
	Chart={AlluvialChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
