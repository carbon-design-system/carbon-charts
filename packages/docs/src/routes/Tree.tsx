import { TreeChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/tree'
import '@carbon/charts-react/styles.css'

export default function Tree() {
	return (
		<>
			<PageHeader title="Tree Charts" />

			<p>
				Tree Charts, also known as dendrograms, are hierarchical visualizations that represent
				relationships between data points in a branching structure. They are commonly used in the
				field of hierarchical clustering to illustrate the arrangement of items based on their
				similarities or dissimilarities. In a tree chart, each data point is represented as a leaf
				node, while branches connect these nodes to form a tree-like structure. The length and
				position of branches convey the degree of similarity between data points, with shorter
				distances indicating greater similarity.
			</p>
			<p>
				Tree Charts are particularly effective for visualizing complex relationships and
				hierarchical structures within datasets. They provide a clear and intuitive way to explore
				clusters, subclusters, and the overall organization of data. Tree charts are widely used in
				fields such as biology, data mining, and information visualization for tasks such as
				taxonomic classification, gene expression analysis, and document clustering. They offer
				valuable insights into the structure and organization of data, aiding in pattern
				recognition, decision-making, and knowledge discovery.
			</p>

			<p>
				Details on Tree Chart options can be found{' '}
				<a href="/api/interfaces/TreeChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<TreeChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
