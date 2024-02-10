<script lang="ts">
	import { CodeSnippet } from 'carbon-components-svelte'
	import PageTitle from '$lib/PageTitle.svelte'
</script>

<PageTitle title="Chart Options" />

<p>
	<a
		href="https://charts.carbondesignsystem.com/documentation/variables/configurations.options.html"
		target="_blank">API guide for chart options</a
	>.
</p>
<p>
	Options for all chart types extend from <a
		href="https://charts.carbondesignsystem.com/api/interfaces/interfaces.BaseChartOptions.html"
		target="_blank">BaseChartOptions</a
	>,
	<a
		href="https://charts.carbondesignsystem.com/api/interfaces/interfaces.ScatterChartOptions.html"
		target="_blank">ScatterChartOptions</a
	>, or
	<a
		href="https://charts.carbondesignsystem.com/api/interfaces/interfaces.AxisChartOptions.html"
		target="_blank">AxisChartOptions</a
	>. To see examples for each type of chart, navigate to <strong>Chart types</strong> on left.
</p>

<h3>Reactivity</h3>

<p>
	For Svelte, React, Vue and Angular, most options are reactive (with certain exceptions like
	positioning of the Legend and data grouping). For vanilla JavaScript, updates to options must be
	made via <a
		href="https://charts.carbondesignsystem.com/api/classes/ChartModel.html#setOptions"
		target="_blank">ChartModel.setOptions()</a
	>.
</p>

<CodeSnippet
	type="multi"
	code={`const myChart = new PieChart({
  data: ...,
  options: ...
})

myChart.model.setOptions(...)`} />
