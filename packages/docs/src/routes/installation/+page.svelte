<script lang="ts">
	import { onMount } from 'svelte'
	// import type { Project, ProjectTemplate } from '@stackblitz/sdk'
	import {
		Grid,
		Row,
		Column,
		Tabs,
		Tab,
		TabContent,
		CodeSnippet,
		InlineNotification
	} from 'carbon-components-svelte'
	// import hljs from 'highlight.js/lib/core'
  // import typescript from 'highlight.js/lib/languages/typescript'
	import PageTitle from '$lib/PageTitle.svelte'
	import CodeSample from '$lib/CodeSample.svelte'

	// onMount(() => {
	// 	hljs.registerLanguage('typescript', typescript)
	// })

	let selected = 0

	const packageExtension = ['', '-svelte', '-react', '-vue', '-angular']
	const data =
`export default [
	{
		group: 'Qty',
		value: 65000
	},
	{
		group: 'More',
		value: 29123
	},
	{
		group: 'Sold',
		value: 35213
	},
	{
		group: 'Restocking',
		value: 51213
	},
	{
		group: 'Misc',
		value: 16932
	}
]`
	const options =
`export default {
  title: 'Vertical simple bar (discrete)',
  axes: {
    left: {
      mapsTo: 'value'
    },
    bottom: {
      mapsTo: 'group',
      scaleType: 'labels'
    }
  },
  height: '400px'
}`

	$: packageSuffix = packageExtension[selected]
</script>

<PageTitle title="Installation &amp; setup" />

<Grid>
	<Row>
		<Column lg={9}>
			<h2>Select your development framework</h2>

			<Tabs bind:selected>
				<Tab label="Vanilla JavaScript" />
				<Tab label="Svelte" />
				<Tab label="React" />
				<Tab label="Vue.js" />
				<Tab label="Angular" />
				<svelte:fragment slot="content">
					<h3>Consuming with a bundler (eg Vite)</h3>

					<Tabs>
						<Tab label="yarn" />
						<Tab label="npm" />

						<svelte:fragment slot="content">
							<TabContent
								><CodeSnippet
									code={`yarn add @carbon/charts${packageSuffix} d3 d3-cloud d3-sankey @carbon/styles`} /></TabContent>
							<TabContent
								><CodeSnippet
									code={`npm install -S @carbon/charts${packageSuffix} d3 d3-cloud d3-sankey @carbon/styles`} /></TabContent>
						</svelte:fragment>
					</Tabs>

					<InlineNotification
						title="Note:"
						subtitle={`The last three packages are optional except for these situations: d3-cloud (for Alluvial Charts), d3-word (for Word Cloud Charts), @carbon/styles (for charts that display a toolbar).`}
						lowContrast
						kind="info-square"
						hideCloseButton />

					<TabContent>
						<h3>StackBlitz Example</h3>
						<CodeSample framework="vanilla" chartType="SimpleBarChart" {data} {options}/>


						<h3>Consuming in a browser environment</h3>

						<CodeSample framework="html" chartType="SimpleBarChart" {data} {options}/>


						<CodeSnippet
							type="multi"
							code={`<!DOCTYPE html>
		<html>
			<head>
				<!-- Load Carbon Charts as Charts (UMD) and D3.js as d3 -->
				<script src="https://unpkg.com/@carbon/charts@latest/dist/index.js" defer></script>
				<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js" defer integrity="sha512-M7nHCiNUOwFt6Us3r8alutZLm9qMt4s9951uo8jqO4UwJ1hziseL6O3ndFyigx6+LREfZqnhHxYjKRJ8ZQ69DQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
		
				<!-- Load required stylesheets -->
				<link href="https://unpkg.com/@carbon/styles@latest/css/styles.css" rel="stylesheet" crossorigin="anonymous" />
				<link href="https://unpkg.com/@carbon/charts@latest/dist/styles.css" rel="stylesheet" crossorigin="anonymous" />
		
				<!-- Load font used by Carbon Charts -->
				<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400|IBM+Plex+Sans:400,600&display=swap" rel="stylesheet" crossorigin="anonymous" />
			</head>
			<body>
				<!-- Define a div to act as the chart holder -->
				<div id="my-bar-chart"></div>
		
				<script>
					// Get a reference to the chart holder DOM element
					const chartHolder = document.getElementById('my-bar-chart')
		
					const data = [
						// refer to tabular data format tutorial
					]
		
					const options = {
						// refer to chart specific options
					}
		
					// initialize the chart
				 new Charts.StackedBarChart(chartHolder, {
					 data,
					 options
				 })
				</script>
			</body>
		</html>`} />
					</TabContent>
					<TabContent>
						<h3>SvelteKit Vite Configuration</h3>

						<p>
							Carbon Charts Svelte is unique among the component libraries because it is provided in
							source / unbundled form. This means when you build your Svelte app using it, you are
							compiling the source of Carbon Charts Svelte and its dependency, Carbon Charts.
						</p>
						<p>
							Carbon Charts expects to run in a browser environment. This will cause an error when
							using server-side rendering (SSR). To avoid this, configure Vite to prevent
							@carbon/charts from being externalized for SSR.
						</p>
						<p><strong>vite.config.mjs</strong></p>
						<CodeSnippet
							type="multi"
							code={`
		import { sveltekit } from '@sveltejs/kit/vite'
		import { defineConfig } from 'vite'
		
		export default defineConfig({
			plugins: [sveltekit()],
				ssr: {
					noExternal: ${`process`}.env.NODE_ENV === 'production' ? ['@carbon/charts'] : []
			}
		})`} />

						<p><strong>Example.svelte</strong></p>
						<CodeSnippet
							type="multi"
							code={`<script lang="ts">
	import { DonutChart, DonutChartOptions } from '@carbon/charts-svelte'
	import '@carbon/styles/css/styles.css' // affects body element
	import '@carbon/charts-svelte/styles.css'
	import { data, options } from '../../stores'
</script>

<DonutChart {data} {options}/>`} />
					</TabContent>
					<TabContent>React Sample</TabContent>
					<TabContent>
						<h3>Vue.js version support</h3>

						<p>
							In order to avoid a breaking change, installing <strong
								>@carbon/charts-vue@latest</strong>
							supports Vue.js 2.7+. For Vue.js 3.3+, install
							<strong>@carbon/charts-vue@next</strong>.
						</p>
					</TabContent>
					<TabContent>
						<h3>Angular version support</h3>

						<p>
							In order to avoid a breaking change, installing <strong
								>@carbon/charts-angular@latest</strong>
							supports Angular 6 to 15. For Angular 16+, install
							<strong>@carbon/charts-angular@next</strong>.
						</p>
					</TabContent>
				</svelte:fragment>
			</Tabs>

			<h3>Styles</h3>

			<p>
				When using a bundler like <a href="https://vitejs.dev/" target="_blank">Vite</a>, import
				styles with your TypeScript/JavaScript code to optimize hot module reloading:
				<CodeSnippet code={`import '@carbon/charts${packageSuffix}/styles.css'`} />
			</p>

			<p>
				If you are using toolbars with your charts, <strong>@carbon/styles</strong> is required.
				<CodeSnippet code="import '@carbon/styles/css/styles.css'" />
			</p>

			<InlineNotification
				title="Caution:"
				subtitle={`Loading @carbon/styles CSS applies styles to the body element that may interfere with other styling like Bootstrap or Material Design. For these situations, use SCSS instead.`}
				lowContrast
				kind="warning"
				hideCloseButton />

			<p>
				<CodeSnippet
					type="multi"
					code={`// Your SCSS file
@use '@carbon/styles' with (
  $css--body: false // Do not emit styles for body element
);`} />
			</p>

			<p>
				More information on using <strong>@carbon/styles</strong> with SCSS can be found
				<a
					href="https://github.com/carbon-design-system/carbon/blob/HEAD/packages/styles/docs/sass.md#files"
					target="_blank">here</a
				>.
			</p>

			<h3>Fonts</h3>

			<p>
				By default, Carbon Charts uses <a
					href="https://fonts.google.com/specimen/IBM+Plex+Sans"
					target="_blank">IBM Plex Sans</a>
				and
				<a href="https://fonts.google.com/specimen/IBM+Plex+Sans+Condensed" target="_blank"
					>IBM Plex Sans Condensed</a>
				which can be loaded in your HTML template:
				<CodeSnippet
					code={`<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400|IBM+Plex+Sans:400,600&display=swap" rel="stylesheet" crossorigin="anonymous" />`} />
			</p>

			<p>
				To use different fonts, override two custom CSS properties for the CSS class that is
				automatically associated with the chart container like this...
				<CodeSnippet
					type="multi"
					code={`.cds--cc--chart-wrapper {
  --cds-charts-font-family: Roboto;
  --cds-charts-font-family-condensed: 'Roboto Condensed';
}`} />
			</p>
		</Column>
		<Column>&nbsp;</Column>
	</Row>
</Grid>

<style lang="scss">
	// h3 {
	// 	margin-top: 2rem;
	// }
</style>
