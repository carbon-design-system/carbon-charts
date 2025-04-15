import { PieChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/pie'
import '@carbon/charts-react/styles.css'

export default function Pie() {
	return (
		<>
			<PageHeader title="Donut Charts" />

			<p>
				Pie Charts are a classic form of circular statistical visualization, where data is presented
				in a circular shape, divided into slices to represent different categories or proportions.
				Each slice's size corresponds to the proportion of the whole it represents, making it easy
				to compare relative values at a glance. Unlike donut charts, pie charts do not have a
				central hole and utilize the entire circle to display data. They are commonly used to
				illustrate the composition of a whole and highlight the distribution of various categories
				within it. Pie charts are favored for their simplicity and effectiveness in conveying
				information, making them a popular choice for presentations, reports, and visualizations
				across various fields such as business, finance, and academia.
			</p>

			<p>
				Details on Pie Chart options can be found{' '}
				<a href="/api/interfaces/PieChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<PieChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
