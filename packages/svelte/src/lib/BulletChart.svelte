<script lang="typescript">
	import {
		BulletChart as BulletChartCore,
		type BulletChartOptions,
		type ChartTabularData
	} from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	export let options: BulletChartOptions
	export let data: ChartTabularData
	export let chart: BulletChartCore | undefined = undefined
	export let ref: HTMLDivElement | undefined = undefined
</script>

<BaseChart
	{...$$restProps}
	Chart={BulletChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy />
