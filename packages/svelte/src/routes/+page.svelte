<script lang="ts">
	import charts from '../../../docs/src/charts'
	import chartComponents from '$lib'
	import '@carbon/charts/styles.min.css'
</script>

<h1>Carbon Charts Svelte</h1>
<h2>Component Test Harness</h2>

{#each charts as chart}
	<h3>{chart.types.svelte}</h3>
	{#each chart.examples as example}
		<svelte:component
			this={chartComponents[chart.types.svelte]}
			options={example.options}
			data={example.data} />
	{/each}
{/each}
