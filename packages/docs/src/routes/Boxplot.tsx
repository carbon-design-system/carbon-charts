import { BoxplotChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/boxplot'
import '@carbon/charts-react/styles.css'

export default function Boxplot() {
	return (
		<>
			<PageHeader title="Boxplot Charts" />

			<p>
				Boxplots, or box-and-whisker diagrams, offer a concise visualization of data distribution
				through a five-number summary: minimum, first quartile (Q1), median, third quartile (Q3) and
				maximum. These charts are ideal for identifying differences between groups, spotting
				outliers and understanding data spread and skewness. Boxplots are particularly useful in
				exploratory data analysis, helping to compare distributions across categories clearly and
				effectively. Their integration into modern data visualization environments ensures they are
				both accessible and responsive, suitable for detailed statistical displays.
			</p>

			<p>
				Details on Boxplot chart options can be found{' '}
				<a href="/api/types/interfaces.BoxplotChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<BoxplotChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
