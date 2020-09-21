# `@carbon/charts-angular`

> Carbon Charting Angular Wrappers

**[Storybook demos](https://carbon-design-system.github.io/carbon-charts/angular)**

**[Storybook demo sources](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data)**

## Getting started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/charts @carbon/charts-angular d3@5.x
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/charts @carbon/charts-angular d3@5.x
```

**Note:** you'd also need to install `carbon-components` if you're not using a bundled version of the library.

## Step-by-step instructions
Read [here](https://carbon-design-system.github.io/carbon-charts/?path=/story/tutorials-getting-started--angular)

## Charting data & options
Although we will definitely introduce new models in the future as we start shipping new components such as maps, Data and options follow the same model in all charts, with minor exceptions and differences in specific components.

For instance in the case of a donut chart you're able to pass in an additional field called `center` in your options configuring the donut center.

For instructions on using the **tabular data format**, see [here](https://carbon-design-system.github.io/carbon-charts/?path=/story/tutorials--tabular-data-format)

There are also additional options available depending on the chart type being used, [see our demo examples here](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data).

Customizable options (specific to chart type) can be found [here](https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html)
