import { LineChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/line'
import '@carbon/charts-react/styles.css'

export default function Line() {
	return (
		<>
			<PageHeader title="Line Charts" />

			<p>
				Line charts are graphical representations of data points connected by straight lines. They
				are commonly used to display trends or patterns over time or across different categories. In
				a line chart, the horizontal axis typically represents the independent variable, such as
				time or categories, while the vertical axis represents the dependent variable, such as
				numerical values or frequencies. Each data point is plotted as a marker, and the lines
				connecting them provide a visual representation of the progression or relationship between
				the data points. Line charts are particularly effective for illustrating trends,
				fluctuations, or correlations in data, making them valuable tools for data analysis,
				forecasting, and communication. They are widely used in fields such as finance, economics,
				science, and engineering to visualize time-series data, track performance metrics, and
				communicate insights to stakeholders. Line charts offer a clear and concise way to convey
				complex information, enabling users to make informed decisions and derive actionable
				insights from their data.
			</p>

			<p>
				Details on Line Chart options can be found{' '}
				<a href="/api/interfaces/LineChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<LineChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
