import { ChoroplethChart, type ChoroplethChartOptions } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/choropleth'
import '@carbon/charts-react/styles.css'

export default function Choropleth() {
	return (
		<>
			<PageHeader title="Choropleth Charts" />

			<p>
				Choropleth Charts are specialized maps that use variations in shading, coloring, or
				patterning within predefined areas to represent the magnitude of a statistical variable.
				This type of chart is particularly effective for visualizing geographic data distributions,
				allowing for easy comparisons across different regions or territories. Commonly used to
				represent variables such as population density, economic metrics, or election results,
				Choropleth Charts provide a clear visual distinction between different data intensities.
				They are invaluable in fields such as demographics, public policy, and epidemiology, where
				geographic patterns play a crucial role in data analysis. The intuitive nature of these
				charts makes complex data sets accessible and understandable, highlighting spatial
				relationships and trends that might not be as apparent in other forms of data
				representation. Choropleth Charts are a fundamental tool in the visualization toolkit for
				anyone looking to convey geographic data insights effectively.
			</p>

			<p>
				Details on Choropleth chart options can be found{' '}
				<a href="/api/interfaces/ChoroplethChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<ChoroplethChart
						data={example.data}
						options={example.options as ChoroplethChartOptions}
					/>
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
