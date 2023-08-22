<script lang="ts">
  import { CodeSnippet } from 'carbon-components-svelte'
  import PageTitle from '$lib/PageTitle.svelte'
</script>

<PageTitle title="Themes"/>

<p>
  Four Carbon themes (white, g10, g90 and g100) are included in the styles.css file for each package. The latter three
  represent shades of gray where g10 is 10% and g100 is 100% (black).
</p>

<p>All chart types support the <a href="https://charts.carbondesignsystem.com/api/interfaces/interfaces.BaseChartOptions.html#theme" target="_blank">theme</a> property.</p>

<CodeSnippet
  type="multi"
  code={
`import myChartOptions from 'chart-options.js'

const options = {
  ...myChartOptions,
  theme: 'g100' // <- how to set the theme
}`
} />

<p>
  To use alternate background colors, set your options to a theme that is close in brightness to your background color such as g90 then
  override global CSS classes as shown below.
</p>

<CodeSnippet
  type="multi"
  code={
`// SCSS example

// Sets the chart holder's background to transparent
.cds--chart-holder[data-carbon-theme=g90] {
  .chart-grid-backdrop {
    fill: none; // will cause background the chart is sitting on to show through
  }
}

$my-tooltip-background-color: blue;

.bx--cc--tooltip {
  background-color: $my-tooltip-background-color;
}`
} />