<script lang="ts">
	import { AlluvialChart } from '@carbon/charts-svelte'
  import StackBlitzLauncher from '$lib/StackBlitzLauncher.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import { chartType, examples } from './examples'
	import '@carbon/charts-svelte/styles.css'
</script>

<PageTitle title="Alluvial / Sankey Charts" />

<p>
	Alluvial, or Sankey diagrams, are a type flow diagram designed to show two indicators of a dataset
	and how records distribute among them, highlighting correlations.
</p>
<p>
	Multiple blocks of two indicators can be placed next to each other creating a wider alluvial
	diagram but it’s crucial to consider that this specific kind of chart does not show correlations
	between indicators that are not directly connected. This is usually emphasized using a different
	set of colors for each block.
</p>

<h2>Examples</h2>

{#each examples as example}
	<p class="chart">
		<AlluvialChart data={example.data} options={example.options} />
    <StackBlitzLauncher {example} {chartType} />
	</p>
{/each}

<style lang="scss">
	p.chart {
		margin-bottom: 3rem;
	}
</style>
