import { useState, useEffect } from 'react'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'

import {
	CodeSnippet,
	InlineNotification,
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
		highlightCode()
	}, [selectedIndex])

	const packageSuffix = packageExtension[selectedIndex]
	const yarnCommand = `yarn add @carbon/charts${packageSuffix} d3 d3-cloud d3-sankey`
	const npmCommand = `npm install -S @carbon/charts${packageSuffix} d3 d3-cloud d3-sankey`

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

				<InlineNotification
					title="Note:"
					subtitle={`The last two packages are optional except for these situations: d3-cloud (for Alluvial Charts) and d3-word (for Word Cloud Charts).`}
					lowContrast
					kind="info-square"
					hideCloseButton
				/>

				<TabPanels>
					<TabPanel>
						<h3>Using ES modules (recommended)</h3>
						<CodeSample framework="vanilla" chartType="SimpleBarChart" data={data} options={options}></CodeSample>

					</TabPanel>
					<TabPanel></TabPanel>
					<TabPanel></TabPanel>
					<TabPanel></TabPanel>
					<TabPanel></TabPanel>
				</TabPanels>
			</Tabs>

			<CodeSnippet className="language-css" type="multi">{`.cds--cc--chart-wrapper {
  --cds-charts-font-family: Roboto;
  --cds-charts-font-family-condensed: 'Roboto Condensed';
}`}</CodeSnippet>

<CodeSnippet className="language-javascript" type="multi">{`import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [sveltekit()],
		ssr: {
			noExternal: ${`process`}.env.NODE_ENV === 'production' ? ['@carbon/charts'] : []
	}
})`}</CodeSnippet>

		</>
	)
}
