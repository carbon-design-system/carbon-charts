import { HistogramChart } from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes, examples } from '../lib/histogram'
import '@carbon/charts-react/styles.css'

export default function Histogram() {
	return (
		<>
			<PageHeader title="Histogram Charts" />

			<p>
				Histogram charts are graphical representations of the distribution of numerical data. They
				consist of a series of adjacent rectangles, or bins, where the width of each bin represents
				a range of values, and the height represents the frequency or count of data points falling
				within that range. The bins are usually arranged along a horizontal axis, with the frequency
				of occurrence plotted along the vertical axis. Histograms provide a visual summary of the
				distribution of data, allowing users to quickly identify patterns, trends, and outliers.
				They are commonly used in fields such as statistics, data analysis, and quality control to
				explore the underlying characteristics of a dataset, including central tendency, dispersion,
				and skewness. Histogram charts are valuable tools for understanding the shape and spread of
				data distributions, aiding in decision-making, hypothesis testing, and identifying areas for
				further investigation.
			</p>

			<p>
				Details on Histogram Chart options can be found{' '}
				<a href="/api/interfaces/HistogramChartOptions.html" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples</h2>

			{examples.map((example, index) => (
				<div key={index} className="chart">
					<HistogramChart data={example.data} options={example.options} />
					<StackBlitzLauncher example={example} chartTypes={chartTypes} />
				</div>
			))}
		</>
	)
}
