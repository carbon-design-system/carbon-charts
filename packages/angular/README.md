# `@ibm-sterling/charts-angular`

> Sterling Charting Angular Wrappers

**[Storybook Demos](https://ibm.github.io/sterling-dataviz/angular)**
**[Storybook Demo Sources](https://github.com/IBM/sterling-dataviz/tree/master/packages/angular/stories)**

## Getting Started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @ibm-sterling/charts @ibm-sterling/charts-angular d3
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @ibm-sterling/charts @ibm-sterling/charts-angular d3
```

## Charting Data & Options
Although we will definitely introduce new models in the future as we start shipping new components such as maps, Data and options follow the same model in all charts, with minor exceptions and differences in specific components, .

For instance, in the case of pie and donut charts, you would only provide one data set. In the case of donut charts, you can pass in an additional field called `center` in your options configuring the donut center.

There are also additional options available depending on the chart type being used, [for more examples please see here](https://github.com/IBM/sterling-dataviz/tree/master/packages/core/demo/demo-data).
