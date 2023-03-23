<script lang="ts">
	import { SimpleBarChart } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'
	export let chart: BaseChart | null = null
	export let ref: HTMLDivElement | null = null
</script>

<BaseChart
	{...$$restProps}
	Chart={SimpleBarChart}
	bind:ref
	bind:chart
	on:load
	on:update
	on:destroy
/>
