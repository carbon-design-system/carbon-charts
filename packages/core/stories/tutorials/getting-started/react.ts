import marked from "marked";

export const reactTutorial = marked(`
# Carbon Charts - React

The Carbon Charts library provides a collection of reusable charting components to
build websites and user interfaces. Adopting the library enables developers to use
consistent markup, styles, and behavior in prototype and production work.

[React wrappers - storybook](https://carbon-design-system.github.io/carbon-charts/react)

&nbsp;
## Install

**with yarn:**
\`\`\`bash
yarn add @carbon/charts-react d3@5.x
\`\`\`

**with npm:**
\`\`\`bash
npm install --save @carbon/charts-react d3@5.x
\`\`\`

**Note:** you'd also need to install \`carbon-components\` if you're not using a bundled version of the library.

&nbsp;
## Getting started

To start using the \`StackedBarChart\` component, try the example below:
&nbsp;

\`\`\`ts
import React from "react";

import { StackedBarChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
// Or
// import '@carbon/charts/styles/styles.scss';

const stackedBarOptions = {
	// refer to chart specific options
};

class App extends React.Component {
  state = {
    stackedBarData: [
		// refer to tabular data format tutorial
	  ]
  };

  render() {
    return (
      <div className="App">
        <StackedBarChart
          data={this.state.stackedBarData}
          options={stackedBarOptions}
        />
      </div>
    );
  }
}

// ...
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
+ **[Storybook - Demos](https://carbon-design-system.github.io/carbon-charts/react)**
+ **[Storybook - Story Sources](https://github.com/carbon-design-system/carbon-charts/tree/master/packages/react/stories)**
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
We recommend the use of [React Storybook](https://github.com/storybookjs/storybook/tree/next/app/react)
for developing components.

**Start the server:**
\`\`\`bash
cd packages/react
yarn run storybook
\`\`\`

Open browser to \`http://localhost:9006/\`.

&nbsp;
## List of available components
View available components [here](https://github.com/carbon-design-system/carbon-charts#component-status)

&nbsp;
## Troubleshoot

If you experience any issues while getting set up with Carbon Charts, please head over to
the [GitHub repo](https://github.com/carbon-design-system/carbon-charts)
for more guidelines and support.
Please[create an issue](https://github.com/carbon-design-system/carbon-charts/issues)
if your issue does not already exist.
`);
