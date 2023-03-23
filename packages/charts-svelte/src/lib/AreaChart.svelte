<script lang="ts">
	import { AreaChart } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'
	export let chart: BaseChart | null = null
	export let ref: HTMLDivElement | null = null
</script>

<BaseChart {...$$restProps} Chart={AreaChart} bind:ref bind:chart on:load on:update on:destroy />
