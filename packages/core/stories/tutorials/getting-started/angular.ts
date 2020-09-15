import marked from "marked";

export const angularTutorial = marked(`
# Carbon Charts - Angular

The Carbon Charts Angular library provides a collection of reusable charting components to build websites
and user interfaces. Adopting the library enables developers to use consistent markup, styles, and behavior
in prototype and production work.

[Angular wrappers - storybook](https://carbon-design-system.github.io/carbon-charts/angular)


&nbsp;
## Install

**with yarn:**
\`\`\`bash
yarn add @carbon/charts-angular d3@5.x
\`\`\`

**with npm:**
\`\`\`bash
npm install --save @carbon/charts-angular d3@5.x
\`\`\`

**Note:** you'd also need to install \`carbon-components\` if you're not using a bundled version of the library.

&nbsp;
## Getting started

To start using the \`StackedBarChart\` component, try the example below:
&nbsp;

###### app.module.ts
\`\`\`ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { ChartsModule } from "@carbon/charts-angular";

import { AppComponent } from "./app.component";

@NgModule({
  imports: [BrowserModule, ChartsModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
\`\`\`


###### app.component.html
\`\`\`html
<ibm-stacked-bar-chart
  class="n-chart"
  [data]="stackedBarData"
  [options]="stackedBarOptions"
  #stackedBarChart
></ibm-bar-chart>
\`\`\`

###### app.component.ts
\`\`\`ts
import { Component } from "@angular/core";
import "@carbon/charts/styles.css";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  stackedBarData = [
	// refer to tabular data format tutorial
  ];

  stackedBarOptions = {
	// refer to chart specific options
  };
}
\`\`\`

&nbsp;
## Data
Data follows the same model in all charts.
See tutorial on tabular data format for more information on chart data.

&nbsp;
## Options

You can see the default options for all charts
[here](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/src/configuration.ts).

&nbsp;
## Demos and Examples
+ **[Storybook - Demos](https://carbon-design-system.github.io/carbon-charts/angular)**
+ **[Storybook - Story Sources](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/angular/stories)**
+ **[Storybook - Data & options used](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data)**

&nbsp;
## Guidance

Please refer to the
[Carbon Design Systems guidance](https://www.carbondesignsystem.com/data-visualization/chart-types)
on using the different charts available in this library.

&nbsp;
## Development
Please refer to the
[Contribution Guidelines](https://github.com/carbon-design-system/carbon-charts/blob/master/CONTRIBUTING.md)
before starting any work.

#### Using the server
We recommend the use of [Angular Storybook](https://github.com/storybookjs/storybook/tree/next/app/angular)
for developing components.

**Start the server:**
\`\`\`bash
cd packages/angular
yarn storybook
\`\`\`

Open browser to \`http://localhost:9005\`

&nbsp;
## List of available components
View available components [here](https://github.com/carbon-design-system/carbon-charts#component-status)

&nbsp;
## Troubleshoot

If you experience any issues while getting set up with Carbon Charts, please head over to the
[GitHub repo](https://github.com/carbon-design-system/carbon-charts) for more guidelines and support.
Please [create an issue](https://github.com/carbon-design-system/carbon-charts/issues) if your issue
does not already exist.
`);
