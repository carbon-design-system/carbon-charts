<script lang="ts">
  import { base } from '$app/paths'

  import PageTitle from '$lib/PageTitle.svelte'
	import { Grid, Row, Column, OrderedList, ListItem } from 'carbon-components-svelte'
</script>

<PageTitle title="Chart Anatomy"/>

<Grid>
  <Row>
    <Column>
      <h2>Rectangular Charts</h2>

      <p>
        Most data visualizations are rectangular charts, with two dimensions
        represented on a vertical and a horizontal axis. Rectangular charts
        are typically constructed with a set of common elements including a
        legend, axis titles, and navigation tools like a zoom bar and tooltip.
      </p>
    </Column>
    <Column>&nbsp;</Column>
  </Row>

	<Row>
		<Column>
      <p><img class="diagram" src="{base}/images/chart-anatomy-rectangular.png" alt="Anatomy of a rectangular chart"></p>
    </Column>
    <Column>
      <OrderedList native>
        <ListItem>Chart title</ListItem>
        <ListItem>Axes</ListItem>
        <ListItem>Ticks</ListItem>
        <ListItem>Axis title</ListItem>
        <ListItem>Legends</ListItem>
        <ListItem>Toolbar</ListItem>
        <ListItem>Zoom bar</ListItem>
        <ListItem>Graph frame</ListItem>
        <ListItem>Tooltip</ListItem>
      </OrderedList>
    </Column>
  </Row>

  <Row>
    <Column>

      <h3>Titles, labels, and legends</h3>

      <p>
        The title of a piece of visualization should be descriptive and qualitative.
        It should also reflect the main insight the data reveals. The legend should
        explain the chart’s meaning by defining the association of each visual
        property, such as color, shape, and size, to the corresponding data. When
        possible, use labels directly on the chart to avoid long legends. All the
        text should be concise and easy to understand. Read more on <a href="{base}/legends">legend usage</a>.
      </p>

      <h3>Tooltips</h3>

      <p>
        A tooltip is a message that appears when a cursor is positioned over an
        element, such as a data point, icon button, or truncated text. By default,
        tooltips show on hover to reveal more detailed information or context for
        specific chart elements. A tooltip should repeat the corresponding values
        of the data point on both axes and any other relevant details.
      </p>

      <h3>Graph frames, axes, and ticks</h3>

      <p>
        The graph frame is the area where the data will be visualized as graphics
        or numbers. Axes, ticks, and the grid should help the reader understand
        the proportions and scale of the data, the indicators involved, and their
        unit of measure. Avoid filling the chart frame with too many elements, as
        it impacts the user’s ability to interpret the data. Read more on
        <a href="{base}/axes">axes usage</a>.
      </p>

      <h2>Circular Charts</h2>

      <p>Pie, donut and radar charts are examples of circular charts.</p>
    </Column>
    <Column>&nbsp;</Column>
  </Row>
  <Row>
    <Column>
      <p><img class="diagram" src="{base}/images/chart-anatomy-circular.png" alt="Anatomy of a circular chart"></p>
    </Column>
    <Column>
      <OrderedList native>
        <ListItem>Chart title</ListItem>
        <ListItem>Label</ListItem>
        <ListItem>Tooltip</ListItem>
        <ListItem>Legend</ListItem>
        <ListItem>Graph frame</ListItem>
        <ListItem>Big number</ListItem>
      </OrderedList>
    </Column>
  </Row>
  <Row>
    <Column>

      <h3>Labels</h3>

      <p>
        In a circular chart, labels offer the percentage value of the whole for
        an individual category. When the graphic translation of the data is less
        than 3 degrees, a callout is used to clearly associate the label with the
        slice. If the data translates as less than 1 degree, a slice will not be
        rendered on the chart, the data would not be keyboard accessible or available
        in a tooltip either. The only way to see the data in this scenario would be
        via a data table, a feature that we’d like to implement for all charts to
        enhance accessibility.
      </p>

      <h3>Big number or KPI</h3>

      <p>
        A key performance indicator (KPI) consists of a number with a single word
        description. Examples include “15,250 browsers”, “\$1.3M revenue”, or
        “Total 450”. A big number inside the donut chart may be used to display
        a total sum or the individual count of a slice upon interaction. This
        element can also be used independently on a dashboard (though please note
        this component is still a WIP and not available outside the donut chart).
      </p>
    </Column>
    <Column>&nbsp;</Column>
  </Row>
</Grid>

<style lang="scss">
  .diagram {
    width: 100%;
  }


</style>