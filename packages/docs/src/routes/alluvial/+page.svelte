<script lang="ts">
	import { UnorderedList, ListItem } from 'carbon-components-svelte'

	import PageTitle from '$lib/PageTitle.svelte'
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
<UnorderedList>
  <ListItem>Gradient</ListItem>
  <ListItem>Multiple Categories</ListItem>
  <ListItem>Monochrome with Custom Node Padding</ListItem>
  <ListItem>Aligned Nodes</ListItem>
  <ListItem>Custom Colors</ListItem>
</UnorderedList>

<h2>Selects</h2>
<UnorderedList>
  <ListItem>Theme</ListItem>
  <ListItem>Color Palette</ListItem>
</UnorderedList>