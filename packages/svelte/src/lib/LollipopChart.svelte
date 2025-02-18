<script lang="typescript">
	import {
		LollipopChart as LollipopChartCore,
		type LollipopChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: LollipopChartOptions
	export let data: ChartTabularData
	export let chart: LollipopChartCore | undefined = undefined
	export let ref: HTMLDivElement | undefined = undefined
</script>

<BaseChart
	{...$$restProps}
	Chart={LollipopChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
