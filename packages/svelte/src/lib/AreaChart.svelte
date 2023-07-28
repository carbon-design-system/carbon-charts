<script lang="ts">
	import {
		AreaChart as AreaChartCore,
		type AreaChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: AreaChartOptions
	export let data: ChartTabularData
	export let chart: AreaChartCore | null  = null
	export let ref: HTMLDivElement | null  = null
</script>

<BaseChart
	{...$$restProps}
	Chart={AreaChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
