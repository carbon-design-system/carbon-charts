import { TreemapChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/treemap'
import '@carbon/charts-react/styles.css'

export default function Treemap() {
	return (
		<>
			<PageHeader title="Treemap Charts" />

			<p>
				Treemap charts are hierarchical visualizations that represent hierarchical data structures
				using nested rectangles. Each rectangle, or "tile," in the treemap represents a hierarchical
				level, with the size of the tile proportional to a specific metric, such as the relative
				weight or value of each category or subcategory. The hierarchical structure is depicted by
				nesting smaller rectangles within larger ones, with each level representing a different
				category or subcategory.
			</p>
			<p>
				Treemap charts are particularly effective for visualizing and comparing the distribution of
				data across hierarchical levels. They provide an intuitive way to identify patterns, trends,
				and outliers within large and complex datasets. Treemap charts are commonly used in fields
				such as finance, market research, and data analysis for tasks such as visualizing portfolio
				allocations, analyzing website traffic, and exploring the composition of product sales. They
				offer a powerful tool for gaining insights into the hierarchical structure of data and
				making data-driven decisions based on observed patterns and relationships.
			</p>

			<p>
				Details on Treemap Chart options can be found{' '}
				<a href="/api/interfaces/TreemapChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<TreemapChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
