<script lang="ts">
	import {
		SimpleBarChart as SimpleBarChartCore,
		type BarChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: BarChartOptions
	export let data: ChartTabularData
	export let chart: SimpleBarChartCore | null  = null
	export let ref: HTMLDivElement | null  = null
</script>

<BaseChart
	{...$$restProps}
	Chart={SimpleBarChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
