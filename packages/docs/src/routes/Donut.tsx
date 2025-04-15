import { DonutChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/donut'
import '@carbon/charts-react/styles.css'

export default function Donut() {
	return (
		<>
			<PageHeader title="Donut Charts" />

			<p>
				Donut charts are a type of circular statistical graphic, similar to pie charts, but with a
				central hole. They display data in a ring shape, where the arc length of each slice
				corresponds to the proportion of the whole it represents. The central area of the chart
				remains empty, allowing for additional information or annotations. Donut charts are often
				used to illustrate the breakdown of a whole into its constituent parts, making it easy to
				compare the relative sizes of different categories at a glance. They are popular for
				displaying data sets with a small number of categories and are commonly employed in business
				presentations, financial reports, and dashboards for their simplicity and visual appeal.
			</p>

			<p>
				Details on Donut chart options can be found{' '}
				<a href="/api/interfaces/DonutChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<DonutChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
