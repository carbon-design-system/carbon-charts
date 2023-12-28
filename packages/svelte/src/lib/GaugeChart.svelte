<script lang="ts">
	import {
		GaugeChart as GaugeChartCore,
		type GaugeChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: GaugeChartOptions
	export let data: ChartTabularData
	export let chart: GaugeChartCore | null = null
	export let ref: HTMLDivElement | null = null
</script>

<BaseChart
	{...$$restProps}
	Chart={GaugeChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
