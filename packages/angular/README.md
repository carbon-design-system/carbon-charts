# Carbon Charts Angular

Carbon Charts Angular is a thin Angular wrapper around the vanilla JavaScript `@carbon/charts`
component library. This prerelease is for Angular 16 and higher and uses TypeScript 5.

If you need support for older versions of Angular (or encounter problems with this module), please
revert to `@carbon/charts-angular@latest`. Distribution tags have been added for specific Angular
versions such as: `@carbon/charts-angular@angular15`, `@carbon/charts-angular@angular16`, etc.

## [Documentation with StackBlitz examples](https://charts.carbondesignsystem.com/)

## Getting started

Run the following command using [npm](https://www.npmjs.com/):

```bash
npm install -S @carbon/charts-angular@next d3 d3-cloud d3-sankey
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command instead:

```bash
yarn add @carbon/charts-angular@next d3 d3-cloud d3-sankey
```

The required styles should be imported from `@carbon/charts-angular/dist/styles.css`.

## <picture><source height="20" width="20" media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-dark.svg"><source height="20" width="20" media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"><img height="20" width="20" alt="IBM Telemetry" src="https://raw.githubusercontent.com/ibm-telemetry/telemetry-js/main/docs/images/ibm-telemetry-light.svg"></picture> IBM Telemetry

This package uses IBM Telemetry to collect metrics data. By installing this package as a dependency
you are agreeing to telemetry collection. To opt out, see
[Opting out of IBM Telemetry data collection](https://github.com/ibm-telemetry/telemetry-js/tree/main#opting-out-of-ibm-telemetry-data-collection).
For more information on the data being collected, please see the
[IBM Telemetry documentation](https://github.com/ibm-telemetry/telemetry-js/tree/main#ibm-telemetry-collection-basics).
