<script lang="ts">
	import {
		BoxplotChart as BoxplotChartCore,
		type BoxplotChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: BoxplotChartOptions
	export let data: ChartTabularData
	export let chart: BoxplotChartCore | null = null
	export let ref: HTMLDivElement | null = null
</script>

<BaseChart
	{...$$restProps}
	Chart={BoxplotChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
