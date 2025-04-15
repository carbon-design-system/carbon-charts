import { GaugeChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/gauge'
import '@carbon/charts-react/styles.css'

export default function Gauge() {
	return (
		<>
			<PageHeader title="Gauge Charts" />

			<p>
				Gauge charts, also known as dial or speedometer charts, are visualizations used to represent
				a single value within a specific range, typically depicting it against a scale marked with
				different levels or categories. Resembling the dashboard of a vehicle, these charts feature
				a circular or semicircular layout, with an indicator pointing to the value being measured.
				The position of the indicator relative to the scale provides an immediate visual indication
				of whether the value falls within certain predefined ranges, such as low, medium, or high.
				Gauge charts are often employed in performance monitoring, goal tracking, and Key
				Performance Indicator (KPI) reporting, offering a quick and intuitive way to assess progress
				or status at a glance. However, they should be used judiciously, as they can sometimes
				oversimplify data and may not be suitable for displaying complex datasets.
			</p>

			<p>
				Details on Gauge Chart options can be found{' '}
				<a href="/api/interfaces/GaugeChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<GaugeChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
