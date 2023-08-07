<script lang="ts">
  import { Grid, Row, Column } from 'carbon-components-svelte'
  import PageTitle from '$lib/PageTitle.svelte'
</script>

<PageTitle title="Alluvial / Sankey Charts"/>

<Grid>
  <Row>
    <Column>
      <p>Alluvial, or Sankey diagrams, are a type flow diagram designed to show two indicators of a dataset and how records distribute among them, highlighting correlations.</p>
      <p>Multiple blocks of two indicators can be placed next to each other creating a wider alluvial diagram but it’s crucial to consider that this specific kind of chart does not show correlations between indicators that are not directly connected. This is usually emphasized using a different set of colors for each block.</p>
      
    </Column>
    <Column>&nbsp;</Column>
  </Row>
</Grid>