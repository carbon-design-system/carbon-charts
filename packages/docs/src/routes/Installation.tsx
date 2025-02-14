import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'

import {
	CodeSnippet,
	StructuredListWrapper,
	StructuredListHead,
	StructuredListRow,
	StructuredListCell,
	StructuredListBody,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs
} from '@carbon/react/es'
import { type ChartOptions, type ChartTabularData, ScaleTypes } from '@carbon/charts-react'
import CodeSample from '../components/CodeSample'
import PageHeader from '../components/PageHeader'

const packageExtension = ['', '-svelte', '-react', '-vue', '-angular']

export default function Installation() {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [isChromium, setIsChromium] = useState(false)

	const handleTabChange = (evt: { selectedIndex: number }) => {
		setSelectedIndex(evt.selectedIndex)
	}

	const highlightCode = () => {
		hljs.registerLanguage('bash', bash)
		hljs.registerLanguage('css', css)
		hljs.registerLanguage('javascript', javascript)

		const nodes = document.querySelectorAll('pre code')
		nodes.forEach(el => {
			hljs.highlightElement(el as HTMLElement)
		})
	}

	useEffect(() => {
		const userAgent = window.navigator.userAgent.toLowerCase()
		const chromiumBased = userAgent.includes('chrome') || userAgent.includes('chromium')
		setIsChromium(chromiumBased)
		highlightCode()
	}, [selectedIndex])

	const packageSuffix = packageExtension[selectedIndex]
	const yarnCommand = `yarn add @carbon/charts${packageSuffix}`
	const npmCommand = `npm install -S @carbon/charts${packageSuffix}`

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

	return (
		<>
			<PageHeader title="Installation & setup" />
			<h2>Select your development framework</h2>
			<Tabs selectedIndex={selectedIndex} onChange={handleTabChange}>
				<TabList aria-label="List of frameworks">
					<Tab>Vanilla JavaScript</Tab>
					<Tab>Svelte</Tab>
					<Tab>React</Tab>
					<Tab>Vue.js</Tab>
					<Tab>Angular</Tab>
				</TabList>

				<h3>Installing with package managers</h3>
				<Tabs>
					<TabList aria-label="List of package managers">
						<Tab>yarn</Tab>
						<Tab>npm</Tab>
					</TabList>

					<TabPanels>
						<TabPanel>
							<CodeSnippet className="language-bash">{yarnCommand}</CodeSnippet>
						</TabPanel>
						<TabPanel>
							<CodeSnippet className="language-bash">{npmCommand}</CodeSnippet>
						</TabPanel>
					</TabPanels>
				</Tabs>

				<TabPanels>
					<TabPanel>
						<h3>Using ES modules (recommended)</h3>
						<CodeSample
							framework="vanilla"
							chartType="SimpleBarChart"
							data={data}
							options={options}></CodeSample>

						<p>Details for each file in the example above:</p>
						<StructuredListWrapper>
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
										The HTML file that loads the IBM Plex Sans and Sans Condensed fonts, defines a
										DIV container for the chart with the id of "app" and loads the main JavaScript
										module. To use different fonts, override two custom CSS properties for the CSS
										class that is automatically associated with the chart container like this...
										<CodeSnippet className="language-css" type="multi">{`.cds--cc--chart-wrapper {
  --cds-charts-font-family: Roboto;
  --cds-charts-font-family-condensed: 'Roboto Condensed';
}`}</CodeSnippet>
									</StructuredListCell>
								</StructuredListRow>
								<StructuredListRow>
									<StructuredListCell noWrap>index.js</StructuredListCell>
									<StructuredListCell>
										ES module that imports the SimpleBarChart class plus two modules - one for the
										chart display options and another containing the data. This module uses the
										import statement to import the styles necessary to display the chart in a manner
										that helps Vite optimize hot module reloading (HMR).
									</StructuredListCell>
								</StructuredListRow>
								<StructuredListRow>
									<StructuredListCell noWrap>@carbon/charts/styles.css</StructuredListCell>
									<StructuredListCell>
										Imported by index.js - CSS stylesheet required for all charts. A minified
										version is also distributed.
									</StructuredListCell>
								</StructuredListRow>
								<StructuredListRow>
									<StructuredListCell noWrap>@carbon/charts/scss/index.scss</StructuredListCell>
									<StructuredListCell>
										Optional SCSS styles that can be loaded via `@use`.
									</StructuredListCell>
								</StructuredListRow>
								<StructuredListRow>
									<StructuredListCell noWrap>data.js</StructuredListCell>
									<StructuredListCell>
										ES module containing data for the chart in{' '}
										<Link to="/data">Tabular data format</Link>.
									</StructuredListCell>
								</StructuredListRow>
								<StructuredListRow>
									<StructuredListCell noWrap>options.js</StructuredListCell>
									<StructuredListCell>
										ES module with display <Link to="/options">options</Link> for the chart.
									</StructuredListCell>
								</StructuredListRow>
								<StructuredListRow>
									<StructuredListCell noWrap>package.json</StructuredListCell>
									<StructuredListCell>
										Package file with minimal required dependencies.
									</StructuredListCell>
								</StructuredListRow>
							</StructuredListBody>
						</StructuredListWrapper>

						<h3>Using the UMD bundle in a browser environment</h3>

						<CodeSample
							framework="html"
							chartType="SimpleBarChart"
							data={data}
							options={options}></CodeSample>

						<p>
							The HTML example above loads the UMD bundle and styles in the head of the document
							from https://unpkg.com (cdnjs is also available). JavaScript executes once the DOM has
							loaded. It gets the HTML id of the div that will contain the chart. It then passes the
							data and options to it.
						</p>
					</TabPanel>

					<TabPanel>
						<p>
							<strong>Example using SvelteKit</strong>
						</p>
						<CodeSample
							framework="svelte"
							chartType="SimpleBarChart"
							data={data}
							options={options}></CodeSample>
						{!isChromium && (
							<p>
								The embedded example above uses a WebContainer optimized for Chromium-based
								browsers. To view it in your browser, click the <strong>Fork on StackBlitz</strong>{' '}
								button on the bottom left.
							</p>
						)}

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
						<p>
							<strong>vite.config.mjs</strong>
						</p>
						<CodeSnippet
							className="language-javascript"
							type="multi">{`import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
		ssr: {
			noExternal: ${`process`}.env.NODE_ENV === 'production' ? ['@carbon/charts'] : []
	}
})`}</CodeSnippet>
					</TabPanel>

					<TabPanel>
						<p>
							<strong>Example using React</strong>
						</p>
						<CodeSample
							framework="react"
							chartType="SimpleBarChart"
							data={data}
							options={options}></CodeSample>
						<p>
							Click <strong>Preview</strong> or <strong>Both</strong> on the lower left of the
							example to see the chart. The top-left icon (Project) allows you to browse all the
							files in the project.
						</p>
					</TabPanel>

					<TabPanel>
						<p>
							<strong>Example using Vue.js</strong>
						</p>
						<CodeSample
							framework="vue"
							chartType="CcvSimpleBarChart"
							data={data}
							options={options}></CodeSample>
						{!isChromium && (
							<p>
								The embedded example uses a WebContainer optimized for Chromium-based browsers. To
								view it in your browser, click the <strong>Fork on StackBlitz</strong> button on the
								bottom left.
							</p>
						)}
						<p>
							For Vue.js 3+, use <strong>@carbon/charts-vue@next</strong>. For 2.7, use{' '}
							<strong>@carbon/charts-vue@latest</strong>.
						</p>
					</TabPanel>

					<TabPanel>
						<p>
							<strong>Example using Angular</strong>
						</p>

						<CodeSample
							framework="angular"
							chartType="ibm-simple-bar-chart"
							data={data}
							options={options}></CodeSample>
						<p>
							Click <strong>Preview</strong> or <strong>Both</strong> on the lower left of the
							example to see the chart. The top-left icon (Project) allows you to browse all the
							files in the project.
						</p>

						<p>
							For Angular 16+, use <strong>@carbon/charts-angular@next</strong>. For 6 to 15, use{' '}
							<strong>@carbon/charts-angular@latest</strong>.
						</p>
					</TabPanel>
				</TabPanels>
			</Tabs>

			<h3>Fonts</h3>

			<p>
				By default, Carbon Charts use{' '}
				<a
					href="https://github.com/IBM/plex?tab=readme-ov-file#ibm-plex-typeface-packages"
					target="_blank">
					IBM Plex Sans
				</a>
				&nbsp; and&nbsp;
				<a
					href="https://github.com/IBM/plex?tab=readme-ov-file#ibm-plex-typeface-packages"
					target="_blank">
					IBM Plex Sans Condensed
				</a>
				:
			</p>
			<CodeSnippet className="language-html">{`<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon/plex/sans.css" />
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon/plex/sans-condensed.css" />`}</CodeSnippet>

			<p>
				To use different fonts, override two custom CSS properties for the CSS class that is
				automatically associated with the chart container like this...
			</p>
			<CodeSnippet className="language-css" type="multi">{`.cds--cc--chart-wrapper {
  --cds-charts-font-family: Roboto;
  --cds-charts-font-family-condensed: 'Roboto Condensed';
}`}</CodeSnippet>
		</>
	)
}
