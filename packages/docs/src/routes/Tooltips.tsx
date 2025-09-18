import {
	ScatterChart,
	LineChart,
	AreaChart,
	BubbleChart,
	StackedBarChart,
	ComboChart,
	HistogramChart
} from '@carbon/charts-react'
import PageHeader from '../components/PageHeader'
import StackBlitzLauncher from '../components/StackBlitzLauncher'
import StackBlitzLauncherExplanation from '../components/StackBlitzLauncherExplanation'
import { chartTypes as scatterChartTypes, examples as scatterExamples } from '../lib/scatter'
import { chartTypes as lineChartTypes, examples as lineExamples } from '../lib/line'
import { chartTypes as areaChartTypes, examples as areaExamples } from '../lib/area'
import { chartTypes as bubbleChartTypes, examples as bubbleExamples } from '../lib/bubble'
import { chartTypes as barChartTypes } from '../lib/bar'
import { examplesStacked as barStackedExamples } from '../lib/bar/examplesStacked'
import { chartTypes as comboChartTypes, examples as comboExamples } from '../lib/combo'
import { chartTypes as histogramChartTypes, examples as histogramExamples } from '../lib/histogram'
import '@carbon/charts-react/styles.css'

export default function Tooltips() {
	// Find examples that have alwaysShowRulerTooltip=true
	const tooltipExamples = [
		{
			chart: ScatterChart,
			chartTypes: scatterChartTypes,
			example: scatterExamples.find(ex => ex.options.title?.includes('alwaysShowRulerTooltip=true'))
		},
		{
			chart: LineChart,
			chartTypes: lineChartTypes,
			example: lineExamples.find(ex => ex.options.title?.includes('alwaysShowRulerTooltip=true'))
		},
		{
			chart: AreaChart,
			chartTypes: areaChartTypes,
			example: areaExamples.find(ex => ex.options.title?.includes('alwaysShowRulerTooltip=true'))
		},
		{
			chart: BubbleChart,
			chartTypes: bubbleChartTypes,
			example: bubbleExamples.find(ex => ex.options.title?.includes('alwaysShowRulerTooltip=true'))
		},
		{
			chart: StackedBarChart,
			chartTypes: barChartTypes,
			example: barStackedExamples.find(ex =>
				ex.options.title?.includes('alwaysShowRulerTooltip=true')
			)
		},
		{
			chart: ComboChart,
			chartTypes: comboChartTypes,
			example: comboExamples.find(ex => ex.options.title?.includes('alwaysShowRulerTooltip=true'))
		},
		{
			chart: HistogramChart,
			chartTypes: histogramChartTypes,
			example: histogramExamples.find(ex =>
				ex.options.title?.includes('alwaysShowRulerTooltip=true')
			)
		}
	].filter(item => item.example) // Only include items where we found the example

	return (
		<>
			<PageHeader title="Tooltips" />

			<p>Tooltips provide contextual information when users hover over chart elements.</p>

			<p>
				When <code>tooltip.alwaysShowRulerTooltip</code> is set to <code>true</code>, the tooltip
				will display ruler lines and values continuously as the user moves their cursor across the
				chart, making it easier to read precise values and compare data points across different
				series.
			</p>

			<p>
				Details on Tooltip options can be found{' '}
				<a href="/api/interfaces/tooltipoptions" target="_blank">
					here
				</a>
				.
			</p>

			<StackBlitzLauncherExplanation />

			<h2>Examples with alwaysShowRulerTooltip</h2>

			{tooltipExamples.map((item, index) => {
				const ChartComponent = item.chart
				const example = item.example!
				return (
					<p key={index} className="chart">
						<ChartComponent data={example.data} options={example.options} />
						<StackBlitzLauncher example={example} chartTypes={item.chartTypes} />
					</p>
				)
			})}
		</>
	)
}
