# Carbon Charts Angular

Carbon Charts Angular is a thin Angular wrapper around the vanilla JavaScript `@carbon/charts` component library. This release is for Angular >= 7 and < 16.

If you need support for Angular 16 or higher please install `@carbon/charts-angular@next`.

The required styles should be imported from `@carbon/charts-angular/styles.css` and `@carbon/styles/css/styles.css`. Additional documentation is provided in the Storybook demos.

**[Storybook demos](https://carbon-design-system.github.io/carbon-charts/angular)**

**[Storybook demo sources](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data)**

## Getting started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/charts-angular@latest @carbon/styles d3 d3-cloud d3-sankey
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/charts-angular@latest @carbon/styles d3 d3-cloud d3-sankey
```

## Step-by-step instructions

Read
[Getting Started](https://charts.carbondesignsystem.com/?path=/docs/docs-getting-started-angular--docs)

## Charting data & options

Although new charts will be introduced in the future (such as a choropleth), data and options follow the same model for all charts with minor exceptions. For example, in the case of a donut chart, you're able to pass in an additional field called `center` in your options to configure the donut center.

For instructions on using the **tabular data format**, see
[here](https://charts.carbondesignsystem.com/angular/?path=/docs/docs-tutorials-tabular-data-format--docs)

Customizable options (specific to chart type) can be found
[here](https://charts.carbondesignsystem.com/documentation/modules/interfaces.html)
