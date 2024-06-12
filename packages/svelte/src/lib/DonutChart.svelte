<script lang="ts">
	import {
		DonutChart as DonutChartCore,
		type DonutChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: DonutChartOptions
	export let data: ChartTabularData
	export let chart: DonutChartCore
	export let ref: HTMLDivElement
</script>

<BaseChart
	{...$$restProps}
	Chart={DonutChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
