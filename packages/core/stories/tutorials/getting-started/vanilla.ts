import marked from "marked";

export const vanillaTutorial = marked(`
# Carbon Charts - vanilla

The Carbon Charts vanilla library provides a collection of reusable charting components
to build websites and user interfaces. Adopting the library enables developers to use
consistent markup, styles, and behavior in prototype and production work.

&nbsp;
## Install

**with yarn:**
\`\`\`bash
yarn add @carbon/charts d3@5.x
\`\`\`

**with npm:**

\`\`\`bash
npm install --save @carbon/charts d3@5.x
\`\`\`

**Note:** you'd also need to install \`carbon-components\` if you're not using a bundled version of the library.

&nbsp;
## Getting started

To start using the \`StackedBarChart\` component, try the example below:
&nbsp;
#### Consuming with a bundler (e.g. webpack)

###### index.html
\`\`\`html
...
<div id="my-bar-chart"></div>
...
\`\`\`

###### index.js
\`\`\`js
import "@carbon/charts/styles.css";
import { StackedBarChart } from "@carbon/charts";

// grab chart holder DOM element
const chartHolder = document.getElementById("my-bar-chart");

// initialize the chart
new StackedBarChart(chartHolder, {
  data: stackedBarData,
  options: stackedBarOptions,
});
\`\`\`

&nbsp;
#### Consuming in a browser environment (e.g. CDNs)

###### index.html
\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://unpkg.com/@carbon/charts/styles.css" />
  </head>
  <body>
    <div id="my-bar-chart"></div>

    <script src="https://unpkg.com/@carbon/charts/bundle.js"></script>
    <script>
      // grab chart holder DOM element
      const chartHolder = document.getElementById("my-bar-chart");

      const stackedBarData = [
		// refer to tabular data format tutorial
	  ];

      const stackedBarOptions = {
		// refer to chart specific options
      };

      // initialize the chart
      new Charts.StackedBarChart(chartHolder, {
        data: stackedBarData,
        options: stackedBarOptions,
      });
    </script>
  </body>
</html>
\`\`\`

&nbsp;
## Data
Data follows the same model in all charts.
See tutorial on tabular data format for more information on chart data.

&nbsp;
## Options

You can see the options for all charts
[here](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/src/configuration.ts).

&nbsp;
## Demos and Examples
+ **[Demos - Data & options used](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/core/demo/data)**

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
We recommend the use of
[Webpack Dev Server](https://github.com/webpack/webpack-dev-server) for developing components.

**Start the server:**
\`\`\`bash
cd packages/core
yarn demo:server
\`\`\`

Open browser to \`http://localhost:9006\`

&nbsp;
## List of available components
View available components [here](https://github.com/carbon-design-system/carbon-charts#component-status)

&nbsp;
## Troubleshoot

If you experience any issues while getting set up with Carbon Charts, please head
over to the [GitHub repo](https://github.com/carbon-design-system/carbon-charts)
for more guidelines and support.
Please [create an issue](https://github.com/carbon-design-system/carbon-charts/issues)
if your issue does not already exist.
`);
