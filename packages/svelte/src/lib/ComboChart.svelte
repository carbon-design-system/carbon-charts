<script lang="ts">
	import { ComboChart as ComboChartCore, type ComboChartOptions } from '@carbon/charts'
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
	}: ChartProps<ComboChartCore, ComboChartOptions> = $props()
</script>

<!-- @component Combo chart component - supports mixing types such as bar and line charts. -->

<BaseChart
	Chart={ComboChartCore}
	{options}
	{data}
	bind:ref
	bind:chart
	{onload}
	{onupdate}
	{ondestroy}
	{...rest} />
