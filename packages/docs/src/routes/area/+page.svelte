<script lang="ts">
	import { AreaChart, StackedAreaChart } from '@carbon/charts-svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import StackBlitzLauncher from '$lib/StackBlitzLauncher.svelte'
	import { chartTypes, examples } from './examples'
  import { chartTypesStacked, examplesStacked } from './examplesStacked'

  import '@carbon/charts-svelte/styles.css'
</script>

<PageTitle title="Area Charts" />

<p>
	Area charts are similar to line charts but with areas below the lines filled with colors or
	patterns.
</p>

<h2 id="basic">Basic</h2>

{#each examples as example}
	<p class="chart">
		<AreaChart data={example.data} options={example.options} />
		<StackBlitzLauncher {example} {chartTypes} />
	</p>
{/each}

<h2 id="stacked">Stacked</h2>

<p>
	Stacked area charts are useful for comparing proportional contributions within a category. They
	plot the relative value that each data series contributes to the total.
</p>

{#each examplesStacked as example}
	<p class="chart">
		<StackedAreaChart data={example.data} options={example.options} />
		<StackBlitzLauncher {example} {chartTypesStacked} />
	</p>
{/each}