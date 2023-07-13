<script lang="ts">
	import {
		ComboChart as ComboChartCore,
		type ComboChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: ComboChartOptions
	export let data: ChartTabularData
	export let chart: ComboChartCore | null  = null
	export let ref: HTMLDivElement | null  = null
</script>

<BaseChart
	{...$$restProps}
	Chart={ComboChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
