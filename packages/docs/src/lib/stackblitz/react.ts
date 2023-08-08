import type { Project, ProjectTemplate } from '@stackblitz/sdk'
import { version } from './package-versions'

export function getReactProject(chartType: string, data: string, options: string): Project {

  const dependencies: Record<string, string> = {
    '@carbon/charts-react': version.carbonCharts,
    '@carbon/styles': version.carbonStyles,
    d3: version.d3,
    'd3-cloud': version.d3Cloud,
    'd3-sankey': version.d3Sankey,
    'react': version.react,
    'react-dom': version.react,
    'sass': version.sass
  }

  const indexHtml =
`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Carbon Charts React Example</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
	<link
		href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400|IBM+Plex+Sans:400,600&display=swap"
		rel="stylesheet"
		crossorigin="anonymous"
	/>
  <style>
	  .p-1 {
		  padding: 2rem;
	  }
  </style>
</head>
<body>
  <div class="p-1">
	  <div id="root"></div>
  </div>
</body>
</html>`

  const indexJs =
`import React from 'react'
import ReactDOM from 'react-dom/client'
import { ${chartType} } from '@carbon/charts-react'
import data from './data.js'
import options from './options.js'

import '@carbon/styles/css/styles.css'
import '@carbon/charts-react/styles.css'

class App extends React.Component {
  state = {
    data,
    options,
  }

  render = () => (
    <${chartType}
      data={this.state.data}
      options={this.state.options}
    ></ ${chartType}>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <App />
)
`

  const packageJson = {
    name: 'carbon-charts-react-example',
    description: 'Carbon Charts React Example',
    version: '0.0.0',
    scripts: {
      dev: 'vite dev',
      build: 'vite build',
      preview: 'vite preview'
    },
    dependencies
  }

  return {
    template: 'create-react-app' as ProjectTemplate,
    title: 'Carbon Charts React Example',
    dependencies,
    files: {
      'public/index.html': indexHtml,
      'src/data.js': data,
      'src/index.js': indexJs,
      'src/options.js': options,
      'package.json': JSON.stringify(packageJson, null, 2)
    }
  }
}