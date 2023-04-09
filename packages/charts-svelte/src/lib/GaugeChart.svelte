<script lang="ts">
	import { GaugeChart, type GaugeChartOptions, type ChartTabularData } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let chart: GaugeChart
	export let options: GaugeChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
</script>

<BaseChart {...$$restProps}
	Chart={GaugeChart}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy
/>
