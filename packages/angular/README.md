# Carbon Charts Angular

Carbon Charts Angular is a thin Angular wrapper around the vanilla JavaScript `@carbon/charts` component library. This prerelease is for Angular 16 and higher and uses TypeScript 5.

If you need support for older versions of Angular (or encounter problems with this module), please revert to `@carbon/charts-angular@latest`.

The required styles should be imported from `@carbon/charts-angular/dist/styles.css`. Additional documentation is provided in the Storybook demos.


**[Storybook demos](https://charts.carbondesignsystem.com/angular)**

**[Storybook demo sources](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data)**

## Getting started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/charts-angular@next d3 d3-cloud d3-sankey
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add @carbon/charts-angular@next d3 d3-cloud d3-sankey
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

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect metrics data. By installing this
package as a dependency you are agreeing to telemetry collection. To opt out,
see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).