<script lang="ts">
	import charts from '../../../docs/src/charts'
	import chartComponents from '$lib'
	import '@carbon/charts/scss'
</script>

<div class="container">
	<h1>Carbon Charts Svelte</h1>
	<h2>Component Test Harness</h2>

	{#each charts as chart}
		<h3>{chart.types.svelte}</h3>
		{#each chart.examples as example}
			<div class="example">
				<svelte:component
					this={chartComponents[chart.types.svelte]}
					options={example.options}
					data={example.data} />
			</div>
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
