# Carbon Charts

Carbon Charts is a component library for vanilla JavaScript. Chart visualizations are based on D3.js, a peer dependency.

The required styles should be imported from `@carbon/charts/styles.css` and `@carbon/styles/css/styles.css`. Additional documentation is provided in the Storybook demos.

## Getting started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/charts @carbon/styles d3 d3-cloud d3-sankey
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @carbon/charts @carbon/styles d3 d3-cloud d3-sankey
```

## Step-by-step instructions

Read
[Getting Started](https://charts.carbondesignsystem.com/?path=/docs/docs-getting-started-vanilla-javascript--docs)

## Storybook and StackBlitz Examples

[Live examples](https://carbon-design-system.github.io/carbon-charts).

**When opening the link above**, click on the **Edit on StackBlitz** button for each demo to see an
isolated project showing you how to reproduce the demo.

## Charting data & options

Although new charts will be introduced in the future (such as a choropleth), data and options follow the same model for all charts with minor exceptions. For example, in the case of a donut chart, you're able to pass in an additional field called `center` in your options to configure the donut center.

For instructions on using the **tabular data format**, see
[here](https://charts.carbondesignsystem.com/?path=/docs/docs-tutorials-tabular-data-format--docs)

Customizable options (specific to chart type) can be found
[here](https://charts.carbondesignsystem.com/documentation/modules/interfaces.html)
