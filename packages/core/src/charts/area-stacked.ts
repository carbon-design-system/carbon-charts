// Internal Imports
import { AxisChart } from '../axis-chart';
import * as Configuration from '../configuration';
import { ChartConfig, AreaChartOptions, Skeletons } from '../interfaces/index';
import { Tools } from '../tools';

// Components
import {
	Grid,
	StackedArea,
	StackedRuler,
	TwoDimensionalAxes,
	Line,
	StackedScatter,
	Skeleton,
} from '../components/index';

export class StackedAreaChart extends AxisChart {
	constructor(holder: Element, chartConfigs: ChartConfig<AreaChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.stackedAreaChart,
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
			new StackedRuler(this.model, this.services),
			new StackedArea(this.model, this.services),
			new Line(this.model, this.services, { stacked: true }),
			new StackedScatter(this.model, this.services, {
				fadeInOnChartHolderMouseover: true,
				handleThresholds: true,
				stacked: true,
			}),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID,
			}),
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents
		);
		return components;
	}
}
