<script lang="ts">
	import { ComboChart, type ComboChartOptions, type ChartTabularData } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let chart: ComboChart
	export let options: ComboChartOptions
	export let data: ChartTabularData
	export let ref: HTMLDivElement
</script>

<BaseChart
	{...$$restProps}
	Chart={ComboChart}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
