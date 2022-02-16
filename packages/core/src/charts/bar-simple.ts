// Internal Imports
import { AxisChart } from '../axis-chart';
import * as Configuration from '../configuration';
import { BarChartOptions, ChartConfig } from '../interfaces/index';
import { Tools } from '../tools';
import { Skeletons } from '../interfaces/enums';

// Components
import {
	Grid,
	SimpleBar,
	TwoDimensionalAxes,
	ZeroLine,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
	Skeleton,
} from '../components/index';

export class SimpleBarChart extends AxisChart {
	constructor(holder: Element, chartConfigs: ChartConfig<BarChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.simpleBarChart,
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
			new SimpleBar(this.model, this.services),
			new ZeroLine(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.VERT_OR_HORIZ,
			}),
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents
		);
		return components;
	}
}
