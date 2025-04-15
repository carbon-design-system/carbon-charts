import { BulletChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/bullet'
import '@carbon/charts-react/styles.css'

export default function Bullet() {
	return (
		<>
			<PageHeader title="Bullet Charts" />

			<p>
				Bullet Charts provide a clear and compact way to display performance data by comparing a
				primary measure to one or more other measures and qualitative ranges, such as poor,
				satisfactory, and excellent. This type of chart is effective for offering a quick snapshot
				of data in the context of set performance goals or benchmarks. Originally designed as an
				alternative to more complex dashboard gauges and meters, Bullet Charts are particularly
				useful for enhancing dashboard readability and efficiency. They are commonly used in
				business to illustrate performance, such as reaching sales targets or production levels, and
				can also serve well in any context where space is limited and a quick visual assessment is
				beneficial. With their straightforward design, Bullet Charts allow for immediate
				interpretation of positional and contextual data, making them a versatile tool in data
				visualization.
			</p>

			<p>
				Details on Bullet chart options can be found{' '}
				<a href="/api/interfaces/BulletChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<BulletChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
