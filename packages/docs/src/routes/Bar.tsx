import { useState, useEffect } from 'react'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react'
import { SimpleBarChart, GroupedBarChart, StackedBarChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/bar'
import { chartTypesGrouped, examplesGrouped } from '../lib/bar/examplesGrouped'
import { chartTypesStacked, examplesStacked } from '../lib/bar/examplesStacked'

import '@carbon/charts-react/styles.css'

export default function Bar() {
	const [selectedIndex, setSelectedIndex] = useState(0)

	const handleTabChange = (evt: { selectedIndex: number }) => {
		setSelectedIndex(evt.selectedIndex)
	}

	useEffect(() => {}, [selectedIndex])

	return (
		<>
			<PageHeader title="Bar Charts" />

			<p>
				Bar Charts are a staple in data visualization, useful for comparing quantities across
				different categories. This component library allows for the creation of simple, grouped, and
				stacked bar charts to suit various data presentation needs.
			</p>

			<p>
				Details on Bar chart options can be found{' '}
				<a href="/api/interfaces/interfaces.BarChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<Tabs selectedIndex={selectedIndex} onChange={handleTabChange}>
				<TabList aria-label="List of bart chart types">
					<Tab>Vertical &amp; Horizontal</Tab>
					<Tab>Grouped</Tab>
					<Tab>Stacked</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						{examples.map((example, index) => (
							<p key={index} className="chart">
								<SimpleBarChart data={example.data} options={example.options} />
								<StackBlitzLauncher example={example} chartTypes={chartTypes} />
							</p>
						))}
					</TabPanel>

					<TabPanel>
						{examplesGrouped.map((example, index) => (
							<p key={index} className="chart">
								<GroupedBarChart data={example.data} options={example.options} />
								<StackBlitzLauncher example={example} chartTypes={chartTypesGrouped} />
							</p>
						))}
					</TabPanel>

					<TabPanel>
						{examplesStacked.map((example, index) => (
							<p key={index} className="chart">
								<StackedBarChart data={example.data} options={example.options} />
								<StackBlitzLauncher example={example} chartTypes={chartTypesStacked} />
							</p>
						))}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	)
}
