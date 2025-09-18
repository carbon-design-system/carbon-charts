import type { Project, ProjectTemplate } from '@stackblitz/sdk'
import { version } from './package-versions'
import type { ChartOptions, ChartTabularData } from '@carbon/charts-react'
import { objectToString } from './object-to-string'

export function getReactProject(
	chartType: string,
	data: ChartTabularData,
	options: ChartOptions
): Project {
	const dependencies: Record<string, string> = {
		'@carbon/charts-react': version.carbonCharts,
		'react': '^19.0.0',
    'react-dom': '^19.0.0'
	}

	const indexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Carbon Charts React Example</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://1.www.s81c.com/common/carbon/plex/sans.css" />
  <link rel="stylesheet" href="https://1.www.s81c.com/common/carbon/plex/sans-condensed.css" />

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

	const indexJs = `import React from 'react'
import ReactDOM from 'react-dom/client'
import { ${chartType} } from '@carbon/charts-react'
import data from './data.js'
import options from './options.js'
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
			'src/data.js': objectToString(data),
			'src/index.js': indexJs,
			'src/options.js': objectToString(options),
			'package.json': JSON.stringify(packageJson, null, 2)
		}
	}
}
