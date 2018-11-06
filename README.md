<p align="center">
	<a href="https://pages.github.com/IBM/carbon-charts/">
		<img src="assets/logo.png" alt="Carbon Charts" width=150 height=150 />
	</a>
	<h3 align="center">Carbon Charts</h3>
	<p align="center">
		A reusable framework-agnostic D3 charting library.
		<br /><br />
		<a href="https://travis-ci.org/IBM/carbon-charts/">
			<img src="https://api.travis-ci.org/IBM/carbon-charts.svg?branch=master" />
		</a>
		<a href="https://www.npmjs.com/package/@carbon/charts">
			<img src="https://img.shields.io/npm/v/@carbon/charts.svg" />
		</a>
		<img src="https://img.shields.io/badge/comp-IE11%2B-blue.svg" />
		<img alt="semantic-versioning" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--versioning-e10079.svg">
	</p>
</p>

## Table of contents

- [Component status](#component-status)
- [Installation](#installation)
- [Demo & Docs](#demo-and-documentation)
- [Run Charts locally](#run-charts-locally)
- [Contributing](#contributing)
- [Bugs and feature requests](#bugs-and-feature-requests)

## Component status
:white_check_mark: Stable :hourglass_flowing_sand: In progress

| Component   | Vanilla            | Angular                  | React |
|-------------|--------------------|--------------------------|-------|
| Simple Bar  | :white_check_mark: | :white_check_mark:       | :hourglass_flowing_sand:  |
| Grouped Bar | :white_check_mark: | :white_check_mark:       | :hourglass_flowing_sand:  |
| Stacked Bar | :white_check_mark: | :white_check_mark:       | :hourglass_flowing_sand:  |
| Donut       | :white_check_mark: | :white_check_mark:       | :hourglass_flowing_sand:  |
| Line        | :white_check_mark: | :white_check_mark:       | :hourglass_flowing_sand:  |
| Curved Line | :white_check_mark: | :white_check_mark:       | :hourglass_flowing_sand:  |
| Pie         | :white_check_mark: | :white_check_mark:       | :hourglass_flowing_sand:  |
| Step        | :white_check_mark: | :white_check_mark:       | :hourglass_flowing_sand:  |
| Combo       | :hourglass_flowing_sand:               | :hourglass_flowing_sand:                     | :hourglass_flowing_sand:  |
| Area        | Soon               | Soon                     | :hourglass_flowing_sand:  |

## Getting started

### Installation

Run:
```bash
npm i -g @storybook/cli

npm install @carbon/charts --save
```

## Demo and documentation
**Charts demos:**
- [Vanilla JS](https://charts.carbondesignsystem.com/)
- [Angular](https://charts.carbondesignsystem.com/angular)

**Docs:** <https://charts.carbondesignsystem.com/documentation/>

### Code Sample
<p align="center">
	<img src="assets/demo-stacked-bar.png" alt="Stacked Bar Chart" width=600 />
</p>

[![Edit Carbon Charts - Vanilla](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2plrn2jp7r)

### Run Charts locally
1. Fork the project and clone your fork:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone git@github.com:<your-username>/carbon-charts.git
   # Navigate to the newly cloned directory
   cd carbon-charts
   ```

2. Run `npm install` to install Node.js dependencies.
3. Run `npm run demo:server` to serve up the demo locally.
4. Finally, open <http://localhost:9001/> in your browser. SPOILER ALERT: There's no "Hello, World!"

## Bugs and feature requests

Have a bug or a feature request? First read the [issue guidelines](https://github.com/IBM/carbon-charts/blob/master/CONTRIBUTING.md#issue-guidelines) and search for existing and closed issues. If your problem or idea is not addressed yet, [open a new issue](https://github.com/IBM/carbon-charts/issues/new).

## Contributing

See our [contributing guidelines](https://github.com/IBM/carbon-charts/blob/master/CONTRIBUTING.md). Included are instructions for opening issues, coding guidelines, and submitting pull requests.

<!-- ## Community

Get updates on Charts' development and chat with the core team and community. -->

## Versioning

We use the **semantic-release** library to automatically version our releases within the guidelines of Semantic Versioning [Semantic Versioning guidelines](http://semver.org/).

See our [releases notes](https://github.com/IBM/carbon-charts/releases) for the changelog of each version of Charts.
