# Carbon Charts React

Carbon Charts React is a thin React wrapper around the vanilla JavaScript `@carbon/charts` component library. The charts are based on D3.js, a peer dependency.

The required styles should be imported from `@carbon/charts-react/styles.css` and `@carbon/styles/css/styles.css`. Additional documentation is provided in the Storybook demos.

**[Storybook demos](https://carbon-design-system.github.io/carbon-charts/react)**

**[Storybook demo sources](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data)**

## Getting started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/charts-react @carbon/styles d3 d3-cloud d3-sankey
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @carbon/charts-react @carbon/styles d3 d3-cloud d3-sankey
```

## Step-by-step instructions

Read [Getting Started](https://charts.carbondesignsystem.com/?path=/docs/docs-getting-started-react--docs)

## Storybook and StackBlitz Examples

[Sample use cases can be seen here](https://carbon-design-system.github.io/carbon-charts/react).

**When opening the link above**, click on the **Edit on StackBlitz** button for each demo to see an
isolated project showing you how to reproduce the demo.

## Charting data & options

Although new charts will be introduced in the future (such as a choropleth), data and options follow the same model for all charts with minor exceptions. For example, in the case of a donut chart, you're able to pass in an additional field called `center` in your options to configure the donut center.

For instructions on using the **tabular data format**, see
[here](https://charts.carbondesignsystem.com/react/?path=/docs/docs-tutorials-tabular-data-format--docs)

Customizable options (specific to chart type) can be found
[here](https://carbon-design-system.github.io/carbon-charts/documentation/modules/interfaces.html)
