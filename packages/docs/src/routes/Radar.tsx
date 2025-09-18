import { RadarChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/radar'
import '@carbon/charts-react/styles.css'

export default function Radar() {
	return (
		<>
			<PageHeader title="Radar Charts" />

			<p>
				Radar Charts, also known as spider or Kiviat charts, are graphical representations of
				multivariate data on a two-dimensional plane. They feature a circular shape with multiple
				spokes extending from a central point, each representing a different variable or category.
				Data points are plotted along these spokes and connected to form a polygon, allowing for the
				comparison of multiple variables across different categories simultaneously. Radar charts
				are particularly useful for visualizing patterns, trends, and relationships in data with
				multiple dimensions. They are commonly employed in fields such as performance evaluation,
				market analysis, and sports analytics to assess strengths and weaknesses across various
				attributes or criteria. Radar charts offer a holistic view of complex data sets, enabling
				users to identify patterns and make informed decisions based on the relationships between
				different variables.
			</p>

			<p>
				Details on Radar Chart options can be found{' '}
				<a href="/api/interfaces/RadarChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<RadarChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
