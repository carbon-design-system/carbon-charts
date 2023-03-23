<script lang="ts">
	import { AlluvialChart, type AlluvialChartOptions } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'

	// export let options: AlluvialChartOptions | any = {}
	export let chart: BaseChart | null = null
	export let ref: HTMLDivElement | null = null
</script>

<BaseChart
	{...$$restProps}
	Chart={AlluvialChart}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy
/>
