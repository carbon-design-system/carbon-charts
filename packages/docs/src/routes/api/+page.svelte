<script lang="ts">
  import PageTitle from '$lib/PageTitle.svelte'
  import { CodeSnippet } from 'carbon-components-svelte'
</script>

<PageTitle title="API (Vanilla JavaScript)"/>

<p>
  Carbon Charts exposes the entire API allowing you to heavily customize the look and feel and behaviors.
  When a chart is instantiated, the chart object contains key properties.
</p>

<CodeSnippet type="multi" code={
`const myChart = new PieChart({
  data: ...,
  options: ...
})

console.log(myChart)

// RESULT
{
  model, // where we store charting data & options
  services, // globalized functions that can affect charting behaviour. (e.g. event listener dispatching etc.)
  components // internally used for arranging the charting layout, you can disregard this
}`} />

<h2>Services and Event Handling</h2>

<p>
  Services are globalized functions. General tasks such as event dispatching, transition handling,
  DOM-related activities etc. are handled by services. For example,
  event listeners can be added through the events service
</p>

<p>
  To listen for event just use a reference to the chart to add an event listener for one of the dispatched events above. This is an example for adding an event
  listener for a mouseover event on bar chart rects.
</p>

<CodeSnippet code={`barChart.services.events.addEventListener("bar-mouseover", e => console.log(e.detail))`} />

<p>
  Event dispatching for chart elements allows applications to trigger custom UI actions and states when users interact with the charts.
  More information on events can be found <a href="https://charts.carbondesignsystem.com/api/classes/Events.html" target="_blank">here</a>.
</p>

<h2>Full Documentation</h2>

<iframe title="API Documentation" class="api" src="https://charts.carbondesignsystem.com/documentation/"></iframe>

<style lang="scss">
  .api {
    width: 100%;
    height: 1000px;
  }
</style>
