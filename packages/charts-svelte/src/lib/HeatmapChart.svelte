<script lang="ts">
	import { HeatmapChart } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'
	export let chart: BaseChart | null = null
	export let ref: HTMLDivElement | null = null
</script>

<BaseChart {...$$restProps} Chart={HeatmapChart} bind:ref bind:chart on:load on:update on:destroy />
