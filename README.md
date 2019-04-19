<p align="center">
	<a href="https://carbon-design-system.github.io/carbon-charts/">
		<img src="assets/logo.png" alt="Carbon Charts" width=150 height=150 />
	</a>
	<h3 align="center">Carbon Charts</h3>
	<p align="center">
		A reusable framework-agnostic D3 charting library.
		<br /><br />
		<a href="https://travis-ci.org/carbon-design-system/carbon-charts">
			<img src="https://api.travis-ci.org/carbon-design-system/carbon-charts.svg?branch=master" />
		</a>
		<a href="https://app.netlify.com/sites/carbon-charts/deploys">
			<img src="https://api.netlify.com/api/v1/badges/8dd7641f-6f80-498d-aa95-4716a0fa44e3/deploy-status" />
		</a>
		<a href="https://www.npmjs.com/package/@carbon/charts">
			<img src="https://img.shields.io/npm/v/@carbon/charts.svg" />
		</a>
		<img src="https://img.shields.io/badge/comp-IE11%2B-blue.svg" />
		<img alt="semantic-versioning" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--versioning-e10079.svg">
	</p>
</p>

## Table of contents

- [Installation](#installation)
- [Demo & Docs](#demo-and-documentation)
- [Run Charts locally](#run-charts-locally)
- [Component status](#component-status)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)

## Getting started

### Installation

Run:
```bash
npm i -g @storybook/cli

npm install @carbon/charts --save
```

## Demo and documentation
**Charts demos:**
- [Vanilla JS](https://carbon-design-system.github.io/carbon-charts/)
- [Angular](https://carbon-design-system.github.io/carbon-charts/angular)
- [React](https://carbon-design-system.github.io/carbon-charts/react)
- [Vue](https://carbon-design-system.github.io/carbon-charts/vue)

**Docs:** <https://carbon-design-system.github.io/carbon-charts/documentation/>

### Code Samples
<p align="center">
	<img src="assets/demo-stacked-bar.png" alt="Stacked Bar Chart" width="600" />
</p>

<p align="center">
	<a href="https://codesandbox.io/s/149vrzo62l">
		<img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit Carbon Charts - Vanilla" />
	</a>
</p>

- [Vanilla JS](https://codesandbox.io/s/149vrzo62l)
- [Angular](https://codesandbox.io/s/k32kjy5qnr)
- [React](https://codesandbox.io/s/pppmo3ollx)
- [Vue](https://codesandbox.io/s/040w2rqrxp)

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

## Component status
:white_check_mark: Stable :hourglass_flowing_sand: In progress

| Component   | Vanilla            | Angular                  | React | Vue |
|-------------|--------------------|--------------------------|-------|-------|
| Simple Bar  | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark:
| Grouped Bar | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark:
| Stacked Bar | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark:
| Donut       | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark:
| Line        | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark:
| Curved Line | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark:
| Pie         | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark:
| Step        | :white_check_mark: | :white_check_mark: | :white_check_mark: | :hourglass_flowing_sand:
| Combo       | :hourglass_flowing_sand: | - | - | -
| Area        | Soon | - | - | - |

## Bugs and feature requests

Have a bug or a feature request? First read the [issue guidelines](https://github.com/carbon-design-system/carbon-charts/blob/master/CONTRIBUTING.md#issue-guidelines) and search for existing and closed issues. If your problem or idea is not addressed yet, [open a new issue](https://github.com/carbon-design-system/carbon-charts/issues/new).

## Contributing

See our [contributing guidelines](https://github.com/carbon-design-system/carbon-charts/blob/master/CONTRIBUTING.md). Included are instructions for opening issues, coding guidelines, and submitting pull requests.

<!-- ## Community

Get updates on Charts' development and chat with the core team and community. -->

## Versioning

We use the **semantic-release** library to automatically version our releases within the guidelines of Semantic Versioning [Semantic Versioning guidelines](http://semver.org/).

See our [releases notes](https://github.com/carbon-design-system/carbon-charts/releases) for the changelog of each version of Charts.

## Contributors
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars3.githubusercontent.com/u/14989804?v=4" width="100px;"/><br /><sub><b>Eliad Moosavi</b></sub>](http://eMoosavi.com)<br />[💻](https://github.com/theiliad/carbon-charts/commits?author=theiliad "Code") [📖](https://github.com/theiliad/carbon-charts/commits?author=theiliad "Documentation") [💡](#example-theiliad "Examples") [🚇](#infra-theiliad "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars0.githubusercontent.com/u/9692126?v=4" width="100px;"/><br /><sub><b>Zvonimir Fras</b></sub>](http://www.zvonimirfras.com)<br />[💻](https://github.com/theiliad/carbon-charts/commits?author=zvonimirfras "Code") [📖](https://github.com/theiliad/carbon-charts/commits?author=zvonimirfras "Documentation") [👀](#review-zvonimirfras "Reviewed Pull Requests") | [<img src="https://avatars1.githubusercontent.com/u/1744185?v=4" width="100px;"/><br /><sub><b>Callum Smith</b></sub>](http://reallyawesomedomain.com)<br />[💻](https://github.com/theiliad/carbon-charts/commits?author=cal-smith "Code") [📖](https://github.com/theiliad/carbon-charts/commits?author=cal-smith "Documentation") [👀](#review-cal-smith "Reviewed Pull Requests") | [<img src="https://avatars0.githubusercontent.com/u/43546639?v=4" width="100px;"/><br /><sub><b>nicoleroppel</b></sub>](https://github.com/nicoleroppel)<br />[🎨](#design-nicoleroppel "Design") | [<img src="https://avatars3.githubusercontent.com/u/43549567?v=4" width="100px;"/><br /><sub><b>Diana Tran</b></sub>](https://github.com/dianatran18)<br />[🎨](#design-dianatran18 "Design") |
| :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/6198288?v=4" width="100px;"/><br /><sub><b>Michelle Carlough </b></sub>](http://michellecarlough.com/)<br />[🎨](#design-MichelleCarlough "Design") [📖](https://github.com/theiliad/carbon-charts/commits?author=MichelleCarlough "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/43579539?v=4" width="100px;"/><br /><sub><b>Jaime Stockton</b></sub>](https://github.com/JaimeMae)<br />[🎨](#design-JaimeMae "Design") | [<img src="https://avatars1.githubusercontent.com/u/5810053?v=4" width="100px;"/><br /><sub><b>Pablo Lopez Domowicz</b></sub>](https://github.com/PLopezD)<br />[🎨](#design-PLopezD "Design") | [<img src="https://avatars3.githubusercontent.com/u/9957837?v=4" width="100px;"/><br /><sub><b>John Peng</b></sub>](http://www.johnpeng47.com)<br />[💻](https://github.com/theiliad/carbon-charts/commits?author=JohnPeng47 "Code") | [<img src="https://avatars0.githubusercontent.com/u/14932492?v=4" width="100px;"/><br /><sub><b>Thomas Mullen</b></sub>](https://github.com/t-mullen)<br />[💻](https://github.com/theiliad/carbon-charts/commits?author=t-mullen "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->
