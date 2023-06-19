# Carbon Charts Angular

Carbon Charts Angular is a thin Angular wrapper around the vanilla JavaScript `@carbon/charts` component library. This prerelease is for Angular 16 and higher and uses TypeScript 5.

If you need support for older versions of Angular (or encounter problems with this module), please revert to `@carbon/charts-angular@latest`.

The required styles should be imported from `@carbon/charts-angular/styles.css` and `@carbon/styles/css/styles.css`. Additional documentation is provided in the Storybook demos.


**[Storybook demos](https://carbon-design-system.github.io/carbon-charts/angular)**

**[Storybook demo sources](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data)**

## Getting started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/charts-angular@next @carbon/styles d3
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/charts-angular@next @carbon/styles d3
```

**Note:** You will need to install `carbon-components` if you're not using a bundled version of this library.

## Step-by-step instructions

Read
[here](https://carbon-design-system.github.io/carbon-charts/?path=/story/docs-getting-started--angular)

## Charting data & options

Although we will introduce new models in the future as we start
shipping new components such as maps, Data and options follow the same model in all charts, with minor exceptions and differences in specific components.

For instance, in the case of a donut chart, you're able to pass in an additional field called `center` in your options configuring the donut center.

For instructions on using the **tabular data format**, see
[here](https://carbon-design-system.github.io/carbon-charts/?path=/story/docs-tutorials--tabular-data-format)

There are additional options available depending on the chart type being
used, [see our demo examples here](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data).

Customizable options (specific to chart type) can be found
[here](https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html)
