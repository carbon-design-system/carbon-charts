<script lang="ts">
	import {
		CirclePackChart as CirclePackChartCore,
		type CirclePackChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: CirclePackChartOptions
	export let data: ChartTabularData
	export let chart: CirclePackChartCore
	export let ref: HTMLDivElement
</script>

<BaseChart
	{...$$restProps}
	Chart={CirclePackChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
