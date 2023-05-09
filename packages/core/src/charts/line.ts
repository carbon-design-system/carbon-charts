// Internal Imports
import { AxisChart } from '../axis-chart'
import { options } from '../configuration'
import type { ChartConfig, LineChartOptions } from '../interfaces/index'
import { mergeDefaultChartOptions } from '../tools'

// Components
import {
	Grid,
	Line,
	Ruler,
	Scatter,
	TwoDimensionalAxes,
	ZeroLine,
	SkeletonLines
} from '../components/index'

export class LineChart extends AxisChart {
	constructor(holder: HTMLDivElement, chartConfigs: ChartConfig<LineChartOptions>) {
		super(holder, chartConfigs)

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(mergeDefaultChartOptions(options.lineChart, chartConfigs.options))

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs)
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: any[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Ruler(this.model, this.services),
			new Line(this.model, this.services),
			new Scatter(this.model, this.services, { handleThresholds: true }),
			new SkeletonLines(this.model, this.services),
			new ZeroLine(this.model, this.services)
		]

		const components: any[] = this.getAxisChartComponents(graphFrameComponents)
		return components
	}
}
