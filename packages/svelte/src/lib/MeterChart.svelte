<script lang="ts">
	import {
		MeterChart as MeterChartCore,
		type MeterChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: MeterChartOptions
	export let data: ChartTabularData
	export let chart: MeterChartCore | null  = null
	export let ref: HTMLDivElement | null  = null
</script>

<BaseChart
	{...$$restProps}
	Chart={MeterChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
