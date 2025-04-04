<script lang="ts">
	import { BulletChart as BulletChartCore, type BulletChartOptions } from '@carbon/charts'
	import type { ChartProps } from '$lib/interfaces'
	import BaseChart from './BaseChart.svelte'

	let {
		data,
		options,
		ref = $bindable(),
		chart = $bindable(),
		onload,
		onupdate,
		ondestroy,
		...rest
	}: ChartProps<BulletChartCore, BulletChartOptions> = $props()
</script>

<!-- @component Bullet chart component. -->

<BaseChart
	Chart={BulletChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
