<script lang="ts">
	import { DonutChart, type DonutChartOptions, type ChartTabularData } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let chart: DonutChart
	export let options: DonutChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
</script>

<BaseChart {...$$restProps}
	Chart={DonutChart}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy
/>
