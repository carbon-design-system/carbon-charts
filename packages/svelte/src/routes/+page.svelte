<script lang="typescript">
	import charts from '@carbon/charts-docs'
	import * as ChartComponents from '$lib/index'
	import '@carbon/charts/styles.min.css'
</script>

<h1>Carbon Charts Svelte</h1>
<h2>Component Test Harness</h2>

{#each charts as chart}
	<h3>{chart.types.svelte}</h3>
	{#each chart.examples as example}
		<svelte:component this={ChartComponents[chart.types.svelte]} options={example.options} data={example.data} />
	{/each}
{/each}