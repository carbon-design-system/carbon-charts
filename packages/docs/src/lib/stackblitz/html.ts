import type { Project, ProjectTemplate } from '@stackblitz/sdk'
import type { ChartOptions, ChartTabularData } from '@carbon/charts-react'
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

  <!-- Load Carbon Charts as Charts (UMD) -->
  <script src="https://unpkg.com/@carbon/charts@latest/dist/umd/bundle.umd.js"></script>
		
  <!-- Load required stylesheet -->
  <link href="https://unpkg.com/@carbon/charts@latest/dist/styles.css" rel="stylesheet" crossorigin="anonymous" />

  <!-- Load Plex fonts -->
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
