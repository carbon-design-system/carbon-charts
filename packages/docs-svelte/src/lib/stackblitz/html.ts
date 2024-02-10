import type { Project, ProjectTemplate } from '@stackblitz/sdk'
import type { ChartOptions, ChartTabularData } from '@carbon/charts-svelte'
import { objectToString } from './object-to-string'

export function getHtmlProject(
	chartType: string,
	data: ChartTabularData,
	options: ChartOptions
): Project {
	const dataStr = objectToString(data)
	const optionsStr = objectToString(options)

	const indexHtml = `<!DOCTYPE html>
<html>

<head>
  <title>Carbon Charts Vanilla JavaScript Example</title>
  <meta charset="UTF-8" />

  <!-- Load Carbon Charts as Charts (UMD) and D3.js as d3 -->
  <script src="https://unpkg.com/@carbon/charts@latest/dist/umd/bundle.umd.js"></script>
		
  <!-- Load required stylesheets -->
  <!--TODO: remove next line -->
  <link href="https://unpkg.com/@carbon/styles@latest/css/styles.css" rel="stylesheet" crossorigin="anonymous" />
  <link href="https://unpkg.com/@carbon/charts@latest/dist/styles.css" rel="stylesheet" crossorigin="anonymous" />

  <!-- Load font used by Carbon Charts -->
  <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400|IBM+Plex+Sans:400,600&display=swap" rel="stylesheet" crossorigin="anonymous" />

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
  <script>
    // Get reference to chart holder DOM element
    const chartHolder = document.getElementById('app')

    const data = ${dataStr.replace('export default ', '')}

    const options = ${optionsStr.replace('export default ', '')}

    new Charts.${chartType}(chartHolder, {
      data,
      options
    })
  </script>
</body>

</html>`

	return {
		template: 'html' as ProjectTemplate,
		title: 'Carbon Charts HTML Example',
		files: {
			'index.html': indexHtml
		}
	}
}
