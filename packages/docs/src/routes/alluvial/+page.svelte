<script lang="ts">
	import { AlluvialChart } from '@carbon/charts-svelte'
  import StackBlitzLauncher from '$lib/StackBlitzLauncher.svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import { chartTypes, examples } from './examples'
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
<p>Details on the Alluvial chart options can be found <a href="https://charts.carbondesignsystem.com/api/interfaces/interfaces.AlluvialChartOptions.html" target="_blank">here</a>.</p>
<p>
	Each example has buttons below to open a StackBlitz project for the framework you selected.
	The examples separate the data, options and templates to make it easier to follow. The fonts are loaded
	in the head of the HTML template. The styles are loaded in various ways according the the standards for their
	framework. Please note that Carbon Charts components have slightly different names for the same chart type in
	each framework.
</p>

<h2>Examples for supported frameworks</h2>

{#each examples as example}
	<p class="chart">
		<AlluvialChart data={example.data} options={example.options} />
    <StackBlitzLauncher {example} {chartTypes} />
	</p>
{/each}

<style lang="scss">
	p.chart {
		margin-bottom: 3rem;
	}
</style>
