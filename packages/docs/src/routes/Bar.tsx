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
				<a href="/api/interfaces/BarChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<Tabs>
				<TabList aria-label="List of bart chart types">
					<Tab>Vertical &amp; Horizontal</Tab>
					<Tab>Grouped</Tab>
					<Tab>Stacked</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						{examples.map((example, index) => (
							<div key={index} className="chart">
								<SimpleBarChart data={example.data} options={example.options} />
								<StackBlitzLauncher example={example} chartTypes={chartTypes} />
							</div>
						))}
					</TabPanel>

					<TabPanel>
						{examplesGrouped.map((example, index) => (
							<div key={index} className="chart">
								<GroupedBarChart data={example.data} options={example.options} />
								<StackBlitzLauncher example={example} chartTypes={chartTypesGrouped} />
							</div>
						))}
					</TabPanel>

					<TabPanel>
						{examplesStacked.map((example, index) => (
							<div key={index} className="chart">
								<StackedBarChart data={example.data} options={example.options} />
								<StackBlitzLauncher example={example} chartTypes={chartTypesStacked} />
							</div>
						))}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	)
}
