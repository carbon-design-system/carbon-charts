<script lang="ts">
  import { Tabs, Tab, TabContent, CodeSnippet, UnorderedList, ListItem } from "carbon-components-svelte"
  import PageTitle from '$lib/PageTitle.svelte'
</script>

<PageTitle title="Installation &amp; setup"/>

<h2>Select your development framework</h2>

<Tabs>
  <Tab label="Vanilla JavaScript" />
  <Tab label="Svelte" />
  <Tab label="React" />
  <Tab label="Vue" />
  <Tab label="Angular" />
  <svelte:fragment slot="content">
    <h3>Installation for bundlers like vite</h3>
    <TabContent>
      <p>
        <strong>npm</strong>
        <CodeSnippet code="npm install -S @carbon/charts @carbon/styles d3 d3-cloud d3-sankey" /><br/>
        <strong>yarn</strong>:
        <CodeSnippet code="yarn add @carbon/charts @carbon/styles d3 d3-cloud d3-sankey" />
      </p>
      
      Some dependencies are optional:
      <UnorderedList>
        <ListItem><strong>@carbon/styles</strong> - only needed when charts include the toolbar.</ListItem>
        <ListItem><strong>d3-cloud</strong> - required for Alluvial charts.</ListItem>
        <ListItem><strong>d3-word</strong> - required for Word Cloud charts.</ListItem>
      </UnorderedList>

      <h3>Loading in the browser</h3>
      <p>The following is an example showing how the dependencies can be added to a web page without a bundler. These tags should be added to the page's head.</p>
      <CodeSnippet type="multi" code={
`<script src="https://unpkg.com/@carbon/charts@latest/dist/index.js" defer></script>
<link href="https://unpkg.com/@carbon/charts@latest/dist/styles.css" rel="stylesheet" crossorigin="anonymous" />
<link href="https://unpkg.com/@carbon/styles@latest/css/styles.css" rel="stylesheet" crossorigin="anonymous" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js" defer integrity="sha512-M7nHCiNUOwFt6Us3r8alutZLm9qMt4s9951uo8jqO4UwJ1hziseL6O3ndFyigx6+LREfZqnhHxYjKRJ8ZQ69DQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-cloud/1.2.5/d3.layout.cloud.min.js" defer integrity="sha512-HjKxWye8lJGPu5q1u/ZYkHlJrJdm6KGr89E6tOrXeKm1mItb1xusPU8QPcKVhP8F9LjpZT7vsu1Fa+dQywP4eg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-sankey/0.12.3/d3-sankey.min.js" defer integrity="sha512-KK15oKpabNDaLpWinMtNfTqy/V7pzlc2FRG174PfASes7RRx6TAsua8HJdRTKo8+BLvPBKNIkL7kXWcz5HoqqA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400|IBM+Plex+Sans:400,600&display=swap" rel="stylesheet" crossorigin="anonymous" />`}/>

    <h3>Styles &amp; Fonts</h3>
    <p>
      Carbon Charts requires a minimum of one stylesheet:
      <CodeSnippet code="import '@carbon/charts/styles.css'" />
      If you are using toolbars with your charts, you also have to include <strong>@carbon/styles</strong>.
      <CodeSnippet code="import '@carbon/styles/css/styles.css'" />
      Using the CSS version of <strong>@carbon/styles</strong> will apply styles to the html body that may interfere with other global styling
      schemes such as for Bootstrap and Material Design. A way around this is to use SCSS and set a variable before <strong>@carbon/styles</strong> is loaded...
      <CodeSnippet code="$css--body: false; // Do not emit styles for body element" /><br/>
      More information on using <strong>@carbon/styles</strong> with SCSS can be found <a href="https://github.com/carbon-design-system/carbon/blob/HEAD/packages/styles/docs/sass.md#files" target="_blank">here</a>.

      The default font family for Carbon Charts is <a href="https://fonts.google.com/specimen/IBM+Plex+Sans" target="_blank">IBM Plex Sans</a>. If you prefer
      a different font, you can override two custom CSS properties for the CSS class that is automatically associated with the chart container like this...
      <CodeSnippet type="multi" code={
`.cds--cc--chart-wrapper {
  --cds-charts-font-family: Roboto;
  --cds-charts-font-family-condensed: 'Roboto Condensed';
}`}/>
    </p>

    </TabContent>

    <TabContent>Svelte content</TabContent>
    <TabContent>React content</TabContent>
    <TabContent>Vue content</TabContent>
    <TabContent>Angular content</TabContent>

  </svelte:fragment>
</Tabs>

<style lang="scss">
  h3 {
    margin-top: 1rem;
  }
</style>