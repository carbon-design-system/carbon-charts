import { ComboChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/combo'
import '@carbon/charts-react/styles.css'

export default function Combo() {
	return (
		<>
			<PageHeader title="Combo Charts" />

			<p>
				Combo Charts provide a versatile visualization tool that combines different types of graphs
				into a single integrated display, allowing for a multifaceted analysis of datasets. This
				type of chart is particularly useful for presenting complementary or contrasting data types
				simultaneously, such as combining bar graphs with line graphs. The Combo Chart enables users
				to visually compare different measures and track their relationships, making it ideal for
				highlighting trends, variances, and performance metrics across various data dimensions. Its
				ability to overlay multiple chart types on a single grid enhances the clarity and depth of
				data interpretation, supporting better-informed decision-making processes in business and
				research contexts.
			</p>

			<p>
				Details on Combo chart options can be found{' '}
				<a href="/api/interfaces/ComboChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<ComboChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
