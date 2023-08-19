<script lang="ts">
	import {
		Tabs,
		Tab,
		TabContent,
		CodeSnippet,
		InlineNotification,
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody
	} from 'carbon-components-svelte'
	import { type ChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts-svelte'
	import PageTitle from '$lib/PageTitle.svelte'
	import CodeSample from '$lib/CodeSample.svelte'

	let selected = 0

	const packageExtension = ['', '-svelte', '-react', '-vue', '-angular']

	const data: ChartTabularData = [
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
	]

	const options: ChartOptions = {
		title: 'Vertical simple bar (discrete)',
		axes: {
			left: {
				mapsTo: 'value'
			},
			bottom: {
				mapsTo: 'group',
				scaleType: ScaleTypes.LABELS
			}
		},
		height: '400px'
	}

	// Directions needed because StackBlitz won't show in Both mode for anything but first tab
	const directions = `<p>
	Click <strong>Preview</strong> or <strong>Both</strong> on the lower left of the example to see the chart. The top-left icon (Project) allows
	you to browse all the files in the project.
</p>`

	$: packageSuffix = packageExtension[selected]
</script>

<PageTitle title="Installation &amp; setup" />

<h2>Select your development framework</h2>

<Tabs bind:selected>
	<Tab label="Vanilla JavaScript" />
	<Tab label="Svelte" />
	<Tab label="React" />
	<Tab label="Vue.js" />
	<Tab label="Angular" />

	<svelte:fragment slot="content">
		<h3>Installing with package managers</h3>

		<Tabs>
			<Tab label="yarn" />
			<Tab label="npm" />

			<svelte:fragment slot="content">
				<p>
					<TabContent
						><CodeSnippet
							code={`yarn add @carbon/charts${packageSuffix} d3 d3-cloud d3-sankey`} /></TabContent>
					<TabContent
						><CodeSnippet
							code={`npm install -S @carbon/charts${packageSuffix} d3 d3-cloud d3-sankey`} /></TabContent>
				</p>
			</svelte:fragment>
		</Tabs>

		<InlineNotification
			title="Note:"
			subtitle={`The last two packages are optional except for these situations: d3-cloud (for Alluvial Charts) and d3-word (for Word Cloud Charts).`}
			lowContrast
			kind="info-square"
			hideCloseButton />

		<TabContent>
			<h3>Using ES modules (recommended)</h3>
			<CodeSample framework="vanilla" chartType="SimpleBarChart" {data} {options} />

			<p>The example above consists of these files:</p>
			<StructuredList class="file-list">
				<StructuredListHead>
					<StructuredListRow head>
						<StructuredListCell head>File</StructuredListCell>
						<StructuredListCell head>Purpose</StructuredListCell>
					</StructuredListRow>
				</StructuredListHead>
				<StructuredListBody>
					<StructuredListRow>
						<StructuredListCell noWrap>index.html</StructuredListCell>
						<StructuredListCell>
							The HTML file that loads the IBM Plex Sans and Sans Condensed fonts, defines a DIV
							container for the chart with the id of "app" and loads the main JavaScript module. To
							use different fonts, override two custom CSS properties for the CSS class that is
							automatically associated with the chart container like this...
							<CodeSnippet
								type="multi"
								code={`.cds--cc--chart-wrapper {
  --cds-charts-font-family: Roboto;
  --cds-charts-font-family-condensed: 'Roboto Condensed';
}`} />
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>index.js</StructuredListCell>
						<StructuredListCell>
							ES module that imports the SimpleBarChart class plus two modules - one for the chart
							display options and another containing the data. This module uses the import statement
							to import the styles necessary to display the chart in a manner that helps Vite
							optimize hot module reloading (HMR).
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>@carbon/charts/styles.css</StructuredListCell>
						<StructuredListCell>CSS stylesheet required for all charts.</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>data.js</StructuredListCell>
						<StructuredListCell>
							ES module containing data for the chart in <a href="/data">Tabular data format</a>.
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>options.js</StructuredListCell>
						<StructuredListCell
							>ES module with display <a href="/options">options</a> for the chart.</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>package.json</StructuredListCell>
						<StructuredListCell>Package file with basic dependencies.</StructuredListCell>
					</StructuredListRow>
				</StructuredListBody>
			</StructuredList>

			<h3>Using the UMD bundle in a browser environment</h3>

			<CodeSample framework="html" chartType="SimpleBarChart" {data} {options} />

			<p>
				The HTML example above loads the UMD bundle and styles in the head of the document from
				https://unpkg.com. The fonts are loaded from Google's CDN. The JavaScript executes once the
				DOM has loaded. It gets the HTML id of the div that will contain the chart. It then passes
				the data and options to it.
			</p>
		</TabContent>

		<TabContent>
			<CodeSample framework="svelte" chartType="SimpleBarChart" {data} {options} />
			<p>
				The example must be opened in StackBlitz to see the preview if you are not using Chrome.
			</p>

			<h3>SvelteKit Vite Configuration</h3>

			<p>
				Carbon Charts Svelte is unique among the component libraries because it is provided in
				source / unbundled form. This means when you build your Svelte app using it, you are
				compiling the source of Carbon Charts Svelte and its dependency, Carbon Charts.
			</p>
			<p>
				Carbon Charts expects to run in a browser environment. This will cause an error when using
				server-side rendering (SSR). To avoid this, configure Vite to prevent @carbon/charts from
				being externalized for SSR.
			</p>
			<p><strong>vite.config.mjs</strong></p>
			<CodeSnippet
				type="multi"
				code={`import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
		ssr: {
			noExternal: ${`process`}.env.NODE_ENV === 'production' ? ['@carbon/charts'] : []
	}
})`} />
		</TabContent>
		<TabContent>
			<CodeSample framework="react" chartType="SimpleBarChart" {data} {options} />
			{@html directions}
		</TabContent>
		<TabContent>
			<h3>Vue.js version support</h3>

			<p>
				In order to avoid a breaking change, installing <strong>@carbon/charts-vue@latest</strong>
				supports Vue.js 2.7+. For Vue.js 3.3+, install
				<strong>@carbon/charts-vue@next</strong>.
			</p>

			<CodeSample framework="vue" chartType="CcvSimpleBarChart" {data} {options} />
			{@html directions}
		</TabContent>
		<TabContent>
			<h3>Angular version support</h3>

			<p>
				In order to avoid a breaking change, installing <strong
					>@carbon/charts-angular@latest</strong>
				supports Angular 6 to 15. For Angular 16+, install
				<strong>@carbon/charts-angular@next</strong>.
			</p>

			<CodeSample framework="angular" chartType="ibm-simple-bar-chart" {data} {options} />
			{@html directions}
		</TabContent>
	</svelte:fragment>
</Tabs>

<h3>Fonts</h3>

<p>
	By default, Carbon Charts uses <a
		href="https://fonts.google.com/specimen/IBM+Plex+Sans"
		target="_blank">IBM Plex Sans</a>
	and
	<a href="https://fonts.google.com/specimen/IBM+Plex+Sans+Condensed" target="_blank"
		>IBM Plex Sans Condensed</a>
	which can be loaded in your HTML template from Google's Content Distribution Network (CDN):
	<CodeSnippet
		code={`<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans+Condensed:300,400|IBM+Plex+Sans:400,600&display=swap" rel="stylesheet" crossorigin="anonymous" />`} />
</p>

<p>
	To use different fonts, override two custom CSS properties for the CSS class that is automatically
	associated with the chart container like this...
	<CodeSnippet
		type="multi"
		code={`.cds--cc--chart-wrapper {
  --cds-charts-font-family: Roboto;
  --cds-charts-font-family-condensed: 'Roboto Condensed';
}`} />
</p>
