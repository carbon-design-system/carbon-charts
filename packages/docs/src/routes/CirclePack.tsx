import { CirclePackChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/circlepack'
import '@carbon/charts-react/styles.css'

export default function CirclePack() {
	return (
		<>
			<PageHeader title="Circle Pack Charts" />

			<p>
				Circle Pack Charts are a visually striking form of data visualization that use nested
				circles to represent hierarchical data. Each circle's size and nesting level depict
				different layers of the hierarchy, making complex organizational structures or data sets
				comprehensible at a glance. This type of chart is particularly effective for displaying
				proportions within each level of the hierarchy, offering insights into the relative size and
				importance of each element.
			</p>

			<p>
				Common applications of Circle Pack Charts include visualizing corporate structures,
				biological classifications, or website structures. These charts are useful in any field
				where understanding the composition and relationships within a large, complex set of data is
				crucial. The compact and encapsulated format of Circle Pack Charts not only saves space but
				also enhances the viewer's ability to detect patterns and anomalies across different levels
				of data. Overall, Circle Pack Charts provide a unique and intuitive way to explore and
				present nested data visually.
			</p>

			<p>
				Details on Circle Pack chart options can be found{' '}
				<a href="/api/interfaces/CirclePackChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<CirclePackChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
