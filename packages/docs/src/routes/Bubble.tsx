import { BubbleChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/bubble'
import '@carbon/charts-react/styles.css'

export default function Bubble() {
	return (
		<>
			<PageHeader title="Bubble Charts" />

			<p>
				Bubble Charts are a dynamic way to display three dimensions of data on a plot, where each
				point has values for the x-axis, y-axis, and a third dimension represented by the bubble's
				size. This type of chart is effective for comparing and visualizing the relationships
				between numerical variables, where the bubble sizes can highlight the magnitude of a third
				variable in addition to the standard x and y axes positioning. Bubble Charts are
				particularly useful for displaying a large volume of data points simultaneously in a way
				that is both visually engaging and easy to interpret. They are ideal for sectors such as
				economics, finance, and social sciences, where understanding complex interdependencies in
				data is crucial. Their intuitive layout helps in spotting correlations and trends
				effectively, making Bubble Charts a valuable tool in the arsenal of data visualization
				techniques.
			</p>

			<p>
				Details on Bubble chart options can be found{' '}
				<a href="/api/interfaces/BubbleChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<BubbleChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
