import { AlluvialChart, AlluvialChartOptions } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/alluvial'
import '@carbon/charts-react/styles.css'

export default function Alluvial() {
	return (
		<>
			<PageHeader title="Alluvial / Sankey Charts" />

			<p>
				Alluvial Charts, also known as Sankey diagrams, are specialized flow diagrams that
				illustrate how data records distribute across two indicators, effectively highlighting the
				relationships and correlations between these variables. These charts are particularly useful
				for visualizing the flow of quantities between different states or conditions, providing
				clear insights into the structure and dynamics of datasets.
			</p>

			<p>
				To create a comprehensive alluvial diagram, you can align multiple blocks, each representing
				a pair of indicators, side by side. This arrangement allows for the visualization of complex
				networks and relationships within larger datasets. However, it is important to note that
				Alluvial Charts are designed to show correlations only between directly connected
				indicators. Relationships between non-adjacent indicators are not typically depicted, which
				can limit their use in displaying broader interdependencies within the data.
			</p>

			<p>
				To enhance readability and differentiation, distinct color schemes are often used for each
				block. This color coding helps in distinguishing between different sections of the diagram,
				making it easier for viewers to follow the flow and distribution of data across various
				categories and indicators. Overall, Alluvial Charts are a powerful tool for representing
				interconnected data in a clear and visually engaging manner.
			</p>

			<p>
				Details on Alluvial chart options can be found{' '}
				<a href="/api/interfaces/AlluvialChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<AlluvialChart data={example.data} options={example.options as AlluvialChartOptions} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
