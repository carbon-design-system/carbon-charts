import type { Project, ProjectTemplate } from '@stackblitz/sdk'
import type { Demo } from '@/demo'
import { version } from '../package-versions'
import { objectToString } from './object-to-string'

export function buildVanillaJsExample(demo: Demo): Project {
	const dependencies: Record<string, string> = {
		'@carbon/charts': version.carbonCharts,
		d3: version.d3,
		'd3-cloud': version.d3Cloud,
		'd3-sankey': version.d3Sankey
	}

	const indexHtml = `<html>
<head>
  <title>Carbon Charts Vanilla JavaScript Example</title>
  <meta charset="UTF-8" />
  <link
    rel="preconnect"
    crossorigin="anonymous"
    href="https://fonts.googleapis.com"
  />
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
    <div id="app" style="width: 100%; height: 100%"></div>
  </div>
  <script src="src/index.js"></script>
</body>
</html>`

	const instantiateForGeo = `/* Disclaimer: Data only used for demo purposes - not an accurate representation of world map */

async function loadTopoData() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Akshat55/carbon-charts/c565fc9ed1364465b641e7e3f2149f0631f0fd0b/packages/core/demo/data/topojson-110-data.json')
    if (!response.ok) {
      throw new Error('Error loading Topology JSON file')
    }
    const geoData = await response.json()
    topoOptions = { geoData, ...options }
    const chartHolder = document.getElementById('app')
    new ${demo.chartType.vanilla}(chartHolder, { data, topoOptions })
  } catch (error) {
    console.log('Error loading JSON file:', error)
  }
}
loadTopoData()
`

	const isGeoDemo = demo.chartType.vanilla == 'ExperimentalChoropleth'

	const instantiateNormally = `const chartHolder = document.getElementById('app')
new ${demo.chartType.vanilla}(chartHolder, {
	data,
	options
})`

	const indexJs = `
import { ${demo.chartType.vanilla} } from '@carbon/charts'
import options from './options.js'
import data from './data.js'
import '@carbon/charts/styles.css'

${isGeoDemo ? instantiateForGeo : instantiateNormally}
`

	const packageJson = {
		name: 'carbon-charts-vanilla-js-example',
		description: 'Carbon Charts Vanilla JavaScript Example',
		version: '0.0.0',
		dependencies
	}

	return {
		template: 'javascript' as ProjectTemplate,
		title: 'Carbon Charts Vanilla JavaScript Example',
		dependencies,
		files: {
			'data.js': objectToString(demo.data),
			'index.html': indexHtml,
			'index.js': indexJs,
			'options.js': objectToString(demo.options),
			'package.json': JSON.stringify(packageJson, null, 2)
		}
	}
}
