import { LollipopChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/lollipop'
import '@carbon/charts-react/styles.css'

export default function Lollipop() {
	return (
		<>
			<PageHeader title="Lollipop Charts" />

			<p>
				Lollipop charts blend the simplicity of dot plots with the structure of bar charts. They use
				markers connected to a categorical axis by lines, creating a "lollipop" appearance. These
				charts effectively highlight individual data points while still showing their magnitude
				relative to others. They're useful in data visualization and analysis for emphasizing
				specific values within a dataset and are commonly used across various fields to communicate
				insights and trends visually.
			</p>

			<p>
				Details on Lollipop Chart options can be found{' '}
				<a href="/api/interfaces/LollipopChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<LollipopChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
