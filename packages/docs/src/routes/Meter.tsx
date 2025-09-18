import { MeterChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/meter'
import '@carbon/charts-react/styles.css'

export default function Meter() {
	return (
		<>
			<PageHeader title="Meter Charts" />

			<p>
				Meter Charts are a visual representation where a single value is depicted along a horizontal
				line, often with reference points or thresholds indicating different levels. The position of
				the value on the line provides a clear indication of its magnitude relative to the range
				represented by the line. This type of meter chart is commonly used to display values such as
				progress towards a goal, satisfaction scores, or performance metrics. It offers a simple and
				intuitive way to assess where a value stands in relation to predefined benchmarks or
				targets. Meter Charts are frequently employed in dashboard design, reporting, and monitoring
				systems to provide stakeholders with a quick and easy-to-understand snapshot of key metrics
				or indicators.
			</p>

			<p>
				Details on Meter Chart options can be found{' '}
				<a href="/api/interfaces/MeterChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<MeterChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
