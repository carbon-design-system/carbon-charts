// Internal Imports
import { AxisChart } from '../axis-chart';
import * as Configuration from '../configuration';
import { ChartConfig, LineChartOptions } from '../interfaces/index';
import { Tools } from '../tools';
import { Skeletons } from '../interfaces/enums';

// Components
import {
	Grid,
	Line,
	Ruler,
	Scatter,
	TwoDimensionalAxes,
	ZeroLine,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
	SkeletonLines,
} from '../components/index';

export class LineChart extends AxisChart {
	constructor(holder: Element, chartConfigs: ChartConfig<LineChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.lineChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
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
			new ZeroLine(this.model, this.services),
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents
		);
		return components;
	}
}
