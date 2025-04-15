import { AreaChart, StackedAreaChart } from '@carbon/charts-react'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@carbon/react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/area'
import { chartTypesStacked, examplesStacked } from '../lib/area/examplesStacked'
import '@carbon/charts-react/styles.css'

export default function Area() {
	return (
		<>
			<PageHeader title="Area Charts" />

			<p>
				Area Charts are a type of graph used to visualize quantitative data graphically. They are
				similar to line charts but emphasize the volume beneath the line by filling the area between
				the axis and the line with color or a pattern. This filled area helps to highlight the
				magnitude of values over time, making Area Charts particularly useful for showing trends in
				data at a glance, such as profits, stock volumes or demographic information over intervals.
			</p>

			<p>
				These charts are beneficial for comparing multiple datasets to see how volumes change over
				time relative to each other. For instance, they can effectively illustrate the growth of
				multiple product lines in a business or fluctuations in resource usage in different
				departments.
			</p>

			<p>
				In designing Area Charts, it's essential to maintain clear, uncluttered visuals, especially
				when dealing with multiple overlapping areas. Options such as stacking the areas (Stacked
				Area Charts) or normalizing the data to show proportional relationships (Percent Area
				Charts) can provide different perspectives and insights into the data, depending on the
				specific requirements of the analysis.
			</p>

			<p>
				Area Charts offer an intuitive and visually impactful way to present cumulative data series,
				making complex information more accessible and easier to understand.
			</p>

			<p>
				Details on Area chart options can be found{' '}
				<a href="/api/interfaces/AreaChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<Tabs>
				<TabList aria-label="List of area chart types">
					<Tab>Standard</Tab>
					<Tab>Stacked</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						{examples.map((example, index) => (
							<div key={index} className="chart">
								<AreaChart data={example.data} options={example.options} />
								<StackBlitzLauncher example={example} chartTypes={chartTypes} />
							</div>
						))}
					</TabPanel>
					<TabPanel>
						<p>
							Stacked area charts are useful for comparing proportional contributions within a
							category. They plot the relative value that each data series contributes to the total.
						</p>

						{examplesStacked.map((example, index) => (
							<div key={index} className="chart">
								<StackedAreaChart data={example.data} options={example.options} />
								<StackBlitzLauncher example={example} chartTypes={chartTypesStacked} />
							</div>
						))}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</>
	)
}
