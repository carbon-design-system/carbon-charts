import { ScatterChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/scatter'
import '@carbon/charts-react/styles.css'

export default function Scatter() {
	return (
		<>
			<PageHeader title="Scatter Charts" />

			<p>
				Scatter Charts are graphical representations of data points plotted on a two-dimensional
				coordinate system. Each data point is represented by a marker, such as a dot or a symbol,
				with its position determined by the values of two variables. One variable is plotted along
				the horizontal axis (x-axis), while the other variable is plotted along the vertical axis
				(y-axis). Scatter charts are particularly useful for visualizing the relationship or
				correlation between two variables. They allow analysts to identify patterns, trends, or
				clusters within the data and assess the strength and direction of the relationship between
				the variables. Scatter charts are commonly used in fields such as statistics, engineering,
				and social sciences for exploratory data analysis, hypothesis testing, and predictive
				modeling. They provide a powerful tool for gaining insights into the nature of relationships
				between variables and making data-driven decisions based on observed patterns.
			</p>

			<p>
				Details on Scatter Chart options can be found{' '}
				<a href="/api/interfaces/ScatterChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<ScatterChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
