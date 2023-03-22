<script lang="ts">
	export let chart: BaseChart | null = null
	export let ref: HTMLDivElement | null = null

	import { LineChart } from '@carbon/charts'
	import BaseChart from './BaseChart.svelte'
</script>

<BaseChart {...$$restProps} Chart={LineChart} bind:ref bind:chart on:load on:update on:destroy />
