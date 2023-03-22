<script lang="ts">
	export let chart: BaseChart | null = null
	export let ref: HTMLDivElement | null = null

	import { RadarChart } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'
</script>

<BaseChart {...$$restProps} Chart={RadarChart} bind:ref bind:chart on:load on:update on:destroy />
