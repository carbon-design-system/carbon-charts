<script lang="typescript">
	import charts from '../../../docs/src/charts'
	import * as chartComponents from '$lib'
	import '@carbon/charts/scss'
</script>

<div class="container">
	<h1>Carbon Charts Svelte</h1>
	<h2>Component Test Harness</h2>

	{#each charts as chart}
		<h3>{chart.types.svelte}</h3>
		{#each chart.examples as example}
			{@const Chart = chartComponents[chart.types.svelte]}
			{#if example.tags?.includes('test')}
				<div class="example">
					<Chart options={example.options} data={example.data} />
				</div>
			{/if}
		{/each}
	{/each}
</div>

<style>
	.container {
		width: 60rem;
	}

	.example {
		margin-bottom: 5rem;
	}
</style>
