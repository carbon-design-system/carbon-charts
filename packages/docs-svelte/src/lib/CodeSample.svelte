<script lang="ts">
	import type { EmbedOptions } from '@stackblitz/sdk'
	import type { ChartOptions, ChartTabularData } from '@carbon/charts-svelte'
	import sdk from '@stackblitz/sdk'
	import { onMount } from 'svelte'
	import { getProject } from './stackblitz'

	export let framework: Framework
	export let chartType: string = ''
	export let data: ChartTabularData
	export let options: ChartOptions
	let ref: HTMLDivElement

	const embedOptions: EmbedOptions = { height: 600, view: 'default', showSidebar: true }

	onMount(() => {
		sdk.embedProject(ref, getProject[framework](chartType, data, options), embedOptions)
	})
</script>

<div bind:this={ref}></div>
