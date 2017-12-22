# Charts

A reusable framework-agnostic D3 charting library for Watson Customer Engagement.

## Table of contents

- [Component status](#component-status)
- [Getting started](#getting-started)
  - [Step 1: Install package](#step-1-install-package)
  - [What's included](#whats-included)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Demo and documentation](#demo-and-documentation)
  - [Run Charts locally](#run-charts-locally)
- [Contributing](#contributing)
- [Community](#community)
- [Versioning](#versioning)
- [Copyright and license](#copyright-and-license)

## Component status

To learn more about the current status of our components, check out some of the [Wiki](https://github.ibm.com/peretz/charts/wiki) pages below:

- [Component pipeline](https://github.ibm.com/peretz/charts/wiki/Component-pipeline)

## Getting started

### Step 1: Install package

First, log in to the whitewater hosted NPM Enterprise by initiating authentication like this:

  ```bash
  $ npm login --registry=https://npm-registry.whitewater.ibm.com --scope=@peretz --auth-type=oauth
  ```

_Refer to [this guide](https://github.ibm.com/Whitewater/npm-enterprise) for further instructions._

After authentication, run `npm install @peretz/charts` to download the latest Charts distribution package.

#### What's included

Find `node_modules/@peretz/` in your root directory and within the download you'll see the following directories and files:

  ```
  charts/
  ├── bundle/
  │   ├── dist/
  │   ├── bundle.js
  │   └── bundle.js.map
  └── package.json
  ```

## Bugs and feature requests

Have a bug or a feature request? First read the [issue guidelines](https://github.ibm.com/peretz/charts/blob/master/CONTRIBUTING.md#issue-guidelines) and search for existing and closed issues. If your problem or idea is not addressed yet, [open a new issue](https://github.ibm.com/peretz/charts/issues/new).

## Demo and documentation

Charts' demo and documentation can be viewed in [GitHub Pages](https://github.ibm.com/peretz/charts/tree/gh-pages) at <https://pages.github.ibm.com/peretz/charts/> and <https://pages.github.ibm.com/peretz/charts/documentation/> respectively.

### Run Charts locally

Environment prereqs: [GHE](https://github.ibm.com/peretz), [NPM Enterprise](https://github.ibm.com/Whitewater/npm-enterprise), [Git](https://git-scm.com/downloads), and [Node.js](https://nodejs.org/en/download/).

1. Fork the project and clone your fork:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone git@github.ibm.com:<your-username>/charts.git
   # Navigate to the newly cloned directory
   cd charts
   ```

2. Run `npm install` to install Node.js dependencies.
3. Run `npm run demo:server` to serve up the demo locally.
4. Finally, open <http://localhost:9090/> in your browser. SPOILER ALERT: There's no "Hello, World!"

## Contributing

See our [contributing guidelines](https://github.ibm.com/peretz/charts/blob/master/CONTRIBUTING.md). Included are instructions for opening issues, coding guidelines, and submitting pull requests.

## Community

Get updates on Charts' development and chat with the core team and community.

- Bookmark the [WCE Showcase](http://peretz.stage1.mybluemix.net/) in your favorite browser.
- Join our very own [Slack room](https://peretz.slack.com/).
- Subscribe to our quarterly Community Calls by contacting [Nina Li](https://github.ibm.com/nina).
- Sign up to be your team's representative at our biweekly UI Dev Group meetings by contacting [Chelsea Lorenz](https://github.ibm.com/clorenz).
- Blog coming soon!

## Versioning

It is important to know we do our best to ensure Charts adheres to the [Semantic Versioning guidelines](http://semver.org/).

See our [releases notes](https://github.ibm.com/peretz/charts/releases) for the changelog of each version of Charts. Releases are announced at our Community Calls and posted in [Charts' slack channel](https://peretz.slack.com/messages/peretz-charts/).

## Copyright and license

© Copyright IBM Corp. 2014, 2017
