import { HeatmapChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/heatmap'
import '@carbon/charts-react/styles.css'

export default function Heatmap() {
	return (
		<>
			<PageHeader title="Heatmap Charts" />

			<p>
				Heatmap charts are graphical representations of data where values in a matrix are
				represented as colors. Typically, the data is arranged in a table format, with rows and
				columns representing different categories or variables. Each cell in the table is assigned a
				color based on its value, allowing patterns and trends to be easily visualized. Heatmaps are
				particularly useful for identifying areas of concentration, variation, or correlation within
				large datasets, as the intensity of color indicates the magnitude of the values. They are
				commonly used in fields such as data analysis, biology, finance, and web analytics to
				visualize complex data sets, detect outliers, and reveal underlying patterns that might not
				be apparent in traditional tabular formats. Heatmap charts provide an intuitive and
				efficient way to explore and interpret multidimensional data, making them valuable tools for
				decision-making and data-driven insights.
			</p>

			<p>
				Details on Heatmap Chart options can be found{' '}
				<a href="/api/interfaces/HeatmapChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<HeatmapChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
