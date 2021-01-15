# `@carbon/charts-svelte`

> Carbon Charting Svelte Wrappers

**[Storybook demos](https://carbon-design-system.github.io/carbon-charts/svelte)**

**[Storybook demo sources](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data)**

## Maintenance & support
These Svelte wrappers have been developed by Eric Liu.

Please direct all questions regarding support, bug fixes, and feature requests to [@metonym](https://github.com/metonym).

## Getting started
Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/charts @carbon/charts-svelte d3@5.x
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/charts @carbon/charts-svelte d3@5.x
```

**Note:** you'd also need to install `carbon-components` if you're not using a bundled version of the library.

## Step-by-step instructions

Quickly scaffold a project from the official [Svelte webpack template](https://github.com/sveltejs/template-webpack) using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit sveltejs/template-webpack svelte-app
cd svelte-app
```

Install the dependencies:

```bash
yarn add carbon-components @carbon/charts @carbon/charts-svelte d3
```

Let's add a simple bar chart from `@carbon/charts-svelte`.

First, import the `BarChartSimple` component in `src/App.svelte`.

```html
<!-- src/App.svelte -->
<script>
  import { BarChartSimple } from "@carbon/charts-svelte";
</script>
```

Next, add an external stylesheet using the svelte:head API.

```html
<!-- src/App.svelte -->
<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/@carbon/charts/styles.min.css" />
</svelte:head>
```

Then, instantiate the `BarChartSimple` component with some sample data. 

```html
<!-- src/App.svelte -->
<BarChartSimple
	data={[
	{
		"group": "Qty",
		"value": 65000
	},
	{
		"group": "More",
		"value": 29123
	},
	{
		"group": "Sold",
		"value": 35213
	},
	{
		"group": "Restocking",
		"value": 51213
	},
	{
		"group": "Misc",
		"value": 16932
	}
]}
	options={{
	"title": "Simple bar (discrete)",
	"axes": {
		"left": {
			"mapsTo": "value"
		},
		"bottom": {
			"mapsTo": "group",
			"scaleType": "labels"
		}
	},
	"height": "400px"
}}
	/>
```

Run the app in development mode.

```bash
yarn dev
```

Navigate to [http://localhost:8080](http://localhost:8080). You should see the bar chart rendered in the browser.

## Codesandbox examples
[Sample use cases can be seen here](https://carbon-design-system.github.io/carbon-charts/svelte).

**When opening the link above**, click on the **Edit on Codesandbox** button for each demo to see an isolated project showing you how to reproduce the demo.

## Charting data & options
Although we will definitely introduce new models in the future as we start shipping new components such as maps, Data and options follow the same model in all charts, with minor exceptions and differences in specific components.

For instance in the case of a donut chart you're able to pass in an additional field called `center` in your options configuring the donut center.

For instructions on using the **tabular data format**, see [here](https://carbon-design-system.github.io/carbon-charts/?path=/story/tutorials--tabular-data-format)

There are also additional options available depending on the chart type being used, [see our demo examples here](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data).

Customizable options (specific to chart type) can be found [here](https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html)
